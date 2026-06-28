import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";

import { initNavState } from "./modules/navState";
import { initReveals } from "./modules/reveals";
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
  initNavState();
  initMenu();
  initCapabilitiesShowcase();
  initScrollProgress();

  // WebGL hero (only present on the home page).
  const hero = initHero();

  // Gentle scroll reveals.
  initReveals();

  // No intro screen to wait on — reveal the hero straight away.
  hero?.reveal();
  document.body.classList.add("is-ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
