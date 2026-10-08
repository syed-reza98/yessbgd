import type { Metadata } from "next";
import Link from "next/link";
import { ContactFormAndLocator } from "@/components/ContactFormAndLocator";
import { getSitePage, getCompanySettings } from "@/lib/cms";
import {
  Clock,
  Building,
  Users,
  ShieldCheck,
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
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/contact-hero.jpg"
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
            {/* Eyebrow pill (home style) */}
            <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
              <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                {sitePage?.hero_eyebrow || "Direct institutional channels"}
              </span>
            </div>

            {/* Headline (home scale, solid two-tone) */}
            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title || (
                <>
                  <span className="block text-[#030D18]">Connect With Bangladesh&apos;s</span>
                  <span className="block text-[#026E4D]">Venture Ecosystem</span>
                </>
              )}
            </h1>

            {/* Lede (home description) */}
            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "Engage our managing partners, venture leads, and engineering directors directly. Guaranteed executive response within one business day for institutional inquiries and sovereign tech partnerships."}
              </p>
            </div>
          </div>

          {/* Telemetry Metric Cards Strip (4 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeBadges.map((badge: any) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="p-6 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-2xl sm:text-3xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors"
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
