// Run after deploying all three sites: node scripts/verify-production.mjs
// This checks the deployed public journey; it does not place an order.
const library = 'https://reasoning-library.vercel.app';
const books = [
  { origin: 'https://manipulation-book.vercel.app', id: 'MANIPULATION-2026-09' },
  { origin: 'https://the-structure-of-life.vercel.app', id: 'STRUCTURE-2026-09' }
];
const failures = [];
const pages = new Map();
const check = (condition, message) => { if (!condition) failures.push(message); };
async function get(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(20000), redirect: 'follow' });
  check(r.ok, `${url}: HTTP ${r.status}`);
  return r;
}
for (const origin of [library, ...books.map(b => b.origin)]) {
  for (const route of (origin === library ? ['/', '/robots.txt', '/sitemap.xml'] : ['/', '/sample', '/methodology', '/terms', '/delivery', '/robots.txt', '/sitemap.xml'])) {
    const url = origin + route;
    try { pages.set(url, await (await get(url)).text()); }
    catch (error) { failures.push(`${url}: ${error.message}`); }
  }
}
for (const book of books) {
  check(pages.get(library + '/')?.includes(book.origin + '/'), `Missing bookstore link: ${book.origin}`);
  check(pages.get(library + '/')?.includes(book.origin + '/api/buy'), `Wrong bookstore checkout: ${book.id}`);
  check(pages.get(book.origin + '/')?.includes(library + '/'), `Missing return-to-library link: ${book.id}`);
  try {
    const r = await fetch(book.origin + '/api/buy', { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    check(r.status === 302, `Expected checkout redirect for ${book.id}, got ${r.status}`);
    const url = new URL(r.headers.get('location'));
    check(url.origin === 'https://www.paypal.com', `Wrong payment origin: ${book.id}`);
    for (const [key, value] of Object.entries({ cmd: '_xclick', business: 'joenasr@gmail.com', item_number: book.id, amount: '23.33', currency_code: 'USD', return: book.origin + '/delivery', cancel_return: book.origin + '/' })) {
      check(url.searchParams.get(key) === value, `Wrong checkout ${key}: ${book.id}`);
    }
  } catch (error) { failures.push(`Checkout ${book.id}: ${error.message}`); }
}
// A header-only image check did not catch the original broken cover. Require
// the exact full image that was decoded successfully before the release.
try {
  const { createHash } = await import('node:crypto');
  const r = await get(books[0].origin + '/assets/cover.jpg');
  const data = Buffer.from(await r.arrayBuffer());
  const gitBlobHash = createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
  check(gitBlobHash === '56262bf0fdc93d3aade1a1967626f04fa4227e6f', 'Cover differs from the decoded study-edition original');
} catch (error) { failures.push(`Cover: ${error.message}`); }
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Public pages, navigation, product mappings and cover bytes passed.');
  console.log('A successful PayPal payment and private buyer receipt still require a separate end-to-end test.');
}
