"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  RotateCw,
  Monitor,
  ShieldCheck,
  Server,
  Radar,
  PenTool,
  Rocket,
  Headphones,
  CheckCircle2,
  Calendar,
  FileText,
  Kanban,
  MessageSquare,
  History,
  Handshake,
  Sparkles,
} from "lucide-react";
import type { CmsSitePage } from "@/lib/cms";

const defaultDeliveryMetrics = [
  {
    value: "2 Weeks",
    label: "Sprint Cadence",
    desc: "Bi-weekly iterative delivery cycles ensuring continuous client alignment with zero project drift.",
    icon: RotateCw,
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    value: "Friday",
    label: "Live Staging Demos",
    desc: "Working software deployed every Friday afternoon for transparent stakeholder inspection.",
    icon: Monitor,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "Zero",
    label: "Slideware Guarantee",
    desc: "We present real code running in staging environments and verifiable telemetry, never mockups alone.",
    icon: ShieldCheck,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "99.9%",
    label: "Contractual SLA",
    desc: "Enterprise Site Reliability Engineering governance with contractual SLAs and telemetry guardrails.",
    icon: Server,
    color: "text-[#f6c87a]",
    glow: "text-[#d4a359]",
  },
];

const lifecycleSteps = [
  {
    step: "Step 01 • Weeks 1 to 2",
    icon: Radar,
    title: "Discovery, Diligence & Technical Scoping",
    desc: "We analyze your business objectives, map systems, audit data architecture, and define an exact Statement of Work (SOW) with fixed milestones and acceptance criteria.",
    artifacts: ["System Architecture Blueprint", "Data Schema Definition", "Production Security Threat Model", "Milestone Roadmap & SOW"],
    stepColor: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    step: "Step 02 • Weeks 3 to 4",
    icon: PenTool,
    title: "Architecture & Design Sprint",
    desc: "System architecture, API contracts, UX design systems, and security review. We establish the infrastructure foundation before writing product code.",
    artifacts: ["Figma Design System & Prototypes", "OpenAPI Specification Contracts", "Infrastructure-as-Code (Terraform)", "Security & Compliance Checklist"],
    stepColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    iconColor: "text-amber-500",
  },
  {
    step: "Step 03 • Continuous Bi-Weekly Sprints",
    icon: Rocket,
    title: "Bi-Weekly Agile Delivery & Live Demos",
    desc: "Two-week agile sprints with weekly demos. You see working software, verified tests, and real tangible progress, not slideware, every single Friday.",
    artifacts: ["Staging Environment Deployment", "Automated Test Suites", "Sprint Velocity Telemetry", "Architecture Decision Records (ADRs)"],
    stepColor: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    step: "Step 04 • 24/5 to 24/7 Managed SLA",
    icon: Headphones,
    title: "Managed Support & Platform Evolution",
    desc: "Comprehensive warranty period, automated APM monitoring, security patching, and a long-term continuous improvement retainer keep your platform performant and sharp.",
    artifacts: ["SRE Observability Dashboards", "Disaster Recovery Playbooks", "Monthly Performance Audits", "Zero-Downtime Patching"],
    stepColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    iconColor: "text-amber-500",
  },
];

interface MethodologyClientProps {
  sitePage?: CmsSitePage | null;
}

export function MethodologyClient({ sitePage }: MethodologyClientProps) {
  const [booked, setBooked] = useState(false);

  const metrics = (sitePage?.data?.metrics as typeof defaultDeliveryMetrics) || defaultDeliveryMetrics;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero & Delivery Metrics */}
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
            <span className="text-[#35b0aa]">Engineering Methodology</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>{sitePage?.hero_eyebrow || "— THE YESS DELIVERY FRAMEWORK —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  How We Engineer &amp; Deliver{" "}
                  <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                    Sovereign Systems
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "A four-phase institutional delivery framework built on clarity of scope, bi-weekly tangible software milestones, rigorous SRE observability, and 100% foreground IP handover."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {metrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? RotateCw : (metric.icon || RotateCw);
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

      {/* 2. 4-Phase Delivery Framework */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              END-TO-END SDLC
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
              Four Phases. Total Accountability.
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Every YESS enterprise engagement moves through four disciplined phases with documented milestones.
            </p>
          </div>

          <div className="space-y-8">
            {lifecycleSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-8 border border-border hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-[#061a1b] text-white shrink-0 shadow-md border border-white/10">
                        <Icon className="w-6 h-6 text-[#d4a359]" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${step.stepColor}`}>
                          {step.step}
                        </span>
                        <h3 className="font-display font-bold text-xl text-foreground mt-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-2 leading-relaxed max-w-2xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border">
                    <span className="text-xs font-bold text-foreground block mb-3 uppercase tracking-wider">
                      Verified Phase Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {step.artifacts.map((art, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{art}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Scheduling & Inquiry Card */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden" id="methodology-briefing">
        <div className="container-tight max-w-4xl">
          <div className="glass-card-dark rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest block">
                  TECHNICAL BRIEFING
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Schedule an Architecture Walkthrough
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Book a confidential 30-minute scoping call with a Principal Architect to review your technical requirements and receive a preliminary delivery estimate.
                </p>
              </div>

              <div className="lg:col-span-7">
                {booked ? (
                  <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                    <h4 className="font-display font-bold text-lg text-white">Discovery Call Scheduled</h4>
                    <p className="text-xs text-white/70 mt-2">
                      Our executive desk has received your request and will counter-sign your NDA within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBooked(true);
                    }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="mFullName">
                        Full Name *
                      </label>
                      <input
                        id="mFullName"
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="mEmail">
                          Enterprise Email *
                        </label>
                        <input
                          id="mEmail"
                          type="email"
                          required
                          placeholder="tanvir@enterprise.com"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="mOrg">
                          Organization *
                        </label>
                        <input
                          id="mOrg"
                          type="text"
                          required
                          placeholder="e.g. Commercial Bank"
                          className="w-full text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                      <span>Confirm 30-Minute Discovery Session</span>
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
              href="/about/standards"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>Explore Quality Standards &amp; QA</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
