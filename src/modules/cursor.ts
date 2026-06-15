import { gsap } from "gsap";
import { isTouch } from "../lib/utils";

// Soft-following custom cursor with hover + label states.
export function initCursor() {
  if (isTouch()) return;

  const cursor = document.getElementById("cursor");
  const label = document.getElementById("cursorLabel");
  if (!cursor || !label) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { ...pos };

  const setX = gsap.quickSetter(cursor, "x", "px");
  const setY = gsap.quickSetter(cursor, "y", "px");

  window.addEventListener("pointermove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  gsap.ticker.add(() => {
    pos.x += (target.x - pos.x) * 0.18;
    pos.y += (target.y - pos.y) * 0.18;
    setX(pos.x);
    setY(pos.y);
  });

  // Hover states for interactive elements.
  const hoverSelector = "a, button, [data-cursor], [data-magnetic]";
  document.querySelectorAll(hoverSelector).forEach((el) => {
    el.addEventListener("pointerenter", () => {
      cursor.classList.add("cursor--hover");
      const text = (el as HTMLElement).dataset.cursor;
      label.textContent = text ?? "";
    });
    el.addEventListener("pointerleave", () => {
      cursor.classList.remove("cursor--hover");
      label.textContent = "";
    });
  });
}
