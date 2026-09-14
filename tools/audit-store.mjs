import fs from 'node:fs/promises';

const books = JSON.parse(await fs.readFile('store/data/books.json', 'utf8'));
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
  .replaceAll('&#x27;', "'");

if (!Array.isArray(books)) fail('store/data/books.json must contain an array.');

const published = Array.isArray(books) ? books.filter((book) => book.status === 'published') : [];
if (!published.length) fail('At least one published book is required.');

const ids = new Set();
const indexes = new Set();

for (const book of published) {
  const label = book.id || book.title || 'unknown-book';
  const required = ['id', 'title', 'author', 'landingPage', 'buyUrl', 'cover', 'shortDescription', 'formatLine'];

  for (const field of required) {
    if (typeof book[field] !== 'string' || !book[field].trim() || book[field] === 'UNKNOWN') {
      fail(`${label}: ${field} is missing or unconfirmed.`);
    }
  }

  if (ids.has(book.id)) fail(`${label}: duplicate id.`);
  ids.add(book.id);

  if (book.index) {
    if (indexes.has(book.index)) fail(`${label}: duplicate index ${book.index}.`);
    indexes.add(book.index);
  }

  if (!isHttpUrl(book.landingPage)) fail(`${label}: landingPage must be HTTP/HTTPS.`);
  if (!isHttpUrl(book.buyUrl)) fail(`${label}: buyUrl must be HTTP/HTTPS.`);
  if (!isHttpUrl(book.cover)) fail(`${label}: cover must be an absolute HTTP/HTTPS URL so deployment root cannot break it.`);
  if (book.buyUrl === book.landingPage) fail(`${label}: Buy must not silently fall back to the landing page.`);

  if (book.shortDescription?.length > 180) fail(`${label}: shortDescription exceeds 180 characters.`);

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
      headers: { 'user-agent': 'ResearchLibraryAudit/1.0' }
    });
    if (!response.ok) {
      fail(`${label}: landing page returned HTTP ${response.status}.`);
      continue;
    }

    const html = decodeHtml(await response.text());
    if (!html.toLowerCase().includes(String(book.title).toLowerCase())) {
      fail(`${label}: landing page does not contain the catalogue title.`);
    }
    if (book.subtitle && !html.toLowerCase().includes(String(book.subtitle).toLowerCase())) {
      fail(`${label}: landing page does not contain the catalogue subtitle.`);
    }
    if (!html.includes(book.buyUrl)) {
      fail(`${label}: direct Buy URL is not present on the linked landing page.`);
    }

    const priceTextPresent = html.includes(String(book.price.amount));
    const currencyPresent = html.includes(String(book.price.currency));
    if (!priceTextPresent || !currencyPresent) {
      fail(`${label}: catalogue price/currency cannot be confirmed on the landing page.`);
    }

    ok(`${label}: click paths verified — Buy in 1 click; landing page in 1 click; landing page → Buy in 2 clicks.`);
  } catch (error) {
    fail(`${label}: landing page could not be audited (${error.message}).`);
  }
}

if (errors.length) {
  console.error('\nBOOKSTORE AUDIT FAILED\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nBOOKSTORE AUDIT PASSED\n');
for (const note of notes) console.log(`- ${note}`);
console.log(`- ${published.length} published book${published.length === 1 ? '' : 's'} validated.`);
console.log('- No account, signup, backend, CMS, database, or store-side checkout is required.');
