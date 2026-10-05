import { notFound, redirect } from "next/navigation";
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
import { getVentures, getVentureBySlug } from "@/lib/cms";
import { PageHero } from "@/components/PageHero";

export const instant = false;

export async function generateStaticParams() {
  const all = await getVentures();
  return all.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "yess-service") {
    return { title: "Shondhaan — YESS Bangladesh" };
  }
  const venture = await getVentureBySlug(slug);
  if (!venture) return { title: "Venture Not Found" };

  return {
    title: venture.title,
    description: venture.desc,
  };
}

export default async function SingleVenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "yess-service") {
    redirect("/ventures/shondhaan");
  }

  const [venture, allVentures] = await Promise.all([
    getVentureBySlug(slug),
    getVentures(),
  ]);

  if (!venture) {
    // Check if slug was legacy or alternative for an existing venture
    const matchedVenture = allVentures.find(
      (v) =>
        (slug === "yess-service" && (v.slug === "shondhaan" || v.title.toLowerCase() === "shondhaan")) ||
        v.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
    if (matchedVenture && matchedVenture.slug !== slug) {
      redirect(`/ventures/${matchedVenture.slug}`);
    }
    notFound();
  }

  const Icon = (venture as any).icon || ventures.find((v) => v.slug === venture.slug)?.icon || Building2;
  const siblingVentures = allVentures.filter((v) => v.slug !== venture.slug).slice(0, 3);


  const heroBgMap: Record<string, string> = {
    "shondhaan": "/assets/ventures/yess-service.jpg",
    "yess-service": "/assets/ventures/yess-service.jpg",
    "yess-organic-food": "/assets/heroes/hero_6a89646fd72ff.jpg",
    "yess-soft": "/assets/services-tech-bd.jpg",
    "yess-technology": "/assets/heroes/hero_6a896e39e25bd.jpg",
    "akash-tv": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "akash-ott": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "akash-news": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "yess-entertainment": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "yess-event-management": "/assets/heroes/hero_6a8975c2b742a.jpg",
    "yess-one-stop-engineering": "/assets/general/centricity.webp",
    "yess-interior": "/assets/general/centricity.webp",
    "yess-overseas": "/assets/general/delivery.webp",
    "yess-restaurant": "/assets/general/retail-pos.webp",
    "yess-law-chamber": "/assets/trust-handshake-bd.jpg",
  };
  const heroBgImage = heroBgMap[venture.slug] || "/assets/ventures-dhaka-bd.jpg";

  return (
    <div className="flex flex-col w-full">
      {/* Venture Hero */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 overflow-hidden border-b border-slate-200/80">
        {/* Dynamic Background Image Layer (Optimized for Browser Preload Scanner) */}
        <div className="absolute inset-0 opacity-28 mix-blend-multiply pointer-events-none overflow-hidden">
          <Image
            src={heroBgImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container-tight relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" prefetch={false} className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/ventures" prefetch={false} className="hover:text-teal-700 transition-colors">
              Ventures
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">{venture.title}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Minted Medallion Coin */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-2 bg-gradient-to-tr from-teal-600 via-emerald-500 to-amber-500 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white border-2 border-amber-400/50 flex items-center justify-center overflow-hidden p-3 shadow-inner">
                  {venture.logoUrl ? (
                    <Image
                      src={venture.logoUrl}
                      alt={venture.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Icon className="h-12 w-12 text-teal-700" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 text-center md:text-left">
              <div className="inline-flex items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 uppercase tracking-wider shadow-2xs">
                  {venture.category}
                </span>
                {venture.founded && (
                  <span className="text-xs font-medium text-slate-500">
                    Est. {venture.founded}
                  </span>
                )}
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
                {venture.title}
              </h1>
              <p className="text-base sm:text-xl text-amber-700 font-semibold max-w-2xl">
                {venture.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
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
                    prefetch={false}
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
                      prefetch={false}
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
