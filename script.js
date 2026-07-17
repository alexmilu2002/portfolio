// ════════════════════════════════════════════════════════════
// SCROLL REVEAL — bidirectional fade + rise: flows in on enter,
// flows back out on exit, both ways as you scroll
// ════════════════════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .post-card').forEach(el => observer.observe(el));
