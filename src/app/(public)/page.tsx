"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useOffscreenPause } from "@/hooks/useOffscreenPause";
import { Link } from "@/components/ui/link";
import { motion, AnimatePresence } from "framer-motion";
import aboutImg from "@/assets/about-team-bd.jpg";
import contactImg from "@/assets/contact-welcome-bd.jpg";

const aboutImgSrc = (aboutImg as any)?.src || aboutImg;
const contactImgSrc = (contactImg as any)?.src || contactImg;

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CorporateDossierCard } from "@/components/CorporateDossierCard";
import { ConnectedProcessTimeline } from "@/components/ConnectedProcessTimeline";
import { VenturesBentoGrid } from "@/components/VenturesBentoGrid";
import { CountUp, CountUpSkeleton } from "@/components/CountUp";
import { SectionHeader, SectionDivider } from "@/components/SectionHeader";
import { usePageOverride } from "@/lib/sitePages";
import { useVentures } from "@/lib/dynamicContent";
import { activeVentures, upcomingVentures } from "@/data/ventures";
import {
  ArrowRight,
  ArrowUpRight,
  Tv,
  Newspaper,
  LayoutGrid,
  Code2,
  Palette,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Search,
  Lightbulb,
  Rocket,
  LineChart,
  Quote,
  Star,
  Globe,
  Briefcase,
  Building2,
  HeartHandshake,
  Download,
  FileText,
  Mail,
  Layers,
  Phone,
  Server,
  Terminal,
  Cpu,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { COMPANY_CONTACT, phoneHref } from "@/lib/companyContact";

const serviceIcons = [Tv, Newspaper, LayoutGrid, Code2, Palette, ShoppingBag];
const featureIcons = [ShieldCheck, Sparkles, Users, TrendingUp];

const clients = [
  "Akash TV",
  "Akash News",
  "Akash OTT",
  "One Stop IT",
  "Yess Shop",
  "Bangla Media",
  "BD Logistics",
  "EduConnect",
  "BASIS BD",
];

type ImpactMetric = {
  id: string;
  icon: typeof Briefcase;
  target: number;
  format?: import("@/components/CountUp").CountFormat;
};

const impactMetrics: ImpactMetric[] = [
  { id: "projects",  icon: Briefcase,      target: 250,    format: { plus: true } },
  { id: "users",     icon: Users,          target: 180000, format: { compact: true, plus: true } },
  { id: "clients",   icon: Building2,      target: 120,    format: { plus: true } },
  { id: "districts", icon: Globe,          target: 64 },
  { id: "years",     icon: Award,          target: 11,     format: { plus: true } },
  { id: "retention", icon: HeartHandshake, target: 98,     format: { percent: true } },
];

type LocalizedItem = { title: string; desc: string };
type Testimonial = { name: string; role: string; quote: string };

// Interactive Live Console Data for Hero
const CONSOLE_TABS = [
  {
    id: "yess-soft",
    name: "Yess Soft",
    badge: "Core Software Studio",
    icon: Code2,
    tagline: "Enterprise Software & Cloud Engineering",
    desc: "Full-cycle digital product studio shipping high-performance web applications, distributed ERP/CRM systems, and custom APIs.",
    metrics: [
      { label: "Uptime SLA", val: "99.98%" },
      { label: "Build Cadence", val: "2-Wk Sprints" },
      { label: "Code Coverage", val: "94%+" },
    ],
    stack: ["Next.js 16", "TypeScript", "Node.js", "Drizzle ORM", "PostgreSQL", "Docker"],
    link: "/ventures/yess-soft",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: "akash-ott",
    name: "Akash OTT",
    badge: "Media Streaming",
    icon: Tv,
    tagline: "High-Scale Media Streaming Platform",
    desc: "National streaming infrastructure engineered with HLS/DASH adaptive bitrate delivery, Widevine DRM, and multi-device apps.",
    metrics: [
      { label: "Concurrent Streams", val: "50K+" },
      { label: "Stream Latency", val: "< 2.8s" },
      { label: "DRM Protection", val: "Level 1" },
    ],
    stack: ["AWS MediaConvert", "CloudFront CDN", "Widevine DRM", "Node.js", "Redis"],
    link: "/ventures/akash-ott",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    id: "the-daily-akash",
    name: "The Daily Akash",
    badge: "Digital Journalism",
    icon: Newspaper,
    tagline: "Real-Time Digital Newsroom CMS",
    desc: "Sub-second edge caching publishing architecture serving high-concurrency national news readers with structured SEO automation.",
    metrics: [
      { label: "Cache Hit Ratio", val: "99.4%" },
      { label: "Edge TTFB", val: "38ms" },
      { label: "Monthly Readers", val: "100K+" },
    ],
    stack: ["Next.js", "Cloudflare Workers", "PostgreSQL", "Redis", "Elastic"],
    link: "/ventures/the-daily-akash",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "yess-host",
    name: "Yess Host",
    badge: "Cloud Infrastructure",
    icon: Server,
    tagline: "Cloud Hosting & Infrastructure Ops",
    desc: "Enterprise cloud hosting, automated backups, NVMe storage arrays, and cPanel server orchestration designed for business continuity.",
    metrics: [
      { label: "Hardware Array", val: "NVMe Gen4" },
      { label: "DDoS Mitigation", val: "100 Gbps" },
      { label: "Tech Support", val: "24/5 Direct" },
    ],
    stack: ["cPanel / WHM", "LiteSpeed", "CloudLinux", "NVMe SSD", "KVM"],
    link: "/ventures/yess-host",
    accent: "from-emerald-500 to-teal-500",
  },
];

export default function Index() {
  const ventures = useVentures();
  const live = activeVentures(ventures);
  const upcoming = upcomingVentures(ventures);
  const cmsHome = usePageOverride("home");
  const { t, i18n: i18nInst } = useTranslation();
  const isBn = (i18nInst?.language || i18n.language || "en").startsWith("bn");
  const [hydrated, setHydrated] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState(0);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const currentTab = CONSOLE_TABS[activeConsoleTab];

  return (
    <>
      {/* =========================================================================
          HERO — 2026 OUTCOME-FIRST ARCHITECTURE: BOLD TYPOGRAPHY & LIVE CONSOLE
          ========================================================================= */}
      <section className="relative isolate overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-border/60">
        {/* Subtle engineering ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 via-primary-glow/20 to-accent/20 opacity-40 sm:w-[72.1875rem]"
          />
        </div>

        <div className="container-tight relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* LEFT COLUMN: Editorial Pitch & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Institutional Quality Badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-[11px] font-semibold text-primary backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span>BASIS ACCREDITED · ISO-ALIGNED · MIRPUR, DHAKA</span>
              </div>

              {/* Bold Outcome-First Headline */}
              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-foreground text-balance leading-[1.08]">
                {cmsHome.title ? (
                  cmsHome.title
                ) : isBn ? (
                  <>
                    আন্তর্জাতিক মানের{" "}
                    <span className="text-gradient-primary">সফটওয়্যার ও ডিজিটাল ভেঞ্চার</span>{" "}
                    ইঞ্জিনিয়ারিং।
                  </>
                ) : (
                  <>
                    Engineering Scalable{" "}
                    <span className="text-gradient-primary">Software & Digital Ventures</span>.
                  </>
                )}
              </h1>

              {/* Supporting Value Narrative */}
              <p className="mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl text-balance">
                {cmsHome.subtitle ? (
                  cmsHome.subtitle
                ) : isBn ? (
                  "ইয়েস বাংলা প্রাইভেট লিমিটেড — এন্টারপ্রাইজ ওয়েব ও ক্লাউড সফটওয়্যার, হাই-স্কেল ওটিটি স্ট্রিমিং ও আধুনিক ডিজিটাল বিজনেস সলিউশনস। ৬৪ জেলা ও আন্তর্জাতিক পরিসরে নির্ভরযোগ্য প্রযুক্তি অংশীদার।"
                ) : (
                  "YESS Bangla is an integrated software and multi-sector venture studio based in Dhaka. We build custom enterprise software, OTT media platforms, and high-impact digital ventures that power forward-thinking businesses across Bangladesh and global markets."
                )}
              </p>

              {/* Action Buttons & Hotline Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{isBn ? "প্রজেক্ট আলোচনা শুরু করুন" : "Schedule Strategy Call"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#ventures-ecosystem"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border/80 bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:bg-secondary hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Layers className="h-4 w-4 text-primary" />
                  <span>{isBn ? "১৩টি ভেঞ্চার ডিরেক্টরি" : "Explore 13 Ventures"}</span>
                </a>

                <a
                  href={phoneHref}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-transparent px-4 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono">{COMPANY_CONTACT.phone.display}</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-border/50 pt-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>250+ Completed Projects</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>180K+ Active Users</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>64 Districts Covered</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Live Venture & Tech Console */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-2xl backdrop-blur-xl">
                {/* Console Window Top Bar */}
                <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] font-semibold text-muted-foreground">
                      yess-ecosystem // core.ts
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-primary">
                    Production
                  </span>
                </div>

                {/* Console Interactive Tabs */}
                <div className="grid grid-cols-4 border-b border-border/50 bg-secondary/30 p-1 text-center font-mono text-xs">
                  {CONSOLE_TABS.map((tab, idx) => {
                    const active = activeConsoleTab === idx;
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveConsoleTab(idx)}
                        className={`flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all ${
                          active
                            ? "bg-card text-foreground font-bold shadow-xs border border-border/60"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <TabIcon className="h-3.5 w-3.5" />
                        <span className="truncate">{tab.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Console Body with animated content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {currentTab.badge}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
                          {currentTab.name}
                        </h3>
                        <p className="text-xs font-medium text-primary">
                          {currentTab.tagline}
                        </p>
                      </div>

                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${currentTab.accent} text-white shadow-xs`}>
                        <currentTab.icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {currentTab.desc}
                    </p>

                    {/* Live Performance Metrics Grid */}
                    <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border/50 py-3">
                      {currentTab.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="font-mono text-xs font-bold text-foreground">
                            {m.val}
                          </div>
                          <div className="mt-0.5 text-[10px] text-muted-foreground">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Architecture Stack:
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {currentTab.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-foreground/80 font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deep-dive Link Button */}
                    <div className="mt-5 pt-2 flex items-center justify-between">
                      <Link
                        to={currentTab.link as any}
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all hover:gap-2.5"
                      >
                        <span>Deep-dive into {currentTab.name}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="font-mono text-[10px] text-emerald-500 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Operational
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          ENTERPRISE TRUST RIBBON & MARQUEE
          ========================================================================= */}
      <section className="border-b border-border/50 bg-secondary/20 py-6 sm:py-7">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Enterprise Partners & Alliances
            </div>
            <div className="marquee-mask overflow-hidden flex-1">
              <div className="marquee gap-8 pr-8 sm:gap-12 sm:pr-12">
                {[...clients, ...clients].map((c, i) => (
                  <span
                    key={`${c}-${i}`}
                    className="shrink-0 font-display text-sm sm:text-base font-semibold tracking-tight text-foreground/70 transition-colors hover:text-primary"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXECUTIVE DOSSIER & QUICK ACCESS CARDS
          ========================================================================= */}
      <section className="py-12 sm:py-14 border-b border-border/50 bg-background">
        <div className="container-tight">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {/* Quick Action Tiles */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Link
                to="/contact"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Mail className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div className="mt-5">
                  <div className="font-display text-lg font-bold text-foreground">
                    {t("home.ctaStrip.contactTitle", "Start a Project Consultation")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {t("home.ctaStrip.contactDesc", "Direct 30-min strategy call with senior operators in Dhaka.")}
                  </div>
                </div>
              </Link>

              <Link
                to="/services"
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent text-accent-foreground shadow-accent">
                    <Layers className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <div className="mt-5">
                  <div className="font-display text-lg font-bold text-foreground">
                    {t("home.ctaStrip.servicesTitle", "Explore Enterprise Capabilities")}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {t("home.ctaStrip.servicesDesc", "From OTT engineering to managed IT, e-commerce & UX design.")}
                  </div>
                </div>
              </Link>
            </div>

            {/* Upgraded Corporate Dossier Card */}
            <div className="lg:col-span-7">
              <CorporateDossierCard />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT YESS BANGLA — WHO WE ARE & CORE OPERATIONAL PILLARS
          ========================================================================= */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-border/50">
        <div className="container-tight grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div aria-hidden className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/10 to-accent/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-xl">
                <img
                  src={aboutImgSrc}
                  alt={t("home.about.imageAlt", "YESS Bangla Executive Team")}
                  width={1280}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full rounded-2xl object-cover"
                />
                {/* Verified Completed Projects Counter Pill */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-lg backdrop-blur-md">
                  <div className="font-display text-2xl font-bold tabular-nums text-primary">
                    {hydrated ? <CountUp target={250} format={{ plus: true } as const} /> : <CountUpSkeleton />}
                  </div>
                  <div className="text-[11px] font-medium leading-tight text-foreground/80 max-w-[10ch]">
                    {t("home.hero.kpi.projects", "Completed Projects")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span aria-hidden className="h-px w-6 bg-primary/40" />
              {t("home.about.eyebrow", "Corporate Foundation")}
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl tracking-tight text-foreground text-balance">
              {t("home.about.title", "Strategic Technology with Accountable Operators")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("home.about.lede", "YESS Bangla was founded on a simple conviction: technology delivers value only when paired with execution discipline and deep business ownership. We bridge engineering excellence with real operational metrics.")}
            </p>

            <Stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(t("home.about.features", { returnObjects: true }) as LocalizedItem[]).map((f, i) => {
                const Icon = featureIcons[i] || ShieldCheck;
                return (
                  <StaggerItem key={f.title}>
                    <div className="glass-card h-full rounded-2xl p-5 border border-border/60">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3.5 font-display text-base font-bold text-foreground">{f.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-[1.02]"
              >
                <span>{t("home.about.readMore", "Learn About Our Governance")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about/leadership"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 px-6 py-3 text-xs font-semibold text-foreground transition-all hover:bg-secondary hover:scale-[1.02]"
              >
                <span>Meet Executive Board</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          ENTERPRISE SERVICES & CAPABILITIES MATRIX
          ========================================================================= */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-border/50 bg-secondary/15">
        <div className="container-tight">
          <SectionHeader
            eyebrow={t("home.servicesSection.eyebrow", "Enterprise Capabilities")}
            title={t("home.servicesSection.title", "Tailored Software & Technology Solutions")}
            lede={t("home.servicesSection.lede", "From custom enterprise software to OTT streaming and 24/5 managed IT operations, we engineer modern platforms built to scale.")}
          />

          <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(t("home.servicesSection.items", { returnObjects: true }) as LocalizedItem[]).map((s, i) => {
              const Icon = serviceIcons[i] || Code2;
              return (
                <StaggerItem key={s.title}>
                  <article className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-xs font-bold text-muted-foreground/60">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-bold sm:text-xl text-foreground">{s.title}</h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all group-hover:gap-2.5"
                      >
                        <span>{t("home.servicesSection.learnMore", "View Deliverables")}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="font-mono text-[11px] text-muted-foreground font-semibold">
                        SLA Guaranteed
                      </span>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* =========================================================================
          IMPACT METRICS & MEASURABLE OUTCOMES
          ========================================================================= */}
      <section className="py-14 sm:py-16 border-b border-border/50">
        <div className="container-tight">
          <SectionHeader
            eyebrow={t("home.impact.eyebrow", "Demonstrated Track Record")}
            title={t("home.impact.title", "Measurable Scale Across All 64 Districts")}
            lede={t("home.impact.lede", "Every deliverable we ship is tied to real business numbers. Over a decade of consistent execution across private and public sectors.")}
          />

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {impactMetrics.map((m) => (
              <StaggerItem key={m.id}>
                <div className="relative h-full rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:border-primary/40">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-accent text-accent-foreground shadow-accent">
                      <m.icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex h-9 items-baseline font-display text-3xl font-bold leading-none tracking-tight text-foreground tabular-nums">
                        {hydrated ? (
                          <CountUp target={m.target} format={m.format} />
                        ) : (
                          <CountUpSkeleton />
                        )}
                      </div>
                      <div className="mt-1.5 text-sm font-semibold text-foreground/85">
                        {t(`home.impact.items.${m.id}.label`)}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-border/40 pt-3 text-xs text-muted-foreground leading-relaxed">
                    {t(`home.impact.items.${m.id}.note`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* =========================================================================
          AGILE PROCESS & DELIVERY METHODOLOGY
          ========================================================================= */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-border/50 bg-secondary/15">
        <div className="container-tight">
          <SectionHeader
            eyebrow={t("home.process.eyebrow", "Execution Discipline")}
            title={t("home.process.title", "How We Build & Ship: The 4-Phase Lifecycle")}
            lede={t("home.process.lede", "Transparent sprints, weekly working software demos, and continuous monitoring keep your investment de-risked from kickoff to scale.")}
          />
          <ConnectedProcessTimeline
            items={(t("home.process.items", { returnObjects: true }) as LocalizedItem[]) || []}
          />
        </div>
      </section>

      {/* =========================================================================
          VENTURES ECOSYSTEM BENTO GRID
          ========================================================================= */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-border/50">
        <div className="container-tight">
          <SectionHeader
            eyebrow={t("home.venturesSection.eyebrow", "Multi-Vertical Ecosystem")}
            title={t("home.venturesSection.title", "The YESS Bangla Portfolio")}
            lede={t("home.venturesSection.lede", "From software engineering and digital media streaming to agro-commodities and nationwide retail services, discover our active ventures.")}
          />

          <VenturesBentoGrid
            ventures={live}
            exploreText={t("home.venturesSection.explore", "Explore Venture")}
            readAboutText={t("home.venturesSection.readAbout", "Read about")}
            allVenturesText={t("home.venturesSection.viewAll", "View All 13 Ventures & Directory")}
          />

          {/* UPCOMING VENTURES SHOWCASE */}
          {upcoming.length > 0 && (
            <Reveal className="mt-10 sm:mt-12">
              <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("home.venturesSection.upcomingKicker", "Incubating Ventures & Upcoming Launches")}
                  </p>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {t("home.venturesSection.upcomingBadge", "Pipeline 2026")}
                  </span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {upcoming.map((v) => {
                    const Icon = v.icon;
                    return (
                      <li key={v.slug}>
                        <Link
                          to="/ventures/$slug"
                          params={{ slug: v.slug }}
                          preload="intent"
                          aria-label={`${t("home.venturesSection.readAbout")} ${v.title}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 py-2 pl-2 pr-4 text-xs font-semibold text-foreground/85 backdrop-blur transition-all hover:border-primary/50 hover:shadow-xs"
                        >
                          <span className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${v.color} text-primary-foreground`}>
                            <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </span>
                          {v.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* =========================================================================
          VERIFIED CLIENT & PARTNER TESTIMONIALS
          ========================================================================= */}
      <section className="py-14 sm:py-16 lg:py-20 border-b border-border/50 bg-secondary/15">
        <div className="container-tight">
          <SectionHeader
            eyebrow={t("home.testimonials.eyebrow", "Customer Scoreboard")}
            title={t("home.testimonials.title", "Trusted by Market Leaders in Bangladesh")}
            lede={t("home.testimonials.lede", "Read what founders, enterprise CTOs, and operations leaders say about their engagements with YESS Bangla.")}
          />
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {((t("home.testimonials.items", { returnObjects: true }) as Testimonial[]) || []).map((tm) => (
              <StaggerItem key={tm.name}>
                <figure className="group relative flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified Partner
                      </span>
                      <Quote className="h-5 w-5 text-primary/30" />
                    </div>
                    <blockquote className="mt-5 text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                      "{tm.quote}"
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary font-display text-xs font-bold text-primary-foreground shadow-glow">
                      {tm.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{tm.name}</div>
                      <div className="text-[11px] text-muted-foreground">{tm.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* =========================================================================
          FINAL HIGH-CONVERTING CORPORATE CTA
          ========================================================================= */}
      <section className="py-16 sm:py-20">
        <div className="container-tight">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 sm:p-12 md:p-16 text-background shadow-2xl">
              {/* Subtle background glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
              />

              <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-semibold text-background">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    {isBn ? "নতুন উদ্যোগ ও রূপান্তর" : "Transform Your Enterprise"}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-background sm:text-3xl lg:text-4xl">
                    {t("home.finalCta.title", "Ready to Build Something Significant Together?")}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-background/80 leading-relaxed max-w-xl">
                    {t("home.finalCta.lede", "Reach out to our engineering and consulting team in Mirpur, Dhaka. We will review your requirements and provide an actionable architecture plan within 48 hours.")}
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                  <a
                    href={phoneHref}
                    aria-label={t("home.finalCta.callAria", { phone: COMPANY_CONTACT.phone.display })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-background/40 bg-background/10 px-6 py-3.5 text-sm font-semibold text-background backdrop-blur transition-all hover:bg-background/20 hover:scale-[1.02]"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-mono">{COMPANY_CONTACT.phone.display}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02]"
                  >
                    <span>{t("home.finalCta.sendMessage", "Start Discovery Call")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
