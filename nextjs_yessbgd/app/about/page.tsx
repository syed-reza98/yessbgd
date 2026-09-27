import Link from "next/link";
import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  Timeline,
  Users,
  Award,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Building,
  Building2,
  Globe2,
  TreePine,
  GraduationCap,
  Scale,
  FileCheck2,
  Stamp,
  Check,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about");
  return {
    title: page?.seo_title || "About Us | YESS Bangladesh — Leading Institutional Venture Builder",
    description:
      page?.seo_description ||
      "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech.",
  };
}

const metrics = [
  {
    value: "8+",
    label: "Operating Years",
    desc: "Continuous institutional venture building since 2018.",
    icon: TrendingUp,
    accent: "text-[#d4a359]",
  },
  {
    value: "13",
    label: "Subsidiaries",
    desc: "Independent portfolio companies operating at regional scale.",
    icon: Building2,
    accent: "text-[#35b0aa]",
  },
  {
    value: "500+",
    label: "Engineers & Operators",
    desc: "Full-time engineering, agronomist & product talent.",
    icon: Users,
    accent: "text-white",
  },
  {
    value: "ISO",
    label: "9001 / 27001",
    desc: "Certified governance, cybersecurity & data protocols.",
    icon: ShieldCheck,
    accent: "text-[#f6c87a]",
  },
];

const strategicPillars = [
  {
    num: "1",
    title: "1. Innovation & Deep Tech",
    tagline: "Sovereign microservices and transactional AI mesh.",
    desc: "AI, microservices, cloud telemetry, and sovereign transactional infrastructure architected to handle mission-critical high-concurrency loads across banking and statutory enterprise automation.",
    icon: BrainCircuit,
    category: "Sovereign Cloud & AI",
    subtext: "Tier-3 Infra • High Concurrency",
    metric1Label: "Core Engines",
    metric1Val: "Yess Soft & Shondhaan",
    metric2Label: "Daily Throughput",
    metric2Val: "1M+ Txn/day",
    href: "/about/methodology",
    action: "Explore Architecture",
  },
  {
    num: "2",
    title: "2. Institutional Governance & Transparency",
    tagline: "Bilateral fiduciary standards and clean audit trails.",
    desc: "Registered under RJSC C-184920, adhering to strict Bangladesh Bank fiduciary compliance, independent board oversight, and clean audit trails.",
    icon: Scale,
    category: "Statutory Fiduciary",
    subtext: "RJSC C-184920 • BB Compliant",
    metric1Label: "Incorporation",
    metric1Val: "RJSC Dhaka C-184920",
    metric2Label: "Compliance",
    metric2Val: "BIDA & Central Bank",
    href: "/about/leadership",
    action: "Review Governance Board",
  },
  {
    num: "3",
    title: "3. ESG & Sustainable Agribusiness",
    tagline: "Direct farmer fair-trade and cold-chain transparency.",
    desc: "Zero-chemical supply chain transparency, cold-chain IoT tracking, and direct rural farmer cooperatives establishing ethical agricultural commerce.",
    icon: TreePine,
    category: "Sustainable Value Chain",
    subtext: "IoT Cold-Chain • 30+ Hubs",
    metric1Label: "Rural Reach",
    metric1Val: "10,000+ Farmers",
    metric2Label: "Traceability",
    metric2Val: "100% Verified IoT",
    href: "/ventures",
    action: "Explore Organic Haat",
  },
  {
    num: "4",
    title: "4. Youth Leadership & Human Capital",
    tagline: "Nurturing high-caliber domestic engineering talent.",
    desc: "Nurturing top 1% engineering cohorts from BUET, DU, and premier polytechnic institutes into executive architects and product managers.",
    icon: GraduationCap,
    category: "Demographic Dividend",
    subtext: "Top 1% Talent • Leadership Track",
    metric1Label: "Workforce",
    metric1Val: "500+ Engineers",
    metric2Label: "Retention Rate",
    metric2Val: "94% Long-Term",
    href: "/careers",
    action: "Explore Talent Portal",
  },
  {
    num: "5",
    title: "5. Global Quality Benchmarks",
    tagline: "Export-grade software pipelines and Tier-3 residency.",
    desc: "Export-grade software pipelines, CMMI-aligned methodologies, and Tier-3 sovereign data center architectures ensuring resilient uptime and multi-tenant security.",
    icon: ShieldCheck,
    category: "Enterprise Grade",
    subtext: "ISO 27001 • CMMI Level 3",
    metric1Label: "Standard Met",
    metric1Val: "ISO 9001 / 27001",
    metric2Label: "Uptime SLA",
    metric2Val: "99.98% Guaranteed",
    href: "/about/standards",
    action: "Verify Certifications",
  },
  {
    num: "6",
    title: "6. Cross-Border Scale & Logistics",
    tagline: "Sovereign supply chain resilience and regional OTT media.",
    desc: "Consolidating 64-district freight fulfillment networks and sovereign CDN edge nodes, bridging domestic production with regional Asian trade corridors.",
    icon: Globe2,
    category: "Nationwide Reach",
    subtext: "64 Districts • Cross-Border Corridors",
    metric1Label: "Coverage",
    metric1Val: "Pan-Bangladesh",
    metric2Label: "Architecture",
    metric2Val: "Zero-Buffer CDN",
    href: "/ventures",
    action: "Explore Logistics Fleet",
  },
];

const timelineMilestones = [
  {
    year: "18",
    tag: "FOUNDATION",
    title: "2018: Inception & Seed Incubation",
    desc: "Registered in Dhaka as a specialized software studio. Formulated the core venture incubator thesis prioritizing proprietary IP over subcontracting.",
    cardTitle: "Incorporation under RJSC Dhaka",
    cardSubtitle: "Founding cohort of 12 full-stack software engineers.",
    initiative: "Initiative",
  },
  {
    year: "20",
    tag: "INFRASTRUCTURE",
    title: "2020: Launch of Yess Soft & Enterprise Cloud",
    desc: "Scaling fintech microservices, ERP suites, and national-scale software architectures to support banking and statutory enterprise automation.",
    cardTitle: "1,000,000+ Daily Core Transactions",
    cardSubtitle: "Multi-cloud deployments supporting regional trade.",
    initiative: "Subsidiary Scale",
  },
  {
    year: "22",
    tag: "AGRITECH & ESG",
    title: "2022: Emergence of YESS Organic Haat & Agritech Logistics",
    desc: "Launch of cold-chain farmer-to-door distribution, connecting 30+ farming hubs in Bogura and Rajshahi with urban Dhaka consumers.",
    cardTitle: "Fair Compensation Model Established",
    cardSubtitle: "Over 2,500 rural farming households connected directly.",
    initiative: "Sustainable Sourcing",
  },
  {
    year: "24",
    tag: "EXPANSION",
    title: "2024: Cross-Border Trade & Media Expansion",
    desc: "Inauguration of DeshLogix Express regional forwarding and Akash OTT media platforms, diversifying portfolio streams into distribution and culture.",
    cardTitle: "Pan-Bangladesh Fulfilment Network",
    cardSubtitle: "64-district freight delivery & sovereign CDN nodes.",
    initiative: "Diversification",
  },
  {
    year: "26",
    tag: "INSTITUTIONAL HORIZON",
    title: "2026: Multi-Sector Sovereign Conglomerate Structure",
    desc: "Consolidating 13 subsidiaries with $50M+ cumulative enterprise valuation, preparing for institutional debt facilities and regional sovereign partnerships.",
    cardTitle: "Tier-1 Venture Ecosystem",
    cardSubtitle: "13 Subsidiaries • Regional Export Competence.",
    initiative: "Consolidated Vision",
  },
];

export default async function AboutPage() {
  const sitePage = await getSitePage("about");
  const activeMetrics = (sitePage?.data?.metrics as typeof metrics) || metrics;
  const activePillars = (sitePage?.data?.pillars as typeof strategicPillars) || strategicPillars;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Modern Light Theme with Authentic Team Background) */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/assets/about-team-bd.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60 pointer-events-none" />

        {/* Subtle Decorative Grid Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-800 font-bold">About Us</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>{sitePage?.hero_eyebrow || "— INSTITUTIONAL MANDATE & HERITAGE —"}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Pioneering Sustainable Venture Architecture &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    Sovereign Tech
                  </span>{" "}
                  in Bangladesh.
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-12">
              {sitePage?.hero_subtitle || "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech."}
            </p>
          </div>

          {/* Strategic Key Metrics Bar (4 Prominent Metric Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {activeMetrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? TrendingUp : (metric.icon || TrendingUp);
              return (
                <div
                  key={metric.label}
                  className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-md transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 group-hover:scale-105 transition-transform">
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-500">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Strategic Foundational Pillars Section */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              PILLARS OF RESILIENCE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
              Strategic Foundational Pillars Architecting Our Growth
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Each vertical is engineered to institutional rigor, insulating early-stage risks while maximizing
              societal and financial returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePillars.map((pillar: any) => {
              const Icon = typeof pillar.icon === "string" ? BrainCircuit : (pillar.icon || BrainCircuit);
              return (
                <article
                  key={pillar.title}
                  className="glass-card rounded-2xl border border-border p-7 flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                          {pillar.category}
                        </span>
                        <p className="text-[10px] text-foreground/50 mt-1 font-medium">
                          {pillar.subtext}
                        </p>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#d4a359] mt-0.5">{pillar.tagline}</p>
                    <p className="text-xs sm:text-sm text-foreground/70 mt-2 mb-4 leading-relaxed line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>

                  <div>
                    <div className="py-2.5 px-3 rounded-xl bg-muted/50 border border-border mb-4 text-xs grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-foreground/60 block">{pillar.metric1Label}</span>
                        <span className="font-bold text-foreground text-xs">{pillar.metric1Val}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground/60 block">{pillar.metric2Label}</span>
                        <span className="font-bold text-primary text-xs">{pillar.metric2Val}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-1.5 hover:underline group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>{pillar.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Corporate History & Growth Timeline (2018 - 2026) */}
      {/* 3. Corporate History & Growth Timeline (2018 - 2026) */}
      <section className="py-20 bg-muted/20 border-b border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTITUTIONAL TRAJECTORY
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
              Milestones of a Decade in the Making
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              From a boutique cloud consultancy to an institutional holding structure driving sovereign digital and tangible
              supply chains.
            </p>
          </div>

          <div className="relative">
            {/* Center Vertical Track */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-amber-500 to-primary" />

            <div className="space-y-12">
              {timelineMilestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`flex flex-col md:flex-row items-center justify-between gap-8 relative ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`w-full md:w-5/12 ${isEven ? "text-left md:text-right" : "text-left"}`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2 border border-primary/20">
                        {milestone.tag}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground">{milestone.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground/70 mt-2 leading-relaxed">{milestone.desc}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md z-10 ring-4 ring-background shrink-0">
                      {milestone.year}
                    </div>

                    <div className="w-full md:w-5/12 glass-card p-5 rounded-2xl border border-border shadow-sm">
                      <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        {milestone.initiative}
                      </div>
                      <div className="font-display text-xs sm:text-sm font-bold text-foreground mt-0.5">{milestone.cardTitle}</div>
                      <div className="text-xs text-foreground/60 mt-1">{milestone.cardSubtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership & Governance Keynote Statement (Light Theme) */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-amber-50/20 text-slate-900 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-amber-700 bg-amber-50">
                  <Stamp className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    MANAGING PARTNER KEYNOTE
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900">Board Governance &amp; Purpose</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                RJSC Board Ratified
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
              &ldquo;We architected YESS Bangladesh not merely as an investment syndicate, but as an institutional
              nation-building engine. True sovereignty in the 21st century is digital, agrarian, and infrastructural. By
              fostering homegrown engineering talent and enforcing international fiduciary discipline, we ensure every
              venture created under our umbrella delivers enduring value for the people of Bangladesh.&rdquo;
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Executive Committee &amp; Governing Board</p>
                <p className="text-xs text-slate-500">YESS Bangladesh • RJSC Reg: C-184920</p>
              </div>
              <Link
                href="/about/leadership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md"
              >
                <span>View Full Executive Board</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. National Footprint & 64-District Impact */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary block mb-1">
                64
              </span>
              <span className="text-xs font-bold text-foreground block">Districts Covered</span>
              <span className="text-[11px] text-foreground/60">Pan-Bangladesh Presence</span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-500 block mb-1">
                10,000+
              </span>
              <span className="text-xs font-bold text-foreground block">Farmers Onboarded</span>
              <span className="text-[11px] text-foreground/60">Regenerative Agrotech</span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary block mb-1">
                4.8M
              </span>
              <span className="text-xs font-bold text-foreground block">Digital Viewers</span>
              <span className="text-[11px] text-foreground/60">Akash OTT &amp; TV</span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-500 block mb-1">
                13
              </span>
              <span className="text-xs font-bold text-foreground block">Subsidiary Ventures</span>
              <span className="text-[11px] text-foreground/60">$50M+ Valuation Base</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
