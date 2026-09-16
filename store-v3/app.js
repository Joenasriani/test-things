const installCatalogueDivider = () => {
  const style = document.createElement('style');
  style.setAttribute('data-bookstore-divider', 'true');
  style.textContent = `
    .catalogue { position: relative; }
    .catalogue::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 6px;
      transform: translateX(-50%);
      background:
        linear-gradient(to right, var(--manipulation) 0 50%, transparent 50% 100%),
        linear-gradient(to bottom,
          var(--blue) 0 25%,
          var(--red) 25% 50%,
          var(--yellow) 50% 75%,
          var(--green) 75% 100%);
      z-index: 12;
      pointer-events: none;
    }

    @media (max-width: 760px) {
      .catalogue::before { display: none; }
      .book-entry--structure::after {
        content: '';
        position: absolute;
        top: -3px;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(to right,
          var(--manipulation) 0 25%,
          var(--blue) 25% 43.75%,
          var(--red) 43.75% 62.5%,
          var(--yellow) 62.5% 81.25%,
          var(--green) 81.25% 100%);
        z-index: 12;
        pointer-events: none;
      }
    }
  `;
  document.head.appendChild(style);
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

installCatalogueDivider();
installBookInteraction();

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
