import Link from "next/link";
import { Target, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { aboutPillars } from "@/data/about";

export const metadata = {
  title: "Strategic Mission & Purpose | YESS Bangladesh",
  description:
    "Our mission is to empower organisations across Bangladesh with strategic consulting, sovereign technology, and measurable enterprise growth.",
};

export default function MissionPage() {
  const pillar = aboutPillars.find((p) => p.slug === "mission")!;

  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="STRATEGIC MANDATE"
        title="Our Mission & Purpose"
        subtitle={pillar.short}
      />

      <section className="py-16 bg-background">
        <div className="container-tight max-w-4xl">
          <div className="glass-card rounded-3xl p-8 sm:p-12 mb-12 shadow-sm border border-border">
            <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-glow">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Accountable Strategy & Shipped Engineering
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/80">
              {pillar.long}
            </p>
          </div>

          <h3 className="font-display font-bold text-2xl text-foreground mb-6">
            What this means in daily practice
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {pillar.pillars.map((p) => (
              <div key={p.title} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <CheckCircle2 className="h-6 w-6 text-primary mb-3" />
                  <h4 className="font-display font-bold text-lg text-foreground">{p.title}</h4>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sibling Links */}
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-sm font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              <span>Explore Executive Leadership</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
