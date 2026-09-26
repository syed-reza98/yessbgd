import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Users, Globe2, Zap, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { standards } from "@/data/about";

export const metadata = {
  title: "Quality Standards & QA Framework | YESS Bangladesh",
  description:
    "How YESS Bangladesh is operated to international quality, security, IEEE testing pyramids, and ISO 9001/27001 delivery standards.",
};

export default function StandardsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="INSTITUTIONAL QUALITY & QA"
        title="Quality Standards & Framework"
        subtitle="ISO-aligned processes, senior-led delivery squads, zero-trust infrastructure, and guaranteed SLA response times."
      />

      <section className="py-16 bg-background">
        <div className="container-tight max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {standards.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.label}
                  className="rounded-2xl glass-card p-7 hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display font-bold text-lg text-foreground">
                      {s.label}
                    </h2>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-[#f4f8f8] p-8 md:p-12 glass-card">
            <h3 className="font-display font-bold text-2xl text-foreground">
              Audit-Ready by Default
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/70">
              Every production platform ships with documented Architecture Decision Records (ADR), immutable audit logs, dependency vulnerability scan reports, and a disaster recovery runbook your compliance team can hand to internal or regulatory auditors.
            </p>
          </div>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-sm font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              <span>Explore Services & Solutions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
