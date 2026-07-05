// ════════════════════════════════════════════════════════════
// WORD-BY-WORD SPLITTER (preserves <em>, <strong>, <br>)
// ════════════════════════════════════════════════════════════
function splitNode(node) {
  const out = document.createDocumentFragment();
  node.childNodes.forEach(child => {
    if (child.nodeType === 3) {
      const parts = child.textContent.split(/(\s+)/);
      parts.forEach(p => {
        if (!p) return;
        if (/^\s+$/.test(p)) {
          out.appendChild(document.createTextNode(p));
        } else {
          const s = document.createElement('span');
          s.className = 'reveal-word';
          s.textContent = p;
          out.appendChild(s);
        }
      });
    } else if (child.nodeType === 1) {
      if (child.tagName === 'BR') {
        out.appendChild(child.cloneNode());
      } else {
        const c = child.cloneNode(false);
        c.appendChild(splitNode(child));
        out.appendChild(c);
      }
    }
  });
  return out;
}
document.querySelectorAll('.split-words').forEach(el => {
  const frag = splitNode(el);
  el.innerHTML = '';
  el.appendChild(frag);
  el.querySelectorAll('.reveal-word').forEach((w, i) => {
    w.style.transitionDelay = `${i * 0.08}s`;
  });
});

// ════════════════════════════════════════════════════════════
// MAGNETIC HOVER on internal links
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.project-link, .case-back, .site-nav a').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

// ════════════════════════════════════════════════════════════
// SCROLL REVEAL — bidirectional (rewinds on scroll up)
// ════════════════════════════════════════════════════════════
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      entry.target.querySelectorAll?.('.split-words').forEach(w => w.classList.add('is-visible'));
    } else {
      entry.target.classList.remove('is-visible');
      entry.target.querySelectorAll?.('.split-words').forEach(w => w.classList.remove('is-visible'));
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .split-words').forEach(el => observer.observe(el));
