import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, isTouch } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Pins the work section and translates the track sideways as you scroll down,
// so the projects sweep horizontally past a held title. Falls back to a plain
// swipeable row when motion is reduced or on touch devices.
export function initHorizontalGallery() {
  const section = document.getElementById("work");
  const track = document.getElementById("work-h-track");
  const viewport = document.querySelector<HTMLElement>(".work-h__viewport");
  if (!section || !track || !viewport) return;

  if (prefersReducedMotion() || isTouch()) {
    viewport.classList.add("is-swipe");
    return;
  }

  const getAmount = () => track.scrollWidth - viewport.clientWidth;

  // Scroll-velocity lean: panels skew slightly when you scroll fast, easing back.
  const skewTo = gsap.quickTo(".work-panel", "skewX", {
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.to(track, {
    x: () => -getAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + getAmount(),
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const skew = gsap.utils.clamp(-8, 8, (self.getVelocity() / 1000) * -1);
        skewTo(skew);
      },
    },
  });
}
