import { gsap } from "gsap";
import { isTouch, lerp } from "../lib/utils";

// Custom cursor with three states:
//  • default — a small accent dot that trails the pointer
//  • hover   — grows to a labelled ring over [data-cursor] text/links
//  • stick   — morphs into a rounded outline that wraps the hovered control
const STICK = ".btn, .cap__btn, .nav__links a, .menu-overlay__links a, .post-row, [data-stick]";

export function initCursor() {
  if (isTouch()) return;

  const cursor = document.getElementById("cursor");
  const label = document.getElementById("cursorLabel");
  if (!cursor || !label) return;

  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  const pos = { ...pointer };
  let stuck: HTMLElement | null = null;

  const setX = gsap.quickSetter(cursor, "x", "px");
  const setY = gsap.quickSetter(cursor, "y", "px");

  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });

  const sizeTo = (w: number, h: number, r: number) =>
    gsap.to(cursor, { width: w, height: h, borderRadius: r, duration: 0.35, ease: "power3.out" });

  function enterStick(el: HTMLElement) {
    stuck = el;
    cursor.classList.add("cursor--stick");
    cursor.classList.remove("cursor--hover");
    // The wrapped control shows its own text — keep the outline clean.
    label.textContent = "";
  }
  function enterHover(el: HTMLElement) {
    if (stuck) return;
    cursor.classList.add("cursor--hover");
    label.textContent = el.dataset.cursor ?? "";
    sizeTo(64, 64, 32);
  }
  function reset() {
    stuck = null;
    cursor.classList.remove("cursor--hover", "cursor--stick");
    label.textContent = "";
    sizeTo(10, 10, 50);
  }

  document.addEventListener("pointerover", (e) => {
    const t = e.target as HTMLElement;
    const stickEl = t.closest<HTMLElement>(STICK);
    if (stickEl) return enterStick(stickEl);
    const hoverEl = t.closest<HTMLElement>("[data-cursor]");
    if (hoverEl) enterHover(hoverEl);
  });
  document.addEventListener("pointerout", (e) => {
    const t = e.target as HTMLElement;
    const rel = e.relatedTarget as Node | null;
    const stickEl = t.closest<HTMLElement>(STICK);
    if (stickEl && !stickEl.contains(rel)) {
      reset();
      return;
    }
    const hoverEl = t.closest<HTMLElement>("[data-cursor]");
    if (hoverEl && !hoverEl.contains(rel) && !stuck) reset();
  });

  gsap.ticker.add(() => {
    if (stuck) {
      const r = stuck.getBoundingClientRect();
      const padX = 14,
        padY = 10;
      pos.x = lerp(pos.x, r.left + r.width / 2, 0.25);
      pos.y = lerp(pos.y, r.top + r.height / 2, 0.25);
      cursor.style.width = `${r.width + padX}px`;
      cursor.style.height = `${r.height + padY}px`;
      cursor.style.borderRadius = `${Math.min((r.height + padY) / 2, 16)}px`;
    } else {
      pos.x = lerp(pos.x, pointer.x, 0.18);
      pos.y = lerp(pos.y, pointer.y, 0.18);
    }
    setX(pos.x);
    setY(pos.y);
  });
}
