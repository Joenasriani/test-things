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
      currencyDisplay: 'narrowSymbol',
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
  const scene = safeHttpUrl(book.scene);
  const buy = safeHttpUrl(book.buyUrl);
  const price = money(book.price?.amount, book.price?.currency || '');
  const fullTitle = [book.title, book.subtitle].filter(Boolean).join(' — ');
  const bookId = esc(book.id || fullTitle);
  const index = book.index || String(position + 1).padStart(2, '0');
  const valueLine = book.storeLine || [book.formatLine, book.includedLine].filter(Boolean).join(' · ');

  const buyControl = buy && price
    ? `<a class="buy-direct" href="${esc(buy)}" data-action="buy" data-book="${bookId}" aria-label="Buy ${esc(fullTitle)} for ${esc(price)} ${esc(book.price?.currency || '')}"><span>Buy</span><strong>${esc(price)}</strong></a>`
    : '';

  return `
    <article class="book-stage">
      ${scene ? `<div class="book-atmosphere" aria-hidden="true"><img src="${esc(scene)}" alt="" loading="eager" decoding="async"></div>` : ''}
      <div class="book-stage-inner">
        ${cover ? `
          <a class="cover-link" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See ${esc(fullTitle)}">
            <img class="cover" src="${esc(cover)}" alt="${esc(fullTitle)} book cover" loading="eager" decoding="async">
          </a>` : ''}

        <div class="book-copy">
          <p class="book-meta">${esc(index)} · ${esc(book.author || '')}</p>
          <h1 class="book-title">
            <a href="${esc(landing)}" data-action="open-book" data-book="${bookId}">
              ${esc(book.title || '')}
              ${book.subtitle ? `<span>${esc(book.subtitle)}</span>` : ''}
            </a>
          </h1>

          ${book.coreIdea ? `<p class="book-hook">${esc(book.coreIdea)}</p>` : ''}
          ${valueLine ? `<p class="book-value">${esc(valueLine)}</p>` : ''}

          <div class="book-actions">
            ${buyControl}
            <a class="see-book" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="See ${esc(fullTitle)}">See the book <span aria-hidden="true">→</span></a>
          </div>
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
    count.textContent = String(published.length).padStart(2, '0');
    catalogue.innerHTML = published.map(renderBook).join('') || '<p class="load-error">No published books are available.</p>';
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The book could not be loaded. Please refresh the page.</p>';
  });

// Zero-backend measurement hook. Nothing is transmitted or stored.
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
