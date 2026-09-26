import type { Metadata } from "next";
import Link from "next/link";
import { CareersDirectory } from "@/components/CareersDirectory";
import { ServiceFaqDrawer } from "@/components/ServiceFaqDrawer";
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

export const metadata: Metadata = {
  title: "Careers Hub & Talent Portal | YESS Bangladesh",
  description:
    "Join an institutional ecosystem of 500+ engineers, product architects, and operations leaders building sovereign technologies and market champions across Bangladesh.",
};

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

export default function CareersPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">Careers Hub</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Talent &amp; Sovereign Capabilities</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight tracking-tight mb-6">
              Build{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-[#d4a359] bg-clip-text text-transparent">
                Sovereign Technologies
              </span>{" "}
              &amp; Shape Bangladesh&apos;s{" "}
              <span className="text-[#d4a359] underline decoration-[#d4a359]/40 decoration-2 underline-offset-8">
                Industrial Future
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-foreground/75 max-w-3xl leading-relaxed mb-10">
              Join an institutional ecosystem of 500+ engineers, product architects, and operations leaders
              building the next generation of regional champions across enterprise cloud, agritech,
              streaming, and sovereign finance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore 12 Open Roles</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/application-status"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm px-6 py-3.5 rounded-xl transition-all border border-border"
              >
                <ClipboardCheck className="w-4 h-4 text-primary" />
                <span>Fast-Track Application Status</span>
              </Link>
            </div>
          </div>

          {/* Talent Telemetry Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm group">
              <span className="font-display text-3xl lg:text-4xl font-extrabold text-primary block mb-2">500+</span>
              <h2 className="font-display font-bold text-sm text-foreground mb-1">Ecosystem Builders</h2>
              <p className="text-foreground/70 text-xs">Engineers, Agronomists &amp; Venture Architects</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm group">
              <span className="font-display text-3xl lg:text-4xl font-extrabold text-amber-500 block mb-2">94%</span>
              <h2 className="font-display font-bold text-sm text-foreground mb-1">Retention Rate</h2>
              <p className="text-foreground/70 text-xs">Long-term institutional loyalty &amp; career growth</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm group">
              <span className="font-display text-2xl lg:text-3xl font-extrabold text-primary block mb-2">Dual Hub</span>
              <h2 className="font-display font-bold text-sm text-foreground mb-1">Gulshan-2 &amp; Motijheel</h2>
              <p className="text-foreground/70 text-xs">Dhaka Dual-Campus Innovation Labs &amp; Dev Ops</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm group">
              <span className="font-display text-3xl lg:text-4xl font-extrabold text-amber-500 block mb-2">৳250k+</span>
              <h2 className="font-display font-bold text-sm text-foreground mb-1">Annual Learning Grants</h2>
              <p className="text-foreground/70 text-xs">Sponsoring certifications &amp; advanced research</p>
            </div>
          </div>
        </div>
      </section>

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
          {culturePillars.map((p) => {
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
            {perks.map((perk) => {
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

        <CareersDirectory />
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
              <div className="rounded-3xl p-8 text-white border border-emerald-500/25 bg-gradient-to-br from-[#061a1b] via-[#092224] to-[#061a1b] shadow-2xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                    Live Candidate Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Tracker Active
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white">Already applied for a role?</h3>
                  <p className="text-xs text-white/75 leading-relaxed">
                    Check your application status anytime using your reference ID and email. View current
                    stage, interview feedback, and panel directives in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-white/60">Demo Reference:</span>
                  <span className="font-bold text-[#f6c87a]">YESS-ENG-2026-89412</span>
                </div>

                <Link
                  href="/application-status?ref=YESS-ENG-2026-89412&email=syed.candidate@example.com"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#061a1b] font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-95"
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
          {testimonials.map((t) => (
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
          faqs={hiringFaqs}
          title="Frequently Asked Hiring Questions"
          subtitle="Answers to common candidate queries regarding visas, probationary timelines, equity vesting, and technology stack standards."
        />
      </section>
    </div>
  );
}
