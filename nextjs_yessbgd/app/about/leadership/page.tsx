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
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";

const executives = [
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

export default function LeadershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(true);

  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="CORPORATE GOVERNANCE & STEWARDSHIP"
        title="The People Guiding YESS Bangladesh"
        subtitle="A multidisciplinary executive team uniting sovereign venture strategy, distributed systems engineering, statutory legal compliance, and nationwide operational resilience."
      />

      {/* 1. Governance Telemetry Bar */}
      <section className="bg-[#061a1b] text-white py-6 border-b border-white/10">
        <div className="container-tight flex flex-wrap items-center justify-between gap-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[#d4a359]">11+ YEARS</span>
            <span className="text-white/60">Operating History in Dhaka</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#35b0aa]" />
            <span className="text-[#35b0aa]">13 SUBSIDIARIES</span>
            <span className="text-white/60">Under Direct Executive Oversight</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">100% BOARD INDEPENDENCE</span>
            <span className="text-white/60">Statutory RJSC Reg: C-184920</span>
          </div>
        </div>
      </section>

      {/* 2. Executive Committee Profiles (Stitch Section 1 exact match) */}
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
            {executives.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl glass-card p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-16 w-16 rounded-2xl bg-[#061a1b] text-[#d4a359] font-display font-extrabold text-xl flex items-center justify-center shadow-md border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                      {m.initials}
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
                    <span className="text-[11px] font-bold text-[#d4a359] uppercase tracking-wider block">
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

      {/* 3. Institutional Governance & Advisory Pillars (Stitch Section 2 exact match) */}
      <section className="py-16 bg-[#f4f8f8] border-b border-[#eaf2f2]">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INDEPENDENT OVERSIGHT
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
              Institutional Governance & Advisory Pillars
            </h3>
            <p className="text-sm text-foreground/70 mt-2">
              External governance councils protecting minority stakeholders and guaranteeing sovereign operational fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <ShieldCheck className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-display font-bold text-lg text-foreground">
                Regulatory & Compliance
              </h4>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Bi-annual statutory audits under RJSC GovBD regulations, NBR corporate tax filings, and full alignment with Bangladesh Bank foreign exchange rules.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <Award className="h-8 w-8 text-[#d4a359] mb-3" />
              <h4 className="font-display font-bold text-lg text-foreground">
                Academic Research Alliances
              </h4>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Collaboration with leading engineering universities in Dhaka on distributed cryptography, agricultural IoT protocols, and domestic edge meshes.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <Lock className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-display font-bold text-lg text-foreground">
                Capital Structure & Audit
              </h4>
              <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                Zero capital default protocols, bilateral escrow milestone gates, and 100% foreground IP protection guaranteed on all enterprise partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Executive Briefing & Direct Dialogue Intake Form (Stitch Section 4 exact match) */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden" id="leadership-briefing">
        <div className="container-tight max-w-3xl">
          <div className="glass-card-dark rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest block">
                  CONFIDENTIAL EXECUTIVE CHANNEL
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                  Speak with our leadership.
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <Lock className="h-3 w-3" />
                <span>Bilateral NDA Guaranteed</span>
              </div>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-display font-bold text-xl text-white">
                  Leadership Briefing Requested
                </h4>
                <p className="text-xs text-white/70 mt-2 max-w-md mx-auto">
                  Our Managing Director's office will review your institutional inquiry and respond with a formal invitation within 1 business day.
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
                    <label className="text-xs font-semibold text-white/80 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariqur Rahman"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/80 block mb-1.5">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white/80 block mb-1.5">
                      Organization / Holding Co. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Beximco Group / BRAC"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/80 block mb-1.5">
                      Executive Dialogue Focus
                    </label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0a2022] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
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
                  <label className="text-xs font-semibold text-white/80 block mb-1.5">
                    Brief Scoping Context
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Outline your strategic mandate, key timelines, or proposed co-investment scale..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="nda-agree"
                    checked={ndaChecked}
                    onChange={(e) => setNdaChecked(e.target.checked)}
                    className="rounded border-white/20 text-emerald-500 focus:ring-0"
                  />
                  <label htmlFor="nda-agree" className="text-[11px] text-white/70">
                    Require bilateral mutual NDA execution prior to disclosure
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white font-bold text-xs shadow-lg hover:from-[#006A4E] hover:to-[#085252] transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
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
