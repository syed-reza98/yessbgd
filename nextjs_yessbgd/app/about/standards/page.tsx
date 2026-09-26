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
  Download,
  Phone,
  Mail,
  Lock,
  GitBranch,
  ShieldAlert,
  KeyRound,
  Check,
  TrendingUp,
  FileCheck,
} from "lucide-react";

const metricCards = [
  {
    tag: "Framework",
    value: "ISO 9001:2015",
    desc: "QMS Aligned & Audited process lifecycle",
    icon: ShieldCheck,
    tagColor: "bg-primary/10 text-primary",
    iconColor: "text-primary",
  },
  {
    tag: "Personnel",
    value: "100% Senior-Led",
    desc: "Zero Junior-Only Squads deployed to core systems",
    icon: Users,
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    iconColor: "text-amber-500",
  },
  {
    tag: "Coverage",
    value: "24/5 to 24/7",
    desc: "Contracted Response SLAs with guaranteed escalation",
    icon: Zap,
    tagColor: "bg-primary/10 text-primary",
    iconColor: "text-primary",
  },
  {
    tag: "Benchmark",
    value: "NPS 68",
    desc: "24-Month Sustained Average institutional client score",
    icon: Heart,
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    iconColor: "text-amber-500",
  },
];

const standardsPillars = [
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

const auditPillars = [
  {
    icon: GitBranch,
    title: "Immutable GitOps Audit Trails",
    desc: "Cryptographic commit signatures, branch protection, and automated sign-offs logged to immutable ledgers.",
  },
  {
    icon: ShieldAlert,
    title: "Static AST & Dependency Security Scans",
    desc: "Continuous SAST, DAST, and automated CVE dependency remediation integrated into mandatory merge checks.",
  },
  {
    icon: KeyRound,
    title: "ISO 27001 Information Security Controls",
    desc: "Zero-trust access, encrypted secrets management, and strict data residency compliance under Bangladesh ICT policies.",
  },
];

export default function StandardsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero & High-Impact Metric Cards */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background border-b border-border">
        <div className="container-tight max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs font-semibold text-foreground/60">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-foreground/40">/</li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li className="text-foreground/40">/</li>
              <li className="text-primary font-bold">Quality Standards &amp; QA Framework</li>
            </ol>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>QUALITY &amp; GOVERNANCE</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
              International Standards &amp; Engineering Governance
            </h1>
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-2xl">
              How YESS Bangladesh is operated to international quality, enterprise security, and rigorous delivery standards across all 13 operating subsidiaries.
            </p>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {metricCards.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.value}
                  className="rounded-2xl glass-card p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-7 h-7 ${m.iconColor}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${m.tagColor}`}>
                      {m.tag}
                    </span>
                  </div>
                  <div className="font-display font-bold text-xl sm:text-2xl text-foreground tracking-tight mb-1">
                    {m.value}
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. The 6 Enterprise Standards Grid */}
      <section className="py-20 bg-background">
        <div className="container-tight max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Pillars of Execution</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
                Enterprise Quality Architecture
              </h2>
            </div>
            <p className="text-sm text-foreground/70 max-w-md mt-4 md:mt-0 leading-relaxed">
              Six non-negotiable operational disciplines baked into every sovereign software deployment, venture build, and managed delivery contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardsPillars.map((p) => {
              const Icon = p.icon;
              const BadgeIcon = p.badgeIcon;
              return (
                <div
                  key={p.title}
                  className={`rounded-3xl glass-card p-8 border border-border transition-all duration-300 hover:shadow-lg flex flex-col justify-between group ${p.borderHover}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted font-semibold text-foreground/80">
                      <BadgeIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{p.badge}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 'Audit-Ready by Default' Assurance Section */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

        <div className="container-tight max-w-6xl relative z-10">
          <div className="rounded-3xl p-8 lg:p-14 border border-emerald-500/25 bg-[#0a2022]/90 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 mb-5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>INDEPENDENT COMPLIANCE &amp; VERIFICATION</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-4">
                  Audit-Ready by Default
                </h2>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-8">
                  Every engagement ships with documented architecture decisions (ADRs), immutable cryptographic audit logs, and a turnkey security-and-quality runbook your internal compliance officer or external Big-4 auditor can inspect immediately.
                </p>
                <a
                  href="#consultation-intake"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-[#061a1b] font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QA Runbook Sample (PDF)</span>
                </a>
              </div>

              {/* Stacked Cards */}
              <div className="w-full lg:w-5/12 space-y-4">
                {auditPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-white mb-1">
                            {pillar.title}
                          </h4>
                          <p className="text-xs text-white/70 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Institutional Lead Capture CTA Banner */}
      <section className="py-20 bg-muted/20 relative" id="consultation-intake">
        <div className="container-tight max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#061a1b] to-[#0a2f32] text-white p-8 lg:p-14 shadow-2xl relative overflow-hidden border border-emerald-500/25">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>DIRECT INSTITUTIONAL DIALOGUE</span>
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  Hold your delivery to a higher bar.
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Speak directly with our principal delivery directors and senior architects about how we would structure, monitor, and guarantee your engagement.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    "Bilateral Mutual NDA before consultation",
                    "Direct partner and lead architect access",
                    "Zero recruiter friction",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
                {/* Direct Contact Box */}
                <div className="pt-6 border-t border-white/15 flex flex-wrap gap-6 items-center">
                  <div>
                    <span className="block text-[11px] uppercase text-white/60 font-semibold">Institutional Hotline</span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">+880 1805-464343</span>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/20" />
                  <div>
                    <span className="block text-[11px] uppercase text-white/60 font-semibold">Priority Email</span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">yessbangla.bd@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Intake Form */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl p-6 sm:p-8 bg-[#061a1b]/85 border border-white/15 shadow-2xl backdrop-blur-xl">
                  {submitted ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-white">Quality Brief Registered</h4>
                      <p className="text-xs text-white/70">
                        Our quality governance council will review your specifications and establish bilateral contact within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-semibold text-amber-300 hover:underline pt-2 cursor-pointer"
                      >
                        Submit another brief →
                      </button>
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
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="sFullName">
                          Full Name
                        </label>
                        <input
                          id="sFullName"
                          type="text"
                          required
                          placeholder="e.g. Engr. Tanvir Ahmed"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="sEmail">
                            Corporate Email
                          </label>
                          <input
                            id="sEmail"
                            type="email"
                            required
                            placeholder="tanvir@enterprise.com"
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="sOrg">
                            Organization / Ministry
                          </label>
                          <input
                            id="sOrg"
                            type="text"
                            required
                            placeholder="e.g. Commercial Bank / Gov Agency"
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="sFramework">
                          Target Standard / Compliance Focus
                        </label>
                        <input
                          id="sFramework"
                          type="text"
                          placeholder="e.g. ISO 27001 Security Audit • SRE 99.9% Core Architecture"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <span>Initiate Quality &amp; Governance Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation link bar */}
          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-sm font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
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
