import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { $$ } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Signature "scroll fill" effect: words start muted and ink-in one by one as
// the block scrolls through the viewport. Apply with [data-fill]; mark a word
// to land on the accent colour with a wrapping <em>.
export function initScrollText() {
  const css = getComputedStyle(document.documentElement);
  const muted = css.getPropertyValue("--muted").trim() || "#6b6862";
  const ink = css.getPropertyValue("--ink").trim() || "#0b0b0b";
  const accent = css.getPropertyValue("--accent").trim() || "#2e5bff";

  $$("[data-fill]").forEach((el) => {
    const split = new SplitType(el, { types: "words" });
    const words = split.words || [];
    gsap.set(el, { autoAlpha: 1 });
    gsap.set(words, { color: muted });

    gsap.to(words, {
      color: (i, target: HTMLElement) =>
        target.closest("em") ? accent : ink,
      ease: "none",
      stagger: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        end: "bottom 58%",
        scrub: true,
      },
    });
  });

  ScrollTrigger.refresh();
}
