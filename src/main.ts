import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";

import { initSmoothScroll } from "./modules/smoothScroll";
import { initNavState } from "./modules/navState";
import { runPreloader } from "./modules/preloader";
import { initReveals } from "./modules/reveals";
import { initMagnetic } from "./modules/magnetic";
import { initMarquee } from "./modules/marquee";
import { initMenu } from "./modules/menu";
import {
  renderCapabilities,
  renderProcess,
  renderPackages,
  renderResultStats,
  renderTestimonials,
  renderClients,
  renderHomeFaqs,
} from "./modules/content";
import { initCapabilitiesShowcase } from "./modules/capabilitiesShowcase";
import { initPageTransition } from "./modules/pageTransition";
import { initScrollText } from "./modules/scrollText";
import { initScrollProgress } from "./modules/scrollProgress";
import { injectMarks } from "./modules/brand";
import { initHero } from "./gl/hero";

// Mark the document as JS-capable as early as the module runs. CSS uses this
// to scope reveal-hiding (so content is never stuck invisible without JS).
document.documentElement.classList.add("js");

function boot() {
  // Current year in footer.
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  injectMarks();

  // Inject dynamic content first so reveals can measure it.
  renderCapabilities();
  renderProcess();
  renderResultStats();
  renderClients();
  renderTestimonials();
  renderPackages();
  renderHomeFaqs();

  // Interaction layer.
  initSmoothScroll();
  initNavState();
  initMagnetic();
  initMarquee();
  initMenu();
  initCapabilitiesShowcase();
  initPageTransition();
  initScrollProgress();

  // WebGL hero (only present on the home page).
  const hero = initHero();

  // Scroll reveals + scroll-fill text.
  initReveals();
  initScrollText();

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
