import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Mail,
  TrendingUp,
} from "lucide-react";
import { ventures } from "@/data/ventures";
import { PageHero } from "@/components/PageHero";

export async function generateStaticParams() {
  return ventures.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = ventures.find((v) => v.slug === slug);
  if (!venture) return { title: "Venture Not Found" };

  return {
    title: `${venture.title} | YESS Bangladesh`,
    description: venture.desc,
  };
}

export default async function SingleVenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = ventures.find((v) => v.slug === slug);

  if (!venture) {
    notFound();
  }

  const Icon = venture.icon;
  const siblingVentures = ventures.filter((v) => v.slug !== venture.slug).slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Venture Hero */}
      <section className="relative bg-[#061a1b] text-white py-16 sm:py-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container-tight relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* 3D Minted Medallion Coin */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-2 bg-gradient-to-tr from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#061a1b] border-2 border-[#d4a359]/40 flex items-center justify-center overflow-hidden p-3 shadow-inner">
                  {venture.logoUrl ? (
                    <Image
                      src={venture.logoUrl}
                      alt={venture.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon className="h-12 w-12 text-[#d4a359]" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 text-center md:text-left">
              <div className="inline-flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-[#35b0aa] border border-primary/40 uppercase tracking-wider">
                  {venture.category}
                </span>
                {venture.founded && (
                  <span className="text-xs font-medium text-white/60">
                    Est. {venture.founded}
                  </span>
                )}
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
                {venture.title}
              </h1>
              <p className="text-base sm:text-xl text-[#f6c87a] font-semibold max-w-2xl">
                {venture.tagline}
              </p>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                {venture.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main 65/35 Split Content */}
      <section className="py-16 bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column (65%): Long description, products, features, milestones */}
            <div className="lg:col-span-8 flex flex-col space-y-12">
              {/* Institutional Overview */}
              <div className="glass-card rounded-2xl p-8 border border-border">
                <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                  Operational Thesis & Architecture
                </h2>
                <p className="text-base leading-relaxed text-foreground/80">
                  {venture.longDesc}
                </p>
              </div>

              {/* Core Features & Products */}
              {venture.features && venture.features.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      Flagship Capabilities &amp; Products
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Production Deployments Active</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {venture.features.map((feat, idx) => (
                      <div
                        key={feat.title}
                        className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{idx === 0 ? "Active v4.2" : idx === 1 ? "Enterprise Live" : "Sovereign Tier"}</span>
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-base text-foreground">
                            {feat.title}
                          </h4>
                          <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights & Services */}
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                  Service Deliverables & Core Scope
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {venture.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border text-sm font-medium text-foreground"
                    >
                      <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              {venture.milestones && venture.milestones.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                    Milestone Evolution
                  </h3>
                  <div className="space-y-4 border-l-2 border-primary/20 pl-6 ml-2">
                    {venture.milestones.map((m) => (
                      <div key={m.year} className="relative">
                        <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary" />
                        <span className="text-xs font-bold text-primary">{m.year}</span>
                        <h4 className="font-display font-bold text-base text-foreground mt-0.5">
                          {m.title}
                        </h4>
                        <p className="text-xs text-foreground/70 mt-1">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (35% Sticky Sidebar): Metrics & Consultation Intake */}
            <div className="lg:col-span-4 flex flex-col space-y-8">
              {/* Key Metrics Dossier */}
              <div className="glass-card-strong rounded-2xl p-6 border border-border shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4a359]">
                  PORTFOLIO METRICS
                </span>
                <h4 className="font-display font-bold text-lg text-foreground mt-1 mb-4">
                  Verified Operational Scale
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-foreground/70">Category</span>
                    <span className="font-bold text-foreground">{venture.category}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-foreground/70">Founded</span>
                    <span className="font-bold text-foreground">{venture.founded || "2018"}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-foreground/70">Governance</span>
                    <span className="font-bold text-emerald-600">100% YESS Owned</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-foreground/70">Compliance</span>
                    <span className="font-bold text-foreground">RJSC Registered</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    href="/contact"
                    className="w-full text-center py-3 rounded-xl bg-primary text-white font-bold text-sm block shadow-sm hover:bg-primary/90 transition-all"
                  >
                    Engage {venture.title}
                  </Link>
                </div>
              </div>

              {/* Sister Ventures Strip */}
              <div className="glass-card rounded-2xl p-6 border border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-4">
                  SISTER SUBSIDIARIES
                </span>
                <div className="space-y-3">
                  {siblingVentures.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/ventures/${s.slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border text-sm font-semibold text-foreground group transition-colors"
                    >
                      <span>{s.title}</span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
