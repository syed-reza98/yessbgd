"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Tv,
  PlayCircle,
  Newspaper,
  Leaf,
  Wrench,
  Server,
  CalendarHeart,
  Sparkles,
  ChefHat,
  LayoutGrid,
  Plane,
  Scale,
  ArrowRight,
  Building2,
} from "lucide-react";

const VENTURE_ICONS: Record<string, any> = {
  "yess-soft": Code2,
  "akash-tv": Tv,
  "akash-ott": PlayCircle,
  "akash-news": Newspaper,
  "yess-organic-food": Leaf,
  "yess-one-stop-engineering": Wrench,
  "yess-technology": Server,
  "yess-entertainment": CalendarHeart,
  "yess-event-management": Sparkles,
  "yess-restaurant": ChefHat,
  "yess-interior": LayoutGrid,
  "yess-overseas": Plane,
  "yess-law-chamber": Scale,
};

export function HomeVenturesFilter({ ventures }: { ventures: any[] }) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredVentures = ventures.filter((v: any) => {
    if (activeTab === "all") return true;
    if (activeTab === "tech") {
      return [
        "Software & IT Solutions",
        "Hosting & Cloud Infrastructure",
        "Integrated Business Solutions",
      ].includes(v.category);
    }
    if (activeTab === "agri") {
      return [
        "Organic Marketplace",
        "Food & Beverage",
        "Home & Professional Services",
      ].includes(v.category);
    }
    if (activeTab === "media") {
      return [
        "Streaming Platform",
        "Satellite Television",
        "Digital Newspaper",
      ].includes(v.category);
    }
    if (activeTab === "consulting") {
      return [
        "Legal Advisory",
        "Event Management",
        "Modeling & Talent Agency",
        "Travel & Tourism",
      ].includes(v.category);
    }
    return true;
  });

  return (
    <>
      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:text-primary border border-border"
          }`}
        >
          All Ventures ({ventures.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("tech")}
          className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer ${
            activeTab === "tech"
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:text-primary border border-border"
          }`}
        >
          Technology & AI
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("agri")}
          className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer ${
            activeTab === "agri"
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:text-primary border border-border"
          }`}
        >
          Agri & Commerce
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer ${
            activeTab === "media"
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:text-primary border border-border"
          }`}
        >
          Media & Telecom
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("consulting")}
          className={`px-4 py-2 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer ${
            activeTab === "consulting"
              ? "bg-primary text-white"
              : "bg-white text-foreground/70 hover:text-primary border border-border"
          }`}
        >
          Consulting & Fin
        </button>
      </div>

      {/* Ventures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredVentures.map((venture) => {
          const Icon = VENTURE_ICONS[venture.slug] || Building2;
          return (
            <div
              key={venture.slug}
              className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-[11px] font-bold text-slate-700">
                    Est. 2018
                  </span>
                </div>

                <span className="text-xs font-bold text-amber-800 mt-4 block uppercase tracking-wider">
                  {venture.category}
                </span>

                <h3 className="font-display font-bold text-xl text-foreground mt-1 group-hover:text-primary transition-colors">
                  {venture.title}
                </h3>
                <p className="text-xs text-foreground/70 mt-2 line-clamp-3 leading-relaxed">
                  {venture.desc}
                </p>
              </div>

              <Link
                href={`/ventures/${venture.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:text-[#35b0aa] transition-colors"
              >
                <span>View Venture Profile</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
