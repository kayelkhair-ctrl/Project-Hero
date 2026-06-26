// Pre-build step: turn src/content/blog/*.md into static, SEO-friendly
// article pages at /insights/<slug>/index.html and emit a posts index used by
// the Insights listing page. Runs automatically before `dev` and `build`.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";
import { cityRoutes } from "./cities.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(root, "src", "content", "blog");
const outDir = join(root, "insights");
const dataFile = join(root, "src", "data", "posts.generated.json");

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function articleHTML(post) {
  const body = marked.parse(post.content);
  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${post.title} | The Project Hero</title>
    <meta name="description" content="${post.excerpt.replace(/"/g, "&quot;")}" />
    <link rel="canonical" href="https://theprojecthero.co.uk/insights/${post.slug}/" />
    <meta property="og:title" content="${post.title}" />
    <meta property="og:description" content="${post.excerpt.replace(/"/g, "&quot;")}" />
    <meta property="og:type" content="article" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <script type="module" src="/src/pages/article.ts"></script>
  </head>
  <body>
    <div class="cursor" id="cursor"><span class="cursor__label" id="cursorLabel"></span></div>
    <div class="grain" aria-hidden="true"></div>
    <div id="site-nav"></div>
    <main class="section wrap">
      <article class="article">
        <a href="/insights/" class="article__back" data-cursor="Back">← All insights</a>
        <div class="article__meta">
          <span>${fmtDate(post.date)}</span>
          <span>${post.tag}</span>
        </div>
        <h1>${post.title}</h1>
        <div class="article__body">${body}</div>
      </article>
    </main>
    <div id="site-footer"></div>
  </body>
</html>
`;
}

// Clean previous output so deleted posts don't linger.
if (existsSync(outDir)) {
  for (const entry of readdirSync(outDir, { withFileTypes: true })) {
    if (entry.isDirectory()) rmSync(join(outDir, entry.name), { recursive: true, force: true });
  }
}

const files = existsSync(blogDir)
  ? readdirSync(blogDir).filter((f) => f.endsWith(".md"))
  : [];

const posts = files.map((file) => {
  const raw = readFileSync(join(blogDir, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    tag: data.tag ?? "Note",
    excerpt: data.excerpt ?? "",
    content,
  };
});

posts.sort((a, b) => (a.date < b.date ? 1 : -1));

// Write each article page.
for (const post of posts) {
  const dir = join(outDir, post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), articleHTML(post));
}

// Write index data (without full content) for the listing page.
const index = posts.map(({ content, ...meta }) => ({ ...meta, dateLabel: fmtDate(meta.date) }));
mkdirSync(dirname(dataFile), { recursive: true });
writeFileSync(dataFile, JSON.stringify(index, null, 2));

// Sitemap: static routes + every generated article.
const SITE = "https://theprojecthero.co.uk";
const routes = [
  "/",
  "/services/",
  "/services/digital-transformation/",
  "/services/web-design-development/",
  "/services/web-application-development/",
  "/services/website-as-a-service/",
  "/services/seo-geo/",
  "/services/ai-applications-automation/",
  "/services/hosting-care-support/",
  "/work/",
  "/studio/",
  "/insights/",
  "/contact/",
  "/faq/",
];
const urls = [
  ...routes.map((r) => ({ loc: SITE + r })),
  ...cityRoutes.map((r) => ({ loc: SITE + r })),
  ...posts.map((p) => ({ loc: `${SITE}/insights/${p.slug}/`, lastmod: p.date })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`
  )
  .join("\n")}
</urlset>
`;
mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "sitemap.xml"), sitemap);

console.log(`[build-blog] generated ${posts.length} article page(s) + sitemap.`);
