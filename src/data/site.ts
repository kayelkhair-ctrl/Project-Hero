// Central content source so copy/work can be edited in one place.

export interface Service {
  num: string;
  name: string;
  desc: string;
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

export const services: Service[] = [
  { num: "01", name: "3D & WebGL", desc: "Real-time interactive 3D, shaders and immersive scenes." },
  { num: "02", name: "Web Design", desc: "Editorial, brand-led interfaces with serious craft." },
  { num: "03", name: "Brand & Identity", desc: "Visual systems that scale from logo to launch." },
  { num: "04", name: "Motion & Animation", desc: "Scroll-driven storytelling and micro-interaction." },
  { num: "05", name: "Development", desc: "Fast, accessible, hand-built front-end engineering." },
  { num: "06", name: "Hosting & Care", desc: "We host, monitor and maintain — no surprises." },
  { num: "07", name: "Strategy", desc: "Positioning and narrative that earns attention." },
  { num: "08", name: "SEO & Growth", desc: "Built to be found, built to convert." },
];

export const projects: Project[] = [
  { slug: "aurora", title: "Aurora", tag: "WebGL · Brand", year: "2025", c1: "#2e5bff", c2: "#a6c0ff" },
  { slug: "meridian", title: "Meridian", tag: "E-commerce", year: "2025", c1: "#ff6b4a", c2: "#ffd0a6" },
  { slug: "northwind", title: "Northwind", tag: "3D Product", year: "2024", c1: "#0b0b0b", c2: "#6b6b6b" },
  { slug: "lumen", title: "Lumen", tag: "Campaign Site", year: "2024", c1: "#16a085", c2: "#a6ffe6" },
];
