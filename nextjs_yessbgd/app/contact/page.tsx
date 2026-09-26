import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormAndLocator } from "@/components/ContactFormAndLocator";
import {
  Clock,
  Building,
  Users,
  ShieldCheck,
  Sparkles,
  Download,
  Gavel,
  Globe2,
  GitBranch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Dual-Office Locator | YESS Bangladesh",
  description:
    "Connect directly with managing partners, venture leads, and engineering directors. Dual-campus innovation labs in Motijheel HQ and Gulshan-2, Dhaka.",
};

const telemetryBadges = [
  {
    icon: Clock,
    title: "1 Business Day",
    desc: "Response SLA Contracted",
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    icon: Building,
    title: "2 Strategic Hubs",
    desc: "Motijheel HQ & Gulshan Lab",
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    icon: Users,
    title: "Direct Partner Access",
    desc: "Zero Recruiter Barrier",
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    icon: ShieldCheck,
    title: "NDA Governance",
    desc: "Bilateral Protocol Enforced",
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

const faqCards = [
  {
    icon: GitBranch,
    question: "Engagement Timeline for Venture Co-Building?",
    answer:
      "Initial architectural reviews take 2 business weeks. Approved entities move into bilateral SPV structuring within 30 statutory days with full governance transparency.",
    action: "Read Full SPV Charter",
    href: "/governance",
    download: false,
  },
  {
    icon: Gavel,
    question: "Proprietary IP & Bilateral NDA Execution?",
    answer:
      "Every institutional disclosure is safeguarded by strict mutual non-disclosure covenants governed by the Arbitration Act of Bangladesh, backed by airgapped repositories.",
    action: "Download NDA Protocol",
    href: "/privacy",
    download: true,
  },
  {
    icon: Globe2,
    question: "Can Global Conglomerates & Funds Co-Invest?",
    answer:
      "Yes. YESS Bangladesh operates under RJSC Act XVIII of 1994, fully aligned with Bangladesh Bank foreign remittance channels, BIDA protocols, and sovereign tax compliances.",
    action: "BIDA Inward Guidelines",
    href: "/ventures",
    download: false,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
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
            <span className="text-[#35b0aa]">Contact Us</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>— DIRECT INSTITUTIONAL CHANNELS —</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connect With Bangladesh&apos;s{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Venture Ecosystem
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
              Engage our managing partners, venture leads, and engineering directors directly. Guaranteed
              executive response within one business day for institutional inquiries and sovereign tech
              partnerships.
            </p>
          </div>

          {/* Telemetry Metric Cards Strip (4 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {telemetryBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-2xl sm:text-3xl font-extrabold ${badge.color} group-hover:scale-105 transition-transform`}
                    >
                      {badge.title}
                    </span>
                    <Icon className={`w-6 h-6 ${badge.glow}`} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dual-Column Engagement Section */}
      <main className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactFormAndLocator />
        </div>
      </main>

      {/* Frequently Addressed Inquiries Strip */}
      <section className="py-12 bg-muted/20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Statutory FAQs
              </span>
              <h2 className="font-display font-bold text-2xl text-foreground">
                Institutional Engagement Protocols
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqCards.map((faq) => {
              const Icon = faq.icon;
              return (
                <div
                  key={faq.question}
                  className="glass-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      href={faq.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <span>{faq.action}</span>
                      {faq.download ? (
                        <Download className="w-3.5 h-3.5" />
                      ) : (
                        <Globe2 className="w-3.5 h-3.5" />
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
