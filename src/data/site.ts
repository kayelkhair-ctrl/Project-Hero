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

/* ------------------------------------------------------------------
   OWNER-FILLABLE PROOF
   These power the trust sections on the home page. Each section only
   renders when it has real entries — so the page never shows empty or
   fabricated proof. Add your genuine content here when you have it.
   ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string; // e.g. "Sarah Jones"
  role: string; // e.g. "Founder, Acme Ltd"
}

// TODO(owner): paste 2-3 real client quotes here. Until then the
// testimonials section stays hidden.
export const testimonials: Testimonial[] = [];

export interface Client {
  name: string; // shown as text if no logo is supplied
  logo?: string; // optional path to an SVG/PNG in /public
}

// TODO(owner): add real client names (and logos in /public) here. Until
// then the "trusted by" logo strip stays hidden.
export const clients: Client[] = [];

export interface ResultStat {
  value: string; // e.g. "3.2x" or "#1"
  label: string; // e.g. "more enquiries in 90 days"
}

// TODO(owner): add real, verifiable numbers here. Until then the results
// band stays hidden (we never invent metrics).
export const resultStats: ResultStat[] = [];

export interface Package {
  name: string;
  summary: string;
  price: string; // leave "" to show "On request" until you set pricing
  cadence?: string; // e.g. "/mo" or "from"
  includes: string[];
  featured?: boolean;
  cta?: string;
}

// What's included is real and useful even before prices are set. Drop your
// numbers into `price` (and `cadence`) when you're ready to show them.
export const packages: Package[] = [
  {
    name: "Website as a Service",
    summary: "Design, build, hosting and ongoing care in one predictable monthly plan.",
    price: "",
    cadence: "/mo",
    includes: [
      "Custom design & build",
      "Fast, secure UK hosting",
      "Updates, security & monitoring",
      "Ongoing support & quarterly reviews",
    ],
    featured: true,
    cta: "Get a quote",
  },
  {
    name: "Website Project",
    summary: "A one-off, conversion-focused website designed and built in-house.",
    price: "",
    cadence: "from",
    includes: [
      "Strategy & UX design",
      "Development & launch",
      "Performance & on-page SEO",
      "Optional ongoing care",
    ],
    cta: "Get a quote",
  },
  {
    name: "Growth & Visibility",
    summary: "SEO, GEO and AI tools that compound your visibility month after month.",
    price: "",
    cadence: "from",
    includes: [
      "Technical & content SEO",
      "Generative Engine Optimisation",
      "AI tools & automation",
      "Monthly reporting",
    ],
    cta: "Get a quote",
  },
];

export interface ProcessStep {
  num: string;
  name: string;
  desc: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    name: "Discovery call",
    desc: "A free, no-pressure chat about your business, your goals and where the gaps are. You leave with clear next steps either way.",
  },
  {
    num: "02",
    name: "Audit & proposal",
    desc: "We review what you have, map what you need, and send a clear plan with scope and pricing. No jargon, no surprises.",
  },
  {
    num: "03",
    name: "Design & build",
    desc: "We design, build and ship: working directly with you, with senior people, and showing progress as we go.",
  },
  {
    num: "04",
    name: "Grow & look after",
    desc: "We don't disappear at launch. We maintain, measure and improve so your investment keeps working.",
  },
];

export interface HomeFaq {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaq[] = [
  {
    q: "How much does it cost?",
    a: "It depends on scope, but our managed model is built to be affordable and predictable: senior work without a traditional agency price tag. The best next step is a quick audit so we can quote accurately.",
  },
  {
    q: "Do you still build and manage websites?",
    a: "Yes, websites are our core offer. We build new ones and take on existing sites too, whether you need a redesign, a full takeover or just ongoing care.",
  },
  {
    q: "What is GEO, and how is it different from SEO?",
    a: "SEO helps you rank on Google. GEO (Generative Engine Optimisation) helps you get cited inside AI answers from ChatGPT, Gemini and Perplexity. We build both so you stay visible as search changes.",
  },
  {
    q: "How quickly will I hear back?",
    a: "We reply to every genuine enquiry within one working day. You'll talk to the people who actually do the work, not a sales layer.",
  },
];
