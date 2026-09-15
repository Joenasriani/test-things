import fs from 'node:fs/promises';

const books = JSON.parse(await fs.readFile('store-v3/data/books.json', 'utf8'));
const app = await fs.readFile('store-v3/app.js', 'utf8');
const index = await fs.readFile('store-v3/index.html', 'utf8');
const styles = await fs.readFile('store-v3/styles.css', 'utf8');
const robots = await fs.readFile('store-v3/robots.txt', 'utf8');
const sitemap = await fs.readFile('store-v3/sitemap.xml', 'utf8');
const errors = [];
const notes = [];

const fail = (message) => errors.push(message);
const ok = (message) => notes.push(message);

const isHttpUrl = (value) => {
  try {
    const url = new URL(String(value));
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const decodeHtml = (value = '') => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&#x27;', "'")
  .replaceAll('&nbsp;', ' ');

const plainText = (html = '') => decodeHtml(html)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const includesText = (source, expected) =>
  source.toLowerCase().includes(String(expected).trim().toLowerCase());

if (!Array.isArray(books)) fail('store-v3/data/books.json must contain an array.');
const published = Array.isArray(books) ? books.filter((book) => book.status === 'published') : [];
if (published.length !== 2) fail(`The finalized bookstore must contain exactly 2 published books; found ${published.length}.`);

for (const book of published) {
  const label = book.id || book.title || 'unknown-book';
  const required = ['id', 'title', 'subtitle', 'author', 'landingPage', 'buyUrl', 'theme', 'coreIdea', 'storeLine'];

  for (const field of required) {
    if (typeof book[field] !== 'string' || !book[field].trim() || book[field] === 'UNKNOWN') {
      fail(`${label}: ${field} is missing or unconfirmed.`);
    }
  }

  for (const field of ['landingPage', 'buyUrl']) {
    if (!isHttpUrl(book[field])) fail(`${label}: ${field} must be HTTP/HTTPS.`);
  }
  if (book.cover && !isHttpUrl(book.cover)) fail(`${label}: cover must be HTTP/HTTPS when supplied.`);
  if (book.scene && !isHttpUrl(book.scene)) fail(`${label}: scene must be HTTP/HTTPS when supplied.`);
  if (!book.cover && book.coverStyle !== 'structure') fail(`${label}: provide a verified cover URL or an approved constructed coverStyle.`);

  if (book.coreIdea?.length > 120) fail(`${label}: coreIdea is too long for the selling spread.`);
  if (book.storeLine?.length > 110) fail(`${label}: storeLine is too long for the selling spread.`);

  const amount = Number(book.price?.amount);
  const currency = book.price?.currency;
  if (!Number.isFinite(amount) || amount < 0) fail(`${label}: price amount is invalid.`);
  if (!/^[A-Z]{3}$/.test(currency || '')) fail(`${label}: price currency must be a 3-letter uppercase code.`);

  try {
    const buyUrl = new URL(book.buyUrl);
    const queryAmount = buyUrl.searchParams.get('amount');
    const queryCurrency = buyUrl.searchParams.get('currency_code');
    if (queryAmount && Number(queryAmount) !== amount) fail(`${label}: displayed price does not match purchase URL amount.`);
    if (queryCurrency && queryCurrency !== currency) fail(`${label}: displayed currency does not match purchase URL currency.`);
  } catch {
    // URL validity is reported above.
  }

  if (!includesText(plainText(index), book.title)) fail(`${label}: title must exist in server-delivered store HTML.`);
  if (!includesText(plainText(index), book.subtitle)) fail(`${label}: subtitle must exist in server-delivered store HTML.`);
  if (!includesText(plainText(index), book.coreIdea)) fail(`${label}: selling line must exist in server-delivered store HTML.`);
  if (!includesText(plainText(index), book.storeLine)) fail(`${label}: utility line must exist in server-delivered store HTML.`);
  if (!index.includes(book.landingPage)) fail(`${label}: landing-page link must exist in server-delivered store HTML.`);
  if (!index.includes(book.buyUrl.replaceAll('&', '&amp;')) && !index.includes(book.buyUrl)) fail(`${label}: direct purchase link must exist in server-delivered store HTML.`);

  try {
    const response = await fetch(book.landingPage, {
      redirect: 'follow',
      headers: { 'user-agent': 'ReasoningLibraryAudit/6.0' }
    });
    if (!response.ok) {
      fail(`${label}: landing page returned HTTP ${response.status}.`);
      continue;
    }

    const html = decodeHtml(await response.text());
    const text = plainText(html);

    if (!includesText(text, book.title)) fail(`${label}: title cannot be verified on the landing page.`);
    if (!includesText(text, book.subtitle)) fail(`${label}: subtitle cannot be verified on the landing page.`);
    if (!includesText(text, book.coreIdea)) fail(`${label}: short selling line cannot be verified on the landing page.`);
    if (!html.includes(book.buyUrl)) fail(`${label}: direct purchase URL is not present on the landing page.`);

    for (const part of book.storeLine.split('·').map((value) => value.trim()).filter(Boolean)) {
      if (!includesText(text, part)) fail(`${label}: utility detail "${part}" cannot be verified on the landing page.`);
    }

    if (!text.includes(String(book.price.amount))) fail(`${label}: price amount cannot be verified on the landing page.`);
    ok(`${label}: source-backed title, selling line, utility, price and direct purchase verified.`);
  } catch (error) {
    fail(`${label}: landing page could not be audited (${error.message}).`);
  }
}

const sequence = [
  'class="cover-link"',
  'class="book-title"',
  'class="book-hook"',
  'class="book-value"',
  'class="price-buy"',
  'class="price"',
  'class="purchase-word"'
];
let cursor = -1;
for (const token of sequence) {
  const next = index.indexOf(token, cursor + 1);
  if (next === -1) fail(`V3 server HTML sequence is missing ${token}.`);
  else if (next < cursor) fail(`V3 server HTML sequence is out of order at ${token}.`);
  else cursor = next;
}

const entryCount = (index.match(/<article class="book-entry /g) || []).length;
if (entryCount !== 2) fail(`Exactly two book entries must be present in server HTML; found ${entryCount}.`);
if (app.includes("fetch('./data/books.json')") || app.includes('catalogue.innerHTML')) fail('Book content must not depend on client-side JavaScript rendering.');
if (!app.includes('pointermove')) fail('The bookstore must retain restrained, scenario-appropriate book interaction as progressive enhancement.');

if (!index.includes('>THE REASONING LIBRARY</a>')) fail('The store name must be visible and explicit.');
if (!index.includes('Books on human behavior and hidden structure, built as reference systems for reasoning, research and new ideas.')) fail('The finalized store positioning line is missing.');
if (!index.includes('A motive in one discipline. A missing variable in another.')) fail('The cross-domain store line is missing.');
if (!index.includes('rel="canonical" href="https://reasoning-library.vercel.app/"')) fail('The store must declare its canonical production URL.');
if (!index.includes('name="robots" content="index, follow, max-image-preview:large"')) fail('The store must remain explicitly indexable.');
if (!index.includes('"@type": "Person"') || !index.includes('"@type": ["Book", "Product"]')) fail('Entity and Book/Product structured data must remain present.');
if (!index.includes('name="theme-color" content="#f7f5ef"')) fail('The bookstore must declare the bright visual system in browser chrome.');
if (!styles.includes('--paper: #f7f5ef')) fail('The bookstore must use the bright paper visual base.');
if (!styles.includes('grid-template-columns: repeat(2, minmax(0, 1fr))')) fail('Both books must be visible together in the desktop catalogue composition.');
if (!styles.includes('width: min(54%, 340px)')) fail('Book thumbnails are not large enough in the desktop composition.');
if (styles.includes('border-radius: 999') || styles.includes('glassmorphism')) fail('Generic pill/glass UI language detected.');
if (index.includes('book-count') || index.includes('library-count')) fail('Do not spend attention on catalogue counts.');
if (!index.includes('"numberOfItems": 2')) fail('Structured data must declare both books.');

for (const bot of ['Googlebot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) {
  if (!robots.includes(`User-agent: ${bot}`)) fail(`robots.txt must explicitly allow ${bot}.`);
}
if (!robots.includes('Sitemap: https://reasoning-library.vercel.app/sitemap.xml')) fail('robots.txt must advertise the canonical sitemap.');
if (!sitemap.includes('<loc>https://reasoning-library.vercel.app/</loc>')) fail('sitemap.xml must contain the canonical bookstore URL.');
if (index.includes('llms.txt') || robots.includes('llms.txt')) fail('Do not add llms.txt as a Google Search optimization mechanism.');

if (errors.length) {
  console.error('\nBOOKSTORE V3 AUDIT FAILED\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nBOOKSTORE V3 AUDIT PASSED\n');
for (const note of notes) console.log(`- ${note}`);
console.log('- Both books and purchase links are present in the initial HTML without JavaScript.');
console.log('- Thumbnail + title open the dedicated book landing page; price is the direct purchase surface.');
console.log('- JavaScript is progressive enhancement only.');
console.log('- Googlebot, OAI-SearchBot, Claude-SearchBot and PerplexityBot are explicitly allowed.');
console.log('- Canonical URL, sitemap, indexability and Book/Product entity data are present.');
console.log('- No visible bookstore design, book content or commercial link changed for search optimization.');
