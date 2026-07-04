# Alex Milu — Portfolio

A personal portfolio website with an editorial magazine aesthetic and a multi-layer parallax name animation on the landing page.

## Structure

```
alex-milu-portfolio/
├── index.html      # Markup
├── styles.css      # All styles
├── script.js       # All animations and interactivity
├── images/         # Project photos
│   ├── autoinsight-desktop.png
│   ├── autoinsight-mobile.png
│   ├── lv-holiday.png
│   ├── lv-product.png
│   ├── nightshift-prototype.png
│   ├── nightshift-arduino.png
│   └── nightshift-storyboard.png
└── README.md
```

## Running locally

The site is plain HTML/CSS/JS, so there is no build step. Two options:

**Option 1 — open the file directly**
Double-click `index.html`. This works, but browsers can be strict with local file paths.

**Option 2 — run a tiny local server (recommended)**
Open a terminal in the project folder and run one of these:

```bash
# Python 3 (already installed on most systems)
python3 -m http.server 8000

# or Node
npx serve
```

Then open `http://localhost:8000` in your browser.

## Deploying

Any static host will work:

- **Netlify** — drag the folder onto app.netlify.com
- **Vercel** — `vercel` in the project folder, or import from GitHub
- **GitHub Pages** — push to a repo, then Settings → Pages → deploy from main branch
- **Cloudflare Pages** — connect your GitHub repo

## Creating a GitHub repo

```bash
cd alex-milu-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/alex-milu-portfolio.git
git push -u origin main
```

## Editing content

- **Text** — all copy lives in `index.html`. Search for `Plate I`, `Plate II`, `Plate III` to find each project block.
- **Images** — drop new photos into the `images/` folder and update the `src=""` in the corresponding `<img>` tag.
- **Colours & fonts** — the CSS variables at the top of `styles.css` (under `:root`) control the palette (paper, ink, accent) and font families.
- **Animations** — everything animation-related is in `script.js`, organised into commented sections (hero parallax, letter splitter, word splitter, magnetic hover, scroll reveal).

## Fonts

Loaded from Google Fonts via CDN — no local files required. The site uses Fraunces (display), EB Garamond (body), and DM Mono (labels).

---

© Alex Milu, MMXXV
