import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { $$ } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Wires every [data-reveal] element to a scroll-triggered entrance.
//   data-reveal="fade"  -> simple fade + rise
//   data-reveal="lines" -> per-line mask reveal (expects .line > span markup)
//   data-reveal="words" -> split into words and stagger up
export function initReveals() {
  // FADE
  $$('[data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  // LINES (pre-marked .line > span)
  $$('[data-reveal="lines"]').forEach((el) => {
    const spans = $$(".line > span", el);
    gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(
      spans,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );
  });

  // WORDS (split on the fly)
  $$('[data-reveal="words"]').forEach((el) => {
    const split = new SplitType(el, { types: "words" });
    gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(
      split.words,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  });

  ScrollTrigger.refresh();
}
