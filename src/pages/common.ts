import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/sections.css";
import "../styles/pages.css";

import { initNavState } from "../modules/navState";
import { initReveals } from "../modules/reveals";
import { initMenu } from "../modules/menu";
import { initScrollProgress } from "../modules/scrollProgress";
import { injectMarks } from "../modules/brand";

// Mark the document as JS-capable as early as the module runs (see main.ts).
document.documentElement.classList.add("js");

// Shared interaction layer for every page except the home hero experience.
export function initCommon() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  injectMarks();

  initNavState();
  initMenu();
  initScrollProgress();
  initReveals();
}
