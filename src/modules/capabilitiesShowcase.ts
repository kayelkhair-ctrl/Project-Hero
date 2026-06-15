import { $$ } from "../lib/utils";

// Interactive capabilities showcase: a list of what we do, where the active
// item drives a bespoke animated canvas visual that *demonstrates* itself.
// Everything is cheap canvas-2D (no WebGL) so it stays fast everywhere.

const LIGHT = "#f3f1ec";
const ACCENT = "#2e5bff";
const DIM = "rgba(243,241,236,0.28)";

type Draw = (g: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/* ---------- per-capability visuals ---------- */

// Web Design — a browser frame assembling its layout blocks.
const web: Draw = (g, w, h, t) => {
  const bw = w * 0.62,
    bh = h * 0.6,
    x = (w - bw) / 2,
    y = (h - bh) / 2;
  g.strokeStyle = LIGHT;
  g.lineWidth = 1.5;
  roundRect(g, x, y, bw, bh, 10);
  g.stroke();
  g.beginPath();
  g.moveTo(x, y + 26);
  g.lineTo(x + bw, y + 26);
  g.stroke();
  for (let i = 0; i < 3; i++) {
    g.fillStyle = i === 0 ? ACCENT : DIM;
    g.beginPath();
    g.arc(x + 16 + i * 16, y + 13, 4, 0, Math.PI * 2);
    g.fill();
  }
  const blocks = [
    [0.08, 0.2, 0.84, 0.18],
    [0.08, 0.46, 0.4, 0.42],
    [0.52, 0.46, 0.4, 0.2],
    [0.52, 0.7, 0.4, 0.18],
  ];
  // A pointer visits each block in turn and "selects" it.
  const active = Math.floor(t / 1.4) % blocks.length;
  const blockRect = (b: number[]) => ({
    bx: x + bw * b[0],
    by: y + 26 + (bh - 26) * b[1],
    bwid: bw * b[2],
    bhei: (bh - 26) * b[3],
  });
  blocks.forEach((b, i) => {
    const r = blockRect(b);
    const sel = i === active;
    g.fillStyle = sel ? "rgba(46,91,255,0.55)" : "rgba(243,241,236,0.1)";
    roundRect(g, r.bx, r.by, r.bwid, r.bhei, 5);
    g.fill();
    if (sel) {
      g.strokeStyle = ACCENT;
      g.lineWidth = 1.5;
      g.stroke();
    }
  });
  // Pointer easing toward the centre of the active block.
  const tr = blockRect(blocks[active]);
  const tx = tr.bx + tr.bwid * 0.5;
  const ty = tr.by + tr.bhei * 0.5;
  const ease2 = Math.min(1, ((t % 1.4) / 0.6));
  const k = ease2 < 1 ? 1 - Math.pow(1 - ease2, 3) : 1;
  webCursor.x += (tx - webCursor.x) * 0.12 * (0.5 + k);
  webCursor.y += (ty - webCursor.y) * 0.12 * (0.5 + k);
  drawPointer(g, webCursor.x, webCursor.y);
};
const webCursor = { x: 0, y: 0 };
function drawPointer(g: CanvasRenderingContext2D, x: number, y: number) {
  g.save();
  g.translate(x, y);
  g.fillStyle = LIGHT;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(0, 16);
  g.lineTo(4.5, 11.5);
  g.lineTo(11, 11);
  g.closePath();
  g.fill();
  g.restore();
}

// 3D & WebGL — a rotating wireframe icosahedron with depth-shaded edges.
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_V: number[][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
});
const ICO_E: number[][] = (() => {
  const edges: number[][] = [];
  for (let i = 0; i < ICO_V.length; i++)
    for (let j = i + 1; j < ICO_V.length; j++) {
      const d = Math.hypot(
        ICO_V[i][0] - ICO_V[j][0],
        ICO_V[i][1] - ICO_V[j][1],
        ICO_V[i][2] - ICO_V[j][2]
      );
      if (d < 1.2) edges.push([i, j]);
    }
  return edges;
})();

const webgl: Draw = (g, w, h, t) => {
  const cx = w / 2,
    cy = h / 2,
    s = Math.min(w, h) * 0.3;
  const ry = t * 0.5,
    rx = t * 0.32;
  const proj = ICO_V.map(([x, y, z]) => {
    let X = x * Math.cos(ry) - z * Math.sin(ry);
    let Z = x * Math.sin(ry) + z * Math.cos(ry);
    const Y = y * Math.cos(rx) - Z * Math.sin(rx);
    Z = y * Math.sin(rx) + Z * Math.cos(rx);
    const f = 3 / (3 + Z);
    return { x: cx + X * s * f, y: cy + Y * s * f, z: Z };
  });
  const baseAlpha = g.globalAlpha;
  g.lineWidth = 1.4;
  ICO_E.forEach(([a, b]) => {
    const depth = (proj[a].z + proj[b].z) / 2; // -1 (near) .. 1 (far)
    g.globalAlpha = baseAlpha * (0.35 + (1 - (depth + 1.5) / 3) * 0.65);
    g.strokeStyle = LIGHT;
    g.beginPath();
    g.moveTo(proj[a].x, proj[a].y);
    g.lineTo(proj[b].x, proj[b].y);
    g.stroke();
  });
  g.globalAlpha = baseAlpha;
  proj.forEach((p) => {
    g.fillStyle = ACCENT;
    g.beginPath();
    g.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    g.fill();
  });
};

// App Development — a phone with a scrolling list UI.
const app: Draw = (g, w, h, t) => {
  const pw = h * 0.46,
    ph = h * 0.78,
    x = (w - pw) / 2,
    y = (h - ph) / 2;
  g.strokeStyle = LIGHT;
  g.lineWidth = 1.5;
  roundRect(g, x, y, pw, ph, 16);
  g.stroke();
  // notch
  g.fillStyle = LIGHT;
  roundRect(g, x + pw / 2 - 12, y + 8, 24, 5, 3);
  g.fill();
  g.save();
  roundRect(g, x + 8, y + 22, pw - 16, ph - 60, 8);
  g.clip();
  const scroll = (t * 30) % 44;
  for (let i = -1; i < 7; i++) {
    const yy = y + 30 + i * 44 - scroll;
    g.fillStyle = `rgba(243,241,236,0.07)`;
    roundRect(g, x + 14, yy, pw - 28, 34, 6);
    g.fill();
    g.fillStyle = ACCENT;
    g.beginPath();
    g.arc(x + 30, yy + 17, 8, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = DIM;
    roundRect(g, x + 46, yy + 10, pw * 0.4, 5, 2);
    g.fill();
    roundRect(g, x + 46, yy + 20, pw * 0.28, 4, 2);
    g.fill();
  }
  g.restore();
  // tab bar
  for (let i = 0; i < 4; i++) {
    g.fillStyle = i === 1 ? ACCENT : DIM;
    g.beginPath();
    g.arc(x + pw * (0.2 + i * 0.2), y + ph - 18, 4, 0, Math.PI * 2);
    g.fill();
  }
};

// Bespoke AI — a chat exchange typing out, with a "thinking" dot reply.
const ai: Draw = (g, w, h, t) => {
  const pad = w * 0.16;
  const bw = w - pad * 2;
  const cycle = 7;
  const tc = t % cycle;

  const userMsg = "Summarise today's orders";
  const typed = Math.max(0, Math.min(userMsg.length, Math.floor((tc / 1.6) * userMsg.length)));
  const userText = userMsg.slice(0, typed);

  // user bubble (right)
  g.font = `500 ${Math.round(h * 0.052)}px "Space Grotesk", sans-serif`;
  const ubw = Math.min(bw * 0.7, g.measureText(userMsg).width + 36);
  const uy = h * 0.26;
  g.fillStyle = ACCENT;
  roundRect(g, pad + bw - ubw, uy, ubw, h * 0.13, 12);
  g.fill();
  g.fillStyle = "#fff";
  g.textBaseline = "middle";
  g.fillText(userText + (typed < userMsg.length && tc < 1.7 ? "▌" : ""), pad + bw - ubw + 18, uy + h * 0.065);

  // assistant bubble (left) — appears after the question
  if (tc > 1.9) {
    const ay = h * 0.52;
    const reveal = Math.min(1, (tc - 1.9) / 0.4);
    g.globalAlpha *= reveal;
    g.strokeStyle = "rgba(243,241,236,0.5)";
    g.lineWidth = 1.5;
    const abw = bw * 0.62;
    if (tc < 3.2) {
      // thinking dots
      roundRect(g, pad, ay, abw * 0.36, h * 0.13, 12);
      g.stroke();
      for (let i = 0; i < 3; i++) {
        const b = Math.sin(t * 6 - i * 0.6) * 0.5 + 0.5;
        g.fillStyle = `rgba(243,241,236,${0.3 + b * 0.6})`;
        g.beginPath();
        g.arc(pad + abw * 0.1 + i * abw * 0.08, ay + h * 0.065, 3, 0, Math.PI * 2);
        g.fill();
      }
    } else {
      roundRect(g, pad, ay, abw, h * 0.22, 12);
      g.stroke();
      const lines = ["142 orders · £8.4k", "↑ 12% vs yesterday"];
      g.fillStyle = LIGHT;
      g.font = `500 ${Math.round(h * 0.046)}px "Space Grotesk", sans-serif`;
      lines.forEach((ln, i) => {
        const chars = Math.floor(Math.min(ln.length, (tc - 3.2) / 0.5 * ln.length - i * ln.length));
        if (chars > 0) g.fillText(ln.slice(0, chars), pad + 16, ay + h * 0.07 + i * h * 0.08);
      });
      g.fillStyle = ACCENT;
      g.beginPath();
      g.arc(pad + abw - 16, ay + h * 0.04, 3, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha /= reveal;
  }
  g.textBaseline = "alphabetic";
};

// Brand — a morphing polygon cycling through shapes.
const brand: Draw = (g, w, h, t) => {
  const cx = w / 2,
    cy = h / 2,
    r = Math.min(w, h) * 0.26;
  const shapes = [3, 4, 6, 64]; // triangle, square, hexagon, circle
  const seg = t * 0.4;
  const idx = Math.floor(seg) % shapes.length;
  const next = (idx + 1) % shapes.length;
  const k = ease(seg % 1);
  const N = 64;
  g.lineWidth = 1.5;
  g.strokeStyle = LIGHT;
  g.beginPath();
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r1 = polyR(a, shapes[idx], r);
    const r2 = polyR(a, shapes[next], r);
    const rr = r1 + (r2 - r1) * k;
    const x = cx + Math.cos(a + t * 0.3) * rr;
    const y = cy + Math.sin(a + t * 0.3) * rr;
    i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke();
  g.fillStyle = ACCENT;
  g.beginPath();
  g.arc(cx, cy, 5, 0, Math.PI * 2);
  g.fill();
};

// Motion — an easing curve with a dot riding it.
const motion: Draw = (g, w, h, t) => {
  const x0 = w * 0.2,
    x1 = w * 0.8,
    y0 = h * 0.72,
    y1 = h * 0.28;
  g.strokeStyle = DIM;
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(x0, y1);
  g.moveTo(x0, y0);
  g.lineTo(x1, y0);
  g.stroke();
  g.strokeStyle = ACCENT;
  g.lineWidth = 2;
  g.beginPath();
  for (let i = 0; i <= 60; i++) {
    const p = i / 60;
    const e = ease(p);
    const x = x0 + (x1 - x0) * p;
    const y = y0 + (y1 - y0) * e;
    i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke();
  const p = (t * 0.4) % 1;
  const e = ease(p);
  const dx = x0 + (x1 - x0) * p;
  const dy = y0 + (y1 - y0) * e;
  g.fillStyle = LIGHT;
  g.beginPath();
  g.arc(dx, dy, 6, 0, Math.PI * 2);
  g.fill();
  // bouncing ball driven by same easing
  g.fillStyle = ACCENT;
  g.beginPath();
  g.arc(w * 0.5, y0 - (y0 - y1) * e, 7, 0, Math.PI * 2);
  g.fill();
};

const RENDERERS: Record<string, Draw> = { web, webgl, app, ai, brand, motion };

/* ---------- helpers ---------- */
function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
function polyR(angle: number, sides: number, r: number) {
  if (sides >= 32) return r;
  const a = angle + Math.PI / 2;
  const seg = (Math.PI * 2) / sides;
  const x = ((a % seg) + seg) % seg;
  return (r * Math.cos(seg / 2)) / Math.cos(x - seg / 2);
}
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ---------- wiring ---------- */
export function initCapabilitiesShowcase() {
  const canvas = document.getElementById("caps-canvas") as HTMLCanvasElement | null;
  const items = $$(".cap");
  if (!canvas || !items.length) return;
  const g = canvas.getContext("2d");
  if (!g) return;

  const keys = items.map((el) => (el as HTMLElement).dataset.key || "web");
  let current = 0;
  let previous = 0;
  let mixStart = -1;

  const setActive = (i: number) => {
    if (i === current) return;
    items[current]?.classList.remove("is-active");
    items[i]?.classList.add("is-active");
    previous = current;
    current = i;
    mixStart = performance.now();
  };

  items.forEach((el, i) => {
    el.addEventListener("pointerenter", () => setActive(i));
    el.querySelector("button")?.addEventListener("focus", () => setActive(i));
    el.querySelector("button")?.addEventListener("click", () => setActive(i));
  });

  let w = 0,
    h = 0;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  // Pause when the showcase is off-screen.
  let visible = true;
  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
  });
  io.observe(canvas);

  const draw = (now: number) => {
    requestAnimationFrame(draw);
    if (!visible || w === 0) return;
    const t = now / 1000;
    g.clearRect(0, 0, w, h);
    const mix = mixStart < 0 ? 1 : Math.min((now - mixStart) / 450, 1);
    if (mix < 1) {
      g.globalAlpha = 1 - mix;
      RENDERERS[keys[previous]]?.(g, w, h, t);
    }
    g.globalAlpha = mix;
    RENDERERS[keys[current]]?.(g, w, h, t);
    g.globalAlpha = 1;
  };
  requestAnimationFrame(draw);
}
