import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Server,
  Code2,
  PlayCircle,
  Leaf,
  Plane,
  Scale,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getServices, getSitePage } from "@/lib/cms";
import { services as fallbackServices } from "@/data/services";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("services");
  return {
    title: page?.seo_title || "Services & Solutions",
    description:
      page?.seo_description ||
      "Enterprise cloud engineering, OTT media platforms, bespoke software, and agritech systems with transparent pricing and SLA guarantees.",
  };
}

const engagementModels = [
  {
    name: "Strategic Advisory",
    price: "Fixed-Fee Diagnostic",
    cadence: "1–2 Week Discovery",
    desc: "Rapid architecture audit, technical feasibility assessment, and cloud migration roadmaps.",
    features: [
      "Principal architect code review",
      "Vulnerability & security posture audit",
      "Executive blueprint & cloud cost optimization",
      "Bilateral NDA & IP covenant",
    ],
    highlight: false,
  },
  {
    name: "Dedicated Engineering Pod",
    price: "Monthly Retainer",
    cadence: "Bi-Weekly Agile Sprints",
    desc: "Full-stack squad (Lead Architect, 3 Senior Devs, QA Engineer) dedicated exclusively to your platform.",
    features: [
      "100% code ownership & Git handover",
      "Weekly staging demos every Friday",
      "Integrated CI/CD & automated test coverage",
      "Direct Slack/Teams technical channel",
    ],
    highlight: true,
  },
  {
    name: "Turnkey EPC Platform",
    price: "Milestone-Based",
    cadence: "6–16 Weeks Delivery",
    desc: "End-to-end design, build, and deployment of complex digital infrastructure under contract SLAs.",
    features: [
      "Guaranteed delivery milestone contract",
      "90-day post-launch comprehensive warranty",
      "Tier-3 domestic data center deployment",
      "Executive handover training & runbooks",
    ],
    highlight: false,
  },
];

export default async function ServicesPage() {
  const [allServices, sitePage] = await Promise.all([
    getServices(),
    getSitePage("services"),
  ]);

  const serviceList = allServices && allServices.length > 0 ? allServices : fallbackServices;
  const activeEngagementModels = Array.isArray(sitePage?.data?.engagementModels) && sitePage.data.engagementModels.length > 0
    ? sitePage.data.engagementModels
    : engagementModels;

  return (
    <div className="flex flex-col w-full">
      {/* Canonical Stitch Hero Section: Full-Lifecycle Engineering */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-20 sm:pt-32 lg:pt-36 overflow-hidden border-b border-slate-200/80 min-h-[auto] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/services-tech-bd.jpg')` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="container-tight relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Services &amp; Solutions</span>
          </div>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold tracking-widest uppercase mb-6 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>{sitePage?.hero_eyebrow || "— ENTERPRISE SERVICES & STRATEGIC CAPABILITIES —"}</span>
          </div>

          {/* Main Heading & Subtitle */}
          <div className="max-w-4xl mb-12">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 mb-6 leading-tight tracking-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Full-Lifecycle Engineering, Capital Advisory &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700">
                    Sovereign Transformation
                  </span>
                  .
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              {sitePage?.hero_subtitle || "From tier-3 cloud architectures to national cold-chain logistics, we deliver institutional capabilities designed for domestic sovereignty and international scale."}
            </p>
          </div>

          {/* Key Telemetry Stats Strip (4 Glass Metric Containers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-teal-500/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 text-xs font-medium">Practice Portfolio</span>
                <Server className="h-5 w-5 text-teal-600" />
              </div>
              <div className="font-display text-3xl font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                {serviceList.length}
              </div>
              <div className="text-xs text-slate-500 font-medium">Core Practice Disciplines</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 text-xs font-medium">Guaranteed Reliability</span>
                <ShieldCheck className="h-5 w-5 text-amber-600" />
              </div>
              <div className="font-display text-3xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                99.4%
              </div>
              <div className="text-xs text-slate-500 font-medium">SLA Compliance Contracted</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-teal-500/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 text-xs font-medium">Capital Mobilization</span>
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </div>
              <div className="font-display text-3xl font-extrabold text-slate-900 group-hover:text-teal-800 transition-colors">
                $50M+
              </div>
              <div className="text-xs text-slate-500 font-medium">Delivered Scope &amp; Assets</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-amber-500/40 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 text-xs font-medium">SRE &amp; NOC Continuity</span>
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="font-display text-3xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                24/7
              </div>
              <div className="text-xs text-slate-500 font-medium">Mission-Critical Redundancy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Practice Areas Grid */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          {sitePage?.body && (
            <div className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          )}

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              CAPABILITIES DIRECTORY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Our Practice Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((item) => {
              const Icon = (item as any).icon || fallbackServices.find((s: any) => s.slug === item.slug)?.icon || Code2;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-[#7e5713] dark:text-[#f6c87a] px-3 py-1 rounded-full bg-[#d4a359]/15">
                        {item.pricing.timeline}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-border pt-4">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                    <span>Pricing from {item.pricing.from}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Engagement Models Matrix */}
      <section className="py-20 bg-[#f4f8f8] border-y border-[#eaf2f2]">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              COMMERCIAL STRUCTURES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Flexible Engagement Models
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Select the operational engagement model best aligned with your development stage and governance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeEngagementModels.map((model: any) => (
              <div
                key={model.name}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  model.highlight
                    ? "glass-card-strong border-2 border-primary shadow-xl bg-white"
                    : "glass-card border border-border"
                }`}
              >
                {model.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                    MOST SELECTED BY ENTERPRISES
                  </span>
                )}
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {model.name}
                  </h3>
                  <div className="mt-3">
                    <span className="font-display font-extrabold text-2xl text-foreground">
                      {model.price}
                    </span>
                    <span className="text-xs text-muted-foreground block font-medium mt-0.5">
                      {model.cadence}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-3 leading-relaxed">
                    {model.desc}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {model.features?.map((f: any) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-foreground/80 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/contact"
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold block transition-all shadow-sm ${
                      model.highlight
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    Select Model
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
