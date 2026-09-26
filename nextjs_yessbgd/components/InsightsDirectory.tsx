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
  User,
  Shield,
  Tag,
  CheckCircle2,
} from "lucide-react";

const categories = [
  "All Insights",
  "Engineering Whitepaper",
  "Strategy",
  "Technology",
  "E-commerce",
  "Leadership",
  "IT Services",
  "Design",
];

export function InsightsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchCategory =
        selectedCategory === "All Insights" ||
        item.tag.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured first article (e.g. Sovereign Cloud Mesh)
  const featured = insights.find((i) => i.slug === "sovereign-cloud-mesh") || insights[0];
  const restInsights = filteredInsights.filter((i) => i.slug !== featured.slug);

  return (
    <div className="space-y-12">
      {/* Featured Insight Banner (if matching search/category) */}
      {(selectedCategory === "All Insights" ||
        featured.tag.toLowerCase() === selectedCategory.toLowerCase()) &&
        (searchQuery === "" ||
          featured.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          featured.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) && (
          <div className="glass-card-dark text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white">
                    {featured.tag}
                  </span>
                  <span className="text-xs text-outline-variant flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {featured.date}
                  </span>
                  <span className="text-xs text-outline-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Peer-Reviewed
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#35b0aa] transition-colors leading-tight">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-outline-variant leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-[#d4a359] border border-[#d4a359]/40">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{featured.author.name}</h4>
                    <p className="text-[10px] text-outline-variant">{featured.author.role}</p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-start lg:self-center">
                <Link
                  href={`/insights/${featured.slug}`}
                  className="inline-flex items-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] text-white text-xs font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#0d6e6e]/30 transition-all active:scale-95"
                >
                  <span>Read Full Whitepaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

      {/* Filter & Search Toolbar */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search insights by topic, architectural concept, or author..."
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant/60 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === "All Insights"
                ? insights.length
                : insights.filter((i) => i.tag.toLowerCase() === cat.toLowerCase()).length;
            const active = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restInsights.map((item) => (
          <Link
            key={item.slug}
            href={`/insights/${item.slug}`}
            className="glass-card rounded-2xl p-6 hover:border-[#0d6e6e] hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-outline">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0d6e6e]/10 text-[#0d6e6e]">
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" /> {item.readTime}
                </span>
              </div>

              <h3 className="font-display text-base sm:text-lg font-bold text-brand-navy dark:text-white group-hover:text-[#0d6e6e] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-brand-navy dark:text-white">{item.author.name}</h4>
                <p className="text-[10px] text-outline">{item.author.role}</p>
              </div>

              <span className="text-[#0d6e6e] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
