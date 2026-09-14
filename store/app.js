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

const renderBook = (book, position) => {
  const landing = safeHttpUrl(book.landingPage);
  if (!landing) return '';

  const cover = safeHttpUrl(book.cover);
  const buy = safeHttpUrl(book.buyUrl);
  const price = money(book.price?.amount, book.price?.currency || '');
  const accent = /^#[0-9a-f]{3,8}$/i.test(book.visual?.accent || '') ? book.visual.accent : '#7b211d';
  const fullTitle = [book.title, book.subtitle].filter(Boolean).join(' — ');
  const subtitle = book.subtitle ? `<span>${esc(book.subtitle)}</span>` : '';
  const index = book.index || String(position + 1).padStart(2, '0');
  const loading = position === 0 ? 'eager' : 'lazy';
  const bookId = esc(book.id || fullTitle);

  const buyControl = buy && price
    ? `<a class="buy-direct" href="${esc(buy)}" data-action="buy" data-book="${bookId}" aria-label="Buy ${esc(fullTitle)} for ${esc(price)}">Buy <span>${esc(price)}</span></a>`
    : price
      ? `<span class="price-only" aria-label="Price ${esc(price)}">${esc(price)}</span>`
      : '';

  return `
    <article class="work" style="--book-accent:${esc(accent)}">
      ${cover ? `
        <a class="cover-link" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See ${esc(fullTitle)}">
          <img class="cover" src="${esc(cover)}" alt="${esc(fullTitle)} book cover" loading="${loading}" decoding="async">
        </a>` : ''}

      <div class="work-copy">
        <div class="work-meta" aria-label="Book ${esc(index)} by ${esc(book.author || '')}">
          <span>${esc(index)}</span>
          ${book.author ? `<span>${esc(book.author)}</span>` : ''}
        </div>

        <h2 class="work-title">
          <a href="${esc(landing)}" data-action="open-book" data-book="${bookId}">${esc(book.title || '')}${subtitle}</a>
        </h2>

        ${book.coreIdea ? `<p class="core-idea">${esc(book.coreIdea)}</p>` : ''}

        ${book.shortDescription ? `
          <p class="short-description">
            <a href="${esc(landing)}" data-action="open-book" data-book="${bookId}">${esc(book.shortDescription)}</a>
          </p>` : ''}

        ${book.proofLine ? `<p class="proof-line">${esc(book.proofLine)}</p>` : ''}

        <div class="work-action">
          ${buyControl}
          <a class="enter" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See ${esc(fullTitle)}">See the book</a>
        </div>

        ${(book.formatLine || book.includedLine) ? `
          <div class="book-facts" aria-label="Book details">
            ${book.formatLine ? `<p class="format-line">${esc(book.formatLine)}</p>` : ''}
            ${book.includedLine ? `<p class="included-line">${esc(book.includedLine)}</p>` : ''}
          </div>` : ''}
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

// Zero-backend measurement hook. Nothing is transmitted or stored here.
// A future first-party analytics listener can consume this event without changing the storefront markup.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-action]');
  if (!link) return;

  document.dispatchEvent(new CustomEvent('bookstore:action', {
    detail: {
      action: link.dataset.action,
      book: link.dataset.book
    }
  }));
});
