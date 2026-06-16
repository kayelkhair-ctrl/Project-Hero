// Central content source so copy/work can be edited in one place.

export interface Capability {
  num: string;
  name: string;
  desc: string;
  key: string; // selects the animated visual in the showcase
}

export interface Project {
  slug: string;
  title: string;
  tag: string;
  year: string;
  // accent colour used for the placeholder gradient art
  c1: string;
  c2: string;
}

export const capabilities: Capability[] = [
  {
    num: "01",
    key: "web",
    name: "Websites as a Service",
    desc: "Design, build, hosting, security and support in one managed plan — your website, always looked after.",
  },
  {
    num: "02",
    key: "seo",
    name: "SEO & GEO Visibility",
    desc: "Rank on Google and get cited in AI answers like ChatGPT, Gemini and Perplexity. Visibility built to compound.",
  },
  {
    num: "03",
    key: "ai",
    name: "AI Apps & Automation",
    desc: "Custom tools, assistants and automations that take work off your plate and move the business forward.",
  },
  {
    num: "04",
    key: "app",
    name: "Web & Mobile Apps",
    desc: "Fast, reliable products — from first prototype to something your customers love using.",
  },
  {
    num: "05",
    key: "webgl",
    name: "3D & Immersive Web",
    desc: "Real-time 3D, WebGL and motion for brands that want to stand out — where it earns its place.",
  },
  {
    num: "06",
    key: "brand",
    name: "Brand & Identity",
    desc: "Visual systems that scale from logo to launch and hold together everywhere.",
  },
];

export const projects: Project[] = [
  { slug: "aurora", title: "Aurora", tag: "WebGL · Brand", year: "2025", c1: "#2e5bff", c2: "#a6c0ff" },
  { slug: "meridian", title: "Meridian", tag: "E-commerce", year: "2025", c1: "#ff6b4a", c2: "#ffd0a6" },
  { slug: "northwind", title: "Northwind", tag: "3D Product", year: "2024", c1: "#0b0b0b", c2: "#6b6b6b" },
  { slug: "lumen", title: "Lumen", tag: "Campaign Site", year: "2024", c1: "#16a085", c2: "#a6ffe6" },
];
