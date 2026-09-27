"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Globe2,
  Zap,
  Heart,
  CheckCircle2,
  Lock,
  GitBranch,
  ShieldAlert,
  KeyRound,
  TrendingUp,
  FileCheck,
  Sparkles,
} from "lucide-react";
import type { CmsSitePage } from "@/lib/cms";

const defaultStandardsMetrics = [
  {
    value: "ISO 9001",
    label: "Quality Framework",
    desc: "QMS aligned & audited process lifecycle with ISO 27001 data security governance.",
    icon: ShieldCheck,
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    value: "100%",
    label: "Senior-Led Squads",
    desc: "Zero junior-only squads deployed to mission-critical core architectures.",
    icon: Users,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "24/7 SLA",
    label: "Guaranteed Response",
    desc: "Contracted response SLAs with direct principal engineer escalation protocols.",
    icon: Zap,
    color: "text-white",
    glow: "text-emerald-400",
  },
  {
    value: "NPS 68",
    label: "Client Benchmark",
    desc: "24-Month sustained average institutional client satisfaction & trust score.",
    icon: Heart,
    color: "text-[#f6c87a]",
    glow: "text-[#d4a359]",
  },
];

const defaultStandardsPillars = [
  {
    icon: ShieldCheck,
    title: "ISO-Aligned Processes",
    desc: "Documented processes covering end-to-end project management, peer code reviews, continuous security scanning, and automated incident response runbooks.",
    badge: "100% Documented SDLC",
    badgeIcon: FileCheck,
    borderHover: "hover:border-primary/40",
  },
  {
    icon: Award,
    title: "Quality Assured & Verified",
    desc: "Independent QA on every sprint release with strict automated test coverage, regression suites, and Core Web Vitals (CWV) telemetry tracked in CI/CD.",
    badge: ">85% Coverage & CWV Green",
    badgeIcon: TrendingUp,
    borderHover: "hover:border-amber-500/40",
  },
  {
    icon: Users,
    title: "Senior-Led Delivery Teams",
    desc: "Every engagement is architected and steered by a senior practitioner with 8+ years of production experience — zero junior-only engineering squads.",
    badge: "8+ Years Avg Lead Experience",
    badgeIcon: Award,
    borderHover: "hover:border-primary/40",
  },
  {
    icon: Globe2,
    title: "Global Delivery Corridors",
    desc: "Working hours synchronized to overlap with EU, UK, and US clients, backed by clear 3-tier escalation matrices and bilingual project management.",
    badge: "4+ Hours Daily Overlap (GMT/EST)",
    badgeIcon: Globe2,
    borderHover: "hover:border-amber-500/40",
  },
  {
    icon: Zap,
    title: "Contracted Support & 24/5 SLA",
    desc: "Standard enterprise SLA includes dedicated 24/5 support; mission-critical 24/7 high-availability support is deployed on managed infrastructure retainers.",
    badge: "<15 Min Critical Incident SLA",
    badgeIcon: Zap,
    borderHover: "hover:border-primary/40",
  },
  {
    icon: Heart,
    title: "Sustained NPS 60+ Satisfaction",
    desc: "Average client Net Promoter Score sustained consistently above 60 across the past 24 months, with multi-year contract renewals across banking and public sector.",
    badge: "NPS 68 Annual Average",
    badgeIcon: CheckCircle2,
    borderHover: "hover:border-amber-500/40",
  },
];

interface StandardsClientProps {
  sitePage?: CmsSitePage | null;
}

export function StandardsClient({ sitePage }: StandardsClientProps) {
  const [submitted, setSubmitted] = useState(false);

  const metrics = (sitePage?.data?.metrics as typeof defaultStandardsMetrics) || defaultStandardsMetrics;
  const pillars = (sitePage?.data?.pillars as typeof defaultStandardsPillars) || defaultStandardsPillars;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero & Standards Telemetry */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/about" className="hover:text-[#f6c87a] transition-colors">
              About Us
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">Quality Standards &amp; QA</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>{sitePage?.hero_eyebrow || "— THE YESS QUALITY ASSURANCE COMPACT —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Engineering Standards &amp;{" "}
                  <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                    Quality Benchmarks
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "Six institutional quality commitments that govern every line of code, infrastructure terraform blueprint, and SLA handover across all YESS subsidiaries."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {metrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? ShieldCheck : (metric.icon || ShieldCheck);
              return (
                <div
                  key={metric.label}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-3xl sm:text-4xl font-extrabold ${metric.color || "text-[#35b0aa]"} group-hover:scale-105 transition-transform`}>
                      {metric.value}
                    </span>
                    <Icon className={`w-6 h-6 ${metric.glow || "text-[#35b0aa]"}`} />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Six Quality Commitments */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTITUTIONAL RIGOR
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
              Six Uncompromising Commitments
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              How we assure consistent, zero-defect delivery across all technology stacks.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p: any, idx: number) => {
              const Icon = typeof p.icon === "string" ? ShieldCheck : (p.icon || ShieldCheck);
              const BadgeIcon = typeof p.badgeIcon === "string" ? Award : (p.badgeIcon || Award);
              return (
                <div
                  key={idx}
                  className={`glass-card rounded-2xl p-6 border border-border flex flex-col justify-between hover:shadow-xl ${p.borderHover || "hover:border-primary/40"} transition-all duration-300 group`}
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-2">
                    <BadgeIcon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-primary">{p.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Inquiry Form */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden" id="standards-intake">
        <div className="container-tight max-w-4xl">
          <div className="glass-card-dark rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest block">
                  GOVERNANCE CONSULTATION
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Audit &amp; Specification Review
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Submit your technical compliance requirements or RFP specifications for a comprehensive QA alignment evaluation by our Principal Architects.
                </p>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-lg text-white">Quality Brief Registered</h3>
                    <p className="text-xs text-white/70 mt-2">
                      Our quality governance council will review your specifications and establish bilateral contact within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="sFullName">
                        Full Name *
                      </label>
                      <input
                        id="sFullName"
                        type="text"
                        required
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="sEmail">
                          Corporate Email *
                        </label>
                        <input
                          id="sEmail"
                          type="email"
                          required
                          placeholder="tanvir@enterprise.com"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="sOrg">
                          Organization *
                        </label>
                        <input
                          id="sOrg"
                          type="text"
                          required
                          placeholder="e.g. Commercial Bank"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="sFramework">
                        Target Standard / Focus
                      </label>
                      <input
                        id="sFramework"
                        type="text"
                        placeholder="e.g. ISO 27001 Security Audit • SRE 99.9% Core Architecture"
                        className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <span>Initiate Quality &amp; Governance Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-xs font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>Explore Services &amp; Solutions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
