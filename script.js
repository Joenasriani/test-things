const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

document.querySelector('[data-scroll-buy]')?.addEventListener('click', () => {
  document.querySelector('#buy')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
