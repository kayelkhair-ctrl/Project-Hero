import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/utils";

// Counts 0 → 100 then curtains up to reveal the page.
// Returns a promise that resolves when the reveal finishes so the
// hero intro can chain off it.
export function runPreloader(): Promise<void> {
  const el = document.getElementById("preloader");
  const count = document.getElementById("preloaderCount");

  return new Promise((resolve) => {
    if (!el || !count) {
      resolve();
      return;
    }

    if (prefersReducedMotion()) {
      el.style.display = "none";
      resolve();
      return;
    }

    document.documentElement.classList.add("is-loading");

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
        document.documentElement.classList.remove("is-loading");
        resolve();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        count.textContent = String(Math.round(counter.v));
      },
    })
      .to(count, { yPercent: -120, opacity: 0, duration: 0.6, ease: "power3.in" }, "-=0.1")
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.2");
  });
}
