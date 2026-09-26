import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
  Sparkles,
  Lock,
  Scale,
  FileCheck,
} from "lucide-react";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/PageHero";
import { ServiceFaqDrawer } from "@/components/ServiceFaqDrawer";

export async function generateStaticParams() {
  return industries.map((i) => ({
    slug: i.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.title} | YESS Bangladesh`,
    description: industry.desc,
  };
}

export default async function SingleIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const Icon = industry.icon;

  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="VERTICAL EXCELLENCE"
        title={industry.title}
        subtitle={industry.intro}
      />

      {/* Metrics Strip */}
      {industry.keyMetrics && industry.keyMetrics.length > 0 && (
        <section className="py-10 bg-[#061a1b] text-white border-y border-white/10">
          <div className="container-tight">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {industry.keyMetrics.map((km) => (
                <div key={km.label} className="flex flex-col">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#35b0aa]">
                    {km.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mt-1">
                    {km.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Challenges, Solutions, Compliance, Outcomes, FAQs */}
            <div className="lg:col-span-8 flex flex-col space-y-12">
              {/* Challenges vs Solutions */}
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Industry Challenges We Solve
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industry.challenges.map((ch) => (
                    <div
                      key={ch}
                      className="p-5 rounded-xl bg-destructive/5 border border-destructive/20 text-xs font-semibold text-foreground/80 flex items-start gap-2.5"
                    >
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architected Solutions */}
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                  Architected Solutions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {industry.solutions.map((sol) => (
                    <div
                      key={sol.title}
                      className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mb-3" />
                      <h4 className="font-display font-bold text-base text-foreground">
                        {sol.title}
                      </h4>
                      <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sovereign Governance & Compliance Matrix */}
              {industry.compliance && industry.compliance.length > 0 && (
                <div className="rounded-2xl p-6 bg-muted/40 border border-border glass-card">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Sovereign Governance &amp; Regulatory Alignment
                    </h3>
                  </div>
                  <p className="text-xs text-foreground/70 mb-4 leading-relaxed">
                    Every deployment in {industry.title} is strictly audited for compliance under national statutory mandates and international standards.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.compliance.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background border border-border text-foreground/90 shadow-sm"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-primary" />
                        <span>{c}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Case Outcomes */}
              {industry.caseHighlights && industry.caseHighlights.length > 0 && (
                <div className="glass-card-strong rounded-2xl p-8 border border-border">
                  <h3 className="font-display font-bold text-xl text-foreground mb-4">
                    Verified Deployment Outcomes
                  </h3>
                  <div className="space-y-4">
                    {industry.caseHighlights.map((c) => (
                      <div
                        key={c.title}
                        className="p-4 rounded-xl bg-background border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <span className="font-bold text-sm text-foreground">{c.title}</span>
                        <span className="text-xs font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 w-fit">
                          {c.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collapsible FAQ Drawer */}
              {industry.faqs && industry.faqs.length > 0 && (
                <ServiceFaqDrawer
                  faqs={industry.faqs}
                  title={`${industry.title} FAQ`}
                  subtitle="Common inquiries regarding regulatory compliance, legacy migrations, and engagement models."
                />
              )}
            </div>

            {/* Right 4 Cols: Consultation Card */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <div className="glass-card-strong rounded-2xl p-6 border border-border shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4a359]">
                  SECTOR ADVISORY
                </span>
                <h4 className="font-display font-bold text-lg text-foreground mt-1 mb-2">
                  Engage Industry Practice
                </h4>
                <p className="text-xs text-foreground/70 leading-relaxed mb-6">
                  Book a confidential 30-minute discovery consultation with our dedicated industry domain architects.
                </p>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold text-xs block shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Schedule Industry Consultation
                  </Link>
                  <Link
                    href="/industries"
                    className="w-full text-center py-2.5 rounded-xl bg-secondary text-foreground font-semibold text-xs block border border-border hover:bg-secondary/80 transition-all"
                  >
                    ← All Industry Verticals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
