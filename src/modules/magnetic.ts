import { gsap } from "gsap";
import { isTouch, $$ } from "../lib/utils";

// Buttons/links with [data-magnetic] gently pull toward the cursor.
export function initMagnetic() {
  if (isTouch()) return;

  $$("[data-magnetic]").forEach((el) => {
    const strength = Number((el as HTMLElement).dataset.magnetic || 0.4) || 0.4;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const mx = (e as PointerEvent).clientX - (rect.left + rect.width / 2);
      const my = (e as PointerEvent).clientY - (rect.top + rect.height / 2);
      xTo(mx * strength);
      yTo(my * strength);
    });

    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
