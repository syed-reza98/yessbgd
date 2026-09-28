import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormAndLocator } from "@/components/ContactFormAndLocator";
import { getSitePage, getCompanySettings } from "@/lib/cms";
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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("contact");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Contact & Headquarters Locator",
    description:
      page?.seo_description ||
      "Connect directly with managing partners, venture leads, and engineering directors at our Dhaka Corporate Headquarters in Mirpur, Dhaka.",
  };
}

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
    title: "Corporate HQ",
    desc: "Mirpur-11, Dhaka-1216",
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

export default async function ContactPage() {
  const [sitePage, settings] = await Promise.all([
    getSitePage("contact"),
    getCompanySettings(),
  ]);

  const activeBadges = Array.isArray(sitePage?.data?.badges) && sitePage.data.badges.length > 0
    ? sitePage.data.badges.map((badge: any, index: number) => {
        const fallback = telemetryBadges[index % telemetryBadges.length];
        return {
          icon: fallback.icon,
          title: badge.title || badge.value || fallback.title,
          desc: badge.desc || badge.label || fallback.desc,
          color: badge.color || fallback.color,
          glow: badge.glow || fallback.glow,
        };
      })
    : telemetryBadges;

  const activeFaqs = Array.isArray(sitePage?.data?.faqs) && sitePage.data.faqs.length > 0
    ? sitePage.data.faqs.map((faq: any, index: number) => {
        const fallback = faqCards[index % faqCards.length];
        return {
          icon: fallback.icon,
          question: faq.question || faq.q || fallback.question,
          answer: faq.answer || faq.a || fallback.answer,
          action: faq.action || fallback.action,
          href: faq.href || fallback.href,
          download: typeof faq.download === "boolean" ? faq.download : fallback.download,
        };
      })
    : faqCards;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/contact-welcome-bd.jpg')` }}
        />
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Contact Us</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{sitePage?.hero_eyebrow || "— DIRECT INSTITUTIONAL CHANNELS —"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title || (
                <>
                  Connect With Bangladesh&apos;s{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Venture Ecosystem
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle || "Engage our managing partners, venture leads, and engineering directors directly. Guaranteed executive response within one business day for institutional inquiries and sovereign tech partnerships."}
            </p>
          </div>

          {/* Telemetry Metric Cards Strip (4 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeBadges.map((badge: any) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all"
                    >
                      {badge.title}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{badge.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dual-Column Engagement Section */}
      <div className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <ContactFormAndLocator settings={settings} />
        </div>
      </div>

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
            {activeFaqs.map((faq: any) => {
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
