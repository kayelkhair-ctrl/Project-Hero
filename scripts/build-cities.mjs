// Pre-build step: generate a distinct, SEO-friendly location landing page at
// /<slug>/index.html for every city in scripts/cities.mjs. Runs automatically
// before `dev` and `build` (see package.json). Each page shares one JS entry
// (src/pages/city.ts) and the site's normal styles.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cities } from "./cities.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://theprojecthero.co.uk";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
// "a, b and c"
const list = (arr) =>
  arr.length <= 1
    ? arr[0] || ""
    : `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;

function cityHTML(c) {
  const isArea = c.kind === "area";
  const region = isArea ? "Bradford" : c.region;
  const nearbyList = list(c.nearby);
  const title = isArea
    ? `Web Design & SEO ${c.name}, Bradford | The Project Hero`
    : `Web Design & SEO ${c.name} | Digital Agency | The Project Hero`;
  const desc = isArea
    ? `Web design, SEO and AI for businesses in ${c.name}, Bradford. A senior, end-to-end digital agency right on your doorstep. Get a free audit.`
    : `A digital agency working with ${c.name} businesses: web design, web development, SEO and GEO visibility, and AI tools. Senior team, end to end. Get a free audit.`;
  const url = `${SITE}/${c.slug}/`;

  const leadBody = isArea
    ? `working with businesses in ${c.name} and across Bradford`
    : `working with ambitious businesses across ${region}`;
  const homeBase = isArea
    ? `${c.name} is right on our doorstep. We're a Bradford-based digital agency working with businesses across ${c.name} and nearby ${nearbyList}, and right across the city. Day to day we work remotely, and we're only a short drive away when it helps to meet in person.`
    : `We're based in Bradford, ${c.travel}, and we work with businesses right across ${c.name} and ${region}, ${c.intro} out to ${nearbyList}. Day to day we work remotely, and we come to you in ${c.name} when a project calls for it.`;

  const faqs = [
    {
      q: isArea ? `Do you cover ${c.name}?` : `Do you have an office in ${c.name}?`,
      a: isArea
        ? `Yes. We're a Bradford-based digital agency, so ${c.name} is right on our doorstep. We work with businesses across ${c.name} and the rest of Bradford, and you work directly with senior people, not a sales layer.`
        : `We're a Yorkshire-based digital agency working with businesses across ${c.name} and ${region}. We work remotely day to day and come to you in ${c.name} when it helps. Either way you work directly with senior people, not a sales layer.`,
    },
    {
      q: `How much does web design in ${c.name} cost?`,
      a: `It depends on scope, but our managed model is built to be affordable and predictable: senior work without a traditional agency price tag. The best next step is a free audit so we can quote accurately.`,
    },
    {
      q: `Can you do SEO for a ${c.name} business?`,
      a: `Yes. We build research-led SEO and GEO (Generative Engine Optimisation) systems that rank on Google and get cited in AI answers from ChatGPT, Gemini and Perplexity, built to compound over time.`,
    },
    {
      q: `What services do you offer ${c.name} businesses?`,
      a: `Web design and development, web applications, SEO and GEO visibility, AI apps and automation, digital transformation, and fully managed Website as a Service plans. One team, end to end.`,
    },
  ];

  const proSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "The Project Hero",
    description: `A ${isArea ? "Bradford" : "UK"} digital agency working with ${c.name} businesses on web design, web development, SEO and GEO visibility, AI applications and digital transformation.`,
    url,
    email: "info@theprojecthero.co.uk",
    telephone: "+441274505805",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Euroway House, Roydsdale Way",
      addressLocality: "Bradford",
      postalCode: "BD4 6SE",
      addressCountry: "GB",
    },
    areaServed: isArea
      ? [
          { "@type": "Place", name: `${c.name}, Bradford` },
          { "@type": "City", name: "Bradford" },
          { "@type": "AdministrativeArea", name: "West Yorkshire" },
          { "@type": "Country", name: "United Kingdom" },
        ]
      : [
          { "@type": "City", name: c.name },
          { "@type": "AdministrativeArea", name: c.region },
          { "@type": "Country", name: "United Kingdom" },
        ],
    knowsAbout: [
      `Web Design ${c.name}`,
      `Web Development ${c.name}`,
      `SEO ${c.name}`,
      "Generative Engine Optimisation",
      "AI Applications",
      "Digital Transformation",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const services = [
    ["Web Design " + c.name, `Fast, conversion-focused websites designed and built in-house for ${c.name} businesses, then looked after long after launch.`, "/services/web-design-development/"],
    ["Web Development " + c.name, "Bespoke web applications and digital products: internal tools, client portals and customer-facing platforms.", "/services/web-application-development/"],
    ["SEO & GEO " + c.name, "Rank on Google and get cited in AI answers. Research-led SEO and Generative Engine Optimisation built to compound.", "/services/seo-geo/"],
    ["AI Apps & Automation", `Custom AI assistants, automations and content systems built around how your ${c.name} business actually runs.`, "/services/ai-applications-automation/"],
    ["Digital Transformation", "End-to-end programmes that modernise how your business operates online: strategy, systems, process and technology.", "/services/digital-transformation/"],
    ["Website as a Service", "Design, build, hosting, security and ongoing care in one predictable monthly plan. Your website, always looked after.", "/services/website-as-a-service/"],
  ];

  const steps = [
    ["01", "Discovery call", "A free, no-pressure chat about your business, your goals and where the gaps are. You leave with clear next steps either way."],
    ["02", "Audit &amp; proposal", "We review what you have, map what you need, and send a clear plan with scope and pricing. No jargon, no surprises."],
    ["03", "Design &amp; build", "We design, build and ship: working directly with you, with senior people, and showing progress as we go."],
    ["04", "Grow &amp; look after", "We don't disappear at launch. We maintain, measure and improve so your investment keeps working."],
  ];

  return `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="theme-color" content="#f3f1ec" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="Web Design &amp; SEO ${esc(c.name)} | The Project Hero" />
    <meta property="og:description" content="Web design, web development, SEO/GEO and AI tools for ${esc(c.name)} businesses. A senior, end-to-end digital agency serving ${esc(region)}." />
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
${JSON.stringify(proSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
    </script>
    <script type="module" src="/src/pages/city.ts"></script>
  </head>
  <body>
    <div class="cursor" id="cursor"><span class="cursor__label" id="cursorLabel"></span></div>
    <div class="grain" aria-hidden="true"></div>
    <div id="site-nav"></div>

    <header class="page-header wrap">
      <span class="eyebrow" data-reveal="fade">Digital agency · ${esc(c.name)}</span>
      <h1 class="page-title" data-reveal="words">Web design, SEO and AI for ${esc(c.name)} businesses.</h1>
      <p class="page-intro" data-reveal="fade">
        We help ${esc(c.name)} businesses win online: fast, conversion-focused
        websites, SEO and GEO visibility, web applications and AI tools. One
        senior team, end to end, nothing outsourced.
      </p>
      <div class="hero__actions" data-reveal="fade" style="margin-top: 2rem">
        <a href="/contact/" class="btn" data-magnetic>Get a free digital audit →</a>
        <a href="/work/" class="btn btn--ghost" data-magnetic>See our work</a>
      </div>
      <ul class="hero__trust" data-reveal="fade">
        <li>Reply within one working day</li>
        <li>Senior team, nothing outsourced</li>
        <li>Remote-first, on-site in ${esc(c.name)} when it helps</li>
      </ul>
    </header>

    <section class="section wrap">
      <div class="studio-grid">
        <div>
          <p class="lead" data-fill>
            A ${isArea ? "Bradford " : ""}digital agency built around <em>outcomes</em>, ${esc(leadBody)}.
          </p>
        </div>
        <div>
          <p class="muted" data-reveal="fade">${esc(homeBase)}</p>
          <p class="muted" data-reveal="fade">
            What you get is senior people doing the actual work: strategy, design,
            engineering, SEO and AI under one roof. No hand-offs to faceless
            sub-contractors, no disappearing after launch, no surprise bills.
          </p>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 data-reveal="words">What we do for ${esc(c.name)} businesses</h2>
        <a href="/services/" class="eyebrow" data-reveal="fade">All services →</a>
      </div>
      <div class="values">
        ${services
          .map(
            ([name, body, href]) => `<div class="value" data-reveal="fade">
          <h3>${esc(name)}</h3>
          <p>${body}</p>
          <a href="${href}" class="eyebrow" style="margin-top:0.9rem;display:inline-block;">Learn more →</a>
        </div>`
          )
          .join("\n        ")}
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 data-reveal="words">How working with us works</h2>
        <p class="eyebrow" data-reveal="fade">Simple, no surprises</p>
      </div>
      <ol class="steps">
        ${steps
          .map(
            ([num, name, body]) => `<li class="step" data-reveal="fade">
          <span class="step__num">${num}</span>
          <h3 class="step__name">${name}</h3>
          <p class="step__desc">${body}</p>
        </li>`
          )
          .join("\n        ")}
      </ol>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 data-reveal="words">Why ${esc(c.name)} businesses choose us</h2>
        <p class="eyebrow" data-reveal="fade">The difference</p>
      </div>
      <div class="values">
        <div class="value" data-reveal="fade">
          <h3>One team, end to end</h3>
          <p>Strategy, design, engineering, SEO and AI, all in-house. No hand-offs to sub-contractors, no surprises after launch.</p>
        </div>
        <div class="value" data-reveal="fade">
          <h3>Leaner than an agency</h3>
          <p>Senior-level thinking without the agency price tag or the six-week kick-off. We move fast and we know what we're doing.</p>
        </div>
        <div class="value" data-reveal="fade">
          <h3>Built to compound</h3>
          <p>Websites maintained, SEO compounding, AI tools evolving. Your investment keeps working long after go-live.</p>
        </div>
      </div>
    </section>

    <section class="section wrap">
      <div class="section-head">
        <h2 data-reveal="words">${esc(c.name)} FAQs</h2>
        <a href="/faq/" class="eyebrow" data-reveal="fade">All FAQs →</a>
      </div>
      <div class="faqs">
        ${faqs
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
      <div class="cta">
        <p class="eyebrow" data-reveal="fade">Ready to move ahead?</p>
        <h2 class="cta__title" data-fill>
          Let's grow your ${esc(c.name)} business <em>online</em>.
        </h2>
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

for (const c of cities) {
  const dir = join(root, c.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), cityHTML(c));
}

console.log(`[build-cities] generated ${cities.length} location page(s): ${cities.map((c) => c.slug).join(", ")}`);
