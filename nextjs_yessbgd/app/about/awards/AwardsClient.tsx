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
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/heroes/hero_6a8975c2b742a.jpg"
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
            <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
              <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                {sitePage?.hero_eyebrow || "Recognition, accreditations & alliances"}
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Awards, Accreditations &amp;</span>
                  <span className="block text-[#026E4D]">Global Certifications</span>
                </>
              )}
            </h1>

            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle ||
                  "A verifiable track record of statutory compliance, industry memberships, international engineering standards, and institutional delivery excellence."}
              </p>
            </div>
          </div>

          {/* Trust Badges Strip (home card style) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {trustBadges.map((badge: any, i: number) => {
              const Icon = typeof badge.icon === "string" ? BadgeCheck : (badge.icon || BadgeCheck);
              return (
                <div
                  key={i}
                  className="bg-white/95 border border-gray-100/80 rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0D1E2D] block">{badge.title}</span>
                    <span className="text-[11px] text-[#64748B] block">{badge.subtitle}</span>
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
