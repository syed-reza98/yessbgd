"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Trophy,
  ShieldCheck,
  Globe2,
  Building2,
  Heart,
  CheckCircle2,
  Gavel,
  Download,
  Phone,
  Mail,
  ArrowRight,
  Lock,
  Landmark,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import type { CmsSitePage } from "@/lib/cms";

const defaultTrustBadges = [
  { title: "ISO 9001:2015", subtitle: "QMS Certified", icon: BadgeCheck, color: "text-primary" },
  { title: "BASIS Member", subtitle: "ID #A-941", icon: Trophy, color: "text-amber-500" },
  { title: "ISO 27001", subtitle: "Security Standard", icon: ShieldCheck, color: "text-emerald-500" },
  { title: "DCCI Member", subtitle: "Institutional Grade", icon: Landmark, color: "text-primary" },
  { title: "RJSC Compliant", subtitle: "Statutory Reg C-184920", icon: Gavel, color: "text-amber-600" },
];

const defaultAccreditedCitations = [
  {
    icon: Trophy,
    tier: "Member ID #A-941 • Premier Tier",
    title: "BASIS Member",
    desc: "Official member of the Bangladesh Association of Software and Information Services. Active participant in national digital economy policies and sovereign IT exports.",
    footerIcon: CheckCircle2,
    footerText: "Registered Institutional Member • Verified Standing",
    tierColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    icon: Award,
    tier: "ISO 9001:2015 Aligned",
    title: "ISO-Aligned Quality Management System",
    desc: "Internal quality management processes strictly aligned with ISO 9001 principles, covering end-to-end SDLC, rigorous automated testing, and continuous client feedback loops.",
    footerIcon: ShieldCheck,
    footerText: "Continuous Audit Protocol • SRE Grade",
    tierColor: "bg-primary/10 text-primary border-primary/30",
  },
  {
    icon: ShieldCheck,
    tier: "EU Privacy Standard Compliant",
    title: "GDPR-Aware Delivery & Data Privacy",
    desc: "Privacy-by-design engineering frameworks for institutional clients with European Union, UK, and cross-border statutory compliance obligations.",
    footerIcon: Lock,
    footerText: "Zero-Trust Cryptographic Data Isolation",
    tierColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    icon: Globe2,
    tier: "UK, UAE, Singapore & US",
    title: "Cross-Border Delivery Partner",
    desc: "Trusted offshore engineering and consulting partner for enterprise agencies and venture studios across London, Dubai, Singapore, and Silicon Valley.",
    footerIcon: Award,
    footerText: "Dual-Currency SPV & Bilateral Settlement",
    tierColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    icon: Building2,
    tier: "Tier-1 Institutional Vendor",
    title: "Empanelled Enterprise Vendor",
    desc: "Formally empanelled sovereign technology partner with leading private commercial banks, telecommunications operators, and government ministries in Bangladesh.",
    footerIcon: Landmark,
    footerText: "BTRC & Central Bank Sandbox Architecture",
    tierColor: "bg-primary/10 text-primary border-primary/30",
  },
  {
    icon: Heart,
    tier: "98% Team Retention Rate",
    title: "Engineering Culture & Retention Award",
    desc: "Recognized for outstanding engineering culture, continuous learning stipends, zero gender pay gap, and industry-leading developer retention in Dhaka.",
    footerIcon: CheckCircle2,
    footerText: "500+ Engineers Across Dhaka Innovation Hubs",
    tierColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
];

interface AwardsClientProps {
  sitePage?: CmsSitePage | null;
}

export function AwardsClient({ sitePage }: AwardsClientProps) {
  const [submitted, setSubmitted] = useState(false);

  const trustBadges = (sitePage?.data?.badges as typeof defaultTrustBadges) || defaultTrustBadges;
  const citations = (sitePage?.data?.citations as typeof defaultAccreditedCitations) || defaultAccreditedCitations;

  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero & Trust Pills (Modern Light Theme) */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-15"
          style={{ backgroundImage: "url('/assets/heroes/hero_6a8975c2b742a.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 pointer-events-none" />

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
            <span className="text-emerald-800 font-bold">Awards &amp; Recognition</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{sitePage?.hero_eyebrow || "— RECOGNITION, ACCREDITATIONS & ALLIANCES —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Awards, Accreditations &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    Global Certifications
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
              {sitePage?.hero_subtitle ||
                "A verifiable track record of statutory compliance, industry memberships, international engineering standards, and institutional delivery excellence."}
            </p>
          </div>

          {/* Trust Badges Strip (Light Theme) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6 border-t border-slate-200">
            {trustBadges.map((badge: any, i: number) => {
              const Icon = typeof badge.icon === "string" ? BadgeCheck : (badge.icon || BadgeCheck);
              return (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-4 flex items-center gap-3.5 hover:border-emerald-500/50 hover:shadow-md transition-all group shadow-xs"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{badge.title}</span>
                    <span className="text-[11px] text-slate-500 block">{badge.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Citations List */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container-tight max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTITUTIONAL ACCREDITATIONS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
              Recognitions &amp; Active Memberships
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Verified corporate memberships, ISO process alignments, and domestic regulatory compliances.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {citations.map((item: any, idx: number) => {
              const Icon = typeof item.icon === "string" ? Award : (item.icon || Award);
              const FooterIcon = typeof item.footerIcon === "string" ? CheckCircle2 : (item.footerIcon || CheckCircle2);
              return (
                <article
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-border flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.tierColor || "bg-primary/10 text-primary border-primary/20"}`}>
                        {item.tier}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center gap-2 text-[11px] text-foreground/60">
                    <FooterIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{item.footerText}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Verification Intake Form */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white text-slate-900 relative overflow-hidden border-t border-slate-200" id="accreditation-verification">
        <div className="container-tight max-w-4xl">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest block">
                  STATUTORY DILIGENCE
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                  Request Verification Dossier
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Need certified copies of our RJSC Certificate of Incorporation, BASIS Membership Certificate, or ISO compliance audit reports for vendor empanelment?
                </p>
                <div className="pt-2 space-y-2 text-xs text-slate-700">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Reg: RJSC C-184920</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>BASIS Membership ID #A-941</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-600" />
                    <span>Bilateral NDA Executable on Demand</span>
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                    <CheckCircle2 className="h-10 w-10 text-teal-700 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-lg text-slate-900">Diligence Request Received</h3>
                    <p className="text-xs text-slate-600 mt-2">
                      Our Legal &amp; Compliance Office will email the certified documentation pack within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="corpEmail">
                          Corporate Email *
                        </label>
                        <input
                          id="corpEmail"
                          type="email"
                          required
                          placeholder="name@organization.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-xs transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="orgMinistry">
                          Organization / Bank *
                        </label>
                        <input
                          id="orgMinistry"
                          type="text"
                          required
                          placeholder="e.g. Commercial Bank / Gov"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-xs transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="projectScope">
                        Scope of Inquiry
                      </label>
                      <textarea
                        id="projectScope"
                        rows={3}
                        placeholder="Specify certificates, audit reports, or vendor registration checklists required..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white text-xs transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Request Compliance Pack</span>
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
              href="/about/methodology"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>Explore Engineering Methodology</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
