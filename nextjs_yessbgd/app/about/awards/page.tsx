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

const trustBadges = [
  { title: "ISO 9001:2015", subtitle: "QMS Certified", icon: BadgeCheck, color: "text-primary" },
  { title: "BASIS Member", subtitle: "ID #A-941", icon: Trophy, color: "text-amber-500" },
  { title: "ISO 27001", subtitle: "Security Standard", icon: ShieldCheck, color: "text-emerald-500" },
  { title: "DCCI Member", subtitle: "Institutional Grade", icon: Landmark, color: "text-primary" },
  { title: "RJSC Compliant", subtitle: "Statutory Reg C-184920", icon: Gavel, color: "text-amber-600" },
];

const accreditedCitations = [
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

export default function AwardsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero & Trust Pills */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background border-b border-border">
        <div className="container-tight max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs font-semibold text-foreground/60">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-foreground/40">/</li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li className="text-foreground/40">/</li>
              <li className="text-primary font-bold">Awards &amp; Recognition</li>
            </ol>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>RECOGNITION &amp; ALLIANCES</span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl mb-10">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight mb-4">
              Awards, Accreditations &amp; Global Certifications
            </h1>
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
              A snapshot of professional recognition, international certifications and strategic enterprise empanelments our team has earned along the way.
            </p>
          </div>

          {/* Trust Badges Metric Row / Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="rounded-xl glass-card p-3.5 flex items-center gap-3 border border-border shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${badge.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground leading-snug">{badge.title}</div>
                    <div className="text-[11px] text-foreground/60">{badge.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Institutional Accreditations & Awards Grid */}
      <section className="py-20 bg-background">
        <div className="container-tight max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Independent Benchmarks</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-1">
                Institutional Accreditations &amp; Portfolio Citations
              </h2>
            </div>
            <p className="text-sm text-foreground/70 max-w-md mt-3 md:mt-0 leading-relaxed">
              Rigorous independent audits, sovereign affiliations, and multilateral governance certifications backing every venture pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {accreditedCitations.map((item) => {
              const Icon = item.icon;
              const FooterIcon = item.footerIcon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl glass-card p-7 border border-border hover:border-primary/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${item.tierColor}`}>
                        {item.tier}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center gap-2 text-xs font-medium text-foreground/80">
                    <FooterIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item.footerText}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Statutory Legal Enactment & Compliance Authority Banner */}
      <section className="bg-gradient-to-r from-[#061a1b] via-[#0d6e6e] to-[#061a1b] py-8 text-white relative overflow-hidden border-y border-white/10">
        <div className="container-tight max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0 border border-amber-400/40 text-amber-300">
              <Gavel className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-300 tracking-wide uppercase">
                Statutory Legal Enactment &amp; Compliance Authority
              </div>
              <p className="text-xs sm:text-sm text-white/80 max-w-3xl leading-relaxed">
                Incorporated under the Companies Act (Act XVIII of 1994) • RJSC Registration No. C-184920/2022 • DCCI Corporate Member • Tax Identification (TIN) &amp; VAT Registered • Bangladesh Bank Regulatory Alignment.
              </p>
            </div>
          </div>
          <div className="shrink-0 w-full lg:w-auto">
            <a
              href="#consultation-intake"
              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:border-amber-300"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Download Statutory Dossier (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: Institutional Lead Capture CTA Banner */}
      <section className="py-20 bg-muted/30 relative overflow-hidden" id="consultation-intake">
        <div className="container-tight max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#061a1b] to-[#0a2f32] p-8 md:p-14 shadow-2xl text-white border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase">
                  <span>DIRECT INSTITUTIONAL DIALOGUE</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  Partner with a recognised team. Tell us about your goals and we'll show you why our clients stay.
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Senior partner-level engagement backed by bilateral NDAs, sovereign security enclaves, and ISO-certified delivery pipelines.
                </p>

                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="text-white/60">Direct Hotline:</span>
                    <a href="tel:+8801805464343" className="hover:text-amber-300 transition-colors font-mono font-bold">
                      +880 1805-464343
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-white/60">Direct Desk:</span>
                    <a href="mailto:yessbangla.bd@gmail.com" className="hover:text-amber-300 transition-colors font-mono font-bold">
                      yessbangla.bd@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Consultation Form */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl p-6 sm:p-8 bg-[#061a1b]/80 border border-white/15 shadow-2xl backdrop-blur-xl">
                  {submitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-white">Consultation Protocol Initiated</h3>
                      <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                        Your inquiry has been logged under bilateral protocol. A designated Partner will reach out within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-xs font-semibold text-amber-300 hover:underline pt-2 inline-block cursor-pointer"
                      >
                        Submit another inquiry →
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
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="fullName">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="e.g. Engr. Tanvir Ahmed"
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="corpEmail">
                            Corporate Email
                          </label>
                          <input
                            id="corpEmail"
                            type="email"
                            required
                            placeholder="name@organization.com"
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="orgMinistry">
                            Organization / Ministry
                          </label>
                          <input
                            id="orgMinistry"
                            type="text"
                            required
                            placeholder="e.g. Commercial Bank / ICT"
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1" htmlFor="projectScope">
                          Brief Project Scope / Mandate
                        </label>
                        <textarea
                          id="projectScope"
                          rows={3}
                          placeholder="Outline sovereign infrastructure requirements, SDLC timeline, or digital transformation goals..."
                          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                        />
                      </div>
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/80 leading-snug">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="mt-0.5 rounded border-white/30 text-emerald-500 focus:ring-amber-400 bg-white/10"
                          />
                          <span>
                            <strong className="text-amber-300">Mandate Bilateral NDA:</strong> Require mutual non-disclosure agreement prior to technical briefing.
                          </span>
                        </label>
                      </div>
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                        >
                          <span>Initiate Executive Consultation</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
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
              href="/about/methodology"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
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
