import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Tv,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  Download,
  Building2,
  ShieldCheck,
  Cpu,
  Phone,
  Radio,
  Briefcase,
  Globe,
  Sparkles,
  Server,
  PlayCircle,
  Leaf,
  Plane,
  Scale,
} from "lucide-react";
import { ventures as defaultVentures } from "@/data/ventures";
import { HomeVenturesFilter } from "@/components/home/HomeVenturesFilter";




const defaultHomeImpactMetrics = [
  {
    value: "৳250M+",
    label: "Sovereign Capital Deployed",
    desc: "Across 13 wholly-owned and partnered subsidiaries",
    color: "text-amber-700",
  },
  {
    value: "500+",
    label: "Engineers & Specialists",
    desc: "Distributed across 64 administrative districts",
    color: "text-[#35b0aa]",
  },
  {
    value: "99.8%",
    label: "Enterprise Core SLA & Uptime",
    desc: "Governed under zero-trust operational protocols",
    color: "text-emerald-400",
  },
  {
    value: "13",
    label: "Scaled Subsidiaries",
    desc: "Covering ERP, media, agri-tech, fintech and trade",
    color: "text-amber-700",
  },
];

export function HomeClient({
  sitePage,
  initialVentures,
}: {
  sitePage?: any;
  initialVentures?: any[];
}) {
  const effectiveVentures = initialVentures && initialVentures.length > 0 ? initialVentures : defaultVentures;
  const effectiveImpactMetrics = (sitePage?.data?.metrics as typeof defaultHomeImpactMetrics) || defaultHomeImpactMetrics;

  const effectiveTrustCredentials = (sitePage?.data?.trust_credentials as any[]) || [
    { label: "ISO-grade standards" },
    { label: "11+ years expertise" },
    { label: "98% client retention" },
    { label: "RJSC C-184920" },
  ];

  const effectiveHeroCoins = (sitePage?.data?.hero_coins as any[]) || [
    {
      slug: "yess-soft",
      title: "Yess Soft",
      subtitle: "Enterprise Cloud & AI",
      badge: "Tier-1 Cloud Ready",
      href: "/ventures/yess-soft",
      image: "/coins/yess-soft.png",
    },
    {
      slug: "shondhaan",
      title: "Shondhaan",
      subtitle: "National Discovery",
      badge: "National Engine",
      href: "/ventures",
      image: "/coins/shondhaan.png",
    },
    {
      slug: "yess-organic-haat",
      title: "Organic Haat",
      subtitle: "Farm-to-Fork AgriTech",
      badge: "10,000+ Growers",
      href: "/ventures",
      image: "/coins/yess-organic-haat.png",
    },
    {
      slug: "akash-ott",
      title: "Akash OTT",
      subtitle: "Streaming & Media",
      badge: "HD Streaming",
      href: "/services/akash-ott",
      image: "/coins/akash-ott.png",
    },
  ];

  const effectiveCtaBanner = sitePage?.data?.cta_banner || {
    eyebrow: "NATIONAL IMPACT",
    title: "Architecting the Sovereign Digital Future of Bangladesh",
    desc: "Partner with our Dhaka headquarters for bespoke enterprise engineering, venture building, and technology consultation.",
    primary_btn_text: "Schedule Strategic Consultation",
    primary_btn_href: "/contact",
    secondary_btn_text: "Candidate Status Portal",
    secondary_btn_href: "/application-status",
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Canonical Corporate Hero Section with Flagship Ventures Cockpit Card */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-200/80 min-h-[auto] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center">
        {/* Authentic Office Photography Backdrop (Optimized for Browser Preload Scanner) */}
        <div className="absolute inset-0 z-0 opacity-28 sm:opacity-30 pointer-events-none mix-blend-multiply overflow-hidden">
          <Image
            src="/assets/heroes/hero_6a8951c6b7346.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60 pointer-events-none" />

        {/* Ambient Brand Mesh & Strategic Glows */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow Badge (Only rendered if configured in CMS / not blank) */}
              {sitePage?.hero_eyebrow && sitePage.hero_eyebrow.trim() !== "" ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs w-fit">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  <span>{sitePage.hero_eyebrow.trim()}</span>
                </div>
              ) : null}

              {/* Display Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight mb-6">
                {sitePage?.hero_title ? (
                  sitePage.hero_title
                ) : (
                  <>
                    Youth Entrepreneurship for{" "}
                    <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                      smart success
                    </span>{" "}
                    with{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 bg-clip-text text-transparent">
                      excellence
                    </span>{" "}
                    &amp; solutions.
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl leading-relaxed mb-8">
                {sitePage?.hero_subtitle || "Catalyzing next-generation enterprises across sovereign software engineering, sustainable agribusiness, digital media streaming, and logistics in Bangladesh and global high-growth corridors."}
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] hover:from-[#006A4E] hover:to-[#085252] text-white font-bold shadow-md shadow-emerald-900/20 transition-all duration-200 active:scale-95 group text-xs sm:text-sm"
                >
                  <span>Start a project</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold shadow-xs transition-all duration-200 active:scale-95 text-xs sm:text-sm"
                >
                  <LayoutGrid className="h-4 w-4 text-emerald-700" />
                  <span>Explore services</span>
                </Link>
              </div>

              {/* Trust Credentials Bar */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                {effectiveTrustCredentials.map((cred: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{cred.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Sleek Cockpit Executive Portfolio Card (Light Theme) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 overflow-hidden">
                {/* Ambient glow in card background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>OUR FLAGSHIP VENTURES</span>
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-slate-900">
                      Pioneering Portfolio
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>13 Sovereign Assets</span>
                  </span>
                </div>

                {/* Dynamic Illuminated Venture Cards with Pure White Logo Pedestals */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                  {effectiveHeroCoins.slice(0, 4).map((coin: any, idx: number) => {
                    const coinBorderColors = [
                      "hover:border-emerald-400 hover:shadow-emerald-900/10",
                      "hover:border-rose-400 hover:shadow-rose-900/10",
                      "hover:border-emerald-400 hover:shadow-emerald-900/10",
                      "hover:border-amber-400 hover:shadow-amber-900/10",
                    ];
                    const glowColors = [
                      "bg-emerald-400/20",
                      "bg-indigo-500/20",
                      "bg-emerald-500/20",
                      "bg-sky-500/20",
                    ];
                    const badgeStyles = [
                      "text-emerald-800 bg-emerald-100 border-emerald-200",
                      "text-rose-800 bg-rose-100 border-rose-200",
                      "text-emerald-800 bg-emerald-100 border-emerald-200",
                      "text-amber-800 bg-amber-100 border-amber-200",
                    ];

                    return (
                      <Link
                        key={coin.slug || idx}
                        href={coin.href || "/ventures"}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 ${coinBorderColors[idx % 4]} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center cursor-pointer overflow-hidden`}
                      >
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs border border-slate-200 p-2 flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md ring-2 ring-slate-100 shrink-0">
                          <div className={`absolute -inset-1 rounded-2xl ${glowColors[idx % 4]} blur-sm opacity-0 group-hover:opacity-100 transition-opacity`} />
                          <Image
                            src={coin.image || `/coins/${coin.slug}.png`}
                            alt={`${coin.title} Logo`}
                            width={60}
                            height={60}
                            className="w-full h-full object-contain relative z-10"
                            sizes="60px"
                            priority={idx < 2}
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {coin.title}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{coin.subtitle}</p>
                        <span className={`mt-2 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyles[idx % 4]}`}>
                          {coin.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Audited Portfolio Valuation</span>
                  </span>
                  <span className="text-emerald-700 font-bold tracking-tight text-sm">$50M+ Cumulative Base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Engagement Action Cards ('READY WHEN YOU ARE') */}
      <section className="py-16 bg-slate-50/80 border-b border-slate-200">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              DIRECT ENGAGEMENT
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mt-1">
              READY WHEN YOU ARE — Let’s build what’s next, together.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Direct Inquiry */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span>Reply guaranteed within 1 business day</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Institutional Advisory & Inquiries
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Connect directly with our investment committee and technical architects in Dhaka. From corporate software buildouts to turnkey technology joint ventures, receive a scoped proposal within 72 hours.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-sm"
                >
                  <span>Contact Us Today</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="text-xs font-semibold text-foreground/70 flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-amber-700" />
                  <span>Hotline: +880 1805-464343</span>
                </div>
              </div>
            </div>

            {/* Card 2: Bilingual Corporate Profiles */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a359]/15 text-[#7e5713] text-xs font-bold mb-3">
                  <Download className="h-3.5 w-3.5" />
                  <span>Corporate Kit 2026 Edition</span>
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  Capability Brief & Practice Overview
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Examine our conglomerate structure, audited metrics, enterprise engineering blueprints, and case studies across all 13 subsidiaries in English and Bengali.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex flex-wrap items-center gap-3">
                <a
                  href="/yess-bangla-company-profile.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border text-foreground hover:text-primary text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="h-3.5 w-3.5 text-primary" />
                  <span>Brochure (English PDF)</span>
                </a>
                <a
                  href="/yess-bangla-company-profile-bn.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border text-foreground hover:text-primary text-xs font-bold transition-all shadow-sm"
                >
                  <Download className="h-3.5 w-3.5 text-primary" />
                  <span>ব্রোশিওর (বাংলা PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Partner Banner: Infinite Scrolling Marquee (Light Theme) */}
      <section className="py-10 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="container-tight mb-6 text-center">
          <p className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
            TRUSTED BY INSTITUTIONAL LEADERS &amp; ENTERPRISE PARTNERS IN BANGLADESH
          </p>
        </div>
        <div className="relative overflow-hidden w-full">
          <div className="animate-marquee flex items-center gap-14 text-slate-600 font-bold tracking-wider text-xs sm:text-sm">
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-600" /> ICT DIVISION BANGLADESH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Code2 className="h-4 w-4 text-amber-600" /> BASIS BANGLADESH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-600" /> ROBI AXIATA PLC
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-amber-600" /> BEXIMCO GROUP
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-600" /> WALTON HI-TECH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" /> BRAC ENTERPRISES
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-600" /> GRAMEEN TELECOM
            </span>

            {/* Duplicated set for seamless loop */}
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-600" /> ICT DIVISION BANGLADESH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Code2 className="h-4 w-4 text-amber-600" /> BASIS BANGLADESH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Radio className="h-4 w-4 text-emerald-600" /> ROBI AXIATA PLC
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-amber-600" /> BEXIMCO GROUP
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-600" /> WALTON HI-TECH
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" /> BRAC ENTERPRISES
            </span>
            <span className="hover:text-emerald-700 transition-colors flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-600" /> GRAMEEN TELECOM
            </span>
          </div>
        </div>
      </section>

      {/* 4. Core Solutions & Disciplines (6-Card Grid) */}
      <section id="services" className="py-20 bg-background">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              ENGINEERING & VENTURE CAPABILITIES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Institutional Practice Areas
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 mt-3">
              Sovereign enterprise architecture, high-concurrency streaming pipelines, and AI-driven automation built to institutional-grade resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Discipline 1: Enterprise Software & Cloud */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Enterprise Software & Cloud Systems
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Zero-trust microservices, sovereign cloud mesh topologies, and high-concurrency database architectures hosting critical workloads.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Zero-trust microservices & mesh architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Bare-metal Kubernetes domestic edge nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>ISO 27001 compliant security governance</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services/yess-one-stop" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Discipline 2: Venture Incubation */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Venture Incubation & Capital Architecture
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Turnkey venture building, capitalization advisory, equity structuring, and operational governance for early-to-growth enterprises.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>100% Foreground IP retention guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Dhaka Innovation Lab co-residency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Milestone-based seed tranches</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Discipline 3: Digital Media & Streaming */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Digital Media Streaming & Content Delivery
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Sub-second latency video ingestion, adaptive HLS/DASH streaming, DRM content protection, and edge CDN distribution for millions of viewers.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Sub-second low latency HLS/DASH packaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Multi-DRM cryptographic studio security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Telecom carrier billing API integration</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services/akash-ott" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Discipline 4: AgriTech & IoT */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Leaf className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Sustainable Agribusiness & Cold-Chain IoT
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Sensor-driven logistics, temperature-controlled farm-to-table traceability, and direct market access for 10,000+ organic growers.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>LoRaWAN farm IoT telemetry nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Traceable harvest QR passport registries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Direct farmer digital liquidity rails</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Discipline 5: Freight & Logistics */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Plane className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Cross-Border Freight & Customs Automation
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Cross-border cargo visibility, port logistics automated scheduling, and warehouse fleet management across major economic corridors.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Chittagong Port customs clearance bridge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Multimodal fleet automated dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>EDI/AS4 statutory customs integration</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Discipline 6: Regulatory Technology */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Regulatory Technology & Sovereign Advisory
                </h3>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  RJSC corporate registration, cross-border intellectual property structuring, bilateral joint venture agreements, and NBR tax compliance.
                </p>
                <div className="mt-4 space-y-2 pt-3 border-t border-border text-xs text-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Bilateral JV structuring & statutory governance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>NBR tax & statutory regulatory compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>RJSC statutory filing & IP ownership</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <Link href="/services" className="hover:underline flex items-center justify-between w-full">
                  <span>Explore Practice Dossier</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impact Metric Counters (Light Theme) */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 via-teal-50/40 to-slate-50 border-y border-emerald-100/80 text-slate-900" id="impact">
        <div className="container-tight">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {effectiveImpactMetrics.map((m: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center">
                <span className={`font-display font-extrabold text-4xl sm:text-5xl ${idx % 2 === 0 ? "text-emerald-700" : "text-amber-600"}`}>
                  {m.value}
                </span>
                <span className="text-sm font-bold text-slate-900 mt-2">
                  {m.label}
                </span>
                <span className="text-xs text-slate-600 mt-1">
                  {m.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Subsidiaries Directory Preview (All 13 Ventures) */}
      <section id="ventures" className="py-20 bg-slate-50/60">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              THE CONGLOMERATE CANVAS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              13 Sovereign Subsidiaries
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 mt-2">
              From enterprise ERP to pan-district logistics and digital television, YESS Bangladesh incubates and scales self-sustaining institutional assets.
            </p>

            {/* Interactive Leaf Component: Filter Tabs & Subsidiaries Grid */}
            <HomeVenturesFilter ventures={effectiveVentures} />
          </div>
        </div>
      </section>

      {/* 7. Strategic Consultation CTA Banner (Light Theme) */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-amber-50/20 text-slate-900 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight text-center max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            {effectiveCtaBanner.eyebrow || "NATIONAL IMPACT"}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 mt-3 leading-tight">
            {effectiveCtaBanner.title || "Architecting the Sovereign Digital Future of Bangladesh"}
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            {effectiveCtaBanner.desc || "Partner with our Dhaka headquarters for bespoke enterprise engineering, venture building, and technology consultation."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href={effectiveCtaBanner.primary_btn_href || "/contact"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] hover:from-[#006A4E] hover:to-[#085252] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>{effectiveCtaBanner.primary_btn_text || "Schedule Strategic Consultation"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={effectiveCtaBanner.secondary_btn_href || "/application-status"}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-all"
            >
              <span>{effectiveCtaBanner.secondary_btn_text || "Candidate Status Portal"}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
