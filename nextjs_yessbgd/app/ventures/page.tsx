import type { Metadata } from "next";
import Link from "next/link";
import { VenturesDirectory } from "@/components/VenturesDirectory";
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Workflow,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ventures Directory | YESS Bangladesh (yessbgd)",
  description:
    "Explore the 13 sovereign subsidiaries of YESS Bangladesh spanning enterprise cloud, media streaming, agritech IoT, and logistics.",
};

const metrics = [
  {
    value: "13",
    label: "Operating Entities",
    desc: "Active cross-sector subsidiaries",
    icon: Building2,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "$50M+",
    label: "Cumulative Enterprise Value",
    desc: "Sovereign valuation metric",
    icon: TrendingUp,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    value: "4",
    label: "Core Industry Verticals",
    desc: "Cloud, Agribusiness, Media, Logistics",
    icon: Workflow,
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    value: "100%",
    label: "Sovereign Ownership",
    desc: "Institutional national governance",
    icon: ShieldCheck,
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

export default function VenturesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-[#061a1b] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
        {/* Background Ambient Geometric Grid Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Tag */}
          <div className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">Ventures</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>— SOVEREIGN VENTURE PORTFOLIO —</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              13 Transformative Ventures Driving{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Bangladesh&apos;s New Economy
              </span>
              .
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-10">
              From enterprise cloud architectures to sovereign cold-chain logistics, explore our diversified portfolio
              companies built for regional resilience and global competitiveness.
            </p>
          </div>

          {/* 4 Metric Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-3xl sm:text-4xl font-extrabold ${metric.color} group-hover:scale-105 transition-transform`}>
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

      {/* 2. Directory Section with Filters & Interactive Fleet */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VenturesDirectory />
        </div>
      </section>
    </div>
  );
}
