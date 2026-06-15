import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/pages.css";

import { initSmoothScroll } from "../modules/smoothScroll";
import { initCursor } from "../modules/cursor";
import { initReveals } from "../modules/reveals";
import { initMagnetic } from "../modules/magnetic";
import { initMenu } from "../modules/menu";
import { initPageTransition } from "../modules/pageTransition";
import { initScrollText } from "../modules/scrollText";
import { initScrollProgress } from "../modules/scrollProgress";
import { injectMarks } from "../modules/brand";

// Shared interaction layer for every page except the home hero experience.
export function initCommon() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  injectMarks();

  initSmoothScroll();
  initCursor();
  initMagnetic();
  initMenu();
  initPageTransition();
  initScrollProgress();
  initReveals();
  initScrollText();

  // Quick page-in fade (no heavy preloader on inner pages).
  requestAnimationFrame(() => document.body.classList.add("is-ready"));
}
