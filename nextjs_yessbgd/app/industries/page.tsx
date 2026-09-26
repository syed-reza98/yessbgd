import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, Tv, Truck, ShoppingCart, Landmark, HeartPulse } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { industries } from "@/data/industries";

export const metadata = {
  title: "Industries Overview | YESS Bangladesh",
  description:
    "Sector transformation across Media & Broadcasting, Manufacturing & RMG, Logistics, E-commerce, Financial Services, and Healthcare in Bangladesh.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="SECTOR TRANSFORMATION"
        title="Industries We Transform"
        subtitle="Bringing sovereign technology, regulatory compliance, and deep operational expertise to Bangladesh's core economic engines."
      />

      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-2.5 leading-relaxed">
                      {ind.desc}
                    </p>

                    <div className="mt-6 pt-4 border-t border-border space-y-2">
                      {ind.outcomes.map((o) => (
                        <div key={o} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
