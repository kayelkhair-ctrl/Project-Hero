// A single source of truth for the brand mark — an abstract "portal/lens"
// evoking depth and immersion. currentColor lets it adapt to its context;
// the accent core and orbiting dot stay branded.
export const MARK = /* html */ `
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle class="mark__ring" cx="20" cy="20" r="17" stroke="currentColor" stroke-width="2.2"/>
    <circle class="mark__ring mark__ring--in" cx="20" cy="20" r="9.5" stroke="currentColor" stroke-width="2.2" opacity="0.45"/>
    <circle class="mark__core" cx="20" cy="20" r="3.4" fill="var(--accent)"/>
    <circle class="mark__orbit" cx="32.5" cy="11" r="2.4" fill="var(--accent)"/>
  </svg>`;

export function injectMarks() {
  document.querySelectorAll(".nav__mark, .footer__mark").forEach((el) => {
    if (!el.innerHTML.trim()) el.innerHTML = MARK;
  });
}
