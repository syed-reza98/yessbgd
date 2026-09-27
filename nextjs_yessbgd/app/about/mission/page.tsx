import Link from "next/link";
import {
  Target,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Download,
  Calendar,
  Layers,
  Compass,
  Sprout,
  Users,
  Award,
  Sparkles,
} from "lucide-react";
import { aboutPillars } from "@/data/about";
import { getSitePage } from "@/lib/cms";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-mission");
  return {
    title: page?.seo_title || "Strategic Mission & Purpose | YESS Bangladesh",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "Our mission is to empower organisations across Bangladesh with strategic consulting, sovereign technology, and measurable enterprise growth.",
  };
}

const missionMetrics = [
  {
    value: "Sovereignty",
    label: "Domestic Autonomy",
    desc: "Domestic tier-3 infrastructure, local hosting & sovereign data governance.",
    icon: Compass,
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    value: "13",
    label: "Venture Ecosystem",
    desc: "High-performance specialized subsidiaries operating across Bangladesh.",
    icon: Layers,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "Zero",
    label: "Slideware Guarantee",
    desc: "Measured in deployed software, physical logistics rails & verified SLAs.",
    icon: Cpu,
    color: "text-white",
    glow: "text-emerald-400",
  },
  {
    value: "100%",
    label: "IP Handover",
    desc: "Uncompromising bilateral NDA, rigorous security & full code ownership.",
    icon: ShieldCheck,
    color: "text-[#f6c87a]",
    glow: "text-[#d4a359]",
  },
];

export default async function MissionPage() {
  const sitePage = await getSitePage("about-mission");
  const pillar = aboutPillars.find((p) => p.slug === "mission")!;
  const activeMetrics = (sitePage?.data?.metrics as typeof missionMetrics) || missionMetrics;
  const charter = sitePage?.data?.charter || {};

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero & Strategic Mission Overview (Modern Light Theme) */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/assets/ventures-dhaka-bd.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60 pointer-events-none" />

        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/about" className="hover:text-emerald-700 transition-colors">
              About Us
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-800 font-bold">Strategic Mission &amp; Purpose</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{sitePage?.hero_eyebrow || "— STRATEGIC FOUNDATION & PURPOSE —"}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Our Sovereign Mission:{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    Empowering Bangladesh&apos;s Enterprise Future
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "Empowering organizations across Bangladesh with strategic consulting, sovereign technology, and measurable enterprise growth that drives operational autonomy and institutional resilience."}
            </p>
          </div>

          {/* 4 Metric Cards Strip (Light Theme) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {activeMetrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? Compass : (metric.icon || Compass);
              return (
                <div
                  key={metric.label}
                  className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200 group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 group-hover:scale-105 transition-transform">
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Operating Charter & Core Mandate */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-5xl">
          {/* Executive Quote Block */}
          <div className="glass-card-strong rounded-3xl p-8 sm:p-12 mb-16 shadow-xl border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-glow">
              <Target className="h-7 w-7" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              {charter.tag || "OPERATING CHARTER & CORE MANDATE"}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
              {charter.title || "Translating Executive Strategy into Measurable Enterprise Power"}
            </h2>
            <blockquote className="text-base sm:text-lg leading-relaxed text-foreground/80 italic border-l-4 border-primary pl-4 my-6">
              {charter.quote ||
                "“Our mission is to be the most accountable consulting and technology partner for ambitious Bangladeshi organisations. We translate strategy into shipped product, measure outcomes in your operating metrics, and stay engaged long after launch. Every engagement is anchored in three commitments: clarity of scope, transparency of progress and ownership of outcomes.”"}
            </blockquote>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-foreground/70">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{charter.footnote || "MANDATE PROTOCOL V4.2 — YESS Sovereign Holding Committee"}</span>
            </div>
          </div>

          {/* What This Means in Practice (4 Protocol Cards) */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              GOVERNANCE IN PRACTICE
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
              What This Means in Daily Execution
            </h3>
            <p className="text-sm text-foreground/70 mt-2">
              Our day-to-day governance principles executed across all 13 holding subsidiaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-all">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold">
                  01
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Strategy with Direct Operators
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Engagements are staffed and delivered by senior architects and venture leads, never handed down to junior pools or outsourced contractors.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Senior architect oversight on every milestone</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-all">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-4 font-bold">
                  02
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Shipped Code & Physical Logistics
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  We measure success not in decks or strategy documents, but in deployed bare-metal clusters, production ERP systems, and tangible farm-to-table networks.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-[#7e5713] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Working software and audited telemetry</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-all">
              <div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 font-bold">
                  03
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Zero-Defect Sovereign Governance
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  ISO-aligned quality assurance, zero-trust cryptographic architectures, and domestic data residency across all 64 districts in Bangladesh.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>100% Foreground IP and repository transfer</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-all">
              <div>
                <div className="h-10 w-10 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-4 font-bold">
                  04
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Capital Preservation & Alignment
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Every tranche is tied to verifiable business outcomes. We co-invest sovereign capital alongside enterprise partners to guarantee skin-in-the-game.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-[#7e5713] font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Aligned incentives & milestone release schedules</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Accountability Metrics Strip (Stitch Section 2 exact match) */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white text-slate-900 relative overflow-hidden border-b border-slate-200">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              MEASURED RIGOR
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Institutional Accountability Metrics
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Continuous compliance, venture viability, and performance standards monitored in real time across the ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <span className="font-display font-extrabold text-4xl text-emerald-700">
                99.8%
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-2">
                SLA Delivery Compliance
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Contractual execution maintained across 13 subsidiaries
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <span className="font-display font-extrabold text-4xl text-teal-700">
                13
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-2">
                Operating Verticals
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Active business units spanning cloud, agro, media & logistics
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <span className="font-display font-extrabold text-4xl text-amber-600">
                ৳250M+
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-2">
                Capital Under Advisory
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Sovereign venture capital mobilised & deployed
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
              <span className="font-display font-extrabold text-4xl text-emerald-700">
                0.0%
              </span>
              <span className="text-sm font-bold text-slate-900 block mt-2">
                Capital Default Rate
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                Zero statutory default across 11+ years operating history
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Related Pillars (Stitch Section 3 exact match) */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                COHESIVE FRAMEWORK
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
                Explore Related Strategic Pillars
              </h3>
            </div>
            <Link href="/about" className="text-xs font-bold text-primary hover:underline mt-2 md:mt-0 flex items-center gap-1">
              <span>View All 5 Pillars</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/about/leadership"
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Users className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Executive Board
                </h4>
                <p className="text-xs text-foreground/70 mt-2">
                  Meet our principal operators, regulatory directors, and technology architects.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-border text-xs font-semibold text-primary">
                Explore Leadership →
              </div>
            </Link>

            <Link
              href="/about/awards"
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Award className="h-8 w-8 text-[#d4a359] mb-3" />
                <h4 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Accreditations
                </h4>
                <p className="text-xs text-foreground/70 mt-2">
                  ISO 9001:2015, ISO 27001, and BASIS national technology citations.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-border text-xs font-semibold text-primary">
                Explore Awards →
              </div>
            </Link>

            <Link
              href="/about/methodology"
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Cpu className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Engineering SDLC
                </h4>
                <p className="text-xs text-foreground/70 mt-2">
                  Our 4-step delivery lifecycle: Discover, Design, Deliver, and Handover.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-border text-xs font-semibold text-primary">
                Explore SDLC →
              </div>
            </Link>

            <Link
              href="/about/standards"
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <ShieldCheck className="h-8 w-8 text-[#d4a359] mb-3" />
                <h4 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Quality Standards
                </h4>
                <p className="text-xs text-foreground/70 mt-2">
                  Zero-trust security enclaves and automated test coverage pyramids.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-border text-xs font-semibold text-primary">
                Explore Standards →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Ready to Partner Executive CTA Banner (Stitch Section 4 exact match) */}
      <section className="py-20 bg-[#f4f8f8]">
        <div className="container-tight max-w-4xl text-center">
          <div className="glass-card rounded-3xl p-10 sm:p-14 shadow-xl border border-white">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTITUTIONAL ENGAGEMENT
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Ready to partner with YESS Bangladesh?
            </h3>
            <p className="text-base text-foreground/70 mt-3 max-w-2xl mx-auto leading-relaxed">
              Discuss your strategic initiative with our leadership team and discover how sovereign technology drives resilient enterprise growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 transition-all"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Executive Discovery Call</span>
              </Link>
              <a
                href="/yess-bangla-company-profile.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-border text-foreground font-bold text-sm shadow-xs hover:text-primary transition-all"
              >
                <Download className="h-4 w-4 text-primary" />
                <span>Download Institutional Profile (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
