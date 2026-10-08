import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Tv,
  Truck,
  ShoppingCart,
  Landmark,
  HeartPulse,
  TrendingUp,
  ShieldCheck,
  Building2,
  Workflow,
} from "lucide-react";
import { industries as fallbackIndustries } from "@/data/industries";
import { getIndustries, getSitePage } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("industries");
  return {
    title: page?.seo_title || "Industries Overview",
    description:
      page?.seo_description ||
      "Sector transformation across Media & Broadcasting, Manufacturing & RMG, Logistics, E-commerce, Financial Services, and Healthcare in Bangladesh.",
  };
}

const industryMetrics = [
  {
    value: "6",
    label: "Core Industry Verticals",
    desc: "National high-impact sectors transformed",
    icon: Factory,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "$100M+",
    label: "Cumulative Transaction Flow",
    desc: "Enterprise transaction volume secured",
    icon: TrendingUp,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "64 Districts",
    label: "Nationwide Deployment",
    desc: "Active logistics & digital reach",
    icon: Truck,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "Zero-Trust",
    label: "Sovereign Compliance",
    desc: "RJSC, BIDA & central bank standards",
    icon: ShieldCheck,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

export default async function IndustriesPage() {
  const [allIndustries, sitePage] = await Promise.all([
    getIndustries(),
    getSitePage("industries"),
  ]);

  const industryList = allIndustries && allIndustries.length > 0 ? allIndustries : fallbackIndustries;

  const dynamicMetrics = [
    {
      ...industryMetrics[0],
      value: String(industryList.length || 6),
    },
    ...industryMetrics.slice(1),
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
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28 flex flex-col justify-center">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/delivery.webp"
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
                {sitePage?.hero_eyebrow || "Sector transformation & industrial thesis"}
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Transforming Bangladesh&apos;s Critical Sectors</span>
                  <span className="block text-[#026E4D]">at Sovereign Industrial Scale</span>
                </>
              )}
            </h1>

            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "Bringing enterprise cloud architectures, regulatory compliance, IoT automation, and institutional governance to the core engines driving Bangladesh's multi-billion dollar economy."}
              </p>
            </div>
          </div>

          {/* 4 Telemetry Metric Cards Strip (home card style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((metric: any) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-6 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-3xl sm:text-4xl font-extrabold text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors"
                    >
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

      {/* 2. Industries Grid Section */}
      <section className="py-20 bg-background">
        <div className="container-tight space-y-12">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryList.map((ind) => {
              const Icon = (ind as any).icon || fallbackIndustries.find((i: any) => i.slug === ind.slug)?.icon || Factory;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  prefetch={false}
                  className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-2.5 leading-relaxed">
                      {ind.desc}
                    </p>

                    <div className="mt-6 pt-4 border-t border-border space-y-2">
                      {ind.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
