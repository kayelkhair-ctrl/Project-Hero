// Adds .is-scrolled to the nav once the page moves, switching it from
// transparent-over-hero to a frosted, always-readable bar.
export function initNavState() {
  const nav = document.querySelector<HTMLElement>(".nav");
  if (!nav) return;

  // Sticky mobile CTA (home only) appears once the hero is scrolled past.
  const ctaBar = document.querySelector<HTMLElement>(".cta-bar");

  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 36);
    ctaBar?.classList.toggle("is-visible", y > window.innerHeight * 0.7);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}
