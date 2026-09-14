import fs from 'node:fs/promises';
import path from 'node:path';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node tools/add-book.mjs https://book-landing-page.example');
  process.exit(1);
}

const publicHttpUrl = (value, base) => {
  try {
    const url = new URL(value, base);
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    const host = url.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.endsWith('.local')) return '';
    if (/^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host)) return '';
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return '';
    return url.href;
  } catch {
    return '';
  }
};

const url = publicHttpUrl(input);
if (!url) throw new Error('The landing-page URL must be a public HTTP or HTTPS URL.');

const response = await fetch(url, {
  headers: { 'user-agent': 'BookstoreCatalogueImporter/2.0' },
  redirect: 'follow'
});

if (!response.ok) {
  throw new Error(`Could not read landing page: ${response.status} ${response.statusText}`);
}

const html = await response.text();

const decode = (s = '') => s
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&#x27;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&nbsp;', ' ')
  .trim();

const stripTags = (s = '') => decode(s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '));

const meta = (property) => {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["'][^>]*>`, 'i')
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decode(match[1]);
  }
  return '';
};

const textTitle = () => decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');

const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1].trim())
  .filter(Boolean);

const ldNodes = [];
for (const raw of scripts) {
  try {
    const parsed = JSON.parse(raw);
    const nodes = Array.isArray(parsed) ? parsed : parsed?.['@graph'] ? parsed['@graph'] : [parsed];
    ldNodes.push(...nodes);
  } catch {
    // Invalid JSON-LD stays untrusted and is ignored.
  }
}

const bookNode = ldNodes.find((node) => {
  const type = node?.['@type'];
  return Array.isArray(type) ? type.includes('Book') || type.includes('Product') : type === 'Book' || type === 'Product';
}) || {};

const offer = Array.isArray(bookNode.offers) ? bookNode.offers[0] : (bookNode.offers || {});
const author = typeof bookNode.author === 'string' ? bookNode.author : bookNode.author?.name;
const rawTitle = bookNode.name || meta('og:title') || textTitle() || 'Unknown title';
const rawDescription = bookNode.description || meta('og:description') || meta('description') || '';
const imageValue = typeof bookNode.image === 'string'
  ? bookNode.image
  : (Array.isArray(bookNode.image) ? bookNode.image[0] : bookNode.image?.url) || meta('og:image');
const cover = publicHttpUrl(imageValue, response.url) || 'UNKNOWN';

let title = rawTitle;
let subtitle = 'UNKNOWN';
if (rawTitle.includes(' — ')) {
  const parts = rawTitle.split(' — ').map((part) => part.trim()).filter(Boolean);
  if (parts.length > 1) {
    title = parts.shift();
    subtitle = parts.join(' — ');
  }
}

const shortDescription = rawDescription.length <= 180
  ? rawDescription
  : `${rawDescription.slice(0, 177).replace(/\s+\S*$/, '')}…`;

const anchors = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .map((match) => {
    const href = publicHttpUrl(decode(match[1]), response.url);
    const text = stripTags(match[2]);
    let score = 0;
    if (/paypal|checkout|buy|cart|payhip|gumroad|lemonsqueezy|stripe/i.test(href)) score += 5;
    if (/\b(buy|purchase|order|get the book|get book)\b/i.test(text)) score += 4;
    if (/sample|preview|read/i.test(text)) score -= 4;
    return { href, text, score };
  })
  .filter((item) => item.href)
  .sort((a, b) => b.score - a.score);

const offerUrl = publicHttpUrl(offer.url, response.url);
const directBuy = anchors.find((item) => item.score >= 4)?.href
  || (offerUrl && !offerUrl.includes('#') ? offerUrl : '')
  || 'UNKNOWN';

const slug = `${title}-${subtitle === 'UNKNOWN' ? '' : subtitle}`
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 90) || `book-${Date.now()}`;

const formatParts = [];
if (bookNode.numberOfPages) formatParts.push(`${bookNode.numberOfPages} pages`);
if (bookNode.bookFormat) formatParts.push('EBook');

const draft = {
  source: {
    landingPage: response.url,
    importedAt: new Date().toISOString(),
    status: 'proposal-only'
  },
  proposal: {
    id: slug,
    status: 'needs-review',
    index: 'UNKNOWN',
    title,
    subtitle,
    author: author || 'UNKNOWN',
    landingPage: response.url,
    buyUrl: directBuy,
    cover,
    price: {
      amount: offer.price ? String(offer.price) : 'UNKNOWN',
      currency: offer.priceCurrency || 'UNKNOWN'
    },
    shortDescription: shortDescription || 'UNKNOWN',
    formatLine: formatParts.join(' · ') || 'UNKNOWN',
    verifiedAt: 'UNKNOWN',
    visual: {
      accent: 'UNKNOWN'
    }
  },
  reviewRequired: true,
  note: 'Nothing in this file is canonical until manually reviewed and merged into store/data/books.json.'
};

const outDir = path.join('store', 'data', 'inbox');
await fs.mkdir(outDir, { recursive: true });
const outFile = path.join(outDir, `${slug}.json`);
await fs.writeFile(outFile, JSON.stringify(draft, null, 2) + '\n', 'utf8');
console.log(`Created review draft: ${outFile}`);
