import Link from "next/link";
import { ArrowRight, Search, PenTool, Rocket, LifeBuoy, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { methodology } from "@/data/about";

export const metadata = {
  title: "Engineering Methodology | YESS Bangladesh",
  description:
    "Discover, Design, Deliver, Support — our sovereign SDLC delivery methodology powering enterprise software across Bangladesh.",
};

export default function MethodologyPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="SOVEREIGN SDLC & PROCESS"
        title="Our Delivery Methodology"
        subtitle="Discover, Design, Deliver, Support — a structured engineering cadence guaranteeing code transparency and on-time milestones."
      />

      <section className="py-16 bg-background">
        <div className="container-tight max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {methodology.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  className="relative rounded-2xl glass-card p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  <span className="absolute right-6 top-6 font-mono text-sm font-extrabold text-primary/40">
                    {p.n}
                  </span>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">
                    {p.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-foreground/70 leading-relaxed">
                    {p.desc}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-3xl border border-border bg-[#f4f8f8] p-8 md:p-12 glass-card">
            <h3 className="font-display font-bold text-2xl text-foreground">
              What enterprise clients can expect every sprint
            </h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Demonstration of working staging software every Friday",
                "Written executive status update with risk matrix and timeline",
                "Full Git repository access and automated CI/CD logs",
                "Direct Slack/Teams access to senior principal architect",
                "Documented Architecture Decision Records (ADR) for major choices",
                "Monthly business and performance review with group partner",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-sm font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/about/standards"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              <span>Explore Quality Standards & QA</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
