import { gsap } from "gsap";
import SplitType from "split-type";
import { prefersReducedMotion } from "../lib/utils";
import { MARK } from "./brand";

// Brand intro: the mark draws in, the wordmark reveals, then the panel lifts.
// Plays only on the first visit of a session (see boot/sessionStorage); later
// navigations use the page-transition curtain instead. Resolves when done so
// the hero can chain its reveal.
export function runPreloader(): Promise<void> {
  const el = document.getElementById("preloader");
  const mark = document.getElementById("preloaderMark");
  const name = document.querySelector<HTMLElement>(".preloader__name");

  return new Promise((resolve) => {
    if (!el) {
      resolve();
      return;
    }

    if (prefersReducedMotion() || sessionStorage.getItem("ph_visited")) {
      el.style.display = "none";
      resolve();
      return;
    }
    sessionStorage.setItem("ph_visited", "1");

    if (mark) mark.innerHTML = MARK;
    document.documentElement.classList.add("is-loading");

    const chars = name ? new SplitType(name, { types: "chars" }).chars : [];

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
        document.documentElement.classList.remove("is-loading");
        resolve();
      },
    });

    // A quick, confident brand flash — premium without making the visitor wait.
    tl.from(mark, {
      scale: 0.7,
      autoAlpha: 0,
      rotate: -90,
      duration: 0.5,
      ease: "power3.out",
    })
      .from(
        chars,
        { yPercent: 110, autoAlpha: 0, stagger: 0.018, duration: 0.4, ease: "power3.out" },
        "-=0.34"
      )
      .to(".preloader__word", { autoAlpha: 0.6, duration: 0.25 }, "-=0.2")
      .to(el, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "+=0.05");
  });
}
