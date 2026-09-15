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
