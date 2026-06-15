import { injectChrome } from "../modules/partials";
import { initCommon } from "./common";

injectChrome("contact");
initCommon();

// No backend yet: validate, then hand off to the user's mail client with a
// prefilled message. Swap for a Formspree/Cloudflare endpoint when ready.
const form = document.getElementById("contact-form") as HTMLFormElement | null;
const note = document.getElementById("form-note");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const company = String(data.get("company") || "—");
  const budget = String(data.get("budget") || "Not specified");
  const message = String(data.get("message") || "");

  const subject = `New project enquiry — ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Budget: ${budget}`,
    "",
    message,
  ].join("\n");

  window.location.href = `mailto:info@theprojecthero.co.uk?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  if (note) note.textContent = "Opening your email app… if nothing happens, email info@theprojecthero.co.uk directly.";
});
