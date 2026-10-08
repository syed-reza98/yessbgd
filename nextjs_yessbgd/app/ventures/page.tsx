import type { Metadata } from "next";
import { VenturesDirectory } from "@/components/VenturesDirectory";
import { getVentures, getSitePage } from "@/lib/cms";
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Workflow,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("ventures");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh.*$/i, "") || "Ventures Directory",
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
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/hero-business.jpg"
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

        <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
              <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                {sitePage?.hero_eyebrow || "Sovereign venture portfolio"}
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">13 Transformative Ventures Driving</span>
                  <span className="block text-[#026E4D]">Bangladesh&apos;s New Economy</span>
                </>
              )}
            </h1>

            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "From enterprise cloud architectures to sovereign cold-chain logistics, explore our diversified portfolio companies built for regional resilience and global competitiveness."}
              </p>
            </div>
          </div>

          {/* 4 Metric Cards Strip (home card style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((metric: any) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-6 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors">
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-sm font-bold text-[#0D1E2D]">{metric.label}</p>
                  <p className="text-xs text-[#64748B] mt-1">{metric.desc}</p>
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
