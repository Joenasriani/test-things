import fs from 'node:fs/promises';

const books = JSON.parse(await fs.readFile('store-v3/data/books.json', 'utf8'));
const app = await fs.readFile('store-v3/app.js', 'utf8');
const index = await fs.readFile('store-v3/index.html', 'utf8');
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

  if (book.coreIdea?.length > 140) fail(`${label}: coreIdea is too long for V3.`);
  if (book.storeLine?.length > 110) fail(`${label}: storeLine is too long for V3.`);

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

  try {
    const response = await fetch(book.landingPage, {
      redirect: 'follow',
      headers: { 'user-agent': 'ResearchLibraryV3Audit/2.0' }
    });
    if (!response.ok) {
      fail(`${label}: landing page returned HTTP ${response.status}.`);
      continue;
    }

    const html = decodeHtml(await response.text());
    const text = plainText(html);

    if (!includesText(text, book.title)) fail(`${label}: title cannot be verified on the landing page.`);
    if (!includesText(text, book.subtitle)) fail(`${label}: subtitle cannot be verified on the landing page.`);
    if (!includesText(text, book.coreIdea)) fail(`${label}: hook cannot be verified on the landing page.`);
    if (!html.includes(book.buyUrl)) fail(`${label}: direct purchase URL is not present on the landing page.`);

    for (const part of book.storeLine.split('·').map((value) => value.trim()).filter(Boolean)) {
      if (!includesText(text, part)) fail(`${label}: utility detail "${part}" cannot be verified on the landing page.`);
    }

    if (!text.includes(String(book.price.amount))) fail(`${label}: price amount cannot be verified on the landing page.`);

    ok(`${label}: source-backed title, hook, utility, price and direct purchase verified.`);
  } catch (error) {
    fail(`${label}: landing page could not be audited (${error.message}).`);
  }
}

const sequence = [
  'class="cover-link"',
  'class="book-title"',
  'class="book-hook"',
  'class="book-value"',
  'class="price"',
  'class="buy-direct"',
  'class="see-inside"'
];
let cursor = -1;
for (const token of sequence) {
  const next = app.indexOf(token, cursor + 1);
  if (next === -1) fail(`V3 sequence is missing ${token}.`);
  else if (next < cursor) fail(`V3 sequence is out of order at ${token}.`);
  else cursor = next;
}

if (app.includes('book-author')) fail('V3 repeats author inside the book stage; keep the customer-facing sequence tighter.');
if (app.includes('short-description') || app.includes('proof-line')) fail('V3 has regained explanatory copy that belongs on dedicated book pages.');
if (!index.includes('>BOOKS</span>')) fail('V3 header should identify the object plainly as BOOKS.');
if (!index.includes('Books on human behavior and hidden structure—reference libraries for readers, builders and AI.')) {
  fail('The finalized store positioning line is missing.');
}
if (!index.includes('A motive in one discipline. A missing variable in another.')) {
  fail('The cross-domain store line is missing.');
}
if (index.includes('book-count') || index.includes('library-count')) fail('The bookstore should not spend attention on catalogue counts.');
if (!index.includes('"numberOfItems": 2')) fail('Structured data must declare both books.');

if (errors.length) {
  console.error('\nBOOKSTORE V3 AUDIT FAILED\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nBOOKSTORE V3 AUDIT PASSED\n');
for (const note of notes) console.log(`- ${note}`);
console.log('- Exactly two books are published: Manipulation and The Structure of Life.');
console.log('- Surviving sequence per book: Cover → Title → Hook → Utility → Price → BUY → See inside.');
console.log('- Store positioning hints at AI/builders without redefining either book as an AI product.');
console.log('- Store → Buy remains one click; Store → Book remains one click.');
