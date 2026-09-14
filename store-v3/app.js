const catalogue = document.querySelector('#catalogue');

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
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 2
    }).format(value);
  } catch {
    return `${currency} ${amount}`;
  }
};

const renderBook = (book) => {
  const landing = safeHttpUrl(book.landingPage);
  const cover = safeHttpUrl(book.cover);
  const scene = safeHttpUrl(book.scene);
  const buy = safeHttpUrl(book.buyUrl);
  const price = money(book.price?.amount, book.price?.currency || '');
  if (!landing || !cover || !buy || !price) return '';

  const fullTitle = [book.title, book.subtitle].filter(Boolean).join(' — ');
  const bookId = esc(book.id || fullTitle);

  return `
    <article class="book-stage">
      ${scene ? `
        <div class="book-atmosphere" aria-hidden="true">
          <img src="${esc(scene)}" alt="" loading="eager" decoding="async">
        </div>` : ''}

      <div class="book-stage-inner">
        <a class="cover-link" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See inside ${esc(fullTitle)}">
          <img class="cover" src="${esc(cover)}" alt="${esc(fullTitle)} book cover" loading="eager" decoding="async">
        </a>

        <div class="book-copy">
          <p class="book-author">${esc(book.author || '')}</p>

          <h1 class="book-title">
            <a href="${esc(landing)}" data-action="open-book" data-book="${bookId}">
              ${esc(book.title || '')}
              ${book.subtitle ? `<span>${esc(book.subtitle)}</span>` : ''}
            </a>
          </h1>

          ${book.coreIdea ? `<p class="book-hook">${esc(book.coreIdea)}</p>` : ''}
          ${book.storeLine ? `<p class="book-value">${esc(book.storeLine)}</p>` : ''}

          <div class="purchase-block" aria-label="Purchase">
            <span class="price">${esc(price)}</span>
            <a class="buy-direct" href="${esc(buy)}" data-action="buy" data-book="${bookId}" aria-label="Buy ${esc(fullTitle)} for ${esc(price)}">BUY</a>
          </div>

          <a class="see-inside" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See inside ${esc(fullTitle)}">See inside <span aria-hidden="true">→</span></a>
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
    const published = books.filter((book) => book.status === 'published');
    catalogue.innerHTML = published.map(renderBook).join('') || '<p class="load-error">No published books are available.</p>';
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The book could not be loaded. Please refresh.</p>';
  });

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
