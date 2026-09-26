import type { Metadata } from "next";
import Link from "next/link";
import { InsightsDirectory } from "@/components/InsightsDirectory";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { BookOpen, Users, BarChart3, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Thought Leadership Hub | YESS Bangladesh",
  description:
    "Proprietary research, macroeconomic analysis, and engineering whitepapers published by YESS venture architects and sector specialists.",
};

const editorialMetrics = [
  {
    val: "24+",
    title: "Research Whitepapers",
    desc: "Peer-reviewed national architectural publications and systems blueprints.",
    icon: BookOpen,
    valColor: "text-primary",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  {
    val: "18k+",
    title: "Executive Subscribers",
    desc: "C-Suite, ministerial, and global venture partner readership across Asia.",
    icon: Users,
    valColor: "text-amber-500",
    iconColor: "text-amber-500",
  },
  {
    val: "Quarterly",
    title: "Macro Forecasts",
    desc: "Bangladesh industrial output, currency liquidity & tech sector outlook.",
    icon: BarChart3,
    valColor: "text-primary",
    iconColor: "text-emerald-500 dark:text-emerald-400",
  },
  {
    val: "Zero-Trust",
    title: "Peer-Reviewed Dispatches",
    desc: "GovTech identity, Agritech IoT telemetry, and FinTech core systems.",
    icon: ShieldCheck,
    valColor: "text-amber-500",
    iconColor: "text-amber-500",
  },
];

export default function InsightsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section & Editorial Telemetry */}
      <section className="relative w-full pt-12 pb-16 bg-gradient-to-b from-muted/30 via-background to-background border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">Insights &amp; Research</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] tracking-wider text-amber-600 dark:text-amber-400 uppercase font-bold">
              — INSTITUTIONAL RESEARCH &amp; THOUGHT LEADERSHIP —
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight mb-5 leading-tight">
              Intelligence, Sovereign Policy &amp; Industrial Transformation.
            </h1>
            <p className="text-base sm:text-lg text-foreground/75 max-w-3xl leading-relaxed">
              Proprietary research, macroeconomic analysis, and engineering whitepapers published by YESS venture architects and sector specialists.
            </p>
          </div>

          {/* Editorial Telemetry Metric Strip (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {editorialMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="glass-card p-5 rounded-xl border border-border shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-display font-bold text-2xl lg:text-3xl ${m.valColor}`}>
                      {m.val}
                    </span>
                    <Icon className={`w-5 h-5 ${m.iconColor}`} />
                  </div>
                  <div className="font-display font-bold text-sm text-foreground mb-1">
                    {m.title}
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <InsightsDirectory />

        {/* Institutional Intelligence Dispatch Newsletter */}
        <section className="rounded-3xl p-8 sm:p-12 text-white border border-emerald-500/25 bg-gradient-to-br from-[#061a1b] via-[#092224] to-[#061a1b] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                Institutional Intelligence Dispatch
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Receive Monthly Sovereign Technology Briefings
              </h2>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Join 4,500+ CTOs, public sector leaders, and enterprise architects receiving our curated quarterly whitepapers, architecture tear-downs, and regulatory tech analyses.
              </p>
            </div>

            <NewsletterSubscription />
          </div>
        </section>
      </main>
    </div>
  );
}
