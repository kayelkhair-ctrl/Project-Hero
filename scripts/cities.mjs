// Single source of truth for location landing pages. Each entry generates a
// distinct, crawlable page at /<slug>/ via scripts/build-cities.mjs, and is
// included in the sitemap by scripts/build-blog.mjs.
//
// Add a location = add an entry here + its /<slug>/ to .gitignore, then run
// `npm run cities` (or any build). Keep each genuinely distinct (real nearby
// areas, local framing) so Google never treats them as duplicate pages.
//
// kind:
//   "city" — a market we serve remotely (no office there). HQ address kept,
//            the city is listed as an areaServed. NEVER add a fake address.
//   "area" — a Bradford neighbourhood. Our real Bradford office genuinely
//            covers it, so the real address is used. (EXPERIMENT, June 2026:
//            testing whether hyper-local neighbourhood pages earn any organic
//            traffic — review in Search Console after ~6 weeks; most have ~0
//            search volume, so expect little. Easy to remove: delete entries.)

export const cities = [
  // ---- Cities (service areas) ----
  { kind: "city", slug: "manchester", name: "Manchester", region: "Greater Manchester", nearby: ["Salford", "Stockport", "Bolton", "Trafford"], travel: "a short hop down the M62", intro: "from city-centre startups" },
  { kind: "city", slug: "leeds", name: "Leeds", region: "West Yorkshire", nearby: ["Wakefield", "Pudsey", "Morley", "Headingley"], travel: "right on our doorstep in West Yorkshire", intro: "from fast-growing startups" },
  { kind: "city", slug: "liverpool", name: "Liverpool", region: "Merseyside", nearby: ["Birkenhead", "Bootle", "St Helens", "the Wirral"], travel: "a clear run west along the M62", intro: "from independent brands" },
  { kind: "city", slug: "sheffield", name: "Sheffield", region: "South Yorkshire", nearby: ["Rotherham", "Barnsley", "Chesterfield", "Dronfield"], travel: "just down the M1 in South Yorkshire", intro: "from startups and makers" },
  { kind: "city", slug: "birmingham", name: "Birmingham", region: "the West Midlands", nearby: ["Solihull", "Wolverhampton", "Dudley", "Walsall"], travel: "down the M6", intro: "from ambitious startups" },
  { kind: "city", slug: "nottingham", name: "Nottingham", region: "the East Midlands", nearby: ["West Bridgford", "Beeston", "Arnold", "Carlton"], travel: "down the M1", intro: "from independent brands" },
  { kind: "city", slug: "newcastle", name: "Newcastle", region: "Tyne and Wear", nearby: ["Gateshead", "Jesmond", "Gosforth", "Wallsend"], travel: "up the A1", intro: "from fast-growing startups" },

  // ---- Bradford neighbourhoods (EXPERIMENT) ----
  { kind: "area", slug: "manningham", name: "Manningham", nearby: ["Girlington", "Heaton", "Frizinghall", "the city centre"] },
  { kind: "area", slug: "heaton", name: "Heaton", nearby: ["Manningham", "Frizinghall", "Daisy Hill", "Toller Lane"] },
  { kind: "area", slug: "wibsey", name: "Wibsey", nearby: ["Buttershaw", "Odsal", "Low Moor", "Great Horton"] },
  { kind: "area", slug: "idle", name: "Idle", nearby: ["Thackley", "Greengates", "Wrose", "Eccleshill"] },
  { kind: "area", slug: "great-horton", name: "Great Horton", nearby: ["Lidget Green", "Clayton", "Buttershaw", "Horton Bank Top"] },
  { kind: "area", slug: "little-horton", name: "Little Horton", nearby: ["West Bowling", "Marshfields", "Canterbury", "the city centre"] },
  { kind: "area", slug: "clayton", name: "Clayton", nearby: ["Thornton", "Allerton", "Great Horton", "Queensbury"] },
  { kind: "area", slug: "thornton", name: "Thornton", nearby: ["Clayton", "Allerton", "Denholme", "Queensbury"] },
  { kind: "area", slug: "eccleshill", name: "Eccleshill", nearby: ["Idle", "Undercliffe", "Bolton Woods", "Greengates"] },
  { kind: "area", slug: "allerton", name: "Allerton", nearby: ["Clayton", "Sandy Lane", "Lower Grange", "Thornton"] },
];

// Routes for the sitemap.
export const cityRoutes = cities.map((c) => `/${c.slug}/`);
