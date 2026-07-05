// ════════════════════════════════════════════════════════════
// LETTER SPLIT for hero main name (layer 3)
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.hero-name-layer[data-layer="3"] [data-letters]').forEach((el, wordIdx) => {
  const text = el.textContent;
  el.textContent = '';
  // Word delays: Alex starts 1.6s (after curtain), Milu 2.0s
  const wordStart = 1.6 + wordIdx * 0.4;
  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'hero-letter';
    span.textContent = ch;
    span.style.setProperty('--d', (wordStart + i * 0.07) + 's');
    el.appendChild(span);
  });
});

// ════════════════════════════════════════════════════════════
// HERO PARALLAX — with dramatic entrance (depth layers expand outward)
// ════════════════════════════════════════════════════════════
const LAYERS = [
  // baseScale = final, entranceMul = scale-multiplier at start (then animates → 1)
  { scroll: 0.78, mx: 0.050, my: 0.030, baseScale: 1.85, entranceMul: 0.45, delay: 1500, dur: 1600 },
  { scroll: 0.52, mx: 0.032, my: 0.019, baseScale: 1.45, entranceMul: 0.55, delay: 1400, dur: 1500 },
  { scroll: 0.30, mx: 0.016, my: 0.010, baseScale: 1.18, entranceMul: 0.7,  delay: 1300, dur: 1400 },
  { scroll: 0.10, mx: 0.005, my: 0.003, baseScale: 1.00, entranceMul: 1.0,  delay: 0,    dur: 1   },
  { scroll:-0.12, mx:-0.010, my:-0.006, baseScale: 0.92, entranceMul: 1.7,  delay: 1700, dur: 1500 },
];

const layerEls    = Array.from(document.querySelectorAll('.hero-name-layer'));
const heroNameStage = document.getElementById('heroNameStage');
const siteHeader  = document.getElementById('siteHeader');
const scrollProgress = document.getElementById('scrollProgress');

let tmx = 0, tmy = 0, smx = 0, smy = 0;
const EASE = 0.07;
const startedAt = performance.now();

window.addEventListener('mousemove', e => {
  tmx = e.clientX - window.innerWidth  / 2;
  tmy = e.clientY - window.innerHeight / 2;
}, { passive: true });

function easeOutCubic(t){return 1 - Math.pow(1 - t, 3)}
function lerp(a,b,t){return a+(b-a)*t}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}

const projectImages = Array.from(document.querySelectorAll('.project-image-inner'));

function frame(now) {
  smx += (tmx - smx) * EASE;
  smy += (tmy - smy) * EASE;

  const sy = window.scrollY;
  const vh = window.innerHeight;
  const dh = document.documentElement.scrollHeight - vh;

  // Reading progress
  scrollProgress.style.width = Math.min(100, (sy / dh) * 100) + '%';

  // Hero opacity fade on scroll
  const heroFade = Math.max(0, 1 - sy / (vh * 0.75));
  heroNameStage.style.opacity = heroFade;

  siteHeader.classList.toggle('is-visible', sy > 60);

  // Hero parallax + entrance for each layer
  layerEls.forEach((el, i) => {
    const cfg = LAYERS[i];
    const elapsed = now - startedAt - cfg.delay;
    const ep = clamp(elapsed / cfg.dur, 0, 1);
    const eased = easeOutCubic(ep);

    // Entrance scale: starts at baseScale * entranceMul, ends at baseScale
    const startS = cfg.baseScale * cfg.entranceMul;
    const scale  = lerp(startS, cfg.baseScale, eased);

    const ty = -sy * cfg.scroll + smy * cfg.my;
    const tx = smx * cfg.mx;

    el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    // Opacity for non-sharp layers fades in with entrance
    if (i !== 3) el.style.opacity = eased * (i === 4 ? 0.55 : 1);
  });

  // Image-in-frame parallax
  projectImages.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const center = rect.top + rect.height / 2 - vh / 2;
    const speed = parseFloat(img.dataset.parallaxSpeed) || 0.08;
    img.style.transform = `translateY(${-center * speed}px)`;
  });

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

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
// MAGNETIC HOVER on all internal links (subtle)
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.project-link, .contact-column a, .site-nav a').forEach(el => {
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

document.querySelectorAll('.reveal, .split-words, .pull-quote, .section-divider').forEach(el => observer.observe(el));
