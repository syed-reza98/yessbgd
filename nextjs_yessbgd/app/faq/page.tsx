import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  Code,
  Headphones,
  MapPin,
  Lock,
  ArrowRight,
  Shield,
  HelpCircle,
  PhoneCall,
  Mail,
} from "lucide-react";

import { getSitePage } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("faq");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Corporate FAQ & Knowledge Base",
    description:
      page?.seo_description ||
      "Everything you need to know about our engagement models, sovereign technology architectures, delivery timelines, pricing, and national operations across Bangladesh.",
  };
}

const trustMetrics = [
  {
    title: "100% IP",
    desc: "Foreground IP fully assigned to client upon milestone settlement.",
    icon: Code,
    color: "text-[#35b0aa]",
    glow: "text-[#35b0aa]",
  },
  {
    title: "24/7 SLA",
    desc: "Continuous SRE monitoring & guaranteed support response.",
    icon: Headphones,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    title: "Dhaka HQ",
    desc: "Mirpur-11, Pallabi central corporate office (Metro Pillar -312).",
    icon: MapPin,
    color: "text-white",
    glow: "text-emerald-400",
  },
  {
    title: "NDA Guard",
    desc: "Bilateral non-disclosure executed before technical deep-dive.",
    icon: Lock,
    color: "text-[#f6c87a]",
    glow: "text-[#d4a359]",
  },
];

export default async function FaqPage() {
  const sitePage = await getSitePage("faq");

  const activeMetrics = Array.isArray(sitePage?.data?.metrics) && sitePage.data.metrics.length > 0
    ? sitePage.data.metrics.map((m: any, i: number) => {
        const fallback = trustMetrics[i % trustMetrics.length];
        return {
          title: m.title || m.label || fallback.title,
          desc: m.desc || fallback.desc,
          icon: fallback.icon,
          color: m.color || fallback.color,
          glow: m.glow || fallback.glow,
        };
      })
    : trustMetrics;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/contact-welcome-bd.jpg"
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
                {sitePage?.hero_eyebrow || "Knowledge base & client advisory"}
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Frequently Asked</span>
                  <span className="block text-[#026E4D]">Questions</span>
                </>
              )}
            </h1>

            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "Everything you need to know about our engagement models, sovereign technology architectures, delivery timelines, pricing, and national operations across Bangladesh."}
              </p>
            </div>
          </div>

          {/* Quick Trust Strip (home card style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((item: any) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors">
                      {item.title}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion with Categorized Tabs */}
      <div className="py-16 sm:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sitePage?.body && (
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <FaqAccordion initialFaqs={sitePage?.data?.faqs} />

          {/* Still Have Questions CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-foreground">
                Still have questions about institutional partnerships?
              </h3>
              <p className="text-sm text-foreground/70">
                Connect with our advisory directors for bilateral discussions under strict NDA.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>Speak With Partners</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
