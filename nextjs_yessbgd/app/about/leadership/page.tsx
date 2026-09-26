import Link from "next/link";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { leadership } from "@/data/about";

export const metadata = {
  title: "Executive Leadership & Board | YESS Bangladesh",
  description:
    "Meet the leadership team behind YESS Bangladesh — multi-industry strategists, software architects, and operations directors.",
};

export default function LeadershipPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="CORPORATE GOVERNANCE"
        title="Executive Leadership & Board"
        subtitle="A multidisciplinary executive team uniting venture strategy, distributed systems engineering, and operational governance."
      />

      <section className="py-16 bg-background">
        <div className="container-tight max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {leadership.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl glass-card p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-5 mb-5">
                    <div className="h-16 w-16 rounded-full bg-[#061a1b] text-accent font-display font-bold text-xl flex items-center justify-center shadow-md">
                      {m.initials}
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        {m.name}
                      </h2>
                      <p className="text-xs uppercase tracking-wider text-primary font-bold mt-0.5">
                        {m.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {m.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Hiring CTA Banner */}
          <div className="mt-16 rounded-3xl border border-border bg-[#f4f8f8] p-8 text-center md:p-12 glass-card">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Want to build with our executive team?
            </h3>
            <p className="mt-2 text-sm text-foreground/70 max-w-xl mx-auto">
              We are actively expanding engineering, product architecture, and management consulting pods across Dhaka and international client corridors.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
              >
                <span>View Open Positions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-border text-foreground text-sm font-bold hover:bg-secondary transition-all"
              >
                <span>About the Group</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
