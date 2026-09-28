import type { Metadata } from "next";
import Link from "next/link";
import { InsightsDirectory } from "@/components/InsightsDirectory";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { BookOpen, Users, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
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
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/heroes/global-network-bg.jpg')` }}
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
            <span className="text-teal-700">Insights &amp; Research</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{sitePage?.hero_eyebrow || "— INSTITUTIONAL RESEARCH & THOUGHT LEADERSHIP —"}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Macroeconomic Intelligence &amp;{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Sovereign Systems Architecture
                  </span>
                  .
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle || "Proprietary research, macroeconomic analysis, and engineering whitepapers published by YESS venture architects and sector specialists."}
            </p>
          </div>

          {/* Editorial Telemetry Metric Strip (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((m: any) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all"
                    >
                      {m.val}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    {m.title}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
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
