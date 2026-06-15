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
    name: "Web Design & Experience",
    desc: "Editorial, immersive websites with serious craft — designed and engineered in-house.",
  },
  {
    num: "02",
    key: "webgl",
    name: "3D & WebGL",
    desc: "Real-time interactive 3D, shaders and scroll-driven scenes that make brands unforgettable.",
  },
  {
    num: "03",
    key: "app",
    name: "App Development",
    desc: "Fast, reliable web and mobile apps — from first prototype to a product people love using.",
  },
  {
    num: "04",
    key: "ai",
    name: "Bespoke AI Apps",
    desc: "Custom AI tools built around your business — assistants, automation and smart features that actually move the needle.",
  },
  {
    num: "05",
    key: "brand",
    name: "Brand & Identity",
    desc: "Visual systems that scale from logo to launch and hold together everywhere.",
  },
  {
    num: "06",
    key: "seo",
    name: "SEO & GEO",
    desc: "Get found — on Google and in AI search. We optimise for traditional rankings and for generative engines (ChatGPT, Gemini, Perplexity) to drive real growth.",
  },
];

export const projects: Project[] = [
  { slug: "aurora", title: "Aurora", tag: "WebGL · Brand", year: "2025", c1: "#2e5bff", c2: "#a6c0ff" },
  { slug: "meridian", title: "Meridian", tag: "E-commerce", year: "2025", c1: "#ff6b4a", c2: "#ffd0a6" },
  { slug: "northwind", title: "Northwind", tag: "3D Product", year: "2024", c1: "#0b0b0b", c2: "#6b6b6b" },
  { slug: "lumen", title: "Lumen", tag: "Campaign Site", year: "2024", c1: "#16a085", c2: "#a6ffe6" },
];
