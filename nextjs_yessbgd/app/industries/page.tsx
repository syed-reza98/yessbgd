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
    title: page?.seo_title || "Industries Overview | YESS Bangladesh",
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
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb & Tag */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">Industries</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>{sitePage?.hero_eyebrow || "— SECTOR TRANSFORMATION & INDUSTRIAL THESIS —"}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight tracking-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Transforming Bangladesh&apos;s Critical Economic Sectors at{" "}
                  <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                    Sovereign Industrial Scale
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
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
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-3xl sm:text-4xl font-extrabold ${metric.color} group-hover:scale-105 transition-transform`}
                    >
                      {metric.value}
                    </span>
                    <Icon className={`w-6 h-6 ${metric.glow}`} />
                  </div>
                  <p className="text-sm font-bold text-white">{metric.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{metric.desc}</p>
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
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
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
