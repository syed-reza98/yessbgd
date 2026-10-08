import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
  Lock,
  Scale,
  FileCheck,
} from "lucide-react";
import { industries } from "@/data/industries";
import { getIndustries, getIndustryBySlug } from "@/lib/cms";
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
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-16 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24">
        {/* Dynamic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBgImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-emerald-300/90 text-[#047857] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#047857]" aria-hidden="true" />
                  <span>Vertical excellence</span>
                </span>
              </div>
              <h1 className="font-black text-[34px] sm:text-[42px] lg:text-[47px] text-[#030D18] tracking-tight leading-[1.12] [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
                {industry.title}
              </h1>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#051321] font-bold leading-[1.7] [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_1px_2px_#ffffff]">
                {industry.intro}
              </p>
            </div>
          </div>

          {/* Key Metrics Strip (home card style) */}
          {industry.keyMetrics && industry.keyMetrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8">
              {industry.keyMetrics.map((km) => (
                <div
                  key={km.label}
                  className="p-5 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow text-center"
                >
                  <span className="font-extrabold text-2xl sm:text-3xl text-[#0D1E2D] block mb-1">
                    {km.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">
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
