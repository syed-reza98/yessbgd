import type { Metadata } from "next";
import { InsightsDirectory } from "@/components/InsightsDirectory";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { BookOpen, Users, BarChart3, ShieldCheck } from "lucide-react";
import { getInsights, getSitePage } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("insights");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Insights & Thought Leadership Hub",
    description:
      page?.seo_description ||
      "Proprietary research, macroeconomic analysis, and engineering whitepapers published by YESS venture architects and sector specialists.",
  };
}

const editorialMetrics = [
  {
    val: "24+",
    title: "Research Whitepapers",
    desc: "Peer-reviewed national architectural publications and systems blueprints.",
    icon: BookOpen,
    valColor: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    val: "18k+",
    title: "Executive Subscribers",
    desc: "C-Suite, ministerial, and global venture partner readership across Asia.",
    icon: Users,
    valColor: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    val: "Quarterly",
    title: "Macro Forecasts",
    desc: "Bangladesh industrial output, currency liquidity & tech sector outlook.",
    icon: BarChart3,
    valColor: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    val: "Zero-Trust",
    title: "Peer-Reviewed Dispatches",
    desc: "GovTech identity, Agritech IoT telemetry, and FinTech core systems.",
    icon: ShieldCheck,
    valColor: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

export default async function InsightsPage() {
  const [allInsights, sitePage] = await Promise.all([
    getInsights(),
    getSitePage("insights"),
  ]);

  const dynamicMetrics = [
    {
      ...editorialMetrics[0],
      val: `${allInsights.length || 24}+`,
    },
    ...editorialMetrics.slice(1),
  ];

  const activeMetrics = Array.isArray(sitePage?.data?.metrics) && sitePage.data.metrics.length > 0
    ? sitePage.data.metrics.map((m: any, i: number) => {
        const fallback = dynamicMetrics[i % dynamicMetrics.length];
        return {
          val: m.val || m.value || fallback.val,
          title: m.title || m.label || fallback.title,
          desc: m.desc || fallback.desc,
          icon: fallback.icon,
          valColor: m.valColor || m.color || fallback.valColor,
          glow: m.glow || fallback.glow,
        };
      })
    : dynamicMetrics;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/heroes/global-network-bg.webp"
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
          <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
            <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
              {sitePage?.hero_eyebrow || "Institutional research & thought leadership"}
            </span>
          </div>

          {/* Headline & Lede (home scale, solid two-tone) */}
          <div className="max-w-4xl">
            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Macroeconomic Intelligence &amp;</span>
                  <span className="block text-[#026E4D]">Sovereign Systems Architecture</span>
                </>
              )}
            </h1>
            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "Proprietary research, macroeconomic analysis, and engineering whitepapers published by YESS venture architects and sector specialists."}
              </p>
            </div>
          </div>

          {/* Editorial Telemetry Metric Strip (home card style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((m: any) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="p-6 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-3xl sm:text-4xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors"
                    >
                      {m.val}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-sm font-bold text-[#0D1E2D] mb-1">
                    {m.title}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <InsightsDirectory initialInsights={allInsights} />

          {/* Institutional Intelligence Dispatch Newsletter */}
          <section className="rounded-3xl p-8 sm:p-12 text-slate-900 border border-teal-200/80 bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-bold">
                  Institutional Intelligence Dispatch
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                  Receive Quarterly Economic Briefings &amp; Technology Whitepapers
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Direct distribution to sovereign funds, development agencies, and institutional partners across South Asia. Zero spam, bilateral NDA safeguarded.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <NewsletterSubscription />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
