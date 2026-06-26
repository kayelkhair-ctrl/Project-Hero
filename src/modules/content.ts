import {
  capabilities,
  projects,
  processSteps,
  packages,
  testimonials,
  clients,
  resultStats,
  homeFaqs,
} from "../data/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Builds an inline SVG gradient placeholder so we have polished "work"
// imagery before real case-study assets exist.
function placeholderArt(title: string, c1: string, c2: string): string {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='${c1}'/>
          <stop offset='1' stop-color='${c2}'/>
        </linearGradient>
        <radialGradient id='r' cx='0.3' cy='0.3' r='0.8'>
          <stop offset='0' stop-color='rgba(255,255,255,0.35)'/>
          <stop offset='1' stop-color='rgba(255,255,255,0)'/>
        </radialGradient>
      </defs>
      <rect width='800' height='600' fill='url(#g)'/>
      <rect width='800' height='600' fill='url(#r)'/>
      <circle cx='580' cy='180' r='130' fill='rgba(255,255,255,0.12)'/>
      <text x='48' y='540' font-family='Space Grotesk, sans-serif' font-size='52' font-weight='600' fill='rgba(255,255,255,0.92)'>${title}</text>
    </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function renderCapabilities() {
  const list = document.getElementById("caps-list");
  if (!list) return;
  list.innerHTML = capabilities
    .map(
      (c, i) => `
      <li class="cap${i === 0 ? " is-active" : ""}" data-key="${c.key}" data-index="${i}" data-desc="${c.desc}">
        <button class="cap__btn" type="button" data-cursor="">
          <span class="cap__num">${c.num}</span>
          <span class="cap__name">${c.name}</span>
        </button>
      </li>`
    )
    .join("");

  // Seed the readout with the first capability's description.
  const readout = document.getElementById("caps-readout");
  if (readout) readout.textContent = capabilities[0]?.desc ?? "";
}

// Hides a section's nearest <section> wrapper when there's nothing to show,
// so empty proof never leaves an awkward gap.
function hideSection(mountId: string) {
  document.getElementById(mountId)?.closest("section")?.remove();
}

export function renderProcess(mountId = "process-list") {
  const el = document.getElementById(mountId);
  if (!el) return;
  el.innerHTML = processSteps
    .map(
      (s, i) => `
      <li class="step" data-reveal="fade" style="--i:${i}">
        <span class="step__num">${esc(s.num)}</span>
        <h3 class="step__name">${esc(s.name)}</h3>
        <p class="step__desc">${esc(s.desc)}</p>
      </li>`
    )
    .join("");
}

export function renderPackages(mountId = "packages-grid") {
  const el = document.getElementById(mountId);
  if (!el) return;
  if (!packages.length) return hideSection(mountId);
  el.innerHTML = packages
    .map(
      (p) => `
      <article class="pkg${p.featured ? " pkg--featured" : ""}" data-reveal="fade">
        ${p.featured ? '<span class="pkg__badge">Most popular</span>' : ""}
        <h3 class="pkg__name">${esc(p.name)}</h3>
        <p class="pkg__price">${
          p.price
            ? `${p.cadence === "from" ? '<span class="pkg__from">from</span> ' : ""}${esc(p.price)}${
                p.cadence && p.cadence !== "from" ? `<span class="pkg__cadence">${esc(p.cadence)}</span>` : ""
              }`
            : '<span class="pkg__onrequest">On request</span>'
        }</p>
        <p class="pkg__summary">${esc(p.summary)}</p>
        <ul class="pkg__list">
          ${p.includes.map((i) => `<li>${esc(i)}</li>`).join("")}
        </ul>
        <a href="/contact/" class="btn ${p.featured ? "" : "btn--ghost"} pkg__cta" data-magnetic>${esc(
          p.cta || "Get a quote"
        )} →</a>
      </article>`
    )
    .join("");
}

export function renderResultStats(mountId = "results-grid") {
  const el = document.getElementById(mountId);
  if (!el) return;
  if (!resultStats.length) return hideSection(mountId);
  el.innerHTML = resultStats
    .map(
      (s) => `
      <div class="result" data-reveal="fade">
        <span class="result__value">${esc(s.value)}</span>
        <span class="result__label">${esc(s.label)}</span>
      </div>`
    )
    .join("");
}

export function renderTestimonials(mountId = "testimonials-grid") {
  const el = document.getElementById(mountId);
  if (!el) return;
  if (!testimonials.length) return hideSection(mountId);
  el.innerHTML = testimonials
    .map(
      (t) => `
      <figure class="quote" data-reveal="fade">
        <blockquote class="quote__text">${esc(t.quote)}</blockquote>
        <figcaption class="quote__by">
          <span class="quote__name">${esc(t.name)}</span>
          <span class="quote__role">${esc(t.role)}</span>
        </figcaption>
      </figure>`
    )
    .join("");
}

export function renderClients(mountId = "clients-row") {
  const el = document.getElementById(mountId);
  if (!el) return;
  if (!clients.length) return hideSection(mountId);
  el.innerHTML = clients
    .map((c) =>
      c.logo
        ? `<img class="client__logo" src="${esc(c.logo)}" alt="${esc(c.name)}" loading="lazy" />`
        : `<span class="client__name">${esc(c.name)}</span>`
    )
    .join("");
}

export function renderHomeFaqs(mountId = "faq-list") {
  const el = document.getElementById(mountId);
  if (!el) return;
  el.innerHTML = homeFaqs
    .map(
      (f) => `
      <details class="faq" data-reveal="fade">
        <summary class="faq__q">${esc(f.q)}<span class="faq__icon" aria-hidden="true"></span></summary>
        <p class="faq__a">${esc(f.a)}</p>
      </details>`
    )
    .join("");
}

export function renderWork(targetId = "work-grid") {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (p) => `
      <a class="work-card" href="/work/#${p.slug}" data-cursor="View" aria-label="${p.title}">
        <div class="work-card__media">
          <img src="${placeholderArt(p.title, p.c1, p.c2)}" alt="${p.title}, ${p.tag}" loading="lazy" />
        </div>
        <div class="work-card__meta">
          <span class="work-card__title">${p.title}</span>
          <span class="work-card__tag">${p.tag} · ${p.year}</span>
        </div>
      </a>`
    )
    .join("");
}

// Wide panels for the home horizontal gallery.
export function renderWorkPanels(targetId = "work-h-track") {
  const track = document.getElementById(targetId);
  if (!track) return;
  track.innerHTML = projects
    .map(
      (p, i) => `
      <a class="work-panel" href="/work/#${p.slug}" data-cursor="View" aria-label="${p.title}">
        <span class="work-panel__index">0${i + 1}</span>
        <div class="work-panel__media">
          <img src="${placeholderArt(p.title, p.c1, p.c2)}" alt="${p.title}, ${p.tag}" loading="lazy" />
        </div>
        <div class="work-panel__meta">
          <span class="work-panel__title">${p.title}</span>
          <span class="work-panel__tag">${p.tag} · ${p.year}</span>
        </div>
      </a>`
    )
    .join("");
}
