import Link from "next/link";
import { ArrowRight, Award, Trophy, ShieldCheck, Globe2, Building2, Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { awards } from "@/data/about";

export const metadata = {
  title: "Awards & Accreditations | YESS Bangladesh",
  description:
    "Awards, national recognitions, and international quality management certifications earned by YESS Bangladesh.",
};

export default function AwardsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="NATIONAL RECOGNITION"
        title="Awards & Accreditations"
        subtitle="A snapshot of professional recognition, industry certifications, and trade council affiliations our team has earned."
      />

      <section className="py-16 bg-background">
        <div className="container-tight max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => {
              const Icon = a.icon;
              return (
                <article
                  key={a.title}
                  className="rounded-2xl glass-card p-7 hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-display font-bold text-lg text-foreground">
                      {a.title}
                    </h2>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <Link href="/about" className="text-sm font-bold text-primary hover:underline">
              ← Back to About Overview
            </Link>
            <Link
              href="/about/methodology"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              <span>Explore Engineering Methodology</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
