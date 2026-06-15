import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";

import { initSmoothScroll } from "./modules/smoothScroll";
import { initCursor } from "./modules/cursor";
import { runPreloader } from "./modules/preloader";
import { initReveals } from "./modules/reveals";
import { initMagnetic } from "./modules/magnetic";
import { initMarquee } from "./modules/marquee";
import { initMenu } from "./modules/menu";
import { renderServices, renderWork } from "./modules/content";
import { initHero } from "./gl/hero";

function boot() {
  // Current year in footer.
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Inject dynamic content first so reveals can measure it.
  renderServices();
  renderWork();

  // Interaction layer.
  initSmoothScroll();
  initCursor();
  initMagnetic();
  initMarquee();
  initMenu();

  // WebGL hero (only present on the home page).
  const hero = initHero();

  // Scroll reveals.
  initReveals();

  // Preloader, then reveal the hero distortion.
  runPreloader().then(() => {
    hero?.reveal();
    document.body.classList.add("is-ready");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
