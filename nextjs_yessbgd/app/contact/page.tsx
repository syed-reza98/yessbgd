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
    </div>
  );
}
