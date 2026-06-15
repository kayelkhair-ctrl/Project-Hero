import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/pages.css";

import { initSmoothScroll } from "../modules/smoothScroll";
import { initCursor } from "../modules/cursor";
import { initReveals } from "../modules/reveals";
import { initMagnetic } from "../modules/magnetic";

// Shared interaction layer for every page except the home hero experience.
export function initCommon() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initSmoothScroll();
  initCursor();
  initMagnetic();
  initReveals();

  // Quick page-in fade (no heavy preloader on inner pages).
  requestAnimationFrame(() => document.body.classList.add("is-ready"));
}
