"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Tv,
  LayoutGrid,
  ArrowRight,
  ArrowUpRight,
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
  ShoppingBasket,
  Newspaper,
  Cloud,
  Flag,
  Users,
  MapPin,
  Play,
  Star,
  X,
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

  const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsStoryVideoOpen(false);
    };
    if (isStoryVideoOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isStoryVideoOpen]);

  const heroVentures = [
    // Left column (3 cards)
    {
      name: "Shondhaan",
      category: "Service Marketplace",
      href: "/ventures",
      icon: Leaf,
      iconBg: "bg-emerald-500",
      hoverColor: "group-hover:text-emerald-600",
    },
    {
      name: "Organic Haat",
      category: "Fresh & Healthy Food",
      href: "/ventures",
      icon: ShoppingBasket,
      iconBg: "bg-amber-500",
      hoverColor: "group-hover:text-amber-600",
    },
    {
      name: "Yess Soft",
      category: "IT Solutions",
      href: "/ventures/yess-soft",
      icon: Code2,
      iconBg: "bg-blue-600",
      hoverColor: "group-hover:text-blue-600",
    },
    // Right column (4 cards)
    {
      name: "The Daily Akash",
      category: "News & Media",
      href: "/services",
      icon: Newspaper,
      iconBg: "bg-orange-500",
      hoverColor: "group-hover:text-orange-600",
    },
    {
      name: "Akash TV",
      category: "Television",
      href: "/services",
      icon: Tv,
      iconBg: "bg-rose-500",
      hoverColor: "group-hover:text-rose-600",
    },
    {
      name: "Akash OTT",
      category: "Entertainment",
      href: "/services/akash-ott",
      icon: PlayCircle,
      iconBg: "bg-purple-600",
      hoverColor: "group-hover:text-purple-600",
    },
    {
      name: "Yess Host",
      category: "Hosting & Cloud",
      href: "/services",
      icon: Cloud,
      iconBg: "bg-sky-600",
      hoverColor: "group-hover:text-sky-600",
    },
  ];

  const heroMetrics = [
    {
      value: "11+",
      label: "Years of Journey",
      icon: Flag,
      iconBg: "bg-emerald-50 text-[#10754A] border-emerald-100",
    },
    {
      value: "500+",
      label: "Team Members",
      icon: Users,
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      value: "Millions",
      label: "People Reached",
      icon: Globe,
      iconBg: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      value: "64+",
      label: "Districts Presence",
      icon: MapPin,
      iconBg: "bg-sky-50 text-sky-600 border-sky-100",
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
      {/* 1. Canonical Corporate Hero Section (Stitch 2026 Sovereign Architecture) */}
      <section className="relative w-full min-h-[auto] lg:min-h-[640px] xl:min-h-[680px] overflow-hidden flex flex-col justify-between pt-24 pb-6 sm:pt-26 sm:pb-8 lg:pt-28 lg:pb-8 border-b border-slate-200/80">
        {/* Authentic Bangladesh Sunset & National Monument Photography Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/assets/heroes/hero-bg-bangladesh-sunset.jpg"
            alt="Bangladesh Sunset Horizon"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>

        {/* Soft Translucent Ambient Wash: preserves full visibility of the office backdrop while ensuring clean text contrast */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.68) 28%, rgba(255, 255, 255, 0.30) 55%, transparent 85%)",
          }}
        />

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
            {/* ================= LEFT HERO CONTENT COLUMN ================= */}
            <div className="lg:col-span-6 xl:col-span-6 pt-1 lg:pt-0">
              {/* Eyebrow Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-300 bg-emerald-50/90 text-[#10754A] text-[11px] font-bold tracking-widest uppercase mb-4 shadow-xs w-fit">
                <span className="w-2 h-2 rounded-full bg-[#10754A] animate-pulse inline-block" />
                <span>{sitePage?.hero_eyebrow?.trim() || "A SMARTER BANGLADESH TOGETHER"}</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] tracking-tight leading-[1.12] mb-4 text-slate-900">
                Your Ecosystem for{" "}
                <span className="text-[#10754A] block sm:inline">Smart Solutions</span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-7 font-medium">
                {sitePage?.hero_subtitle || "At YESS Bangladesh, we build and grow businesses that bring real value to people — through services, fresh food, technology, news and entertainment."}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6 sm:mb-7">
                <Link
                  href="#ventures"
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#10754A] hover:bg-[#0d5d3b] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
                >
                  <span>Explore Our Brands</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsStoryVideoOpen(true)}
                  className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm shadow-xs hover:bg-white hover:border-slate-300 transition-all transform active:scale-95 group cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                    <Play className="h-2.5 w-2.5 fill-current translate-x-[1px]" />
                  </span>
                  <span>Watch Our Story</span>
                </button>
              </div>

              {/* Social Proof Row */}
              <div className="flex items-center gap-3.5 pt-1">
                {/* Overlapping Circular Team Avatars */}
                <div className="flex items-center -space-x-2.5 shrink-0">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-100">
                    <Image
                      src="/assets/teams/NI_Tushar.png"
                      alt="Team portrait"
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-100">
                    <Image
                      src="/assets/teams/hiya.png"
                      alt="Team portrait"
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-100">
                    <Image
                      src="/assets/teams/ovijit.jpeg"
                      alt="Team portrait"
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-100">
                    <Image
                      src="/assets/teams/tanvi.png"
                      alt="Team portrait"
                      fill
                      sizes="36px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Rating & Trust Text */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">4.9/5</span>
                  </div>
                  <p className="text-slate-700 font-semibold text-[11px] sm:text-xs">
                    Trusted by thousands across Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* ================= RIGHT HERO VISUAL OVERLAY ================= */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-end justify-center">
              {/* Glowing Cursive Script above monitors */}
              <div className="w-full flex justify-end pr-2 sm:pr-4 mb-2">
                <span
                  className="text-xl sm:text-2xl tracking-wide transform -rotate-3 select-none"
                  style={{
                    fontFamily: "var(--font-script), 'Caveat', cursive",
                    color: "#35b0aa",
                    textShadow: "0 0 14px rgba(53, 176, 170, 0.85), 0 0 28px rgba(53, 176, 170, 0.5)",
                  }}
                >
                  A Smarter Bangladesh Together
                </span>
              </div>

              {/* Staggered Floating 3D Frosted Glass Venture Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-lg">
                {/* Left Column (3 cards) */}
                <div className="flex flex-col gap-2.5 sm:gap-3 sm:translate-y-2">
                  {heroVentures.slice(0, 3).map((v, i) => {
                    const IconComponent = v.icon;
                    return (
                      <Link
                        key={i}
                        href={v.href}
                        className="rounded-[16px] p-2.5 sm:p-3 flex items-center justify-between cursor-pointer group bg-white/90 backdrop-blur-md border border-white/95 shadow-[0_8px_20px_-6px_rgba(15,31,32,0.1)] hover:shadow-[0_16px_28px_-6px_rgba(16,117,74,0.18)] hover:-translate-y-0.5 hover:bg-white transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${v.iconBg} text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                              {v.name}
                            </h3>
                            <p className="text-slate-500 text-[11px] font-normal">{v.category}</p>
                          </div>
                        </div>
                        <ArrowUpRight className={`h-3.5 w-3.5 text-slate-400 ${v.hoverColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`} />
                      </Link>
                    );
                  })}
                </div>

                {/* Right Column (4 cards) */}
                <div className="flex flex-col gap-2.5 sm:gap-3 sm:-translate-y-1">
                  {heroVentures.slice(3, 7).map((v, i) => {
                    const IconComponent = v.icon;
                    return (
                      <Link
                        key={i}
                        href={v.href}
                        className="rounded-[16px] p-2.5 sm:p-3 flex items-center justify-between cursor-pointer group bg-white/90 backdrop-blur-md border border-white/95 shadow-[0_8px_20px_-6px_rgba(15,31,32,0.1)] hover:shadow-[0_16px_28px_-6px_rgba(16,117,74,0.18)] hover:-translate-y-0.5 hover:bg-white transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${v.iconBg} text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                              {v.name}
                            </h3>
                            <p className="text-slate-500 text-[11px] font-normal">{v.category}</p>
                          </div>
                        </div>
                        <ArrowUpRight className={`h-3.5 w-3.5 text-slate-400 ${v.hoverColor} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FLOATING BOTTOM METRICS CAPSULE DOCK ================= */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-full px-5 sm:px-8 py-3 sm:py-3.5 shadow-lg border border-slate-100/90">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 items-center">
              {heroMetrics.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 justify-start md:justify-center">
                    <div className={`w-9 h-9 rounded-full ${m.iconBg} flex items-center justify-center shrink-0 border shadow-xs`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-none">
                        {m.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isStoryVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6"
          onClick={() => setIsStoryVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-sm tracking-wide">YESS Bangladesh — Our Story</span>
              </div>
              <button
                type="button"
                onClick={() => setIsStoryVideoOpen(false)}
                aria-label="Close video"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YESS Bangladesh Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

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
