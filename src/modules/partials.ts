// Shared nav + footer markup injected on inner pages so there's a single
// source of truth. `current` highlights the active nav item.
const NAV_LINKS = [
  { href: "/#capabilities", label: "What we do", cursor: "See" },
  { href: "/studio/", label: "Studio", cursor: "About" },
  { href: "/insights/", label: "Insights", cursor: "Read" },
  { href: "/contact/", label: "Contact", cursor: "Say hi" },
];

export function injectChrome(current = "") {
  const navMount = document.getElementById("site-nav");
  if (navMount) {
    navMount.outerHTML = `
      <header class="nav">
        <a href="/" class="nav__brand"><span class="dot"></span>The Project Hero</a>
        <nav class="nav__links" aria-label="Primary">
          ${NAV_LINKS.map(
            (l) =>
              `<a href="${l.href}" data-cursor="${l.cursor}"${
                l.href.startsWith("/" + current) && current ? ' aria-current="page"' : ""
              }>${l.label}</a>`
          ).join("")}
        </nav>
        <button class="nav__toggle" aria-label="Open menu">Menu</button>
      </header>`;
  }

  const footMount = document.getElementById("site-footer");
  if (footMount) {
    footMount.outerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer__top">
            <div><p class="footer__big">Let's build something worth remembering.</p></div>
            <div class="footer__col">
              <h4>Menu</h4>
              <ul>
                ${NAV_LINKS.map((l) => `<li><a href="${l.href}" data-cursor="${l.cursor}">${l.label}</a></li>`).join("")}
              </ul>
            </div>
            <div class="footer__col">
              <h4>Get in touch</h4>
              <ul>
                <li><a href="mailto:info@theprojecthero.co.uk">info@theprojecthero.co.uk</a></li>
                <li><a href="tel:+441274505805">01274 505805</a></li>
                <li>Euroway House, Roydsdale Way,<br />Bradford BD4 6SE</li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© <span id="year"></span> The Project Hero. All rights reserved.</span>
            <span>Bradford · United Kingdom</span>
          </div>
        </div>
      </footer>`;
  }
}
