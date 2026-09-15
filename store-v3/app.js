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

const safeTheme = (value) => ['manipulation', 'structure'].includes(value) ? value : 'neutral';

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

const constructedCover = (book) => {
  if (book.coverStyle !== 'structure') return '';
  return `
    <div class="cover cover--constructed structure-cover" aria-hidden="true">
      <small>STUDY EDITION</small>
      <strong>THE STRUCTURE<br>OF LIFE</strong>
      <em>The Structure of Reasoning</em>
      <div class="structure-axis"><i></i><i></i><i></i><i></i></div>
      <span>by J. NASR</span>
    </div>`;
};

const renderBook = (book) => {
  const landing = safeHttpUrl(book.landingPage);
  const cover = safeHttpUrl(book.cover);
  const scene = safeHttpUrl(book.scene);
  const buy = safeHttpUrl(book.buyUrl);
  const price = money(book.price?.amount, book.price?.currency || '');
  const fullTitle = [book.title, book.subtitle].filter(Boolean).join(' — ');
  const bookId = esc(book.id || fullTitle);
  const theme = safeTheme(book.theme);
  const coverMarkup = cover
    ? `<img class="cover" src="${esc(cover)}" alt="${esc(fullTitle)} book cover" loading="eager" decoding="async">`
    : constructedCover(book);

  if (!landing || !buy || !price || !coverMarkup) return '';

  return `
    <article class="book-entry book-entry--${theme}" data-book-theme="${theme}">
      <div class="book-visual">
        ${scene ? `<img class="book-context" src="${esc(scene)}" alt="" aria-hidden="true">` : ''}
        <a class="cover-link" href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="Open ${esc(fullTitle)}">
          ${coverMarkup}
        </a>
      </div>

      <div class="book-copy">
        <h2 class="book-title">
          <a href="${esc(landing)}" data-action="open-book" data-book="${bookId}" aria-label="Open ${esc(fullTitle)}">
            ${esc(book.title || '')}
            ${book.subtitle ? `<span>${esc(book.subtitle)}</span>` : ''}
          </a>
        </h2>

        ${book.coreIdea ? `<p class="book-hook">${esc(book.coreIdea)}</p>` : ''}
        ${book.storeLine ? `<p class="book-value">${esc(book.storeLine)}</p>` : ''}

        <a class="price-buy" href="${esc(buy)}" data-action="buy" data-book="${bookId}" aria-label="Buy ${esc(fullTitle)} for ${esc(price)}">
          <span class="price">${esc(price)}</span>
          <span class="purchase-word">BUY BOOK <b aria-hidden="true">↗</b></span>
        </a>
      </div>
    </article>
  `;
};

const installBookInteraction = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const entry of document.querySelectorAll('.book-entry')) {
    const visual = entry.querySelector('.book-visual');
    if (!visual) continue;

    visual.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      entry.style.setProperty('--tilt-x', `${(x * 4).toFixed(2)}px`);
      entry.style.setProperty('--tilt-y', `${(y * 3).toFixed(2)}px`);
    });

    visual.addEventListener('pointerleave', () => {
      entry.style.setProperty('--tilt-x', '0px');
      entry.style.setProperty('--tilt-y', '0px');
    });
  }
};

fetch('./data/books.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);
    return response.json();
  })
  .then((books) => {
    const published = books.filter((book) => book.status === 'published');
    catalogue.innerHTML = published.map(renderBook).join('') || '<p class="load-error">No published books are available.</p>';
    installBookInteraction();
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The books could not be loaded. Please refresh.</p>';
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
