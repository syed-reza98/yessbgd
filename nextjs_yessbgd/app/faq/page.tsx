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
  },
  {
    icon: Headphones,
    title: "24/7 Tier-3 SLA",
    desc: "Guaranteed enterprise response & uptime",
  },
  {
    icon: MapPin,
    title: "64 Districts",
    desc: "Nationwide operational reach & field ops",
  },
  {
    icon: Lock,
    title: "Bilateral NDA First",
    desc: "Guaranteed institutional confidentiality",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-primary transition-colors">
              Knowledge Base
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">FAQ</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Knowledge Base &amp; Client Advisory</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4">
              Frequently Asked{" "}
              <span className="text-primary">
                Questions
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-foreground/70 max-w-3xl leading-relaxed mb-10">
              Everything you need to know about our engagement models, sovereign technology architectures,
              delivery timelines, pricing, and national operations across Bangladesh.
            </p>
          </div>

          {/* Quick Trust Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl glass-card border border-border shadow-sm">
            {trustMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-muted/30 border border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs sm:text-sm text-foreground leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-foreground/60">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion Component */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FaqAccordion />

        {/* 24/7 Enterprise Concierge Banner */}
        <section className="glass-card text-foreground rounded-3xl p-8 sm:p-10 border border-border shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Have a Complex or Specific Requirement?
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Direct Partner &amp; Architect Consultation</h2>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Our Managing Partners and Chief Architects are directly accessible for enterprise strategy,
                sovereign cloud tenders, and bilateral NDA consultations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule Discussion</span>
              </Link>

              <a
                href="mailto:contact@yessbgd.com"
                className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold px-6 py-3 rounded-xl border border-border transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email Advisory</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
