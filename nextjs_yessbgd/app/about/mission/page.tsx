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
} from "lucide-react";
import { aboutPillars } from "@/data/about";
import { getSitePage } from "@/lib/cms";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("about-mission");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Strategic Mission & Purpose",
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
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/ventures-dhaka-bd.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-6 z-10">
          <div className="max-w-4xl">
            {/* Eyebrow pill (home style) */}
            <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
              <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                {sitePage?.hero_eyebrow || "Strategic foundation & purpose"}
              </span>
            </div>

            {/* Headline (home scale, solid two-tone; CMS titles inherit the same treatment) */}
            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Our Sovereign Mission:</span>
                  <span className="block text-[#026E4D]">Empowering Bangladesh&apos;s Enterprise Future</span>
                </>
              )}
            </h1>

            {/* Lede (home description) */}
            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle ||
                  "Empowering organizations across Bangladesh with strategic consulting, sovereign technology, and measurable enterprise growth that drives operational autonomy and institutional resilience."}
              </p>
            </div>
          </div>

          {/* 4 Metric Cards Strip (Light Theme) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {activeMetrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? Compass : (metric.icon || Compass);
              return (
                <div
                  key={metric.label}
                  className="bg-white/95 border border-gray-100/80 rounded-[14px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors">
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
