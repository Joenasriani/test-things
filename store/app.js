const catalogue = document.querySelector('#catalogue');
const count = document.querySelector('#library-count');

const money = (amount, currency) => {
  const value = Number(amount);
  if (!Number.isFinite(value)) return 'Price unavailable';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(value);
  } catch {
    return `${amount} ${currency}`;
  }
};

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const renderWork = (book) => {
  const accent = book.visual?.accent || '#7b211d';
  const price = money(book.price?.amount, book.price?.currency || 'USD');
  const landing = esc(book.landingPage);
  const buy = esc(book.buyUrl || book.landingPage);

  return `
    <article class="work" style="--book-accent:${esc(accent)}">
      <div class="work-index" aria-hidden="true">
        <span class="work-number">${esc(book.index || '')}</span>
      </div>

      <a class="cover-link" href="${landing}" aria-label="Open ${esc(book.title)} ${esc(book.subtitle)} landing page">
        <img class="cover" src="${esc(book.cover)}" alt="${esc(book.title)} ${esc(book.subtitle)} book cover" loading="eager" decoding="async">
      </a>

      <div class="work-copy">
        <p class="work-topline">${esc(book.author)}</p>
        <h2 class="work-title"><a href="${landing}">${esc(book.title)}<span>${esc(book.subtitle)}</span></a></h2>
        <p class="short-description"><a href="${landing}">${esc(book.shortDescription)}</a></p>

        <div class="work-action">
          <div class="price">${esc(price)}<small>${esc(book.price?.currency || '')}</small></div>
          <a class="buy-direct" href="${buy}" target="_blank" rel="noopener noreferrer">Buy</a>
          <a class="enter" href="${landing}">See the book</a>
          <p class="format-line">${esc(book.formatLine)}</p>
        </div>
      </div>
    </article>
  `;
};

fetch('./data/books.json', { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);
    return response.json();
  })
  .then((books) => {
    const published = books.filter((book) => book.status === 'published');
    count.textContent = `${String(published.length).padStart(2, '0')} ${published.length === 1 ? 'book' : 'books'}`;
    catalogue.innerHTML = published.map(renderWork).join('');
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The catalogue could not be loaded.</p>';
  });
