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
  const topics = Array.isArray(book.topics) ? book.topics.slice(0, 3).join(' · ') : '';
  const price = money(book.price?.amount, book.price?.currency || 'USD');

  return `
    <article class="work" style="--book-accent:${esc(accent)}">
      <div class="work-index">
        <span class="work-number">${esc(book.index || '')}</span>
        <span class="work-kind">Published work</span>
      </div>

      <a class="cover-link" href="${esc(book.landingPage)}" aria-label="Open ${esc(book.title)} ${esc(book.subtitle)} landing page">
        <img class="cover" src="${esc(book.cover)}" alt="${esc(book.title)} ${esc(book.subtitle)} book cover" loading="eager" decoding="async">
      </a>

      <div class="work-copy">
        <div class="work-topline">
          <span>${esc(book.author)}</span>
          ${topics ? `<span>${esc(topics)}</span>` : ''}
        </div>
        <h2 class="work-title">${esc(book.title)}<span>${esc(book.subtitle)}</span></h2>
        <p class="proposition">${esc(book.proposition)}</p>
        <p class="short-description">${esc(book.shortDescription)}</p>
        <p class="evidence-line">${esc(book.evidenceLine)}</p>

        <div class="work-action">
          <div class="price">${esc(price)}<small>${esc(book.price?.currency || '')}</small></div>
          <a class="enter" href="${esc(book.landingPage)}">Examine the work</a>
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
    count.textContent = `${String(published.length).padStart(2, '0')} published ${published.length === 1 ? 'work' : 'works'}`;
    catalogue.innerHTML = published.map(renderWork).join('');
  })
  .catch(() => {
    catalogue.innerHTML = '<p class="load-error">The catalogue could not be loaded.</p>';
  });
