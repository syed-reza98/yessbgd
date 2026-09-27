import type { Metadata } from "next";
import Link from "next/link";
import { CareersDirectory } from "@/components/CareersDirectory";
import { ServiceFaqDrawer } from "@/components/ServiceFaqDrawer";
import { getOpenings, getSitePage } from "@/lib/cms";
import {
  Users,
  Award,
  Building2,
  GraduationCap,
  Terminal,
  TrendingUp,
  Coins,
  Shield,
  CreditCard,
  HeartPulse,
  Bus,
  Laptop,
  Utensils,
  BookOpen,
  ArrowRight,
  Send,
  ClipboardCheck,
  MessageSquare,
  Handshake,
  CheckCircle2,
  Sparkles,
  Search,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("careers");
  return {
    title: page?.seo_title || "Careers Hub & Talent Portal | YESS Bangladesh",
    description:
      page?.seo_description ||
      "Join an institutional ecosystem of 500+ engineers, product architects, and operations leaders building sovereign technologies and market champions across Bangladesh.",
  };
}

const culturePillars = [
  {
    icon: Terminal,
    title: "Sovereign Engineering Autonomy",
    desc: "Build mission-critical systems and zero-trust cloud microservices impacting millions of domestic and regional citizens daily.",
  },
  {
    icon: TrendingUp,
    title: "Meritocratic Growth",
    desc: "Transparent career progression directly from Engineer to Principal Architect and Venture Managing Director.",
  },
  {
    icon: Coins,
    title: "True Venture Ownership",
    desc: "Direct equity sharing pools, milestone performance bonuses, and patent co-authorship across venture spinoffs.",
  },
  {
    icon: Shield,
    title: "Institutional Resilience",
    desc: "World-class research lab facilities, Tier-3 dev clusters, executive mentorship, and unconditional psychological safety.",
  },
];

const perks = [
  {
    icon: CreditCard,
    title: "Executive Compensation & Profit-Sharing",
    desc: "Top-decile Dhaka remuneration tied to venture portfolio value expansion, biannual performance appraisals, and quarterly distributions.",
  },
  {
    icon: HeartPulse,
    title: "Comprehensive Health Coverage",
    desc: "100% cashless medical and life insurance for employee, spouse, children, and dependent parents with top hospital networks across Bangladesh and India.",
  },
  {
    icon: Bus,
    title: "Hybrid Flexibility & Central Transit",
    desc: "Flexible work autonomy paired with executive air-conditioned shuttle routes connecting Gulshan-2, Banani, Mohakhali, and Dhanmondi.",
  },
  {
    icon: Laptop,
    title: "High-End Hardware & Workspace Grant",
    desc: "Latest Apple M-Series MacBook Pro or custom Linux workstation + dual 4K monitors, ergonomic Herman Miller seating, and home office setups.",
  },
  {
    icon: Utensils,
    title: "Subsidized Gourmet Catering",
    desc: "On-site artisanal dining and organic farm-to-table lunch supplied directly by our subsidiary YESS Organic Haat at the Gulshan Innovation Wing.",
  },
  {
    icon: BookOpen,
    title: "Sponsored Global Certifications & Sabbaticals",
    desc: "Fully sponsored AWS/GCP, CMMI, CFA, and PMP credentials plus paid graduate study leaves for institutional research and executive degrees.",
  },
];

const testimonials = [
  {
    quote:
      "I joined as a junior engineer and within 18 months was leading a product line. The growth here is real, not theoretical.",
    name: "Tasnim R.",
    role: "Engineering Lead, Yess Soft Ltd.",
  },
  {
    quote:
      "It's the rare workplace where designers, engineers and venture leads actually sit at the same table on day one.",
    name: "Arif H.",
    role: "Principal Product Designer, Dhaka Venture Studio",
  },
  {
    quote:
      "The clients are ambitious, the standards are high, and the team has your back. That combination is hard to find anywhere else in South Asia.",
    name: "Nabila K.",
    role: "Senior Consultant, Sovereign Advisory",
  },
];

const hiringFaqs = [
  {
    q: "Do I need to be located in Dhaka?",
    a: "Many engineering and design roles are hybrid or remote-friendly within Bangladesh. Each listing notes the specific work location and lab attendance expectation.",
  },
  {
    q: "How fast is the interview and hiring decision process?",
    a: "We maintain a strict 48-hour response SLA on direct applications. The complete process wraps within 10 to 14 business days from initial screening to written offer.",
  },
  {
    q: "Are fresh graduates eligible for software roles?",
    a: "Yes. We run dedicated paid internships and associate software roles across Yess Soft Labs. We look for shipped code, strong fundamentals, and genuine curiosity.",
  },
  {
    q: "How can I check the status of my active application?",
    a: "Use our real-time Application Status Tracker with your reference ID (e.g. YESS-ENG-2026-89412) and registered email to view the 5-stage progress pipeline live.",
  },
];

export default async function CareersPage() {
  const [allOpenings, sitePage] = await Promise.all([
    getOpenings(),
    getSitePage("careers"),
  ]);

  const openRolesCount = allOpenings && allOpenings.length > 0 ? allOpenings.length : 12;

  const activePillars = Array.isArray(sitePage?.data?.culture) && sitePage.data.culture.length > 0
    ? sitePage.data.culture.map((p: any, i: number) => ({
        icon: culturePillars[i % culturePillars.length]?.icon || Terminal,
        title: p.title || "",
        desc: p.desc || "",
      }))
    : culturePillars;

  const activePerks = Array.isArray(sitePage?.data?.perks) && sitePage.data.perks.length > 0
    ? sitePage.data.perks.map((p: any, i: number) => ({
        icon: perks[i % perks.length]?.icon || Shield,
        title: p.title || "",
        desc: p.desc || "",
      }))
    : perks;

  const activeTestimonials = Array.isArray(sitePage?.data?.testimonials) && sitePage.data.testimonials.length > 0
    ? sitePage.data.testimonials
    : testimonials;

  const activeFaqs = Array.isArray(sitePage?.data?.faqs) && sitePage.data.faqs.length > 0
    ? sitePage.data.faqs
    : hiringFaqs;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/heroes/hero_6a8951c6b7346.png')` }}
        />
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Careers Hub</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{sitePage?.hero_eyebrow || "— TALENT & SOVEREIGN CAPABILITIES —"}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight mb-6">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Build{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Sovereign Technologies
                  </span>{" "}
                  &amp; Shape Bangladesh&apos;s{" "}
                  <span className="text-amber-700 underline decoration-amber-400/40 decoration-2 underline-offset-8">
                    Industrial Future
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle || "Join an institutional ecosystem of 500+ engineers, product architects, and operations leaders building the next generation of regional champions across enterprise cloud, agritech, streaming, and sovereign finance."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore {openRolesCount} Open Roles</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <Link
                href="/application-status"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all border border-slate-200/90 shadow-2xs hover:border-teal-500/40"
              >
                <ClipboardCheck className="w-4 h-4 text-teal-600" />
                <span>Fast-Track Application Status</span>
              </Link>
            </div>
          </div>

          {/* Talent Telemetry Strip (4 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all">
                  500+
                </span>
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Ecosystem Builders</p>
              <p className="text-xs text-slate-500">Engineers, Agronomists &amp; Venture Architects</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-amber-700 group-hover:scale-105 transition-all">
                  94%
                </span>
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Retention Rate</p>
              <p className="text-xs text-slate-500">Long-term institutional loyalty &amp; career growth</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-teal-800 group-hover:scale-105 transition-all">
                  Dual Hub
                </span>
                <Building2 className="w-6 h-6 text-teal-600" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Gulshan-2 &amp; Motijheel</p>
              <p className="text-xs text-slate-500">Dhaka Dual-Campus Innovation Labs &amp; Dev Ops</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-amber-700 group-hover:scale-105 transition-all">
                  ৳250k+
                </span>
                <GraduationCap className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">Annual Learning Grants</p>
              <p className="text-xs text-slate-500">Sponsoring certifications &amp; advanced research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Careers Content */}
      <main className="py-16 sm:py-20 space-y-20 bg-background">
        {sitePage?.body && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-border">
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line">
                {sitePage.body}
              </div>
            </div>
          </section>
        )}

        {/* Institutional Values & Culture */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">
              Institutional Values &amp; Culture
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              How We Pioneer &amp; Operate
            </h2>
          </div>
          <p className="text-sm text-foreground/70 max-w-md mt-4 md:mt-0">
            Our ethos combines rigorous institutional governance with startup agility to solve Bangladesh&apos;s
            most complex infrastructural challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePillars.map((p: any) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Total Rewards Framework */}
      <section className="bg-muted/20 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">
              Total Rewards Framework
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3">
              World-Class Care for High Performers
            </h2>
            <p className="text-sm text-foreground/70">
              We provide an elite environment with compensation, health securities, and operational tools
              benchmarked against global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePerks.map((perk: any) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-foreground">{perk.title}</h3>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Open Roles Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Active Requisitions (Q1/Q2 2026)
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Institutional Career Opportunities
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-foreground/70 max-w-md mt-2 lg:mt-0">
            Showing all verified positions across 5 venture subsidiaries. Direct applications receive initial
            technical assessment within 48 business hours.
          </p>
        </div>

        <CareersDirectory initialOpenings={allOpenings} />
      </section>

      {/* 4-Step Selection Pipeline & Status Tracker Callout */}
      <section className="bg-muted/20 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs text-primary font-bold uppercase tracking-wider block">
                Institutional Selection Pipeline
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                Transparent, Rigorous &amp; Rapid Selection
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed">
                We value your time. Our hiring system uses automated semantic credential parsing paired with
                direct peer architect interviews. Zero recruiter roadblocks.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs text-foreground">
                      Portfolio &amp; Architecture Submission
                    </h3>
                    <p className="text-foreground/60 text-xs mt-0.5">
                      Submit code repositories, system diagrams, or portfolio links in under 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs text-foreground">
                      Peer Technical Assessment (Live Deep Dive)
                    </h3>
                    <p className="text-foreground/60 text-xs mt-0.5">
                      60-minute collaborative session with Lead Systems Architect on real-world architecture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xs text-foreground">
                      Venture MD Dialogue &amp; Executive Offer
                    </h3>
                    <p className="text-foreground/60 text-xs mt-0.5">
                      Direct compensation, profit-sharing, and equity onboarding with venture leadership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl p-8 text-foreground border border-slate-200/90 bg-white/95 shadow-xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold">
                    Live Candidate Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Tracker Active
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-slate-900">Already applied for a role?</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check your application status anytime using your reference ID and email. View current
                    stage, interview feedback, and panel directives in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500">Demo Reference:</span>
                  <span className="font-bold text-teal-900">YESS-ENG-2026-89412</span>
                </div>

                <Link
                  href="/application-status?ref=YESS-ENG-2026-89412&email=syed.candidate@example.com"
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Launch Application Status Tracker</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">
            Voices from the Ecosystem
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Hear from Our Architects &amp; Leads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTestimonials.map((t: any) => (
            <div key={t.name} className="glass-card rounded-2xl p-7 border border-border flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-foreground/75 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <h3 className="font-display font-bold text-xs text-foreground">{t.name}</h3>
                <p className="text-[11px] text-primary font-medium mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceFaqDrawer
          faqs={activeFaqs}
          title="Frequently Asked Hiring Questions"
          subtitle="Answers to common candidate queries regarding visas, probationary timelines, equity vesting, and technology stack standards."
        />
      </section>
    </main>
    </div>
  );
}
