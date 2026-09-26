export type Insight = {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: { name: string; role: string };
  content: { heading?: string; body: string }[];
};

export const insights: Insight[] = [
  {
    slug: "sovereign-cloud-mesh",
    tag: "Engineering Whitepaper",
    date: "September 18, 2025",
    readTime: "8 min read",
    title: "Sovereign Cloud Mesh Architecture: Resilient Multi-Region Infrastructure for Bangladesh",
    excerpt: "A comprehensive architectural blueprint for decoupling national digital infrastructure from single-point cloud hyperscaler risks, achieving zero data egress leaks and 99.99% high availability across domestic data centers.",
    author: { name: "Arif Khan", role: "Head of Engineering & Chief Architect" },
    content: [
      {
        body: "Modern sovereign digital platforms require strict geographical residency guarantees alongside active-active reliability. Relying solely on foreign hyperscalers creates both regulatory non-compliance under Bangladesh's emerging data protection mandates and operational vulnerability during undersea submarine cable maintenance cycles."
      },
      {
        heading: "1. The Decoupling Mandate: Redundancy Beyond Single Hyperscalers",
        body: "Our Sovereign Cloud Mesh bridges domestic Tier-3 data center facilities (including Kaliakoir Hi-Tech Park and Motijheel IXPs) with distributed edge nodes. By deploying zero-trust eBPF-driven networking overlays, services achieve seamless packet routing without exposing raw network topographies to public internet transit."
      },
      {
        heading: "2. Zero Data Egress and National Data Sovereignty",
        body: "All citizen telemetry, transactional banking records, and agricultural supply chain ledgers are encrypted using customer-managed cryptographic keys stored on domestic hardware security modules (HSMs). Cross-border egress is strictly governed by automated policy agents that flag non-sovereign routing attempts."
      },
      {
        heading: "3. 99.99% High Availability Across Domestic Peering IXPs",
        body: "By peering directly at BDIX (Bangladesh Internet Exchange) nodes across Dhaka, Chattogram, and Sylhet, packet latency dropped from 72ms (round-trip via Singapore) to under 8ms domestically. This order-of-magnitude reduction enables real-time micro-finance transactions and low-latency video streaming even under intermittent international transit disruptions."
      },
      {
        heading: "4. Autonomous Disaster Recovery & Failover Protocol",
        body: "Automated Raft consensus clusters handle partition splits cleanly. When international or regional uplinks degrade, edge nodes transition into autonomous sovereign mode, storing cryptographic audit logs locally until quorum connectivity is re-established."
      }
    ]
  },
  {
    slug: "digital-transformation-roadmap-smes-bangladesh",
    tag: "Strategy",
    date: "April 28, 2026",
    readTime: "8 min read",
    title: "Digital transformation roadmap for SMEs in Bangladesh",
    excerpt: "A practical, budget-aware framework Bangladeshi small and mid-sized businesses can use to digitise operations — without overspending or over-engineering.",
    author: { name: "Md. Rakibul Islam", role: "Principal Consultant" },
    content: [
      { body: "Most SMEs in Bangladesh do not need a multi-year, six-figure transformation programme. They need a clear sequence: stabilise the basics, automate the repetitive, and only then invest in advanced analytics or AI." },
      { heading: "Phase 1 — Stabilise the basics", body: "Get a single source of truth for sales, inventory and customers. A modest cloud accounting tool plus a structured CRM resolves 70% of operational chaos." },
      { heading: "Phase 2 — Automate the repetitive", body: "Identify the five most repeated tasks each week. Automate those first — invoicing, stock alerts, customer follow-ups. ROI here is measurable in weeks." },
      { heading: "Phase 3 — Connect & report", body: "Once data flows cleanly, add lightweight dashboards. Leadership decisions stop relying on memory and start relying on numbers." },
      { heading: "Phase 4 — Scale selectively", body: "Only after the first three phases should you invest in advanced systems — ERP, e-commerce, AI. Skipping ahead is the most common reason transformations fail." },
    ],
  },
  {
    slug: "building-ott-platforms-emerging-markets",
    tag: "Technology",
    date: "April 14, 2026",
    readTime: "7 min read",
    title: "Building OTT platforms for emerging markets",
    excerpt: "Lessons from launching Akash OTT — infrastructure, content, and the user experience that matters in bandwidth-constrained markets.",
    author: { name: "Sumaiya Rahman", role: "Head of Engineering" },
    content: [
      { body: "Building an OTT platform in Bangladesh is not the same as building one in San Francisco. Bandwidth, devices, payments and content rights all behave differently." },
      { heading: "Optimise for low-bandwidth", body: "Adaptive bitrate is mandatory. Default to lower starting bitrates and let users opt up — not down." },
      { heading: "Local payments win", body: "bKash, Nagad, Rocket and operator billing convert 5–10× better than international cards for the mass market." },
      { heading: "Content > tech", body: "Subscribers stay for stories, not for buffering speed. Invest at least 60% of your budget in content and licensing." },
    ],
  },
  {
    slug: "scaling-last-mile-delivery-bangladesh",
    tag: "E-commerce",
    date: "March 30, 2026",
    readTime: "6 min read",
    title: "Scaling last-mile delivery across all 64 districts",
    excerpt: "How a hybrid logistics model unlocked nationwide e-commerce reach for our retail clients.",
    author: { name: "Tanvir Ahmed", role: "Operations Lead" },
    content: [
      { body: "Last-mile is where most Bangladeshi e-commerce dreams die. The fix is rarely a single national fleet — it's a hybrid model." },
      { heading: "Tier 1 — Own fleet in metros", body: "Dhaka, Chattogram and Sylhet justify owned bikes and dispatch hubs. Quality control and brand experience are too important to outsource." },
      { heading: "Tier 2 — Partner couriers", body: "For the next 20 cities, partner with established couriers under SLAs. Pay slightly more for reliability." },
      { heading: "Tier 3 — Hub & spoke", body: "Remaining districts use hub-and-spoke with local agents. Slower, but cheap, scalable and reliable enough for non-perishable goods." },
    ],
  },
  {
    slug: "customer-centricity-beats-strategy",
    tag: "Leadership",
    date: "March 12, 2026",
    readTime: "5 min read",
    title: "Why customer-centricity beats every other strategy",
    excerpt: "Our managing director on the operating principles behind a decade of repeat clients.",
    author: { name: "Managing Director", role: "YESS Bangla" },
    content: [
      { body: "Strategy decks come and go. The companies that survive a decade do one thing relentlessly: stay obsessed with the customer." },
      { heading: "Listen more than you talk", body: "Every quarterly review starts with a customer call, not a slide. Anything else risks optimising for the wrong thing." },
      { heading: "Make it easy to complain", body: "Friction in feedback hides the real problems. Make complaining easy and you'll learn faster than any survey." },
    ],
  },
  {
    slug: "build-buy-integrate-enterprise-software",
    tag: "IT Services",
    date: "February 22, 2026",
    readTime: "9 min read",
    title: "When to build, buy or integrate enterprise software",
    excerpt: "A decision framework for CTOs evaluating the make-vs-buy question in regulated industries.",
    author: { name: "Sumaiya Rahman", role: "Head of Engineering" },
    content: [
      { body: "Build when it's a competitive differentiator. Buy when it's a commodity. Integrate when both are partly true." },
      { heading: "Build", body: "If the software directly drives revenue or differentiation, build it. You'll spend more upfront and own the roadmap." },
      { heading: "Buy", body: "Accounting, HR, generic CRM — buy. Don't reinvent commodity wheels." },
      { heading: "Integrate", body: "When 70% is commodity and 30% is unique, buy the platform and integrate custom modules. Most enterprise stacks live here." },
    ],
  },
  {
    slug: "designing-trust-financial-products",
    tag: "Design",
    date: "February 5, 2026",
    readTime: "6 min read",
    title: "Designing trust into financial products",
    excerpt: "Visual and interaction patterns that drive higher conversion in fintech apps.",
    author: { name: "Yess Studio Team", role: "Design Practice" },
    content: [
      { body: "Trust in fintech is built in microseconds. Users decide whether to enter their card details based on how the page feels — not what it says." },
      { heading: "Show the security cues", body: "Lock icons, bank logos, security badges — show them where users are about to act, not buried in the footer." },
      { heading: "Slow down the irreversible", body: "Add a confirmation step before destructive actions. The 200ms friction prevents costly mistakes and builds confidence." },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
