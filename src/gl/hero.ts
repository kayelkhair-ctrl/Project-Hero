import createGlobe from "cobe";
import { isTouch, prefersReducedMotion } from "../lib/utils";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [53.8, -1.75], size: 0.04 },    // Bradford (home)
  { location: [51.51, -0.13], size: 0.03 },   // London
  { location: [40.71, -74.01], size: 0.025 }, // New York
  { location: [48.85, 2.35], size: 0.025 },   // Paris
  { location: [35.68, 139.65], size: 0.025 }, // Tokyo
  { location: [-33.87, 151.21], size: 0.025 },// Sydney
];

export function initHero() {
  const canvas = document.getElementById("gl") as HTMLCanvasElement | null;
  if (!canvas) return;

  const heroEl = document.getElementById("hero");
  const reduced = prefersReducedMotion();
  const speed = reduced ? 0 : 0.003;

  let phi = 0;
  let isDragging = false;
  let lastPointerX = 0;
  let phiOffset = 0;
  let dragDelta = 0;
  let globe: ReturnType<typeof createGlobe> | null = null;
  let animationId = 0;
  let pendingReveal = false;
  let tabVisible = !document.hidden;
  let onScreen = true;

  function animate() {
    if (!isDragging) phi += speed;
    globe!.update({
      phi: phi + phiOffset + dragDelta,
      theta: 0.28,
    });
    animationId = requestAnimationFrame(animate);
  }

  function syncLoop() {
    cancelAnimationFrame(animationId);
    if (tabVisible && onScreen && globe) {
      animationId = requestAnimationFrame(animate);
    }
  }

  function init() {
    const size = canvas!.offsetWidth;
    if (!size || globe) return;

    // Lighter on smaller screens: fewer dots + capped DPR keeps the globe
    // smooth on phones/laptops without a visible drop in quality.
    const small = window.innerWidth < 820;
    globe = createGlobe(canvas!, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2),
      width: size,
      height: size,
      phi: 0,
      theta: 0.28,
      dark: 0,
      diffuse: 1.1,
      mapSamples: small ? 8000 : 12000,
      mapBrightness: 7,
      baseColor: [0.88, 0.86, 0.82] as [number, number, number],
      markerColor: [0.18, 0.36, 1.0] as [number, number, number],
      glowColor: [0.96, 0.94, 0.91] as [number, number, number],
      markerElevation: 0,
      markers: MARKERS,
    });

    // cobe wraps the canvas in a `position:relative; width:100%; height:100%` div.
    // As a flex item in the hero (which uses min-height, not height) this div gets
    // 0 height and the globe ends up at the bottom. Override it to position:absolute
    // so it floats correctly in the hero, independent of the flex layout.
    const wrapper = canvas!.parentElement as HTMLElement | null;
    if (wrapper && wrapper !== heroEl) {
      wrapper.style.cssText = [
        "position: absolute",
        "top: 50svh",
        "right: -8%",
        "transform: translateY(-50%)",
        "width: min(64vh, 50vw)",
        "height: min(64vh, 50vw)",
        "z-index: 1",
        "border-radius: 50%",
        "overflow: hidden",
      ].join("; ");

      canvas!.style.cssText = [
        "width: 100%",
        "height: 100%",
        "display: block",
        "cursor: grab",
        "touch-action: none",
        "opacity: 0",
        "transition: opacity 1.4s ease",
      ].join("; ");
    }

    if (pendingReveal && canvas) canvas.style.opacity = "1";

    // Start the RAF loop, pausing when the tab is hidden or hero is off-screen.
    syncLoop();

    document.addEventListener("visibilitychange", () => {
      tabVisible = !document.hidden;
      syncLoop();
    });

    if (heroEl && "IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? true;
          syncLoop();
        },
        { threshold: 0 }
      ).observe(heroEl);
    }
  }

  // Pointer drag: accumulate displacement from initial press position.
  canvas.addEventListener("pointerdown", (e) => {
    isDragging = true;
    lastPointerX = e.clientX;
    canvas!.style.cursor = "grabbing";
  });

  window.addEventListener("pointermove", (e: PointerEvent) => {
    if (isDragging) dragDelta = (e.clientX - lastPointerX) / 250;
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    if (isDragging) { phiOffset += dragDelta; dragDelta = 0; }
    isDragging = false;
    if (canvas) canvas.style.cursor = "grab";
  }, { passive: true });

  if (canvas.offsetWidth > 0) {
    init();
  } else {
    const ro = new ResizeObserver((entries) => {
      if (entries[0]?.contentRect.width > 0) {
        ro.disconnect();
        init();
      }
    });
    ro.observe(canvas);
  }

  return {
    reveal() {
      pendingReveal = true;
      if (globe && canvas) canvas.style.opacity = "1";
    },
  };
}
