"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { insights, Insight } from "@/data/insights";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Star,
  Network,
  RefreshCw,
} from "lucide-react";

const categories = [
  "All Intelligence",
  "Sovereign Cloud & Infra",
  "Macroeconomics & Policy",
  "FinTech & Payment Rails",
  "Agritech Systems",
  "Media & Broadcasting",
];

const categoryMap: Record<string, string[]> = {
  "All Intelligence": [],
  "Sovereign Cloud & Infra": ["Engineering Whitepaper", "Technology", "IT Services"],
  "Macroeconomics & Policy": ["Strategy", "Leadership"],
  "FinTech & Payment Rails": ["FinTech", "Strategy"],
  "Agritech Systems": ["Agritech", "Operations", "E-commerce"],
  "Media & Broadcasting": ["Media", "Design"],
};

export function InsightsDirectory({
  initialInsights,
}: {
  initialInsights?: Insight[];
} = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All Intelligence");
  const [searchQuery, setSearchQuery] = useState("");

  const effectiveInsights = initialInsights && initialInsights.length > 0 ? initialInsights : insights;

  const filteredInsights = useMemo(() => {
    return effectiveInsights.filter((item) => {
      let matchCategory = true;
      if (selectedCategory !== "All Intelligence") {
        const mappedTags = categoryMap[selectedCategory] || [];
        matchCategory =
          mappedTags.some((t) => item.tag.toLowerCase().includes(t.toLowerCase())) ||
          item.tag.toLowerCase().includes(selectedCategory.toLowerCase());
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.author.name.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article: Sovereign Cloud Mesh
  const featured = insights.find((i) => i.slug === "sovereign-cloud-mesh") || insights[0];
  const restInsights = filteredInsights.filter((i) => i.slug !== featured.slug);

  return (
    <div className="space-y-12">
      {/* Lead Editorial Spotlight (Horizontal Split Showcase Card 60/40) */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-7 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-500/30" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest block">
                FEATURED INTELLIGENCE
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
                Lead Editorial Spotlight
              </h2>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted border border-border text-xs font-semibold text-foreground/75 w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Q1 2026 Sovereign Infrastructure Release</span>
          </div>
        </div>

        {/* Master Split Card */}
        <div className="rounded-3xl bg-white text-slate-900 overflow-hidden border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 relative">
          <div className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-32 -top-32 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

          {/* Left 60% Container */}
          <div className="lg:col-span-7 p-7 sm:p-10 md:p-12 flex flex-col justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                <span>SOVEREIGN CLOUD ARCHITECTURE • MARCH 2026</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-4 leading-tight hover:text-teal-700 transition-colors">
                {featured.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {featured.excerpt}
              </p>
            </div>

            {/* Author & Action Block */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-50 border-2 border-teal-600/40 overflow-hidden flex items-center justify-center text-teal-800 font-bold text-xs sm:text-sm">
                  {featured.author.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900">{featured.author.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <div className="text-xs text-slate-500">{featured.author.role}</div>
                  <div className="text-[11px] text-teal-700 font-medium mt-0.5">
                    {featured.readTime} • Whitepaper #24
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Whitepaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-all inline-flex items-center gap-1"
                >
                  <Download className="w-4 h-4 text-amber-600" />
                  <span>PDF (4.2 MB)</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right 40% Architectural Diagram Preview */}
          <div className="lg:col-span-5 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Blueprint Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900 tracking-wider uppercase font-mono">
                  Mesh Topology Model
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                V-MESH 4.1
              </span>
            </div>

            {/* Visual Node Interconnect Scheme */}
            <div className="py-4 space-y-2.5 font-mono text-xs">
              {/* Node 1 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                  <span className="font-semibold text-xs">Dhaka Tier-3 BNDC Core</span>
                </div>
                <span className="text-teal-700 font-bold text-[11px]">0.8ms Core RTT</span>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center text-slate-400 py-0.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>

              {/* Node 2 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-xs">Chattogram Port Interconnect</span>
                </div>
                <span className="text-amber-700 font-bold text-[11px]">100Gbps Direct</span>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center text-slate-400 py-0.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>

              {/* Node 3 */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span className="font-semibold text-xs">Zero-Trust HSM Gateway</span>
                </div>
                <span className="text-teal-700 font-bold text-[11px]">FIPS 140-3 L3</span>
              </div>
            </div>

            {/* Telemetry Diagnostics Footnote */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Residency</div>
                <div className="text-xs font-bold text-amber-700 mt-0.5">100% Sovereign</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Standards</div>
                <div className="text-xs font-bold text-teal-700 mt-0.5">ISO 27001</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Latency</div>
                <div className="text-xs font-bold text-teal-700 mt-0.5">&lt; 1.2ms Avg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-4 border border-border shadow-sm">
        {/* Category Pills Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-foreground/70 hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
          <input
            id="insights-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights by topic, architectural concept, or author..."
            aria-label="Search insights by topic, architectural concept, or author"
            className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(selectedCategory === "All Intelligence" && !searchQuery ? restInsights : filteredInsights).map(
          (article) => (
            <article
              key={article.slug}
              className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-foreground/70 line-clamp-3 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {article.author.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{article.author.name}</div>
                      <div className="text-[10px] text-foreground/60">{article.date}</div>
                    </div>
                  </div>

                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  );
}
