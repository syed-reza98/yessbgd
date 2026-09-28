"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Lock,
  CheckCircle2,
  Calendar,
  Send,
  Building2,
  Sparkles,
} from "lucide-react";
import type { CmsSitePage } from "@/lib/cms";

const defaultExecutives = [
  {
    name: "Md Enamul Hayder",
    role: "Managing Director & Founder",
    credentials: "B.Sc. Engg, M.B.A. • 14+ Yrs Venture Leadership",
    initials: "EH",
    bio: "Pioneering sovereign venture architectures and industrial scale in Bangladesh. Led the founding of YESS Bangladesh holding structure, incubating 13 high-performance subsidiaries across software, logistics, digital media, and agriculture.",
    focus: "Venture Architecture, Capital Strategy, Sovereign Holding",
  },
  {
    name: "Sadia Rahman",
    role: "Chief Operating Officer",
    credentials: "Chartered Operational Lead • Ex-Tier 1 Telecom Lead",
    initials: "SR",
    bio: "Orchestrating cross-holding operations, nationwide talent deployment across 64 administrative districts, and organizational governance frameworks ensuring 99.8% SLA compliance across all client commitments.",
    focus: "Enterprise Operations, District Corridors, SLA Governance",
  },
  {
    name: "Arif Khan",
    role: "Chief Technology Architect",
    credentials: "M.S. Distributed Systems • Cloud Native & Kubernetes Lead",
    initials: "AK",
    bio: "Architect of the Sovereign Cloud Mesh and high-concurrency microservices engines. Oversees zero-trust security postures, bare-metal Kubernetes infrastructure, and technical diligence across all software acquisitions.",
    focus: "Sovereign Mesh, Zero-Trust Architecture, Bare-Metal K8s",
  },
  {
    name: "Dr. Farhana Ahmed",
    role: "Director of Research & Sustainability",
    credentials: "Ph.D. Agritech & Supply Chain Economics",
    initials: "FA",
    bio: "Directs agricultural technology R&D, cold-chain IoT sensor telemetry networks, and direct-to-farm algorithmic distribution rails for 10,000+ registered organic farmers across northern Bangladesh.",
    focus: "Agritech IoT, Post-Harvest Cold Chain, ESG Compliance",
  },
  {
    name: "Tanvir Hossain",
    role: "VP of Engineering & Cloud Infrastructure",
    credentials: "AWS/GCP Certified Solutions Architect • Linux Kernel Specialist",
    initials: "TH",
    bio: "Leads engineering squads for Yess Soft and Akash OTT. Architect of sub-second video ingestion pipelines, low-latency live transcoding clusters, and multi-tenant transactional ERP databases.",
    focus: "High-Concurrency Streaming, Video Transcoding, SRE/NOC",
  },
];

const defaultLeadershipMetrics = [
  {
    value: "11+ Years",
    label: "Operating History",
    desc: "Venture incubation & operational presence in Dhaka.",
    icon: Calendar,
    color: "text-[#d4a359]",
    glow: "text-[#d4a359]",
  },
  {
    value: "13",
    label: "Direct Oversight",
    desc: "Subsidiaries under active executive portfolio steering.",
    icon: Building2,
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    value: "100%",
    label: "Statutory RJSC",
    desc: "Registration C-184920 with audited independent charters.",
    icon: Award,
    color: "text-white",
    glow: "text-emerald-400",
  },
  {
    value: "Zero-Trust",
    label: "Fiduciary Protocol",
    desc: "Bilateral NDA covenant & complete client IP protection.",
    icon: ShieldCheck,
    color: "text-[#f6c87a]",
    glow: "text-[#d4a359]",
  },
];

interface LeadershipClientProps {
  sitePage?: CmsSitePage | null;
}

export function LeadershipClient({ sitePage }: LeadershipClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(true);

  const executives = (sitePage?.data?.executives as typeof defaultExecutives) || defaultExecutives;
  const metrics = (sitePage?.data?.metrics as typeof defaultLeadershipMetrics) || defaultLeadershipMetrics;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Page Hero & Governance Telemetry (Modern Light Theme) */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/assets/general/IT_Services.png')" }}
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
            <span className="text-emerald-800 font-bold">Leadership &amp; Governance</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{sitePage?.hero_eyebrow || "— CORPORATE GOVERNANCE & STEWARDSHIP —"}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  The Executive Stewardship Guiding{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    YESS Bangladesh
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "A multidisciplinary executive leadership council uniting sovereign venture strategy, distributed systems engineering, statutory legal compliance, and nationwide operational resilience."}
            </p>
          </div>

          {/* 4 Metric Cards Strip (Light Theme) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {metrics.map((metric: any) => {
              const Icon = typeof metric.icon === "string" ? Building2 : (metric.icon || Building2);
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

      {/* 2. Executive Committee Profiles */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              MANAGEMENT TEAM
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
              Executive Committee
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Principal partners and directors responsible for statutory stewardship, strategy, and engineering execution.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {executives.map((m: any) => (
              <article
                key={m.name}
                className="rounded-2xl glass-card p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-teal-700 to-teal-800 text-amber-300 font-display font-extrabold text-xl flex items-center justify-center shadow-md border border-teal-600/30 shrink-0 group-hover:scale-105 transition-transform">
                      {m.initials || m.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mt-0.5">
                        {m.role}
                      </p>
                      <span className="text-[11px] text-foreground/60 font-medium block mt-1">
                        {m.credentials}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/70">
                    {m.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-[11px] font-bold text-[#7e5713] dark:text-[#f6c87a] uppercase tracking-wider block">
                      Core Portfolio Focus:
                    </span>
                    <span className="text-xs text-foreground/80 font-medium">
                      {m.focus}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Institutional Governance & Advisory Pillars */}
      <section className="py-16 bg-[#f4f8f8] border-b border-[#eaf2f2]">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INDEPENDENT OVERSIGHT
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
              Institutional Governance & Advisory Pillars
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              External governance councils protecting minority stakeholders and guaranteeing sovereign operational fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <ShieldCheck className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Regulatory & Compliance
              </h3>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Bi-annual statutory audits under RJSC GovBD regulations, NBR corporate tax filings, and full alignment with Bangladesh Bank foreign exchange rules.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <Award className="h-8 w-8 text-[#d4a359] mb-3" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Academic Research Alliances
              </h3>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Collaboration with leading engineering universities in Dhaka on distributed cryptography, agricultural IoT protocols, and domestic edge meshes.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <Lock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-lg text-foreground">
                Capital Structure & Audit
              </h3>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Zero capital default protocols, bilateral escrow milestone gates, and 100% foreground IP protection guaranteed on all enterprise partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Executive Briefing & Direct Dialogue Intake Form */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white text-slate-900 relative overflow-hidden border-t border-slate-200" id="leadership-briefing">
        <div className="container-tight max-w-3xl">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative bg-white">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block">
                  CONFIDENTIAL EXECUTIVE CHANNEL
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
                  Speak with our leadership.
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
                <Lock className="h-3 w-3" />
                <span>Bilateral NDA Guaranteed</span>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                <CheckCircle2 className="h-12 w-12 text-teal-700 mx-auto mb-3" />
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Leadership Briefing Requested
                </h3>
                <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                  Our Managing Director&apos;s office will review your institutional inquiry and respond with a formal invitation within 1 business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="exec-consult-name" className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="exec-consult-name"
                      type="text"
                      required
                      placeholder="e.g. Tariqur Rahman"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="exec-consult-email" className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Institutional Email *
                    </label>
                    <input
                      id="exec-consult-email"
                      type="email"
                      required
                      placeholder="name@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="exec-consult-org" className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Organization / Holding Co. *
                    </label>
                    <input
                      id="exec-consult-org"
                      type="text"
                      required
                      placeholder="e.g. Beximco Group / BRAC"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="exec-consult-focus" className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Executive Dialogue Focus
                    </label>
                    <select
                      id="exec-consult-focus"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                    >
                      <option>Sovereign Venture Incubation & Co-Investment</option>
                      <option>Enterprise Cloud & Core Banking Modernization</option>
                      <option>National Cold-Chain & Agri Logistics</option>
                      <option>Digital Media OTT Platform Infrastructure</option>
                      <option>Board Advisory & Statutory Governance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="exec-consult-message" className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Brief Scoping Context
                  </label>
                  <textarea
                    id="exec-consult-message"
                    rows={3}
                    placeholder="Outline your strategic mandate, key timelines, or proposed co-investment scale..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="nda-agree"
                    checked={ndaChecked}
                    onChange={(e) => setNdaChecked(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="nda-agree" className="text-[11px] text-slate-600">
                    Require bilateral mutual NDA execution prior to disclosure
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Request Leadership Briefing</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
