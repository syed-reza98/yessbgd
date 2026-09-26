import Link from "next/link";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "About Us | YESS Bangladesh — Leading Institutional Venture Builder",
  description:
    "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech.",
};

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

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Deep Navy & Oceanic Teal Gradient) */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-white/10">
        {/* Subtle Decorative Grid Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-outline-variant mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">About Us</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#d4a359]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#d4a359] animate-ping" />
            <span>— INSTITUTIONAL MANDATE &amp; HERITAGE —</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Pioneering Sustainable Venture Architecture &amp;{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Sovereign Tech
              </span>{" "}
              in Bangladesh.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-12">
              Founded to bridge international engineering standards with Bangladesh&apos;s high-growth demographic
              dividend, accelerating sovereign enterprises across cloud, agritech, and fintech.
            </p>
          </div>

          {/* Strategic Key Metrics Bar (4 Prominent Metric Blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#35b0aa]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-3xl sm:text-4xl font-extrabold ${metric.accent} group-hover:scale-105 transition-transform`}>
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-[#35b0aa]" />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-400">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. 5 Strategic Foundational Pillars Section */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              PILLARS OF RESILIENCE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
              5 Strategic Foundational Pillars Architecting Our Growth
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Each vertical is engineered to institutional rigor, insulating early-stage risks while maximizing
              societal and financial returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  Sovereign Cloud &amp; AI
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">1. Innovation &amp; Deep Tech</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
                  AI, microservices, cloud telemetry, and sovereign transactional infrastructure architected to handle
                  mission-critical high-concurrency loads.
                </p>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/about/methodology" className="hover:underline flex items-center gap-1">
                  <span>Yess Soft • Shondhaan Core</span>
                </Link>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Scale className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
                  Statutory Fiduciary
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">2. Institutional Governance &amp; Transparency</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
                  Registered under RJSC C-184920, adhering to strict Bangladesh Bank fiduciary compliance, independent board
                  oversight, and clean audit trails.
                </p>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                <Link href="/about/leadership" className="hover:underline flex items-center gap-1">
                  <span>Audited Compliance &amp; RJSC Reg</span>
                </Link>
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <TreePine className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  Sustainable Value Chain
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">3. ESG &amp; Sustainable Agribusiness</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
                  Zero-chemical supply chain transparency, cold-chain IoT tracking, and direct rural farmer cooperatives
                  establishing ethical agricultural commerce.
                </p>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/ventures" className="hover:underline flex items-center gap-1">
                  <span>YESS Organic Haat Network</span>
                </Link>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  Demographic Dividend
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">4. Youth Leadership &amp; Human Capital</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed mb-6">
                  Nurturing top 1% engineering cohorts from BUET, DU, and premier polytechnic institutes into executive
                  architects and product managers.
                </p>
              </div>
              <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/careers" className="hover:underline flex items-center gap-1">
                  <span>YESS Talent Accelerator</span>
                </Link>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 5 (Spanning 2 columns on lg) */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
              <div className="max-w-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-2 border border-amber-500/30">
                  Enterprise Grade
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">5. Global Quality Benchmarks</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                  Export-grade software pipelines, CMMI-aligned methodologies, and Tier-3 sovereign data center
                  architectures ensuring resilient uptime and multi-tenant security.
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-xl border border-border min-w-[200px] shrink-0">
                <div className="text-[11px] text-foreground/60 mb-1">Standard Met</div>
                <div className="text-sm font-bold text-foreground">ISO 27001 / CMMI</div>
                <div className="text-xs text-foreground/70 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Fiduciary Compliant</span>
                </div>
              </div>
            </div>
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

      {/* 4. Leadership & Governance Keynote Statement */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a359_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#d4a359] flex items-center justify-center text-[#d4a359]">
                  <Stamp className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider block">
                    MANAGING PARTNER KEYNOTE
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">Board Governance &amp; Purpose</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                RJSC Board Ratified
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
              &ldquo;We architected YESS Bangladesh not merely as an investment syndicate, but as an institutional
              nation-building engine. True sovereignty in the 21st century is digital, agrarian, and infrastructural. By
              fostering homegrown engineering talent and enforcing international fiduciary discipline, we ensure every
              venture created under our umbrella delivers enduring value for the people of Bangladesh.&rdquo;
            </p>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Executive Committee &amp; Governing Board</p>
                <p className="text-xs text-slate-400">YESS Bangladesh • RJSC Reg: C-184920</p>
              </div>
              <Link
                href="/about/leadership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-md"
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
