# Nadia Harrak — Journal

A personal blog/journal site with a warm editorial look — a sibling to the portfolio aesthetic, reworked with a plum/berry palette and a calmer, magazine-style layout.

## Structure

```
nadiaharrak/
├── index.html      # Landing page: hero, about, latest posts, contact
├── blog.html        # Full archive of all posts
├── post-1.html      # Sample post
├── post-2.html      # Sample post
├── post-3.html      # Sample post
├── styles.css       # All styles
├── script.js        # Animations and interactivity
├── images/          # Drop post/author photos here
└── README.md
```

Post cover images are CSS gradient tiles (no image files needed) so new posts work immediately — swap in real photos later by adding an `<img>` inside `.post-cover` / `.post-cover-banner`.

## Running locally

Plain HTML/CSS/JS, no build step.

```bash
python3 -m http.server 8000
# or
npx serve
```

Then open `http://localhost:8000`.

## Adding a new post

1. Duplicate `post-1.html` and rename it (e.g. `post-4.html`).
2. Update the `<title>`, meta description, `post-meta` (tag/date/read time), heading, and body copy.
3. Add a matching card to the `post-grid` in `blog.html`, and optionally to the "Latest" grid in `index.html`.
4. Update the `post-nav` prev/next links on the posts you're connecting to the new one.

## Editing content

- **Text** — copy lives directly in each `.html` file.
- **Colours & fonts** — CSS variables at the top of `styles.css` (under `:root`).
- **Animations** — all in `script.js` (hero letter entrance, scroll reveal, word splitter, magnetic hover).
- **Contact links** — placeholder email/social links live in the `#contact` section of `index.html`; replace with real ones.

## Deploying

- **GitHub Pages** — push to a repo, then Settings → Pages → deploy from main branch.
- **Netlify / Vercel / Cloudflare Pages** — connect the repo or drag the folder in.

## Fonts

Fraunces (display), EB Garamond (body), DM Mono (labels) — loaded from Google Fonts, no local files required.

---

© Nadia Harrak
