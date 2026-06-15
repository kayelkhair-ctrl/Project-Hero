import { capabilities, projects } from "../data/site";

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

export function renderWork(targetId = "work-grid") {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = projects
    .map(
      (p) => `
      <a class="work-card" href="/work/#${p.slug}" data-cursor="View" aria-label="${p.title}">
        <div class="work-card__media">
          <img src="${placeholderArt(p.title, p.c1, p.c2)}" alt="${p.title} — ${p.tag}" loading="lazy" />
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
          <img src="${placeholderArt(p.title, p.c1, p.c2)}" alt="${p.title} — ${p.tag}" loading="lazy" />
        </div>
        <div class="work-panel__meta">
          <span class="work-panel__title">${p.title}</span>
          <span class="work-panel__tag">${p.tag} · ${p.year}</span>
        </div>
      </a>`
    )
    .join("");
}
