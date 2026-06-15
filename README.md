# The Project Hero — Website

An immersive, 3D creative-studio website. Built with **Vite + TypeScript +
Three.js + GSAP + Lenis**. Light/minimal aesthetic, WebGL hero, smooth scroll,
scroll-triggered animation, custom cursor, and a markdown-driven blog.

## Quick start

```bash
npm install      # one time
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html              Home (the immersive experience)
work/ studio/            Static pages
contact/ insights/       (insights = blog index)
404.html                 Not-found page
src/
  main.ts                Home entry (hero + sections)
  pages/                 Entry script per inner page
  modules/               cursor, smoothScroll, preloader, reveals,
                         magnetic, marquee, content, partials
  gl/hero.ts             Three.js WebGL hero + displacement shader
  styles/                tokens.css, base.css, sections.css, pages.css
  data/site.ts           Services + projects content (edit copy here)
  content/blog/*.md      Blog posts (see below)
scripts/build-blog.mjs   Markdown -> static article pages + sitemap
public/                  favicon, robots.txt, _redirects, (generated) sitemap
```

## Adding a blog post

Create a markdown file in `src/content/blog/` with front-matter:

```markdown
---
title: My post title
date: 2026-06-15
tag: Perspective
excerpt: One-line summary shown in the listing and meta description.
---

Write the post body in **markdown** here.
```

The slug comes from the filename (`my-post.md` -> `/insights/my-post/`).
Article pages and the sitemap regenerate automatically on `npm run dev` /
`npm run build`. No other steps.

## Editing content

- **Services / capabilities** and **project list**: `src/data/site.ts`
- **Home copy**: `index.html`
- **Contact details / footer**: `src/modules/partials.ts` (inner pages) and
  `index.html` (home footer)
- **Colours / fonts / spacing**: `src/styles/tokens.css`

## Deployment (GitHub → Cloudflare Pages)

Source lives on GitHub; **Cloudflare Pages** auto-builds and hosts on every push.

Cloudflare Pages build settings:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Build output dir  | `dist`          |
| Node version      | 18+ (default ok)|

A push to the main branch triggers a production deploy; other branches get
preview URLs.

## Notes / TODO

- Replace gradient placeholder project art with real case-study imagery.
- Wire the contact form to a real endpoint (Formspree or a Cloudflare Pages
  Function); it currently opens the visitor's mail client via `mailto:`.
- Self-host the fonts (currently Google Fonts) for zero external requests.
- Add real `og:image` social-share images.
