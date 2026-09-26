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
  Check,
  Calendar,
  FileText,
  Kanban,
  MessageSquare,
  History,
  Handshake,
  Sparkles,
} from "lucide-react";

const deliveryMetrics = [
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

const methodologySteps = [
  {
    step: "Step 01 • Day 1–3",
    icon: Radar,
    title: "Discover & Strategic Scoping",
    desc: "Free 30-min discovery call. We map business goals, technical constraints, security compliance, and the core metrics that define success — before any commercial proposal is written.",
    artifacts: ["Scope Blueprint", "Risk Matrix", "Architecture Brief", "Statutory Compliance Audit"],
    stepColor: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
  },
  {
    step: "Step 02 • Day 4–7",
    icon: PenTool,
    title: "System Design & Prototyping",
    desc: "System architecture, UX flows, data models, and a comprehensive written proposal with fixed scope, timeline and transparent pricing within 1–3 business days.",
    artifacts: ["Interactive Figma Wireframes", "Technical Specification Document", "API Contract & Schemas", "ERD Data Model"],
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

const weeklyCadence = [
  {
    icon: Monitor,
    title: "Friday Live Deployments",
    desc: "A demo of working software every Friday afternoon.",
  },
  {
    icon: FileText,
    title: "Written Executive Status",
    desc: "A written executive status report with risk telemetry and pending architectural decisions.",
  },
  {
    icon: Kanban,
    title: "Live Jira & Linear Access",
    desc: "Direct access to a shared Jira/Linear Kanban board with real-time ticket progression.",
  },
  {
    icon: MessageSquare,
    title: "Direct Engineering Comms",
    desc: "Direct shared Slack/Teams channel to the principal engineering lead and architect.",
  },
  {
    icon: History,
    title: "Architecture Records (ADRs)",
    desc: "Documented Architecture Decision Records (ADRs) for every major codebase alteration.",
  },
  {
    icon: Handshake,
    title: "Monthly Executive Reviews",
    desc: "A monthly executive business review (EBR) with your dedicated Client Partner.",
  },
];

export default function MethodologyPage() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero & Delivery Metrics (Signature Corporate Dark Hero) */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-white/10">
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
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
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>— DELIVERY ARCHITECTURE &amp; GOVERNANCE —</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6 leading-tight">
              Our Proven 4-Step Engineering &amp;{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Delivery Methodology
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl mb-10">
              Discover, Design, Deliver, Support — the rigorous, battle-tested execution framework behind every YESS Bangladesh enterprise engagement.
            </p>
          </div>

          {/* 4 Metric Cards Strip (Identical to About / Ventures standard) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {deliveryMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-3xl sm:text-4xl font-extrabold ${metric.color} group-hover:scale-105 transition-transform`}>
                      {metric.value}
                    </span>
                    <Icon className={`w-6 h-6 ${metric.glow}`} />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. The 4-Step Lifecycle Framework */}
      <section className="py-20 bg-background">
        <div className="container-tight max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-widest uppercase">Execution Protocol</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">Lifecycle Phases</h2>
            </div>
            <p className="text-sm text-foreground/70 max-w-md mt-2 md:mt-0 leading-relaxed">
              Engineered to eliminate ambiguity, minimize enterprise risk, and provide full transparency from Day 1 to infinity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodologySteps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-2xl glass-card p-8 border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${step.stepColor}`}>
                        {step.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                        <Icon className={`w-6 h-6 ${step.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                      {step.desc}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-2.5">
                      Key Artifacts &amp; Deliverables
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.artifacts.map((a) => (
                        <span
                          key={a}
                          className="px-2.5 py-1 bg-muted text-foreground/80 text-xs rounded-md font-medium border border-border/50"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Operating Cadence Banner: What You Can Expect Every Week */}
      <section className="py-12 bg-background">
        <div className="container-tight max-w-6xl">
          <div className="rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#061a1b] via-[#092224] to-[#061a1b] border border-emerald-500/20">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Calendar className="w-4 h-4" />
                <span>Rhythm of Accountability</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                What You Can Expect Every Week
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Uncompromising governance, constant communication channels, and real-time verifiable telemetry. We embed directly with your leadership team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              {weeklyCadence.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-start gap-3.5 hover:border-amber-300/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-white text-sm font-semibold mb-1">{c.title}</h3>
                      <p className="text-white/70 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Institutional Lead Capture CTA Banner */}
      <section className="py-16 bg-muted/20" id="consultation">
        <div className="container-tight max-w-6xl">
          <div className="bg-gradient-to-br from-[#061a1b] to-[#0a2f32] rounded-3xl p-8 lg:p-14 text-white shadow-2xl relative overflow-hidden border border-emerald-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                  <span>EXECUTIVE CONSULTATION</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  Start with a 30-minute discovery call.
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  No commitment — we will map your strategic goals, technical boundaries, and statutory constraints together with our principal leadership.
                </p>
                <ul className="space-y-3.5">
                  {[
                    "Bilateral NDA Countersigned prior to call",
                    "Led by Senior Technology & Venture Partners",
                    "Architecture scope assessment turnaround in 24 Hours",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Interactive Lead Intake Form */}
              <div className="lg:col-span-6">
                <div className="bg-[#061a1b]/85 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl text-white border border-white/15">
                  <h3 className="font-display font-bold text-xl text-white mb-1">Book Discovery Session</h3>
                  <p className="text-xs text-white/60 mb-5">Confidential inquiry sent directly to RJSC Secretariat &amp; Partner Desk.</p>

                  {booked ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-white">Discovery Call Scheduled</h4>
                      <p className="text-xs text-white/70">
                        Our executive desk has received your request and will counter-sign your NDA within 24 hours.
                      </p>
                      <button
                        onClick={() => setBooked(false)}
                        className="text-xs font-semibold text-amber-300 hover:underline pt-2 cursor-pointer"
                      >
                        Book another session →
                      </button>
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
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="mFullName">
                          Full Name
                        </label>
                        <input
                          id="mFullName"
                          type="text"
                          required
                          placeholder="e.g. Tanvir Ahmed"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="mEmail">
                            Enterprise Email
                          </label>
                          <input
                            id="mEmail"
                            type="email"
                            required
                            placeholder="tanvir@enterprise.com"
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="mOrg">
                            Organization / Venture
                          </label>
                          <input
                            id="mOrg"
                            type="text"
                            required
                            placeholder="e.g. Prime Bank / Tech Co"
                            className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1" htmlFor="mTimeline">
                          Target Timeline &amp; Budget Bracket
                        </label>
                        <input
                          id="mTimeline"
                          type="text"
                          placeholder="e.g. Q4 Launch • ৳25M-৳50M Allocation"
                          className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <span>Confirm 30-Minute Discovery Session</span>
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
              href="/about/standards"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
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
