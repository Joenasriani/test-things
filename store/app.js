const catalogue = document.querySelector('#catalogue');
const count = document.querySelector('#library-count');

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const safeHttpUrl = (value) => {
  try {
    const url = new URL(String(value));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
};

const money = (amount, currency) => {
  const value = Number(amount);
  if (!Number.isFinite(value) || value < 0 || !/^[A-Z]{3}$/.test(currency || '')) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      minimumFractionDigits: 2
    }).format(value);
  } catch {
    return `${currency} ${amount}`;
  }
};

const renderBook = (book) => {
  const landing = safeHttpUrl(book.landingPage);
  if (!landing) return '';

  const cover = safeHttpUrl(book.cover);
  const buy = safeHttpUrl(book.buyUrl);
  const price = money(book.price?.amount, book.price?.currency || '');
  const accent = /^#[0-9a-f]{3,8}$/i.test(book.visual?.accent || '') ? book.visual.accent : '#7b211d';
  const fullTitle = [book.title, book.subtitle].filter(Boolean).join(' — ');
  const subtitle = book.subtitle ? `<span>${esc(book.subtitle)}</span>` : '';
  const buyControl = buy && price
    ? `<a class="buy-direct" href="${esc(buy)}" target="_blank" rel="noopener noreferrer" aria-label="Buy ${esc(fullTitle)} for ${esc(price)}">Buy <span>${esc(price)}</span></a>`
    : '';

  return `
    <article class="work" style="--book-accent:${esc(accent)}">
      ${cover ? `
        <a class="cover-link" href="${esc(landing)}" aria-label="See ${esc(fullTitle)}">
          <img class="cover" src="${esc(cover)}" alt="${esc(fullTitle)} book cover" loading="eager" decoding="async">
        </a>` : ''}

      <div class="work-copy">
        <p class="work-topline">${esc(book.author || '')}</p>
        <h2 class="work-title"><a href="${esc(landing)}">${esc(book.title || '')}${subtitle}</a></h2>
        <p class="short-description"><a href="${esc(landing)}">${esc(book.shortDescription || '')}</a></p>

        <div class="work-action">
          ${buyControl}
          <a class="enter" href="${esc(landing)}">See the book</a>
          ${book.formatLine ? `<p class="format-line">${esc(book.formatLine)}</p>` : ''}
        </div>
      </div>
    </article>
  `;
};

fetch('./data/books.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);
    return response.json();
  })
  .then((books) => {
    const published = books.filter((book) => book.status === 'published' && safeHttpUrl(book.landingPage));
    count.textContent = `${String(published.length).padStart(2, '0')} ${published.length === 1 ? 'book' : 'books'}`;
    catalogue.innerHTML = published.map(renderBook).join('') || '<p class="load-error">No published books are available.</p>';
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The book could not be loaded. Please refresh the page.</p>';
  });
