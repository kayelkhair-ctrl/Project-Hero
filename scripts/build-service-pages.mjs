// Pre-build step: generate a distinct, SEO-targeted service landing page at
// /services/<slug>/index.html for every entry in scripts/service-pages.mjs.
// Runs automatically before `dev` and `build` (see package.json). Each page
// shares the normal services JS entry (src/pages/services.ts) and site styles.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { servicePages } from "./service-pages.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://theprojecthero.co.uk";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function pageHTML(s) {
  const url = `${SITE}/services/${s.slug}/`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.schemaName,
    description: s.schemaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "The Project Hero",
      url: `${SITE}/`,
      telephone: "+441274505805",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bradford",
        addressRegion: "Yorkshire",
        addressCountry: "GB",
      },
    },
    areaServed: "GB",
    url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(s.title)}</title>
    <meta name="description" content="${esc(s.description)}" />
    <meta name="theme-color" content="#f3f1ec" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(s.name)} | The Project Hero" />
    <meta property="og:description" content="${esc(s.ogDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="en_GB" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <script type="application/ld+json">
${JSON.stringify(serviceSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
    </script>
    <script type="module" src="/src/pages/services.ts"></script>
  </head>
  <body>
    <div class="cursor" id="cursor"><span class="cursor__label" id="cursorLabel"></span></div>
    <div class="grain" aria-hidden="true"></div>
    <div id="site-nav"></div>

    <header class="page-header wrap">
      <span class="eyebrow" data-reveal="fade"><a href="/services/">Services</a> · ${esc(s.name)}</span>
      <h1 class="page-title" data-reveal="words">${esc(s.h1)}</h1>
      <p class="page-intro" data-reveal="fade">${esc(s.intro)}</p>
      <div class="hero__actions" data-reveal="fade" style="margin-top: 2rem">
        <a href="/contact/" class="btn" data-magnetic>Get a free digital audit →</a>
        <a href="/work/" class="btn btn--ghost" data-magnetic>See our work</a>
      </div>
      <ul class="hero__trust" data-reveal="fade">
        <li>Reply within one working day</li>
        <li>Senior team, nothing outsourced</li>
        <li>UK-based, no surprise bills</li>
      </ul>
    </header>

    <section class="section wrap">
      <div class="studio-grid">
        <div>
          <p class="lead" data-fill>${s.leadHtml}</p>
        </div>
        <div>
          ${s.body.map((p) => `<p class="muted" data-reveal="fade">${esc(p)}</p>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section wrap">
      <p class="eyebrow" data-reveal="fade">What's included</p>
      <div class="values">
        ${s.included
          .map(
            (v) => `<div class="value" data-reveal="fade">
          <h3>${esc(v.h3)}</h3>
          <p>${esc(v.p)}</p>
        </div>`
          )
          .join("\n        ")}
      </div>
    </section>

    <section class="section wrap">
      <div class="studio-grid">
        <div>
          <h2 data-reveal="words">${esc(s.sectionTwo.h2)}</h2>
        </div>
        <div>
          ${s.sectionTwo.body
            .map((p) => `<p class="muted" data-reveal="fade">${esc(p)}</p>`)
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 data-reveal="words">Common questions</h2>
        <a href="/faq/" class="eyebrow" data-reveal="fade">All FAQs →</a>
      </div>
      <div class="faqs">
        ${s.faqs
          .map(
            (f) => `<details class="faq" data-reveal="fade">
          <summary class="faq__q">${esc(f.q)}<span class="faq__icon" aria-hidden="true"></span></summary>
          <p class="faq__a">${esc(f.a)}</p>
        </details>`
          )
          .join("\n        ")}
      </div>
    </section>

    <section class="section wrap">
      <p class="eyebrow" data-reveal="fade">Related services</p>
      <p class="muted" data-reveal="fade" style="margin-top: 0.75rem">
        ${s.related
          .map((r) => `<a href="${r.href}" data-cursor="See">${esc(r.label)}</a>`)
          .join(" · ")}
      </p>
    </section>

    <section class="section wrap">
      <div class="cta">
        <p class="eyebrow" data-reveal="fade">${esc(s.name)} — let's talk.</p>
        <h2 class="cta__title" data-fill>Start with a free <em>digital audit</em>.</h2>
        <a href="/contact/" class="btn" data-magnetic>Get a free digital audit →</a>
        <ul class="cta__trust" data-reveal="fade">
          <li>Free, no-obligation audit</li>
          <li>Reply within one working day</li>
          <li>Talk to the people who do the work</li>
        </ul>
      </div>
    </section>

    <div id="site-footer"></div>
  </body>
</html>
`;
}

for (const s of servicePages) {
  const dir = join(root, "services", s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHTML(s));
}

console.log(
  `[build-service-pages] generated ${servicePages.length} service page(s): ${servicePages
    .map((s) => s.slug)
    .join(", ")}`
);
