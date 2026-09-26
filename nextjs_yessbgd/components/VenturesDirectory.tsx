"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
  Sparkles,
  Server,
  Radar,
  Leaf,
  Tv,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { ventures, type Venture } from "@/data/ventures";

const ventureMetrics: Record<string, { label1: string; val1: string; label2: string; val2: string }> = {
  "yess-soft": { label1: "Daily Volume", val1: "1M+ Core Txns", label2: "Reliability", val2: "99.98% SLA" },
  "akash-tv": { label1: "Network Reach", val1: "4.8M Viewers", label2: "Broadcast Grid", val2: "64 Districts" },
  "akash-ott": { label1: "Subscribers", val1: "350K+ Active", label2: "Architecture", val2: "Zero-Buffer CDN" },
  "akash-news": { label1: "Daily Readers", val1: "500K+ Pageviews", label2: "Verified Desk", val2: "100% Fact-Checked" },
  "yess-organic-food": { label1: "Agrarian Base", val1: "2,500+ Farmers", label2: "Farming Hubs", val2: "30+ Connected" },
  "yess-one-stop-engineering": { label1: "Projects Delivered", val1: "200+ Commercial", label2: "Design QA", val2: "BNBC Aligned" },
  "yess-technology": { label1: "Edge Infrastructure", val1: "99.98% Core SLA", label2: "Protocol", val2: "256-Bit Sovereign" },
  "yess-entertainment": { label1: "Total Impressions", val1: "15M+ Streaming", label2: "Original IP", val2: "45+ Productions" },
  "yess-event-management": { label1: "Sovereign Summits", val1: "150+ Summits", label2: "Delegates Hosted", val2: "75,000+ Total" },
  "yess-restaurant": { label1: "Diners Served", val1: "500,000+ Diners", label2: "Hygiene Rating", val2: "Grade A Certified" },
  "yess-interior": { label1: "Fitout Footprint", val1: "350,000+ Sq.Ft", label2: "Corporate Sites", val2: "120+ Completed" },
  "yess-overseas": { label1: "Global Deployment", val1: "1,200+ Placements", label2: "Corridors", val2: "GCC, EU & ASEAN" },
  "yess-law-chamber": { label1: "Corporate Briefs", val1: "500+ Retainers", label2: "Compliance", val2: "100% Statutory" },
};

// Cluster mapping aligned with Stitch canonical taxonomy
const categoryMapping: Record<string, string> = {
  "Software & IT Solutions": "Technology & AI",
  "Hosting & Cloud Infrastructure": "Technology & AI",
  "Integrated Business Solutions": "Technology & AI",
  "Organic Marketplace": "Agritech & Food Systems",
  "Food & Beverage": "Agritech & Food Systems",
  "Home & Professional Services": "Agritech & Food Systems",
  "Streaming Platform": "Media & Entertainment",
  "Satellite Television": "Media & Entertainment",
  "Digital Newspaper": "Media & Entertainment",
  "Event Management": "Media & Entertainment",
  "Travel & Tourism": "Supply Chain & Logistics",
  "Modeling & Talent Agency": "Supply Chain & Logistics",
  "Legal Advisory": "Financial Infrastructure",
};

export function VenturesDirectory() {
  const [query, setQuery] = useState("");
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [sortBy, setSortBy] = useState<"founded" | "valuation" | "alpha">("founded");

  const clusters = [
    { id: "all", label: "All Ventures (13)" },
    { id: "Technology & AI", label: "Technology & AI (4)" },
    { id: "Agritech & Food Systems", label: "Agritech & Food Systems (3)" },
    { id: "Media & Entertainment", label: "Media & Entertainment (4)" },
    { id: "Supply Chain & Logistics", label: "Supply Chain & Logistics (1)" },
    { id: "Financial Infrastructure", label: "Financial Infrastructure (1)" },
  ];

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = ventures.filter((v) => {
      const cluster = categoryMapping[v.category] || "Other";
      if (selectedCluster !== "all" && cluster !== selectedCluster) return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q)
      );
    });

    if (sortBy === "alpha") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "founded") {
      result.sort((a, b) => (parseInt(b.founded || "2020") - parseInt(a.founded || "2020")));
    }
    return result;
  }, [query, selectedCluster, sortBy]);

  return (
    <div className="flex flex-col w-full -mt-10 relative z-20">
      {/* Search & Filter Controls Card (matching Stitch) */}
      <div className="bg-surface-container-lowest dark:bg-[#061a1b] rounded-2xl shadow-sm border border-outline-variant/30 p-5 sm:p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search Field */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              id="ventures-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ventures by name, sector, or capability..."
              aria-label="Search ventures by name, sector, or capability"
              className="w-full pl-10 pr-12 py-2.5 bg-surface-container-low dark:bg-white/5 text-on-surface rounded-xl text-xs sm:text-sm border border-outline-variant/40 focus:border-[#0d6e6e] outline-none transition-all placeholder:text-outline"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-surface-container-high dark:bg-white/10 text-on-surface-variant rounded border border-outline-variant/40">
              ⌘K
            </kbd>
          </div>

          {/* View Modes & Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-1 bg-surface-container-low dark:bg-white/5 p-1 rounded-xl border border-outline-variant/30" role="group" aria-label="View layout switcher">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                aria-pressed={viewMode === "grid"}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-[#005454] text-[#005454] dark:text-white shadow-xs"
                    : "text-outline hover:text-on-surface"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                aria-label="Table View"
                aria-pressed={viewMode === "table"}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "table"
                    ? "bg-white dark:bg-[#005454] text-[#005454] dark:text-white shadow-xs"
                    : "text-outline hover:text-on-surface"
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <select
                id="ventures-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort ventures"
                className="appearance-none bg-surface-container-low dark:bg-white/5 text-on-surface font-semibold text-xs py-2.5 pl-3 pr-8 rounded-xl border border-outline-variant/30 focus:border-[#0d6e6e] outline-none cursor-pointer"
              >
                <option value="founded">Sort by: Founding Year (Newest)</option>
                <option value="valuation">Sort by: Enterprise Valuation</option>
                <option value="alpha">Sort by: Alphabetical (A-Z)</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none border-t border-outline-variant/20 pt-4">
          {clusters.map((cluster) => {
            const isActive = selectedCluster === cluster.id;
            return (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#0d6e6e] text-white shadow-xs"
                    : "bg-surface-container-low dark:bg-white/5 text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30"
                }`}
              >
                {cluster.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#7e5713] dark:text-[#f2be71] block">
            Operational Fleet
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#005454] dark:text-white">
            Portfolio Subsidiaries
          </h2>
        </div>
        <span className="text-xs text-outline font-semibold">
          Displaying {filteredAndSorted.length} of {ventures.length} Operating Companies
        </span>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((venture) => {
            const Icon = venture.icon;
            const cluster = categoryMapping[venture.category] || venture.category;
            const metric = ventureMetrics[venture.slug] || {
              label1: "Operations",
              val1: "Enterprise Grade",
              label2: "Coverage",
              val2: "Pan-Bangladesh",
            };

            return (
              <article
                key={venture.slug}
                className="bg-surface-container-lowest dark:bg-[#061a1b] rounded-2xl border border-outline-variant/30 p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#0d6e6e]/40 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0d6e6e]/10 border border-[#0d6e6e]/20 flex items-center justify-center text-[#0d6e6e] dark:text-[#35b0aa] group-hover:bg-[#0d6e6e] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container dark:bg-white/10 text-[#005454] dark:text-[#84d4d3]">
                        {cluster}
                      </span>
                      <p className="text-[10px] text-outline mt-1 font-medium">
                        Est. {venture.founded || "2020"} • {venture.category}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-on-surface group-hover:text-[#0d6e6e] dark:group-hover:text-[#35b0aa] transition-colors">
                    {venture.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#d4a359] mt-0.5">{venture.tagline}</p>
                  <p className="text-xs text-on-surface-variant mt-2 mb-4 leading-relaxed line-clamp-3">
                    {venture.desc}
                  </p>
                </div>

                <div>
                  <div className="py-2.5 px-3 rounded-xl bg-surface-container-low dark:bg-white/5 border border-outline-variant/20 mb-4 text-xs grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-outline block">{metric.label1}</span>
                      <span className="font-bold text-on-surface text-xs">{metric.val1}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-outline block">{metric.label2}</span>
                      <span className="font-bold text-[#0d6e6e] dark:text-[#35b0aa] text-xs">{metric.val2}</span>
                    </div>
                  </div>

                  <Link
                    href={`/ventures/${venture.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005454] dark:text-[#84d4d3] hover:text-[#d4a359] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Explore Venture Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-surface-container-lowest dark:bg-[#061a1b] rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low dark:bg-white/5 border-b border-outline-variant/30 font-bold text-on-surface uppercase text-[11px]">
                <tr>
                  <th scope="col" className="p-4">Entity</th>
                  <th scope="col" className="p-4">Sector Cluster</th>
                  <th scope="col" className="p-4">Founded</th>
                  <th scope="col" className="p-4">Key Scale Metric</th>
                  <th scope="col" className="p-4">Reliability</th>
                  <th scope="col" className="p-4 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredAndSorted.map((v) => {
                  const cluster = categoryMapping[v.category] || v.category;
                  const metric = ventureMetrics[v.slug] || {
                    label1: "Scale",
                    val1: "Tier-1",
                    label2: "SLA",
                    val2: "99.9%",
                  };
                  return (
                    <tr key={v.slug} className="hover:bg-surface-container-low/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-on-surface">
                        <Link href={`/ventures/${v.slug}`} className="hover:text-[#0d6e6e] flex items-center gap-2">
                          <span>{v.title}</span>
                        </Link>
                      </td>
                      <td className="p-4 text-on-surface-variant">{cluster}</td>
                      <td className="p-4 text-outline">{v.founded || "2020"}</td>
                      <td className="p-4 font-semibold text-on-surface">{metric.val1}</td>
                      <td className="p-4 font-semibold text-[#0d6e6e] dark:text-[#35b0aa]">{metric.val2}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/ventures/${v.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-[#005454] dark:text-[#84d4d3] hover:underline"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
