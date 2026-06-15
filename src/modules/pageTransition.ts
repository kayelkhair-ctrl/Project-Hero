import { gsap } from "gsap";

// Curtain page transitions for a multi-page site: clicking an internal link
// wipes a panel up to cover the screen, then navigates; the destination page
// wipes it away on load. The overlay lives on <html> so it's unaffected by the
// inner-page body fade.
const NAV_FLAG = "ph_nav";

export function initPageTransition() {
  const overlay = document.createElement("div");
  overlay.className = "page-curtain";
  document.documentElement.appendChild(overlay);

  const cameFromNav = sessionStorage.getItem(NAV_FLAG) === "1";
  if (cameFromNav) {
    // Start covered, then reveal.
    gsap.set(overlay, { transformOrigin: "bottom", scaleY: 1 });
    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.7,
      ease: "power4.inOut",
      onComplete: () => sessionStorage.removeItem(NAV_FLAG),
    });
  } else {
    gsap.set(overlay, { scaleY: 0 });
  }

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || link.target === "_blank" || link.hasAttribute("download")) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return; // external
    if (url.pathname === location.pathname) return; // same page (hash / scroll)

    e.preventDefault();
    sessionStorage.setItem(NAV_FLAG, "1");
    gsap.set(overlay, { transformOrigin: "bottom", scaleY: 0 });
    gsap.to(overlay, {
      scaleY: 1,
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = url.href;
      },
    });
  });
}
