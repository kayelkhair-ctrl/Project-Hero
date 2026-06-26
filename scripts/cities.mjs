// Single source of truth for location landing pages. Each entry generates a
// distinct, crawlable SEO page at /<slug>/ via scripts/build-cities.mjs, and is
// included in the sitemap by scripts/build-blog.mjs.
//
// Add a city = add an entry here, then run `npm run cities` (or any build).
// Keep each city genuinely distinct (real nearby areas, travel note, intro) so
// Google never treats them as duplicate "doorway" pages.

export const cities = [
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    nearby: ["Salford", "Stockport", "Bolton", "Trafford"],
    travel: "a short hop down the M62",
    intro: "from city-centre startups",
  },
  {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire",
    nearby: ["Wakefield", "Pudsey", "Morley", "Headingley"],
    travel: "right on our doorstep in West Yorkshire",
    intro: "from fast-growing startups",
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "Merseyside",
    nearby: ["Birkenhead", "Bootle", "St Helens", "the Wirral"],
    travel: "a clear run west along the M62",
    intro: "from independent brands",
  },
  {
    slug: "sheffield",
    name: "Sheffield",
    region: "South Yorkshire",
    nearby: ["Rotherham", "Barnsley", "Chesterfield", "Dronfield"],
    travel: "just down the M1 in South Yorkshire",
    intro: "from startups and makers",
  },
];

// Routes for the sitemap.
export const cityRoutes = cities.map((c) => `/${c.slug}/`);
