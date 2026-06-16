// Shared nav + footer markup injected on inner pages so there's a single
// source of truth. `current` highlights the active nav item.
const NAV_LINKS = [
  { href: "/services/", label: "Services", cursor: "See" },
  { href: "/work/", label: "Work", cursor: "View" },
  { href: "/studio/", label: "Studio", cursor: "About" },
  { href: "/insights/", label: "Insights", cursor: "Read" },
  { href: "/contact/", label: "Contact", cursor: "Say hi" },
];

export function injectChrome(current = "") {
  const navMount = document.getElementById("site-nav");
  if (navMount) {
    navMount.outerHTML = `
      <header class="nav">
        <a href="/" class="nav__brand"><span class="nav__mark"></span>The Project Hero</a>
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
              <h4>Services</h4>
              <ul>
                <li><a href="/services/digital-transformation/" data-cursor="See">Digital Transformation</a></li>
                <li><a href="/services/web-design-development/" data-cursor="See">Web Design &amp; Development</a></li>
                <li><a href="/services/seo-geo/" data-cursor="See">SEO &amp; GEO Visibility</a></li>
                <li><a href="/services/ai-applications-automation/" data-cursor="See">AI Apps &amp; Automation</a></li>
                <li><a href="/services/website-as-a-service/" data-cursor="See">Website as a Service</a></li>
                <li><a href="/services/hosting-care-support/" data-cursor="See">Hosting &amp; Care</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h4>Company</h4>
              <ul>
                <li><a href="/work/" data-cursor="View">Work</a></li>
                <li><a href="/studio/" data-cursor="About">Studio</a></li>
                <li><a href="/insights/" data-cursor="Read">Insights</a></li>
                <li><a href="/contact/" data-cursor="Say hi">Contact</a></li>
                <li><a href="mailto:info@theprojecthero.co.uk">info@theprojecthero.co.uk</a></li>
                <li><a href="tel:+441274505805">01274 505805</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© <span id="year"></span> The Project Hero Ltd. All rights reserved.</span>
            <span>
              <a href="/faq/" data-cursor="Read">FAQ</a> ·
              <a href="/privacy/" data-cursor="Read">Privacy</a> ·
              Bradford, Yorkshire · United Kingdom
            </span>
          </div>
        </div>
        <div class="footer__mega" aria-hidden="true">
          <span class="footer__mark"></span>
          <span class="footer__mega-text" data-reveal="lines"><span class="line"><span>The Project Hero</span></span></span>
        </div>
      </footer>`;
  }
}
