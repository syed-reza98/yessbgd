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

export function InsightsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState("All Intelligence");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Lead Editorial Spotlight
            </h2>
          </div>
          <span className="text-xs font-semibold text-foreground/60 hidden sm:inline">
            Q1 2026 Sovereign Infrastructure Release
          </span>
        </div>

        {/* Master Split Card */}
        <div className="rounded-3xl bg-[#061a1b] text-white overflow-hidden border border-emerald-500/25 shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative">
          <div className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-32 -top-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Left 60% Container */}
          <div className="lg:col-span-7 p-7 sm:p-10 md:p-12 flex flex-col justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SOVEREIGN CLOUD ARCHITECTURE • MARCH 2026</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4 leading-tight hover:text-amber-300 transition-colors">
                {featured.title}
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
                {featured.excerpt}
              </p>
            </div>

            {/* Author & Action Block */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 border-2 border-amber-400/60 overflow-hidden flex items-center justify-center text-amber-300 font-bold text-xs sm:text-sm">
                  {featured.author.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">{featured.author.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-white/60">{featured.author.role}</div>
                  <div className="text-[11px] text-emerald-300 font-medium mt-0.5">
                    {featured.readTime} • Whitepaper #24
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-[#061a1b] font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Whitepaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>PDF (4.2 MB)</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right 40% Architectural Diagram Preview */}
          <div className="lg:col-span-5 bg-black/40 border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Blueprint Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white tracking-wider uppercase font-mono">
                  Mesh Topology Model
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                V-MESH 4.1
              </span>
            </div>

            {/* Visual Node Interconnect Scheme */}
            <div className="py-4 space-y-2.5 font-mono text-xs">
              {/* Node 1 */}
              <div className="p-3 rounded-xl bg-white/5 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold text-xs">Dhaka Tier-3 BNDC Core</span>
                </div>
                <span className="text-emerald-300 font-bold text-[11px]">0.8ms Core RTT</span>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center text-white/40 py-0.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>

              {/* Node 2 */}
              <div className="p-3 rounded-xl bg-white/5 border border-amber-400/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-semibold text-xs">Chattogram Port Interconnect</span>
                </div>
                <span className="text-amber-300 font-bold text-[11px]">100Gbps Direct</span>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center text-white/40 py-0.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>

              {/* Node 3 */}
              <div className="p-3 rounded-xl bg-white/5 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-xs">Zero-Trust HSM Gateway</span>
                </div>
                <span className="text-emerald-300 font-bold text-[11px]">FIPS 140-3 L3</span>
              </div>
            </div>

            {/* Telemetry Diagnostics Footnote */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-[10px] text-white/50 uppercase font-bold">Residency</div>
                <div className="text-xs font-bold text-amber-300 mt-0.5">100% Sovereign</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-[10px] text-white/50 uppercase font-bold">Standards</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">ISO 27001</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg">
                <div className="text-[10px] text-white/50 uppercase font-bold">Latency</div>
                <div className="text-xs font-bold text-emerald-300 mt-0.5">&lt; 1.2ms Avg</div>
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
