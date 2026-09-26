"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, X, ArrowRight, Layers, Sparkles } from "lucide-react";
import { ventures, type Venture } from "@/data/ventures";

export function VenturesDirectory() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(ventures.map((v) => v.category)))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ventures.filter((v) => {
      if (selectedCategory !== "all" && v.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q)
      );
    });
  }, [query, selectedCategory]);

  return (
    <div className="flex flex-col w-full">
      {/* Search & Filter Strip */}
      <div className="mb-10 glass-card rounded-2xl p-4 sm:p-5 border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search 13 ventures by name, sector..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-secondary text-foreground/70 hover:text-foreground hover:bg-secondary/80 border border-border"
              }`}
            >
              {cat === "all" ? "All Sectors (13)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ventures Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((venture) => {
          const Icon = venture.icon;
          return (
            <Link
              key={venture.slug}
              href={`/ventures/${venture.slug}`}
              className="glass-card rounded-2xl p-7 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-secondary text-foreground/80 border border-border">
                    {venture.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  {venture.title}
                </h3>
                <p className="text-xs font-semibold text-[#d4a359] mt-1">{venture.tagline}</p>
                <p className="text-sm text-foreground/70 mt-2.5 line-clamp-3 leading-relaxed">
                  {venture.desc}
                </p>

                {/* Highlights tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {venture.highlights.slice(0, 2).map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/60 text-foreground/80"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                <span>View Full Profile</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <p className="text-base text-foreground/70">No subsidiaries found matching "{query}".</p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Clear Search Filters
          </button>
        </div>
      )}

      {/* Incubation & Pitch Banner */}
      <div className="mt-16 rounded-3xl bg-[#061a1b] text-white p-8 sm:p-12 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a359]/20 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>VENTURE STUDIO INCUBATION</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Pitch Your Enterprise or Joint Venture
          </h3>
          <p className="text-sm text-white/70 mt-2 leading-relaxed">
            We partner with ambitious founders and established corporate groups to co-build, fund, and scale high-growth sovereign enterprises in Bangladesh.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 px-7 py-3.5 rounded-xl bg-primary hover:bg-[#35b0aa] text-white text-sm font-bold shadow-lg transition-all"
        >
          Submit Pitch Docket →
        </Link>
      </div>
    </div>
  );
}
