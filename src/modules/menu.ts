import { gsap } from "gsap";

const LINKS = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/studio/", label: "Studio" },
  { href: "/insights/", label: "Insights" },
  { href: "/contact/", label: "Contact" },
];

// Full-screen mobile menu, wired to every .nav__toggle on the page.
export function initMenu() {
  const toggles = Array.from(document.querySelectorAll(".nav__toggle"));
  if (!toggles.length) return;

  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <button class="menu-overlay__close" aria-label="Close menu">Close</button>
    <nav class="menu-overlay__links" aria-label="Mobile">
      ${LINKS.map((l, i) => `<a href="${l.href}" style="--i:${i}">${l.label}</a>`).join("")}
    </nav>
    <div class="menu-overlay__foot">
      <a href="mailto:info@theprojecthero.co.uk">info@theprojecthero.co.uk</a>
      <a href="tel:+441274505805">01274 505805</a>
    </div>`;
  document.body.appendChild(overlay);

  let open = false;
  const links = Array.from(overlay.querySelectorAll(".menu-overlay__links a"));

  const setOpen = (next: boolean) => {
    if (next === open) return;
    open = next;
    overlay.classList.toggle("is-open", open);
    overlay.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.fromTo(
        links,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.1 }
      );
    }
  };

  toggles.forEach((t) => t.addEventListener("click", () => setOpen(true)));
  overlay.querySelector(".menu-overlay__close")?.addEventListener("click", () => setOpen(false));
  links.forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}
