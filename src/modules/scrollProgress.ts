import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Thin accent line at the top of the viewport tracking overall scroll progress.
export function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.documentElement.appendChild(bar);

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      bar.style.transform = `scaleX(${self.progress})`;
    },
  });
}
