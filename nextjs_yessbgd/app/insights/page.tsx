import type { Metadata } from "next";
import Link from "next/link";
import { InsightsDirectory } from "@/components/InsightsDirectory";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";
import { BookOpen, Sparkles, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Thought Leadership Hub | YESS Bangladesh",
  description:
    "Engineering whitepapers, executive briefings, and digital transformation playbooks for Bangladesh's sovereign technology leaders.",
};

export default function InsightsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-background border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0d6e6e] font-bold">Insights & Intelligence</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-[#0d6e6e]/20 text-[#0d6e6e] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <BookOpen className="w-4 h-4" />
              <span>Sovereign Tech Intelligence & Editorial</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight mb-4">
              Insights & Thought{" "}
              <span className="bg-gradient-to-r from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] bg-clip-text text-transparent">
                Leadership
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
              In-depth research, architectural blueprints, and field-tested frameworks from the architects
              building Bangladesh&apos;s digital infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Insights Directory Component */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <InsightsDirectory />

        {/* Institutional Intelligence Dispatch Newsletter */}
        <section className="glass-card-dark text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-[#f6c87a]">
                Institutional Intelligence Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Receive Monthly Sovereign Technology Briefings
              </h3>
              <p className="text-xs text-outline-variant leading-relaxed">
                Join 4,500+ CTOs, public sector leaders, and enterprise architects receiving our curated
                quarterly whitepapers, architecture tear-downs, and regulatory tech analyses.
              </p>
            </div>

            <NewsletterSubscription />
          </div>
        </section>
      </main>
    </div>
  );
}
