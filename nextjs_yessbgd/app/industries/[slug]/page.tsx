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
import { getIndustries, getIndustryBySlug } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";
import { ServiceFaqDrawer } from "@/components/ServiceFaqDrawer";

export async function generateStaticParams() {
  const all = await getIndustries();
  return all.map((i) => ({
    slug: i.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: industry.title,
    description: industry.desc,
  };
}

export default async function SingleIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const Icon = (industry as any).icon || industries.find((i: any) => i.slug === industry.slug)?.icon || Building2;

  const industryBgMap: Record<string, string> = {
    "manufacturing-rmg": "/assets/general/centricity.webp",
    "media-broadcasting": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "logistics-supply-chain": "/assets/general/delivery.webp",
    "ecommerce-retail": "/assets/general/retail-pos.webp",
    "financial-services": "/assets/general/design.jpg",
    "healthcare-pharma": "/assets/heroes/hero_6a89646fd72ff.jpg",
  };
  const heroBgImage = industryBgMap[industry.slug] || "/assets/general/delivery.webp";

  return (
    <div className="flex flex-col w-full">
      {/* Industry Sub-Page Light Hero */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('${heroBgImage}')` }}
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" prefetch={false} className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/industries" prefetch={false} className="hover:text-teal-700 transition-colors">
              Industries
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">{industry.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Medallion Icon */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-2 bg-gradient-to-tr from-teal-600 via-emerald-500 to-amber-500 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-white border-2 border-amber-400/50 flex items-center justify-center p-3 shadow-inner">
                  <Icon className="h-10 w-10 text-teal-700" />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 text-center md:text-left max-w-3xl">
              <div className="inline-flex items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>VERTICAL EXCELLENCE</span>
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
                {industry.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {industry.intro}
              </p>
            </div>
          </div>

          {/* Key Metrics Strip */}
          {industry.keyMetrics && industry.keyMetrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-200/80">
              {industry.keyMetrics.map((km) => (
                <div
                  key={km.label}
                  className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all text-center"
                >
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 block mb-1">
                    {km.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    {km.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
                    prefetch={false}
                    className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold text-xs block shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Schedule Industry Consultation
                  </Link>
                  <Link
                    href="/industries"
                    prefetch={false}
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
