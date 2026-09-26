import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  Code,
  Headphones,
  MapPin,
  Lock,
  ArrowRight,
  Shield,
  HelpCircle,
  PhoneCall,
  Mail,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Corporate FAQ & Knowledge Base | YESS Bangladesh",
  description:
    "Everything you need to know about our engagement models, sovereign technology architectures, delivery timelines, pricing, and national operations across Bangladesh.",
};

const trustMetrics = [
  {
    icon: Code,
    title: "100% IP Handover",
    desc: "Clear client code & schema ownership",
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    icon: Headphones,
    title: "24/7 Tier-3 SLA",
    desc: "Guaranteed enterprise response & uptime",
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
  {
    icon: MapPin,
    title: "64 Districts",
    desc: "Nationwide operational reach & field ops",
    color: "text-white",
    glow: "text-[#35b0aa]",
  },
  {
    icon: Lock,
    title: "Bilateral NDA First",
    desc: "Guaranteed institutional confidentiality",
    color: "text-[#d4a359]",
    glow: "text-[#f6c87a]",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link href="/insights" className="hover:text-[#f6c87a] transition-colors">
              Knowledge Base
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">FAQ</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>— KNOWLEDGE BASE &amp; CLIENT ADVISORY —</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Questions
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
              Everything you need to know about our engagement models, sovereign technology architectures,
              delivery timelines, pricing, and national operations across Bangladesh.
            </p>
          </div>

          {/* Quick Trust Strip (4 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            {trustMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xl sm:text-2xl font-extrabold ${item.color} group-hover:scale-105 transition-transform`}>
                      {item.title}
                    </span>
                    <Icon className={`w-6 h-6 ${item.glow}`} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion with Categorized Tabs */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion />

        {/* Still Have Questions CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-foreground">
              Still have questions about institutional partnerships?
            </h3>
            <p className="text-sm text-foreground/70">
              Connect with our advisory directors for bilateral discussions under strict NDA.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
          >
            <span>Speak With Partners</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
