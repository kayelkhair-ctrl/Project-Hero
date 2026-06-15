import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Infinite marquee that also nudges with scroll velocity.
export function initMarquee() {
  const track = document.getElementById("marquee");
  if (!track) return;

  const item = track.querySelector(".marquee__item");
  if (!item) return;

  // Duplicate content until it comfortably overflows for a seamless loop.
  const clones = 3;
  for (let i = 0; i < clones; i++) {
    track.appendChild(item.cloneNode(true));
  }

  let x = 0;
  let baseSpeed = 0.6;
  let velocity = 0;

  ScrollTrigger.create({
    onUpdate: (self) => {
      velocity = self.getVelocity() / 300;
    },
  });

  const width = (item as HTMLElement).offsetWidth + 56; // + gap
  gsap.ticker.add(() => {
    x -= baseSpeed + Math.abs(velocity);
    if (-x >= width) x += width;
    gsap.set(track, { x });
    velocity *= 0.9;
  });
}
