import type { Metadata } from "next";
import Link from "next/link";
import { VenturesDirectory } from "@/components/VenturesDirectory";
import { getVentures, getSitePage } from "@/lib/cms";
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Workflow,
  Sparkles,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("ventures");
  return {
    title: page?.seo_title || "Ventures Directory | YESS Bangladesh (yessbgd)",
    description:
      page?.seo_description ||
      "Explore the sovereign subsidiaries of YESS Bangladesh spanning enterprise cloud, media streaming, agritech IoT, and logistics.",
  };
}

const metrics = [
  {
    value: "13",
    label: "Operating Entities",
    desc: "Active cross-sector subsidiaries",
    icon: Building2,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "$50M+",
    label: "Cumulative Enterprise Value",
    desc: "Sovereign valuation metric",
    icon: TrendingUp,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "4",
    label: "Core Industry Verticals",
    desc: "Cloud, Agribusiness, Media, Logistics",
    icon: Workflow,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "100%",
    label: "Sovereign Ownership",
    desc: "Institutional national governance",
    icon: ShieldCheck,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

export default async function VenturesPage() {
  const [venturesData, sitePage] = await Promise.all([
    getVentures(),
    getSitePage("ventures"),
  ]);

  const dynamicMetrics = [
    {
      ...metrics[0],
      value: String(venturesData && venturesData.length > 0 ? venturesData.length : 13),
    },
    ...metrics.slice(1),
  ];

  const activeMetrics = Array.isArray(sitePage?.data?.metrics) && sitePage.data.metrics.length > 0
    ? sitePage.data.metrics.map((m: any, i: number) => {
        const fallback = dynamicMetrics[i % dynamicMetrics.length];
        return {
          value: m.value || fallback.value,
          label: m.label || fallback.label,
          desc: m.desc || fallback.desc,
          icon: fallback.icon,
          color: m.color || fallback.color,
          glow: m.glow || fallback.glow,
        };
      })
    : dynamicMetrics;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/hero-business.jpg')` }}
        />
        {/* Background Ambient Geometric Grid Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Tag */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Ventures</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50/80 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{sitePage?.hero_eyebrow || "— SOVEREIGN VENTURE PORTFOLIO —"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  13 Transformative Ventures Driving{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Bangladesh&apos;s New Economy
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle || "From enterprise cloud architectures to sovereign cold-chain logistics, explore our diversified portfolio companies built for regional resilience and global competitiveness."}
            </p>
          </div>

          {/* 4 Metric Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((metric: any) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all">
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{metric.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Directory Section with Filters & Interactive Fleet */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <VenturesDirectory initialVentures={venturesData} />
        </div>
      </section>
    </div>
  );
}
