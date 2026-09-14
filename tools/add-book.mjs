import fs from 'node:fs/promises';
import path from 'node:path';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node tools/add-book.mjs https://book-landing-page.example');
  process.exit(1);
}

const response = await fetch(url, {
  headers: { 'user-agent': 'BookstoreCatalogueImporter/1.0' },
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
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .trim();

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
    // Invalid JSON-LD is ignored. The draft will leave those fields unknown.
  }
}

const bookNode = ldNodes.find((node) => {
  const type = node?.['@type'];
  return Array.isArray(type) ? type.includes('Book') || type.includes('Product') : type === 'Book' || type === 'Product';
}) || {};

const offer = Array.isArray(bookNode.offers) ? bookNode.offers[0] : (bookNode.offers || {});
const author = typeof bookNode.author === 'string' ? bookNode.author : bookNode.author?.name;
const title = bookNode.name || meta('og:title') || textTitle() || 'Unknown title';
const description = bookNode.description || meta('og:description') || meta('description') || '';
const image = typeof bookNode.image === 'string' ? bookNode.image : (Array.isArray(bookNode.image) ? bookNode.image[0] : bookNode.image?.url) || meta('og:image');

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 90) || `book-${Date.now()}`;

const draft = {
  source: {
    landingPage: response.url,
    importedAt: new Date().toISOString(),
    status: 'proposal-only'
  },
  proposal: {
    id: slug,
    status: 'needs-review',
    title,
    subtitle: 'UNKNOWN',
    author: author || 'UNKNOWN',
    landingPage: response.url,
    cover: image || 'UNKNOWN',
    price: {
      amount: offer.price ? String(offer.price) : 'UNKNOWN',
      currency: offer.priceCurrency || 'UNKNOWN'
    },
    proposition: 'UNKNOWN',
    shortDescription: description || 'UNKNOWN',
    evidenceLine: 'UNKNOWN',
    formatLine: [bookNode.numberOfPages ? `${bookNode.numberOfPages} pages` : null, bookNode.bookFormat ? 'EBook' : null].filter(Boolean).join(' · ') || 'UNKNOWN',
    topics: [],
    visual: {
      accent: 'UNKNOWN',
      ink: 'UNKNOWN',
      paper: 'UNKNOWN'
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
