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
  Sparkles,
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
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-200/80 min-h-[auto] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-center">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/general/delivery.webp')` }}
        />
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb & Tag */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" prefetch={false} className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Industries</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{sitePage?.hero_eyebrow || "— SECTOR TRANSFORMATION & INDUSTRIAL THESIS —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight tracking-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Transforming Bangladesh&apos;s Critical Economic Sectors at{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Sovereign Industrial Scale
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle || "Bringing enterprise cloud architectures, regulatory compliance, IoT automation, and institutional governance to the core engines driving Bangladesh's multi-billion dollar economy."}
            </p>
          </div>

          {/* 4 Telemetry Metric Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {activeMetrics.map((metric: any) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all"
                    >
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
