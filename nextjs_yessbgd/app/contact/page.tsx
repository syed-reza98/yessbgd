import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormAndLocator } from "@/components/ContactFormAndLocator";
import {
  Clock,
  Building,
  Users,
  ShieldCheck,
  ChevronRight,
  Shield,
  ArrowRight,
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
  },
  {
    icon: Building,
    title: "2 Strategic Hubs",
    desc: "Motijheel HQ & Gulshan Lab",
    color: "text-[#f6c87a]",
  },
  {
    icon: Users,
    title: "Direct Partner Access",
    desc: "Zero Recruiter Barrier",
    color: "text-[#35b0aa]",
  },
  {
    icon: ShieldCheck,
    title: "NDA Governance",
    desc: "Bilateral Protocol Enforced",
    color: "text-[#f6c87a]",
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
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-background border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0d6e6e] font-bold">Contact Us</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container border border-[#d4a359]/30 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span>Direct Institutional Channels</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight mb-4">
              Connect With Bangladesh&apos;s{" "}
              <span className="bg-gradient-to-r from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] bg-clip-text text-transparent">
                Venture Ecosystem
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed mb-8">
              Engage our managing partners, venture leads, and engineering directors directly. Guaranteed
              executive response within one business day for institutional inquiries and sovereign tech
              partnerships.
            </p>
          </div>

          {/* Telemetry Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#061a1b] text-white border border-white/10 shadow-sm">
            {telemetryBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="flex items-center gap-3 px-3 py-2 border-r border-white/10 last:border-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${badge.color}`} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">{badge.title}</p>
                    <p className="text-[10px] text-outline-variant">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dual-Column Engagement Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactFormAndLocator />
      </main>

      {/* Frequently Addressed Inquiries Strip */}
      <section className="py-12 bg-surface-container-low dark:bg-[#061a1b]/40 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#7e5713] dark:text-[#f2be71] font-bold text-xs uppercase tracking-widest block mb-2">
              Institutional Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#005454] dark:text-white">
              Frequently Addressed Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
              Key governance policies governing our partnerships, IP protection, and foreign enterprise engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqCards.map((faq) => {
              const Icon = faq.icon;
              return (
                <div
                  key={faq.question}
                  className="p-6 rounded-2xl bg-surface-container-lowest dark:bg-[#061a1b] border border-outline-variant/40 shadow-sm hover:border-[#0d6e6e]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-surface-container dark:bg-white/5 flex items-center justify-center text-[#005454] dark:text-[#84d4d3] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#005454] dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-[#005454] dark:text-[#84d4d3] font-semibold">
                    <Link href={faq.href} className="hover:underline flex items-center gap-1.5">
                      <span>{faq.action}</span>
                      {faq.download ? <Download className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
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
