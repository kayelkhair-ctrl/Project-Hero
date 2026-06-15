import SplitType from "split-type";
import { isTouch, prefersReducedMotion, lerp } from "../lib/utils";

// Makes the hero headline interactive: characters spring away from the cursor
// (and lift slightly) as it passes over them. Uses cached layout offsets +
// one title rect per frame, so it's cheap regardless of character count.
export function initHeadlinePhysics() {
  const title = document.querySelector<HTMLElement>(".hero__title");
  if (!title || isTouch() || prefersReducedMotion()) return;

  const inners = Array.from(title.querySelectorAll<HTMLElement>(".line > span"));
  const split = new SplitType(inners, { types: "chars" });
  const chars = (split.chars || []) as HTMLElement[];
  chars.forEach((c) => {
    c.style.display = "inline-block";
    c.style.willChange = "transform";
  });

  type S = { x: number; y: number; s: number; ox: number; oy: number };
  const state: S[] = [];

  const cache = () => {
    chars.forEach((c, i) => {
      state[i] = state[i] || { x: 0, y: 0, s: 0, ox: 0, oy: 0 };
      state[i].ox = c.offsetLeft + c.offsetWidth / 2;
      state[i].oy = c.offsetTop + c.offsetHeight / 2;
    });
  };
  // Wait a frame so split layout has settled.
  requestAnimationFrame(cache);
  window.addEventListener("resize", cache);

  let px = -9999,
    py = -9999;
  let active = false;
  window.addEventListener("pointermove", (e) => {
    px = e.clientX;
    py = e.clientY;
  });

  const io = new IntersectionObserver((en) => (active = en[0]?.isIntersecting ?? false));
  io.observe(title);

  const radius = 130;
  const push = 0.36;

  const frame = () => {
    requestAnimationFrame(frame);
    if (!state.length) return;
    const r = title.getBoundingClientRect();
    for (let i = 0; i < chars.length; i++) {
      const st = state[i];
      let tx = 0,
        ty = 0,
        ts = 0;
      if (active) {
        const cx = r.left + st.ox;
        const cy = r.top + st.oy;
        const dx = cx - px;
        const dy = cy - py;
        const d = Math.hypot(dx, dy);
        if (d < radius && d > 0.001) {
          const f = (1 - d / radius) ** 2;
          tx = (dx / d) * f * radius * push;
          ty = (dy / d) * f * radius * push;
          ts = f * 0.16;
        }
      }
      st.x = lerp(st.x, tx, 0.15);
      st.y = lerp(st.y, ty, 0.15);
      st.s = lerp(st.s, ts, 0.15);
      chars[i].style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px) scale(${(1 + st.s).toFixed(3)})`;
    }
  };
  requestAnimationFrame(frame);
}
