"use client";

import { useState, useMemo } from "react";
import { Link } from "@/components/ui/link";
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Tv, Code2, Leaf, Server, Wrench, ShieldCheck, Cpu, Globe } from "lucide-react";
import type { Venture } from "@/data/ventures";

interface VenturesBentoGridProps {
  ventures: Venture[];
  exploreText?: string;
  readAboutText?: string;
  allVenturesText?: string;
}

// Technology & capability metadata map for top ventures
const VENTURE_TECH_SPECS: Record<string, { tags: string[]; statLabel: string; statVal: string }> = {
  "yess-soft": {
    tags: ["Next.js 16", "TypeScript", "Node.js", "Drizzle ORM", "PostgreSQL", "AWS"],
    statLabel: "Production Grade",
    statVal: "99.98% SLA",
  },
  "akash-ott": {
    tags: ["HLS / DASH", "Widevine DRM", "Adaptive Bitrate", "Smart TV Apps"],
    statLabel: "Concurrent Stream",
    statVal: "50K+ Live",
  },
  "the-daily-akash": {
    tags: ["Real-time CMS", "Edge Cache", "Schema.org", "Sub-second CDN"],
    statLabel: "Monthly Readers",
    statVal: "100K+",
  },
  "yess-host": {
    tags: ["cPanel / Cloud", "NVMe SSD Storage", "DDoS Mitigation", "SSL Native"],
    statLabel: "Infrastructure",
    statVal: "Tier-3 Data Center",
  },
  "yess-organic-haat": {
    tags: ["Direct Sourced", "Organic Certified", "Doorstep Delivery"],
    statLabel: "District Reach",
    statVal: "64 Districts",
  },
  "yess-service": {
    tags: ["Managed IT", "Field Engineers", "Hardware & Facility"],
    statLabel: "Response Time",
    statVal: "< 2 Hours",
  },
  "yess-all-in-one-solution": {
    tags: ["Enterprise Advisory", "Vendor Consolidation", "Operations"],
    statLabel: "Client Retention",
    statVal: "98%",
  },
  "yess-legal-advice": {
    tags: ["Corporate Compliance", "IP & Trademark", "Labor Law"],
    statLabel: "Bar Council",
    statVal: "Certified Counsel",
  },
};

export function VenturesBentoGrid({
  ventures,
  exploreText = "Explore Venture",
  readAboutText = "Read about",
  allVenturesText = "View All 13 Ventures & Directory",
}: VenturesBentoGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    return ["All", "Software & Cloud", "Media & Streaming", "Enterprise & Operations", "Consumer & Agro"];
  }, []);

  const filteredVentures = useMemo(() => {
    if (selectedCategory === "All") {
      return ventures;
    }
    if (selectedCategory === "Software & Cloud") {
      return ventures.filter(
        (v) =>
          v.slug === "yess-soft" ||
          v.slug === "yess-host" ||
          v.category.toLowerCase().includes("tech") ||
          v.category.toLowerCase().includes("software") ||
          v.category.toLowerCase().includes("cloud")
      );
    }
    if (selectedCategory === "Media & Streaming") {
      return ventures.filter(
        (v) =>
          v.slug === "akash-ott" ||
          v.slug === "akash-tv" ||
          v.slug === "the-daily-akash" ||
          v.slug === "yess-model" ||
          v.slug === "yess-event" ||
          v.category.toLowerCase().includes("media")
      );
    }
    if (selectedCategory === "Enterprise & Operations") {
      return ventures.filter(
        (v) =>
          v.slug === "yess-service" ||
          v.slug === "yess-all-in-one-solution" ||
          v.slug === "yess-legal-advice" ||
          v.category.toLowerCase().includes("service")
      );
    }
    // Consumer & Agro
    return ventures.filter(
      (v) =>
        v.slug === "yess-organic-haat" ||
        v.slug === "yess-food" ||
        v.slug === "yess-tourism" ||
        v.category.toLowerCase().includes("agro") ||
        v.category.toLowerCase().includes("organic")
    );
  }, [ventures, selectedCategory]);

  const heroVenture = filteredVentures[0];
  const supportingVentures = filteredVentures.slice(1, 7);

  return (
    <div className="mt-8 sm:mt-12" id="ventures-ecosystem">
      {/* Category Filter Pills & Direct Directory Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <div
          role="tablist"
          aria-label="Venture categories"
          className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-border/80 bg-background/80 p-1.5 backdrop-blur-md shadow-xs"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <Link
          to="/ventures"
          className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-xs font-semibold text-primary backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5"
        >
          <span>{allVenturesText}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Asymmetric Bento Architecture */}
      {heroVenture && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Flagship Hero Bento Tile: Spans 12 on mobile, 7 on desktop */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col">
            <Link
              to="/ventures/$slug"
              params={{ slug: heroVenture.slug }}
              aria-label={`${readAboutText} ${heroVenture.title}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl h-full min-h-[420px] sm:min-h-[460px]"
            >
              {/* Cover Image with subtle zoom and clean editorial gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-muted">
                <img
                  src={heroVenture.image}
                  alt={heroVenture.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/65 to-background/25" />
              </div>

              {/* Top Meta Bar */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    Flagship Venture
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live Platform
                  </span>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-background/80 text-foreground backdrop-blur-md shadow-xs transition-transform group-hover:rotate-12 group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </span>
              </div>

              {/* Bottom Details Content */}
              <div className="relative z-10 p-6 sm:p-8">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-primary">
                  {heroVenture.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl tracking-tight text-foreground">
                  {heroVenture.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2 max-w-xl">
                  {heroVenture.desc}
                </p>

                {/* Tech & capability tags */}
                {VENTURE_TECH_SPECS[heroVenture.slug] && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {VENTURE_TECH_SPECS[heroVenture.slug].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/60 bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 backdrop-blur-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all group-hover:gap-3">
                    <span>{exploreText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  {VENTURE_TECH_SPECS[heroVenture.slug] && (
                    <span className="font-mono text-xs font-semibold text-foreground/80">
                      {VENTURE_TECH_SPECS[heroVenture.slug].statVal}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Stacked Column: Spans 12 on mobile, 5 on desktop */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-5">
            {supportingVentures.slice(0, 2).map((v) => {
              const spec = VENTURE_TECH_SPECS[v.slug];
              const Icon = v.icon;
              return (
                <Link
                  key={v.slug}
                  to="/ventures/$slug"
                  params={{ slug: v.slug }}
                  aria-label={`${readAboutText} ${v.title}`}
                  className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br ${v.color} text-primary-foreground shadow-xs`}>
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {v.category.split(" ")[0]}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </div>

                    <h4 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">{v.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {v.desc}
                    </p>

                    {spec && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {spec.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border/50 bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-foreground/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/40">
                    <span className="text-[11px] font-semibold text-primary group-hover:underline">
                      {exploreText} →
                    </span>
                    {spec && (
                      <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                        {spec.statVal}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Grid: 3 columns for remaining supporting ventures */}
          {supportingVentures.slice(2, 6).map((v) => {
            const spec = VENTURE_TECH_SPECS[v.slug];
            const Icon = v.icon;
            return (
              <div key={v.slug} className="md:col-span-6 lg:col-span-3">
                <Link
                  to="/ventures/$slug"
                  params={{ slug: v.slug }}
                  aria-label={`${readAboutText} ${v.title}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${v.color} text-primary-foreground`}>
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <h4 className="mt-3 font-display text-base font-bold text-foreground">{v.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-semibold text-primary">
                    <span>{exploreText}</span>
                    {spec && (
                      <span className="font-mono text-[10px] font-medium text-muted-foreground">
                        {spec.statVal}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
