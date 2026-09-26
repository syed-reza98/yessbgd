import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Tv,
  PlayCircle,
  Newspaper,
  Leaf,
  Wrench,
  Server,
  CalendarHeart,
  Sparkles,
  ChefHat,
  LayoutGrid,
  Plane,
  Scale,
  ArrowRight,
  CheckCircle2,
  Download,
  Building2,
  Users,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Phone,
  Layers,
  Search,
  Globe2,
} from "lucide-react";
import { ventures } from "@/data/ventures";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Hero Section with 4 Flagship Minted 3D Medallions */}
      <section className="relative bg-[#061a1b] text-white overflow-hidden py-10 sm:py-14 lg:py-16 border-b border-white/10">
        {/* Authentic Office Photography Backdrop with Dark Radial Mask */}
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-office-bg.webp')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#061a1b] via-[#061a1b]/95 to-[#061a1b]/90 pointer-events-none" />

        {/* Ambient Brand Mesh & Strategic Glows */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#008744]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-1/4 w-80 h-80 bg-[#c82333]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#d4a359]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-tight relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#d4a359]/35 text-[#d4a359] text-xs font-bold uppercase tracking-wider w-fit backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#d4a359]" />
                <span>— BANGLADESH VENTURE BUILDER & ENTERPRISE STUDIO —</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[42px] tracking-tight text-white leading-[1.18]">
                Youth Entrepreneurship for{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-[#d4a359] bg-clip-text text-transparent">
                  smart success
                </span>{" "}
                with{" "}
                <span className="bg-gradient-to-r from-[#f87171] via-[#d4a359] to-amber-200 bg-clip-text text-transparent">
                  excellence
                </span>{" "}
                & solutions.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Catalyzing next-generation enterprises across sovereign software engineering, sustainable agribusiness, digital media streaming, and logistics in Bangladesh and global high-growth corridors.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] hover:from-[#006A4E] hover:to-[#085252] text-white font-bold shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 transition-all duration-200 active:scale-95 group text-xs sm:text-sm"
                >
                  <span>Start a project</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold shadow-xs backdrop-blur-md transition-all duration-200 text-xs sm:text-sm"
                >
                  <LayoutGrid className="h-4 w-4 text-[#d4a359]" />
                  <span>Explore services</span>
                </Link>
              </div>

              {/* Trust Credentials Bar */}
              <div className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#d4a359]" />
                  <span>ISO-grade standards</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#d4a359]" />
                  <span>11+ years expertise</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#d4a359]" />
                  <span>98% client retention</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-[#d4a359]" />
                  <span>RJSC C-184920</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Sleek Cockpit Executive Portfolio Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-5 bg-[#0a2022]/95 border border-emerald-500/25 shadow-2xl shadow-black/60 backdrop-blur-xl relative ring-1 ring-white/10">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold text-[#d4a359] uppercase tracking-wider block">
                      OUR FLAGSHIP VENTURES
                    </span>
                    <span className="font-display text-base sm:text-lg font-bold text-white">
                      Pioneering Portfolio
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    13 Sovereign Assets
                  </span>
                </div>

                {/* 4 Minted 3D Medallions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Coin 1: Yess Soft */}
                  <Link
                    href="/ventures/yess-soft"
                    className="group p-3.5 rounded-xl bg-[#0e272a]/90 hover:bg-[#133539] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  >
                    <div className="relative w-14 h-14 rounded-full p-1 flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-hover:rotate-6">
                      <Image
                        src="/coins/yess-soft.png"
                        alt="Yess Soft Minted Coin"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Yess Soft
                    </h3>
                    <p className="text-[11px] text-slate-300/80 mt-0.5">Enterprise Cloud & AI</p>
                    <span className="mt-1.5 text-[9px] text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Tier-1 Cloud Ready
                    </span>
                  </Link>

                  {/* Coin 2: Shondhaan */}
                  <Link
                    href="/ventures"
                    className="group p-3.5 rounded-xl bg-[#0e272a]/90 hover:bg-[#133539] border border-white/10 hover:border-rose-500/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  >
                    <div className="relative w-14 h-14 rounded-full p-1 flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-hover:-rotate-6">
                      <Image
                        src="/coins/shondhaan.png"
                        alt="Shondhaan Minted Coin"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                      Shondhaan
                    </h3>
                    <p className="text-[11px] text-slate-300/80 mt-0.5">National Discovery</p>
                    <span className="mt-1.5 text-[9px] text-[#f87171] font-bold uppercase tracking-wider bg-rose-950/90 px-2 py-0.5 rounded-md border border-rose-500/30">
                      National Engine
                    </span>
                  </Link>

                  {/* Coin 3: Yess Organic Haat */}
                  <Link
                    href="/ventures"
                    className="group p-3.5 rounded-xl bg-[#0e272a]/90 hover:bg-[#133539] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  >
                    <div className="relative w-14 h-14 rounded-full p-1 flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-hover:rotate-6">
                      <Image
                        src="/coins/yess-organic-haat.png"
                        alt="Organic Haat Minted Coin"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Organic Haat
                    </h3>
                    <p className="text-[11px] text-slate-300/80 mt-0.5">Farm-to-Fork AgriTech</p>
                    <span className="mt-1.5 text-[9px] text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/90 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      10,000+ Growers
                    </span>
                  </Link>

                  {/* Coin 4: Akash OTT */}
                  <Link
                    href="/services/akash-ott"
                    className="group p-3.5 rounded-xl bg-[#0e272a]/90 hover:bg-[#133539] border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                  >
                    <div className="relative w-14 h-14 rounded-full p-1 flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-hover:-rotate-6">
                      <Image
                        src="/coins/akash-ott.png"
                        alt="Akash OTT Minted Coin"
                        width={56}
                        height={56}
                        className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Akash OTT
                    </h3>
                    <p className="text-[11px] text-slate-300/80 mt-0.5">Streaming & Media</p>
                    <span className="mt-1.5 text-[9px] text-[#d4a359] font-bold uppercase tracking-wider bg-amber-950/90 px-2 py-0.5 rounded-md border border-amber-500/30">
                      4.8M Viewers
                    </span>
                  </Link>
                </div>

                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Audited Portfolio Valuation
                  </span>
                  <span className="text-emerald-400 font-bold">$50M+ Cumulative Base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Direct Engagement Action Cards ('READY WHEN YOU ARE') */}
      <section className="py-16 bg-[#f4f8f8] border-b border-[#eaf2f2]">
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
                  <Phone className="h-4 w-4 text-[#d4a359]" />
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

      {/* 3. Social Proof Partner Banner */}
      <section className="py-8 bg-[#061a1b] text-white border-y border-white/10">
        <div className="container-tight flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs font-bold tracking-widest uppercase text-[#d4a359] shrink-0">
            STRATEGIC PARTNERS & CLIENT ECOSYSTEM:
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 text-xs font-bold text-white/60 tracking-wider">
            <span>ICT DIVISION BANGLADESH</span>
            <span>BASIS MEMBER</span>
            <span>BEXIMCO HEALTH</span>
            <span>WALTON HI-TECH</span>
            <span>BRAC ENTERPRISES</span>
          </div>
        </div>
      </section>

      {/* 4. Core Solutions & Disciplines (6-Card Grid) */}
      <section id="services" className="py-20 bg-background">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              CAPABILITIES & PRACTICES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Sovereign Engineering & Multi-Sector Solutions
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 mt-3">
              Deploying enterprise architecture, low-latency streaming networks, and cold-chain agritech platforms designed for scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Discipline 1 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Enterprise Cloud & Distributed Systems
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                Zero-trust microservices, sovereign cloud mesh topologies, and high-concurrency database architectures hosting critical workloads.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Yess Soft Core</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Discipline 2 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Bespoke Software & Enterprise ERP
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                Tailored enterprise management systems, payroll suites, inventory control, and multi-tenant platforms built with TypeScript & PostgreSQL.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Custom Engineering</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Discipline 3 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <PlayCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                OTT Media & Live Transcoding
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                Sub-second latency video ingestion, adaptive HLS/DASH streaming, DRM content protection, and edge CDN distribution for millions of viewers.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Akash OTT Tech</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Discipline 4 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Cold-Chain AgriTech & IoT Telemetry
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                Sensor-driven logistics, temperature-controlled farm-to-table traceability, and direct market access for 10,000+ organic growers.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Organic Haat Core</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Discipline 5 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Multimodal Logistics & Freight
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                Cross-border cargo visibility, port logistics automated scheduling, and warehouse fleet management across major economic corridors.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>DeshLogix</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Discipline 6 */}
            <div className="glass-card rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 group">
              <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                Statutory Governance & Advisory
              </h3>
              <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                RJSC corporate registration, cross-border intellectual property structuring, bilateral joint venture agreements, and NBR tax compliance.
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Legal Advisory</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impact Metric Counters */}
      <section className="py-16 bg-[#061a1b] text-white border-y border-white/10">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#35b0aa]">
                13+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mt-2">
                Active Subsidiaries
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#d4a359]">
                500+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mt-2">
                Engineers & Specialists
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#35b0aa]">
                $50M+
              </span>
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mt-2">
                Enterprise Value Created
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#d4a359]">
                99.4%
              </span>
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mt-2">
                Client SLA Retention
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Subsidiaries Directory Preview (All 13 Ventures) */}
      <section id="ventures" className="py-20 bg-[#f8faf9]">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                PORTFOLIO ECOSYSTEM
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
                The 13 Conglomerate Ventures
              </h2>
            </div>
            <Link
              href="/ventures"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
            >
              <span>Explore full directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.map((venture) => {
              const Icon = venture.icon;
              return (
                <Link
                  key={venture.slug}
                  href={`/ventures/${venture.slug}`}
                  className="glass-card rounded-2xl p-6 hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-secondary/80 text-foreground border border-border">
                        {venture.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {venture.title}
                    </h3>
                    <p className="text-xs text-foreground/70 mt-1 line-clamp-2 leading-relaxed">
                      {venture.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>View Profile</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Strategic Consultation CTA Banner */}
      <section className="py-20 bg-[#061a1b] text-white relative overflow-hidden">
        <div className="container-tight text-center max-w-3xl mx-auto relative z-10">
          <span className="text-xs font-bold text-[#f6c87a] uppercase tracking-widest">
            NATIONAL IMPACT
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-3 leading-tight">
            Architecting the Sovereign Digital Future of Bangladesh
          </h2>
          <p className="text-base text-white/70 mt-4 leading-relaxed">
            Partner with our Dhaka headquarters for bespoke enterprise engineering, venture building, and technology consultation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-[#35b0aa] text-white font-bold text-sm shadow-xl transition-all"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/application-status"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <span>Candidate Status Portal</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
