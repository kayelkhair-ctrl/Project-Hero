import { $$ } from "../lib/utils";

// Gentle fade-in as elements enter the viewport. Deliberately simple and
// robust: an element gets .is-revealed once it's in view and CSS handles the
// fade. IntersectionObserver does this efficiently where it can; a scroll
// listener backs it up so content is shown reliably and is never stuck hidden.
export function initReveals() {
  const els = $$("[data-reveal]");
  if (!els.length) return;

  const reveal = (el: Element) => el.classList.add("is-revealed");
  const inView = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };

  // Elements still waiting to be revealed (drives the scroll fallback).
  let pending = els.slice();
  const sweep = () => {
    pending = pending.filter((el) => {
      if (!inView(el)) return true;
      reveal(el);
      return false;
    });
    if (!pending.length) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => sweep();

  // Efficient path: reveal each element the moment it scrolls into view.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target);
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));
  }

  // Reveal whatever is already on screen, then watch scroll for the rest.
  sweep();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", sweep, { once: true });
}
