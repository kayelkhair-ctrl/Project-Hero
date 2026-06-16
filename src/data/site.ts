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
    key: "webgl",
    name: "Digital Transformation",
    desc: "End-to-end programmes that modernise how your business operates online: strategy, systems, process and technology, joined up.",
  },
  {
    num: "02",
    key: "web",
    name: "Web Design & Development",
    desc: "Fast, precise, conversion-focused websites. Designed in-house, built on proven foundations, and maintained long after launch.",
  },
  {
    num: "03",
    key: "seo",
    name: "SEO & GEO Visibility",
    desc: "Rank on Google and get cited in AI answers: ChatGPT, Gemini, Perplexity. A research-led visibility system built to compound over time.",
  },
  {
    num: "04",
    key: "ai",
    name: "AI Apps & Automation",
    desc: "Custom AI assistants, internal automations and content systems built around how your business actually runs.",
  },
  {
    num: "05",
    key: "app",
    name: "Web Application Development",
    desc: "Bespoke web applications: from internal tools and client portals to full customer-facing products.",
  },
  {
    num: "06",
    key: "brand",
    name: "Website as a Service",
    desc: "Design, build, hosting, security and ongoing care in one managed plan. Your website, always looked after.",
  },
];

export const projects: Project[] = [
  { slug: "aurora", title: "Aurora", tag: "WebGL · Brand", year: "2025", c1: "#2e5bff", c2: "#a6c0ff" },
  { slug: "meridian", title: "Meridian", tag: "E-commerce", year: "2025", c1: "#ff6b4a", c2: "#ffd0a6" },
  { slug: "northwind", title: "Northwind", tag: "3D Product", year: "2024", c1: "#0b0b0b", c2: "#6b6b6b" },
  { slug: "lumen", title: "Lumen", tag: "Campaign Site", year: "2024", c1: "#16a085", c2: "#a6ffe6" },
];
