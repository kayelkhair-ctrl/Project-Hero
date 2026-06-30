// Data for the specialist service deep-dive pages. Each entry generates a
// distinct, SEO-targeted landing page at /services/<slug>/ via
// scripts/build-service-pages.mjs. Keywords + volumes (Semrush UK, June 2026)
// are noted per page so the intent behind each is clear and editable.
//
// IMPORTANT: keep the content genuinely distinct per page (not templated
// boilerplate) — these target real commercial keywords and must avoid thin /
// doorway-page patterns. Pricing is never stated as a fixed number (owner sets
// pricing; see the trust-rebuild note) — pages point to the free audit instead.

export const servicePages = [
  {
    // "ecommerce web design" 3,600/mo + "ecommerce website development" 1,900
    slug: "ecommerce-web-design",
    name: "Ecommerce web design",
    title: "Ecommerce Web Design | Online Shops That Sell | The Project Hero",
    description:
      "Ecommerce web design for UK businesses: fast, conversion-focused online shops built on the platform that fits you — Shopify, WooCommerce or custom. Built in Bradford, serving the UK.",
    ogDescription:
      "Conversion-focused ecommerce web design for UK businesses. Shopify, WooCommerce or custom, built to sell.",
    h1: "Ecommerce web design that's built to sell.",
    intro:
      "We design and build online shops that load fast, rank on Google and turn browsers into buyers — on the platform that actually fits your business, not the one that pays the biggest referral fee.",
    leadHtml: "A great online shop is measured in <em>sales</em>, not screenshots.",
    body: [
      "Most ecommerce sites lose money in the same few places: a slow product page, a confusing checkout, a search that returns nothing. We design around those moments. Every decision — layout, page speed, the number of steps to buy — is made to remove friction between a customer wanting your product and actually paying for it.",
      "We're platform-agnostic. For most independent retailers Shopify is the fastest route to a reliable, low-maintenance shop; for businesses with unusual catalogues, complex pricing or tight system integrations we build on WooCommerce or something bespoke. We recommend what suits your products and your team, then build it properly.",
    ],
    included: [
      {
        h3: "Conversion-first design",
        p: "Product, category and checkout pages designed around how people actually buy, with the path to purchase as short as it can be.",
      },
      {
        h3: "Speed and Core Web Vitals",
        p: "Fast-loading pages on mobile and desktop. Slow shops lose sales and rankings, so we build for both from the start.",
      },
      {
        h3: "Platform and integrations",
        p: "Shopify, WooCommerce or custom, wired into your payments, stock, shipping and accounting so the shop fits how you already work.",
      },
    ],
    sectionTwo: {
      h2: "Launching or replatforming?",
      body: [
        "Whether you're selling online for the first time or moving off a platform that's outgrown you, we handle the whole move: catalogue, content, redirects and data, so you keep your rankings and your customers don't notice the seams.",
        "And we don't vanish at launch. Stock changes, sales seasons, new lines — we can keep the shop maintained and improving as part of a care plan, so it keeps earning.",
      ],
    },
    faqs: [
      {
        q: "Which ecommerce platform is best?",
        a: "It depends on your products and how you run things. For most independent UK retailers Shopify is the most reliable, lowest-maintenance option. WooCommerce or a custom build makes sense when you have complex pricing, large catalogues or specific integrations. We recommend honestly based on your business, not commissions.",
      },
      {
        q: "Can you redesign or move my existing shop?",
        a: "Yes. We take on replatforming and redesigns regularly, including migrating products, content and customer data, and setting up redirects so you keep your search rankings.",
      },
      {
        q: "How much does an ecommerce website cost?",
        a: "It depends on the number of products, integrations and design work involved. The best next step is a free audit so we can scope it and give you a clear, fixed quote — no surprise bills.",
      },
    ],
    schemaName: "Ecommerce Web Design",
    schemaDescription:
      "Conversion-focused ecommerce web design and development for UK businesses on Shopify, WooCommerce or custom platforms.",
    related: [
      { label: "Shopify web design", href: "/services/shopify-web-design/" },
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Website maintenance", href: "/services/website-maintenance/" },
    ],
  },

  {
    // "website maintenance" 3,600/mo
    slug: "website-maintenance",
    name: "Website maintenance",
    title: "Website Maintenance and Support UK | The Project Hero",
    description:
      "Managed website maintenance and support for UK businesses: updates, security, backups, monitoring and a real team to call. Keep your site fast, safe and working. Bradford-based.",
    ogDescription:
      "Managed website maintenance for UK businesses: updates, security, backups and real support. Keep your site fast, safe and working.",
    h1: "Website maintenance that keeps your site fast, safe and working.",
    intro:
      "Websites aren't finished at launch. Software ages, security holes appear, content goes stale. Our maintenance plans keep your site updated, secure, backed up and improving — with real people to call when you need something changed.",
    leadHtml: "A website is a <em>living</em> thing, not a one-off purchase.",
    body: [
      "Left alone, even a great website slowly rots: plugins fall out of date, forms quietly break, pages get slower, and one day it's hacked or down and nobody noticed. Ongoing maintenance is the unglamorous work that prevents all of that — and it's far cheaper than an emergency rebuild.",
      "We handle the technical upkeep so you don't have to think about it: software and security updates, regular backups, uptime and security monitoring, performance checks, and small content or design changes as you need them. One predictable monthly plan, no surprise bills.",
    ],
    included: [
      {
        h3: "Updates and security",
        p: "Regular CMS, plugin and security updates, SSL, and proactive monitoring so vulnerabilities are patched before they're exploited.",
      },
      {
        h3: "Backups and monitoring",
        p: "Automated backups and uptime monitoring, so if anything ever goes wrong we can restore quickly and you're the first to know, not the last.",
      },
      {
        h3: "A real team to call",
        p: "Content edits, small design tweaks and fixes handled by senior people who know your site, usually within one working day.",
      },
    ],
    sectionTwo: {
      h2: "Who it's for",
      body: [
        "Businesses that depend on their website but don't want to babysit it: owners who'd rather run their company than chase plugin updates, and teams who want one accountable partner instead of a freelancer who's gone quiet.",
        "We'll happily take over a site we didn't build, after a quick audit to get it healthy. Maintenance is available on its own, or bundled with hosting and design as part of our Website as a Service plans.",
      ],
    },
    faqs: [
      {
        q: "What does website maintenance include?",
        a: "Software and security updates, backups, uptime and security monitoring, performance checks, and a set allowance of content or design changes each month — plus a real person to contact when you need something.",
      },
      {
        q: "Do you maintain websites you didn't build?",
        a: "Yes. We take over existing sites all the time. We start with a short audit to get it secure and stable, then keep it that way.",
      },
      {
        q: "How much is a maintenance plan?",
        a: "It depends on the size of the site and how much hands-on support you want. We keep it predictable and affordable — get a free audit and we'll recommend the right plan.",
      },
    ],
    schemaName: "Website Maintenance and Support",
    schemaDescription:
      "Managed website maintenance and support for UK businesses: updates, security, backups, monitoring and ongoing changes.",
    related: [
      { label: "Website as a Service", href: "/services/website-as-a-service/" },
      { label: "Hosting, care and support", href: "/services/hosting-care-support/" },
      { label: "Website redesign", href: "/services/website-redesign/" },
    ],
  },

  {
    // "conversion rate optimisation" 2,900/mo, CPC £23.36
    slug: "conversion-rate-optimisation",
    name: "Conversion rate optimisation",
    title: "Conversion Rate Optimisation (CRO) | The Project Hero",
    description:
      "Conversion rate optimisation for UK businesses: turn the traffic you already have into more enquiries and sales with research-led CRO. Bradford-based, senior team.",
    ogDescription:
      "Research-led conversion rate optimisation: turn the traffic you already have into more enquiries and sales.",
    h1: "Conversion rate optimisation: more from the traffic you already have.",
    intro:
      "You've paid for the visitors. CRO is about making more of them act. We use research, analytics and testing to find what's stopping people converting on your site — then fix it.",
    leadHtml: "The cheapest customer is the one you <em>already</em> have on the page.",
    body: [
      "Doubling your traffic is expensive. Doubling the percentage of visitors who actually enquire or buy is often far cheaper — and it makes every other marketing pound work harder. That's conversion rate optimisation: methodically improving how well your site turns visitors into customers.",
      "We don't guess or redesign on a hunch. We look at the data and the actual behaviour — where people drop off, what they ignore, where they hesitate — form a hypothesis, change one thing, and measure whether it worked. Evidence over opinion.",
    ],
    included: [
      {
        h3: "Research and analysis",
        p: "Analytics review, funnel analysis, heatmaps and user behaviour to find exactly where and why visitors are dropping off.",
      },
      {
        h3: "Testing and iteration",
        p: "Structured changes to copy, layout, calls to action and forms, measured against real results rather than preference.",
      },
      {
        h3: "Page and funnel fixes",
        p: "Faster pages, clearer messaging, simpler forms and checkouts that remove friction at the moments that decide a sale.",
      },
    ],
    sectionTwo: {
      h2: "Built on evidence, not opinion",
      body: [
        "Anyone can have an opinion about your website. CRO replaces opinions with evidence: what your visitors actually do, tested against what we change. It's the difference between a redesign that feels nice and one that demonstrably makes you more money.",
        "It works best alongside good traffic, so we often pair CRO with SEO and paid campaigns, making sure the visitors you earn or buy don't go to waste.",
      ],
    },
    faqs: [
      {
        q: "What is conversion rate optimisation?",
        a: "It's the practice of improving the percentage of your website visitors who take a desired action — enquire, buy, sign up — by studying behaviour, removing friction and testing changes against real results.",
      },
      {
        q: "How is CRO different from SEO?",
        a: "SEO brings more of the right people to your site; CRO makes more of them act once they arrive. They work best together — there's little point ranking well if visitors don't convert.",
      },
      {
        q: "Do I need a lot of traffic for CRO?",
        a: "More traffic gives faster, clearer results, but even modest sites benefit from removing obvious friction. We'll be honest about what's worth testing at your traffic level.",
      },
    ],
    schemaName: "Conversion Rate Optimisation",
    schemaDescription:
      "Research-led conversion rate optimisation (CRO) for UK businesses: analytics, testing and funnel improvements that turn visitors into customers.",
    related: [
      { label: "SEO and GEO visibility", href: "/services/seo-geo/" },
      { label: "Landing page design", href: "/services/landing-page-design/" },
      { label: "Web design and development", href: "/services/web-design-development/" },
    ],
  },

  {
    // "wordpress web design" 2,400/mo
    slug: "wordpress-web-design",
    name: "WordPress web design",
    title: "WordPress Web Design and Development | The Project Hero",
    description:
      "WordPress web design and development done properly: fast, secure, easy to edit, no plugin bloat. For UK businesses. Built and maintained in Bradford, Yorkshire.",
    ogDescription:
      "WordPress web design done properly: fast, secure, easy to edit, no plugin bloat. For UK businesses.",
    h1: "WordPress web design, done properly.",
    intro:
      "WordPress powers a huge share of the web — and a lot of it is slow, bloated and insecure. We build WordPress sites the right way: fast, secure, easy to edit, and not held together by fifteen plugins.",
    leadHtml: "WordPress is only as good as the <em>people</em> who build it.",
    body: [
      "WordPress gets a bad reputation it doesn't always deserve. The problems usually come from how a site is built — a heavy off-the-shelf theme, a pile of plugins each doing the job of one, no maintenance — not from WordPress itself. Built carefully, it's a flexible, business-friendly platform you can actually manage yourself.",
      "We build clean, lightweight WordPress sites with only what they need, set up so your team can update content confidently without breaking the design. And because WordPress needs looking after, we can keep it updated, secure and backed up as part of a care plan.",
    ],
    included: [
      {
        h3: "Custom, lightweight builds",
        p: "Bespoke designs built for speed — no bloated themes or page builders dragging down your load times and rankings.",
      },
      {
        h3: "Easy to edit",
        p: "A clean, well-structured editing experience so you can update content yourself without fear of breaking things.",
      },
      {
        h3: "Secure and maintained",
        p: "Hardened, kept up to date and backed up, so your WordPress site doesn't become the security liability so many do.",
      },
    ],
    sectionTwo: {
      h2: "New build or rescue job",
      body: [
        "We build new WordPress sites from scratch, and we take on existing ones that have gone slow, insecure or unmanageable. Sometimes the right answer is a tune-up; sometimes it's a clean rebuild. We'll tell you straight which one you need.",
        "Not sure WordPress is even right for you? We'll say so. For some businesses a simpler or custom-built site is faster and cheaper to run — we recommend the platform that fits, not the one we feel like building.",
      ],
    },
    faqs: [
      {
        q: "Is WordPress a good choice for my website?",
        a: "For many businesses, yes — it's flexible, well-supported and easy to edit when built properly. For others, a simpler or custom build is faster and cheaper to maintain. We'll recommend honestly based on your needs.",
      },
      {
        q: "Why is my WordPress site so slow?",
        a: "Usually a heavy theme, too many plugins, unoptimised images or no caching. We can audit it, strip out the bloat and get it fast again, or rebuild it cleanly if that's the better value.",
      },
      {
        q: "Can you maintain my WordPress site?",
        a: "Yes. We keep WordPress sites updated, secure and backed up as part of a maintenance plan, including ones we didn't originally build.",
      },
    ],
    schemaName: "WordPress Web Design and Development",
    schemaDescription:
      "Custom, lightweight WordPress web design and development for UK businesses: fast, secure, easy to edit and properly maintained.",
    related: [
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Website maintenance", href: "/services/website-maintenance/" },
      { label: "Website redesign", href: "/services/website-redesign/" },
    ],
  },

  {
    // "small business web design" 1,600/mo + "custom web design" 1,000
    slug: "small-business-web-design",
    name: "Small business web design",
    title: "Small Business Web Design | Senior and Affordable | The Project Hero",
    description:
      "Web design for small businesses across the UK: professional, affordable, conversion-focused sites built by a senior team, not a template factory. Bradford, Yorkshire.",
    ogDescription:
      "Web design for small businesses: senior, custom work at a price that's fair for a smaller business.",
    h1: "Small business web design, built by senior people.",
    intro:
      "Small businesses get a raw deal online: cheap template sites that don't convert, or agency prices that don't make sense. We sit in between — senior, custom work at a price that's fair for a smaller business.",
    leadHtml: "Small business doesn't have to mean a <em>small-time</em> website.",
    body: [
      "When you run a small business, your website often has to do the job of a salesperson, a brochure and a receptionist at once — without a marketing department behind it. It needs to look credible, explain what you do clearly, and make it easy to get in touch. Most cheap templates fail at least one of those.",
      "We build proper, custom websites for small businesses: designed around your customers, fast, easy to find on Google, and genuinely yours. No drag-and-drop template everyone else is using, no agency bloat you're paying for but don't need.",
    ],
    included: [
      {
        h3: "Custom, not template",
        p: "A site designed around your business and your customers, not a theme with your logo dropped in like everyone else on your high street.",
      },
      {
        h3: "Found on Google",
        p: "Local and on-page SEO built in, so the customers searching for what you do can actually find you.",
      },
      {
        h3: "Easy and affordable to run",
        p: "Simple to update, and available on an affordable monthly plan if you'd rather we hosted and looked after it for you.",
      },
    ],
    sectionTwo: {
      h2: "Senior work, sensible prices",
      body: [
        "Because we're a lean team of senior people, you're not paying for account managers, sales layers or a six-week kick-off. You talk directly to the people doing the work, and the money goes into the website, not the overhead.",
        "Want it handled completely? Our Website as a Service plans wrap design, hosting, maintenance and support into one predictable monthly cost — ideal for a small business that doesn't want to manage any of it.",
      ],
    },
    faqs: [
      {
        q: "How much does a small business website cost?",
        a: "Less than an agency, more than a five-pound template that won't convert. It depends on what you need — we scope every project and quote it clearly after a free audit, with the option of a monthly plan to spread the cost.",
      },
      {
        q: "Can you build a website on a budget?",
        a: "Yes — being lean is the point. We'll be honest about what's essential and what can wait, and our monthly plans make a professional site affordable without cutting corners.",
      },
      {
        q: "Will I be able to update it myself?",
        a: "Yes, if you want to — we build sites that are straightforward to edit. Or we can handle changes for you as part of a care plan.",
      },
    ],
    schemaName: "Small Business Web Design",
    schemaDescription:
      "Affordable, custom web design for small businesses across the UK, built by a senior team and optimised to convert and rank.",
    related: [
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Website as a Service", href: "/services/website-as-a-service/" },
      { label: "SEO and GEO visibility", href: "/services/seo-geo/" },
    ],
  },

  {
    // "website redesign" 1,300/mo + "website migration" 880
    slug: "website-redesign",
    name: "Website redesign",
    title: "Website Redesign Services | Keep Your Rankings | The Project Hero",
    description:
      "Website redesign for UK businesses: modernise an outdated, slow or underperforming site without losing your Google rankings. Senior team, Bradford-based.",
    ogDescription:
      "Website redesign that modernises your site without losing your Google rankings. SEO-safe migrations included.",
    h1: "Website redesign that doesn't cost you your rankings.",
    intro:
      "If your site looks dated, loads slowly or just doesn't bring in enquiries any more, a redesign can transform it. Done carefully — protecting your SEO and migrating cleanly — it's one of the best investments a business can make online.",
    leadHtml: "A redesign should win you customers, not <em>reset</em> your progress.",
    body: [
      "The biggest risk in a redesign isn't the design — it's losing what already works. Plenty of businesses relaunch a beautiful new site and watch their Google traffic fall off a cliff because URLs changed, redirects were missed and content was dropped. We plan redesigns to protect your rankings, not gamble with them.",
      "We start by understanding what's working, what isn't and why people aren't converting. Then we redesign around your goals — clearer messaging, faster pages, a better path to enquiry — and migrate carefully with redirects and testing so nothing breaks and nothing is lost.",
    ],
    included: [
      {
        h3: "SEO-safe migration",
        p: "URL mapping, redirects and content audits so the rankings and traffic you've built carry over to the new site.",
      },
      {
        h3: "Conversion-led redesign",
        p: "Not just a fresh coat of paint — a rethink of messaging, structure and journeys so the new site actually performs better.",
      },
      {
        h3: "Faster and modern",
        p: "Modern, accessible, fast-loading pages that work on every device and reflect where your business is now.",
      },
    ],
    sectionTwo: {
      h2: "Is it time for a redesign?",
      body: [
        "Good signs you're due: the site looks dated next to competitors, it's slow or clunky on mobile, it's hard to update, or it simply isn't generating enquiries. If you're not sure, a free audit will tell you whether a redesign is worth it, or whether a few targeted fixes would do.",
        "We'll always tell you honestly. Sometimes a full redesign is the right call; sometimes you'd get most of the benefit from a faster rebuild of a few key pages. Either way, you'll know before you spend.",
      ],
    },
    faqs: [
      {
        q: "Will a redesign hurt my Google rankings?",
        a: "It can if it's done carelessly, but done right it shouldn't. We map URLs, set up redirects and audit content so your existing rankings and traffic carry over to the new site. Protecting SEO is built into how we redesign.",
      },
      {
        q: "How do I know if I need a redesign?",
        a: "If your site looks dated, is slow on mobile, is hard to update or isn't bringing in enquiries, it's worth reviewing. A free audit will tell you whether a redesign or smaller fixes make more sense.",
      },
      {
        q: "Can you redesign without rebuilding everything?",
        a: "Sometimes, yes. If the foundations are sound we can modernise the design and key pages without a full rebuild. We'll recommend whatever gives you the best result for the budget.",
      },
    ],
    schemaName: "Website Redesign",
    schemaDescription:
      "Website redesign and migration for UK businesses that modernises an outdated site while protecting existing Google rankings.",
    related: [
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Conversion rate optimisation", href: "/services/conversion-rate-optimisation/" },
      { label: "Website maintenance", href: "/services/website-maintenance/" },
    ],
  },

  {
    // "generative engine optimisation" 1,300/mo
    slug: "generative-engine-optimisation",
    name: "Generative Engine Optimisation",
    title: "Generative Engine Optimisation (GEO) | Get Cited by AI | The Project Hero",
    description:
      "Generative Engine Optimisation (GEO): get your business cited in ChatGPT, Gemini, Perplexity and AI search. Research-led GEO from a UK consultancy. Bradford, Yorkshire.",
    ogDescription:
      "Generative Engine Optimisation (GEO): get your business cited in ChatGPT, Gemini and Perplexity, not just ranked on Google.",
    h1: "Generative Engine Optimisation: be the answer AI gives.",
    intro:
      "More people are asking ChatGPT, Gemini and Perplexity instead of Google — and those tools recommend businesses by name. Generative Engine Optimisation is how you make sure it's your business they cite, not a competitor's.",
    leadHtml: "Search is splitting in two, and most businesses optimise for only <em>half</em> of it.",
    body: [
      "When someone asks an AI assistant who's a good web designer in Yorkshire, or what the best tool for something is, it gives a short list of specific answers. Being on that list is the new front page of Google — and it's decided by different signals: how clearly your expertise is described, how often you're referenced, and how machine-readable your site is.",
      "GEO is still early, which is exactly why it's worth doing now. We make your content quotable and well-structured, build the entity and authority signals AI models rely on, and track how you're being represented across the major assistants, so you show up as the answer while competitors are still working it out.",
    ],
    included: [
      {
        h3: "Quotable, structured content",
        p: "Content and schema written to be clearly understood, extracted and cited by AI models, not just crawled by Google.",
      },
      {
        h3: "Authority and entity signals",
        p: "Building the references, consistency and structured data that large language models use to decide who to trust and recommend.",
      },
      {
        h3: "AI visibility tracking",
        p: "Monitoring how your business is described and cited across ChatGPT, Gemini and Perplexity, and improving it over time.",
      },
    ],
    sectionTwo: {
      h2: "GEO and SEO, together",
      body: [
        "GEO doesn't replace SEO, it extends it. Google search isn't going away, so we build both together: ranking in traditional results and being cited in AI answers, from one joined-up visibility strategy rather than two disconnected efforts.",
        "We're a UK consultancy that's been early to GEO on purpose. Getting cited by AI compounds like SEO does — the businesses that establish themselves now will be hard to dislodge later.",
      ],
    },
    faqs: [
      {
        q: "What is Generative Engine Optimisation (GEO)?",
        a: "GEO is the practice of optimising your online presence so AI assistants like ChatGPT, Gemini and Perplexity understand, trust and cite your business when answering relevant questions — the AI-search equivalent of ranking on Google.",
      },
      {
        q: "How is GEO different from SEO?",
        a: "SEO targets traditional search rankings; GEO targets being recommended inside AI-generated answers. The signals differ but overlap, so we build both together rather than treating them separately.",
      },
      {
        q: "Does GEO actually work yet?",
        a: "AI assistants already drive real traffic and referrals, and they're growing fast. GEO is early, which is the opportunity: establishing authority now is far easier than catching up once everyone's doing it.",
      },
    ],
    schemaName: "Generative Engine Optimisation (GEO)",
    schemaDescription:
      "Generative Engine Optimisation (GEO) for UK businesses: getting cited and recommended by AI assistants such as ChatGPT, Gemini and Perplexity.",
    related: [
      { label: "SEO and GEO visibility", href: "/services/seo-geo/" },
      { label: "AI apps and automation", href: "/services/ai-applications-automation/" },
      { label: "Web design and development", href: "/services/web-design-development/" },
    ],
  },

  {
    // "shopify web design" 880/mo
    slug: "shopify-web-design",
    name: "Shopify web design",
    title: "Shopify Web Design and Development | The Project Hero",
    description:
      "Shopify web design and development for UK retailers: custom, fast, conversion-focused stores. Setup, theme customisation and migrations. Bradford-based, serving the UK.",
    ogDescription:
      "Custom Shopify web design and development for UK retailers: fast, conversion-focused stores built to sell.",
    h1: "Shopify web design for shops that mean business.",
    intro:
      "Shopify is the most reliable way for most independent retailers to sell online — if it's set up and designed well. We build custom Shopify stores that look the part, load fast and are built to convert.",
    leadHtml: "Shopify gives you the engine; design is what makes it <em>sell</em>.",
    body: [
      "Shopify handles the hard parts of ecommerce brilliantly: payments, security, hosting and reliability you'd struggle to match on a custom build. What it doesn't do on its own is make your store stand out or convert well — that comes down to design, structure and the details of the buying journey.",
      "We design and build custom Shopify stores around your brand and your products: clean theme customisation (not a stock theme everyone else uses), fast product and checkout pages, and the apps and integrations you need without slowing the store to a crawl.",
    ],
    included: [
      {
        h3: "Custom store design",
        p: "Tailored theme work that reflects your brand and stands out, instead of a stock template shared by thousands of other shops.",
      },
      {
        h3: "Built to convert",
        p: "Product, collection and checkout pages designed and optimised to turn visitors into orders, fast on mobile and desktop.",
      },
      {
        h3: "Setup and migration",
        p: "New stores set up properly, or existing shops migrated to Shopify cleanly: products, content, redirects and rankings intact.",
      },
    ],
    sectionTwo: {
      h2: "Why Shopify, and when not",
      body: [
        "For most independent retailers Shopify is the sensible choice: low maintenance, secure, and reliable through your busiest sales days. We'll set it up to make the most of it, with only the apps you genuinely need.",
        "If your business has unusual requirements — complex pricing, deep system integrations, an enormous catalogue — we'll tell you honestly whether WooCommerce or a custom build would serve you better. The platform should fit your business, not the other way round.",
      ],
    },
    faqs: [
      {
        q: "Is Shopify right for my business?",
        a: "For most independent UK retailers, yes — it's reliable, secure and low-maintenance. If you have complex pricing or unusual integrations, we'll honestly tell you whether another platform fits better.",
      },
      {
        q: "Can you migrate my existing shop to Shopify?",
        a: "Yes. We migrate stores to Shopify regularly, moving products, content and customer data, and setting up redirects so you keep your search rankings.",
      },
      {
        q: "Do you use stock themes?",
        a: "We customise to your brand rather than shipping an untouched stock theme. You get a store that looks like yours, built for speed and conversions, not one identical to thousands of others.",
      },
    ],
    schemaName: "Shopify Web Design and Development",
    schemaDescription:
      "Custom Shopify web design, development and migration for UK retailers: fast, on-brand, conversion-focused online stores.",
    related: [
      { label: "Ecommerce web design", href: "/services/ecommerce-web-design/" },
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Website maintenance", href: "/services/website-maintenance/" },
    ],
  },

  {
    // "ai automation agency" 880/mo
    slug: "ai-automation",
    name: "AI automation",
    title: "AI Automation for Business | The Project Hero",
    description:
      "AI automation for UK businesses: cut manual work, automate workflows and build custom AI tools around how you actually operate. Senior team in Bradford, Yorkshire.",
    ogDescription:
      "AI automation for UK businesses: cut manual work and build custom AI tools around how you actually operate.",
    h1: "AI automation that gives your team their time back.",
    intro:
      "Most businesses are sitting on hours of repetitive manual work that AI and automation can quietly take off their plate. We find those tasks and build the tools and workflows that handle them, around how your business actually runs.",
    leadHtml: "The point of automation isn't novelty — it's <em>hours</em> back every week.",
    body: [
      "There's a lot of AI hype and not much practical help. We focus on the unglamorous wins: the data someone re-keys between systems, the enquiries that wait too long for a reply, the reports built by hand every month, the content that never gets written. Each one is time and money leaking out of the business.",
      "We map where that time goes, then build automations and AI tools to handle it: assistants trained on your own knowledge, workflows that move data between your systems, and processes that run themselves. Practical, reliable, and built around your operation — not a generic tool you have to bend your business to fit.",
    ],
    included: [
      {
        h3: "Workflow automation",
        p: "Connect your systems and automate the repetitive admin — data entry, handoffs, follow-ups and reporting — that eats your team's week.",
      },
      {
        h3: "Custom AI assistants",
        p: "Assistants and chatbots trained on your own knowledge to handle enquiries, support and internal questions accurately.",
      },
      {
        h3: "Content and data systems",
        p: "AI-assisted content and reporting that keep your marketing active and your numbers up to date without the manual grind.",
      },
    ],
    sectionTwo: {
      h2: "Practical, not hype",
      body: [
        "We're not here to bolt a chatbot onto your homepage for the sake of it. We start with where the real time and money are going, then automate the things that pay for themselves — and we're honest when a process is better left to a human.",
        "Because we also build the websites and systems these tools plug into, the automation actually fits together with the rest of your digital setup, instead of being one more disconnected thing to manage.",
      ],
    },
    faqs: [
      {
        q: "What can AI automation actually do for my business?",
        a: "Typically it removes repetitive manual work: re-keying data between systems, answering common enquiries, generating routine reports and content, and chasing follow-ups. The result is hours saved and fewer things falling through the cracks.",
      },
      {
        q: "Is this just adding a chatbot?",
        a: "No. A chatbot is one option, but most value comes from automating behind-the-scenes workflows. We start from where your time is going and build what pays for itself, not gimmicks.",
      },
      {
        q: "Do I need to be technical?",
        a: "No. We handle the build and explain it in plain English. You tell us where the bottlenecks are; we design the automation around how you already work.",
      },
    ],
    schemaName: "AI Automation",
    schemaDescription:
      "AI automation for UK businesses: workflow automation, custom AI assistants and content systems built around how a business operates.",
    related: [
      { label: "AI apps and automation", href: "/services/ai-applications-automation/" },
      { label: "Digital transformation", href: "/services/digital-transformation/" },
      { label: "Web application development", href: "/services/web-application-development/" },
    ],
  },

  {
    // "landing page design" 480/mo
    slug: "landing-page-design",
    name: "Landing page design",
    title: "Landing Page Design That Converts | The Project Hero",
    description:
      "High-converting landing page design for campaigns, ads and launches: fast, focused pages built to turn clicks into leads and sales. UK-wide, built in Bradford.",
    ogDescription:
      "High-converting landing page design for campaigns and ads: fast, focused pages built to turn clicks into leads.",
    h1: "Landing page design built to convert, not just to look good.",
    intro:
      "A landing page has one job: turn a click into an action. We design focused, fast, persuasive landing pages for campaigns, ads and launches — built around a single goal and optimised to hit it.",
    leadHtml: "One page, one goal, <em>one</em> clear next step.",
    body: [
      "Sending paid traffic or a campaign to your homepage wastes it. A homepage tries to do everything; a landing page does one thing — capture a lead, sell a product, drive sign-ups — and removes every distraction that isn't that. That focus is what lifts conversion rates.",
      "We design landing pages around a single message and call to action: clear, credible, fast to load, and structured to guide the visitor straight to the action. Whether it's for a Google Ads campaign, a product launch or a lead magnet, the page is built to earn its traffic.",
    ],
    included: [
      {
        h3: "Single-goal focus",
        p: "Every element earns its place toward one action: no menus, no distractions, no competing calls to action pulling attention away.",
      },
      {
        h3: "Persuasive and credible",
        p: "Clear messaging, proof and a strong call to action, structured to move visitors from interested to converted.",
      },
      {
        h3: "Fast and campaign-ready",
        p: "Quick-loading, mobile-first pages ready to point your ads or campaign at, with tracking set up to measure results.",
      },
    ],
    sectionTwo: {
      h2: "Made to be measured",
      body: [
        "A landing page is only as good as its conversion rate, so we build with measurement in mind: clear goals, proper tracking, and a structure we can test and improve. If you're spending on ads, that feedback loop quickly pays for itself.",
        "Landing pages pair naturally with our conversion rate optimisation and SEO work — we can design the page, drive traffic to it, and keep improving how well it converts.",
      ],
    },
    faqs: [
      {
        q: "What makes a landing page different from a normal web page?",
        a: "Focus. A landing page is built around a single goal and strips out everything else — navigation, side messages, competing links — so visitors do one thing. That focus is what makes it convert better than a general page.",
      },
      {
        q: "Do I need a landing page if I have a website?",
        a: "If you're running ads or campaigns, usually yes. Dedicated landing pages almost always convert paid traffic better than sending it to your homepage, because they match the specific message people clicked on.",
      },
      {
        q: "Can you set up tracking and testing?",
        a: "Yes. We set up conversion tracking so you can see what the page is actually doing, and we can test and refine it as part of ongoing conversion rate optimisation.",
      },
    ],
    schemaName: "Landing Page Design",
    schemaDescription:
      "High-converting landing page design for UK campaigns, ads and launches: focused, fast, measurable pages built to convert.",
    related: [
      { label: "Conversion rate optimisation", href: "/services/conversion-rate-optimisation/" },
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "SEO and GEO visibility", href: "/services/seo-geo/" },
    ],
  },

  {
    // "bespoke web design" 1,600/mo + "custom website design" 880
    slug: "bespoke-web-design",
    name: "Bespoke web design",
    title: "Bespoke Web Design | Custom-Built, Not Templated | The Project Hero",
    description:
      "Bespoke web design for UK businesses: fully custom websites designed and built from scratch around your brand and your customers — no templates, no page-builder bloat, no lock-in. Bradford, Yorkshire.",
    ogDescription:
      "Bespoke web design: fully custom websites built from scratch around your brand, not a template everyone else is using.",
    h1: "Bespoke web design, built around you — not a template.",
    intro:
      "Most websites are the same theme with a different logo. A bespoke site is designed and built from scratch around your business, your brand and the way your customers actually decide. It looks like no one else's, and it performs because every decision was made for you.",
    leadHtml: "A template makes you look like everyone else. Bespoke makes you look like <em>you</em>.",
    body: [
      "Template and page-builder sites are quick and cheap, and it shows. They carry layout choices made for a generic business, load slowly under the weight of features you'll never use, and leave you looking interchangeable with every competitor who bought the same theme. For a lot of businesses that's a ceiling on how credible — and how findable — they can be.",
      "Bespoke is the opposite approach: we start from your goals and your customers, design something genuinely yours, and build it on clean, lightweight code we write ourselves. That means faster pages, better search performance, a design that reflects your brand properly, and a site you own outright — no proprietary builder holding your business hostage.",
    ],
    included: [
      {
        h3: "Designed from scratch",
        p: "A custom design shaped around your brand, your message and how your customers buy — not a stock theme with your colours dropped in.",
      },
      {
        h3: "Clean, fast, owned code",
        p: "Hand-built on lightweight foundations for speed and search performance, with no page-builder bloat and no platform lock-in.",
      },
      {
        h3: "Built to convert and rank",
        p: "Structure, messaging and on-page SEO designed in from the start, so the site earns enquiries rather than just looking the part.",
      },
    ],
    sectionTwo: {
      h2: "Is bespoke right for you?",
      body: [
        "Bespoke earns its keep when your website genuinely matters to the business — when you're competing on credibility, when an off-the-shelf look would undersell you, or when you need things a template simply can't do. If you mainly need a simple presence quickly, we'll tell you honestly that a lighter build is better value.",
        "Either way you talk directly to the senior people designing and building it, and you can have it fully looked after on one of our Website as a Service plans — so bespoke doesn't have to mean a big one-off bill.",
      ],
    },
    faqs: [
      {
        q: "What does bespoke web design mean?",
        a: "It means your website is designed and built from scratch, specifically for your business, rather than adapted from a ready-made template or theme. The design, structure and code are all created around your goals — so it's unique to you and built to perform.",
      },
      {
        q: "Is bespoke web design worth the cost?",
        a: "If your website is important to winning customers, usually yes. Bespoke sites are faster, better for SEO, properly on-brand and fully yours to own. If your needs are simple, we'll say so and recommend a lighter option — we quote honestly after a free audit.",
      },
      {
        q: "Will I be locked into a platform?",
        a: "No. We build on clean, open foundations and you own the result outright. There's no proprietary page builder you're forced to keep paying for, and you're free to host or maintain it however you like.",
      },
    ],
    schemaName: "Bespoke Web Design",
    schemaDescription:
      "Fully custom, bespoke web design and development for UK businesses: designed from scratch, built on clean owned code, optimised to convert and rank.",
    related: [
      { label: "Web design and development", href: "/services/web-design-development/" },
      { label: "Small business web design", href: "/services/small-business-web-design/" },
      { label: "Website redesign", href: "/services/website-redesign/" },
    ],
  },

  {
    // "marketing automation agency uk" 110/mo + "marketing automation" terms
    slug: "marketing-automation",
    name: "Marketing automation",
    title: "Marketing Automation Agency UK | The Project Hero",
    description:
      "Marketing automation for UK businesses: email flows, lead nurturing and CRM workflows that follow up, convert and retain customers automatically. Senior team in Bradford, Yorkshire.",
    ogDescription:
      "Marketing automation that follows up, nurtures and converts on autopilot: email flows, lead nurturing and CRM workflows.",
    h1: "Marketing automation that follows up so you don't have to.",
    intro:
      "Most leads never get a second touch, and most customers never hear from you again. Marketing automation fixes that quietly in the background — the right message, to the right person, at the right moment, without anyone remembering to send it.",
    leadHtml: "The money is rarely in the first email. It's in the <em>follow-up</em> nobody sends.",
    body: [
      "Businesses spend hard-won time and budget generating enquiries, then let them go cold because there's no time to chase. A new lead waits days for a reply; a quote never gets followed up; a past customer who'd happily buy again simply drifts away. Each gap is revenue leaking out, and it's almost always a process problem, not an effort problem.",
      "Marketing automation closes those gaps with systems that run themselves: welcome and nurture sequences that build trust, follow-ups that fire the moment someone enquires, win-back messages to past customers, and CRM workflows that keep everything tidy. We design it around your business and your tools, so it feels personal — not like a robot.",
    ],
    included: [
      {
        h3: "Email & lead nurture flows",
        p: "Automated welcome, nurture and follow-up sequences that turn new enquiries and sign-ups into customers without manual chasing.",
      },
      {
        h3: "CRM & pipeline workflows",
        p: "Your CRM set up to capture, tag and route leads automatically, so nothing slips through the cracks and your team always knows what's next.",
      },
      {
        h3: "Retention & win-back",
        p: "Lifecycle, re-engagement and win-back campaigns that bring quiet customers back and make each one worth more over time.",
      },
    ],
    sectionTwo: {
      h2: "Built around your tools",
      body: [
        "We work with the platforms you already use — Mailchimp, HubSpot, Klaviyo, ActiveCampaign and the rest — or recommend one if you're starting fresh. The goal is automation that fits your business and your stack, not another disconnected tool to manage.",
        "And because we also build the websites, forms and AI tools these flows connect to, it all joins up: a visitor becomes a lead, the lead gets nurtured, and the customer gets looked after — one system instead of five that don't talk to each other.",
      ],
    },
    faqs: [
      {
        q: "What is marketing automation?",
        a: "It's using software to send the right marketing messages automatically based on what someone does — signing up, enquiring, buying or going quiet. Things like welcome emails, lead nurturing and follow-ups happen on their own, so you stay in touch without doing it by hand.",
      },
      {
        q: "How is this different from your AI automation?",
        a: "Marketing automation focuses on customer communication — email flows, nurturing and retention. Our AI automation work is broader, covering internal workflows and custom AI tools. They overlap, and we'll often combine them, but this page is about automating your marketing follow-up specifically.",
      },
      {
        q: "Which platform do I need?",
        a: "Whichever fits your business — we work with Mailchimp, HubSpot, Klaviyo, ActiveCampaign and others, and we'll recommend honestly rather than pushing one. If you already have a tool, we'll usually build on it rather than move you.",
      },
    ],
    schemaName: "Marketing Automation",
    schemaDescription:
      "Marketing automation for UK businesses: email and lead-nurture flows, CRM workflows and retention campaigns that follow up and convert automatically.",
    related: [
      { label: "AI automation", href: "/services/ai-automation/" },
      { label: "Conversion rate optimisation", href: "/services/conversion-rate-optimisation/" },
      { label: "SEO and GEO visibility", href: "/services/seo-geo/" },
    ],
  },
];

export const serviceRoutes = servicePages.map((s) => `/services/${s.slug}/`);
