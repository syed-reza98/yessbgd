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
      {/* 1. Page Hero & Standards Telemetry (Modern Light Theme) */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/assets/heroes/hero_6a896e39e25bd.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60 pointer-events-none" />

        <div className="absolute inset-0 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/about" className="hover:text-emerald-700 transition-colors">
              About Us
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-800 font-bold">Quality Standards &amp; QA</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{sitePage?.hero_eyebrow || "— THE YESS QUALITY ASSURANCE COMPACT —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Engineering Standards &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    Quality Benchmarks
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "Six institutional quality commitments that govern every line of code, infrastructure terraform blueprint, and SLA handover across all YESS subsidiaries."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {metrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? ShieldCheck : (metric.icon || ShieldCheck);
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
      <section className="py-20 bg-slate-50 border-t border-slate-200/80 text-foreground relative overflow-hidden" id="standards-intake">
        <div className="container-tight max-w-4xl">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/90 bg-white/95 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block">
                  GOVERNANCE CONSULTATION
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                  Audit &amp; Specification Review
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit your technical compliance requirements or RFP specifications for a comprehensive QA alignment evaluation by our Principal Architects.
                </p>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                    <CheckCircle2 className="h-10 w-10 text-teal-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-lg text-slate-900">Quality Brief Registered</h3>
                    <p className="text-xs text-slate-600 mt-2">
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
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="sFullName">
                        Full Name *
                      </label>
                      <input
                        id="sFullName"
                        type="text"
                        required
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="sEmail">
                          Corporate Email *
                        </label>
                        <input
                          id="sEmail"
                          type="email"
                          required
                          placeholder="tanvir@enterprise.com"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="sOrg">
                          Organization *
                        </label>
                        <input
                          id="sOrg"
                          type="text"
                          required
                          placeholder="e.g. Commercial Bank"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="sFramework">
                        Target Standard / Focus
                      </label>
                      <input
                        id="sFramework"
                        type="text"
                        placeholder="e.g. ISO 27001 Security Audit • SRE 99.9% Core Architecture"
                        className="w-full text-xs px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-teal-600 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
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
