import type { Metadata } from "next";
import Link from "next/link";
import { InsightsDirectory } from "@/components/InsightsDirectory";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { BookOpen, Users, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { getInsights, getSitePage } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("insights");
  return {
    title: page?.seo_title || "Insights & Thought Leadership Hub | YESS Bangladesh",
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
            <span className="text-[#35b0aa]">Insights &amp; Research</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#d4a359]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>{sitePage?.hero_eyebrow || "— INSTITUTIONAL RESEARCH & THOUGHT LEADERSHIP —"}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Macroeconomic Intelligence &amp;{" "}
                  <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                    Sovereign Systems Architecture
                  </span>
                  .
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
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
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-3xl sm:text-4xl font-extrabold ${m.valColor} group-hover:scale-105 transition-transform`}
                    >
                      {m.val}
                    </span>
                    <Icon className={`w-6 h-6 ${m.glow}`} />
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {m.title}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-16 sm:py-20 bg-background">
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
          <section className="rounded-3xl p-8 sm:p-12 text-white border border-emerald-500/25 bg-gradient-to-br from-[#061a1b] via-[#092224] to-[#061a1b] shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  Institutional Intelligence Dispatch
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Receive Quarterly Economic Briefings &amp; Technology Whitepapers
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Direct distribution to sovereign funds, development agencies, and institutional partners across South Asia. Zero spam, bilateral NDA safeguarded.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <NewsletterSubscription />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
