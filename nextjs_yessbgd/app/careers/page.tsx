import type { Metadata } from "next";
import Link from "next/link";
import { CareersDirectory } from "@/components/CareersDirectory";
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
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-background border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0d6e6e] font-bold">Careers Hub</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4a359]" />
              <span className="text-xs tracking-wider uppercase font-bold text-secondary">
                Talent & Sovereign Capabilities
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white leading-tight tracking-tight mb-6">
              Build{" "}
              <span className="bg-gradient-to-r from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] bg-clip-text text-transparent">
                Sovereign Technologies
              </span>{" "}
              & Shape Bangladesh&apos;s{" "}
              <span className="text-[#d4a359] underline decoration-[#d4a359]/40 decoration-2 underline-offset-8">
                Industrial Future
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mb-10">
              Join an institutional ecosystem of 500+ engineers, product architects, and operations leaders
              building the next generation of regional champions across enterprise cloud, agritech,
              streaming, and sovereign finance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Explore 12 Open Roles</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/application-status"
                className="inline-flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-sm px-6 py-3.5 rounded-xl transition-all border border-outline-variant/40"
              >
                <ClipboardCheck className="w-4 h-4 text-[#0d6e6e]" />
                <span>Fast-Track Application Status</span>
              </Link>
            </div>
          </div>

          {/* Talent Telemetry Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#061a1b] text-white p-6 rounded-2xl border border-surface-container-high/15 relative overflow-hidden group shadow-sm">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#35b0aa] block mb-2">500+</span>
              <h3 className="font-bold text-sm text-surface-bright mb-1">Ecosystem Builders</h3>
              <p className="text-outline-variant text-xs">Engineers, Agronomists & Venture Architects</p>
            </div>

            <div className="bg-[#061a1b] text-white p-6 rounded-2xl border border-surface-container-high/15 relative overflow-hidden group shadow-sm">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#f6c87a] block mb-2">94%</span>
              <h3 className="font-bold text-sm text-surface-bright mb-1">Retention Rate</h3>
              <p className="text-outline-variant text-xs">Long-term institutional loyalty & career growth</p>
            </div>

            <div className="bg-[#061a1b] text-white p-6 rounded-2xl border border-surface-container-high/15 relative overflow-hidden group shadow-sm">
              <span className="text-2xl lg:text-3xl font-extrabold text-[#a0f0f0] block mb-2">Dual Hub</span>
              <h3 className="font-bold text-sm text-surface-bright mb-1">Gulshan-2 & Motijheel</h3>
              <p className="text-outline-variant text-xs">Dhaka Dual-Campus Innovation Labs & Dev Ops</p>
            </div>

            <div className="bg-[#061a1b] text-white p-6 rounded-2xl border border-surface-container-high/15 relative overflow-hidden group shadow-sm">
              <span className="text-3xl lg:text-4xl font-extrabold text-[#f2be71] block mb-2">৳250k+</span>
              <h3 className="font-bold text-sm text-surface-bright mb-1">Annual Learning Grants</h3>
              <p className="text-outline-variant text-xs">Sponsoring certifications & advanced research</p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Values & Culture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs text-[#d4a359] font-bold uppercase tracking-wider block mb-2">
              Institutional Values & Culture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              How We Pioneer & Operate
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md mt-4 md:mt-0">
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
                className="glass-card rounded-2xl p-7 hover:border-[#0d6e6e] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0d6e6e]/10 text-[#0d6e6e] flex items-center justify-center mb-6 group-hover:bg-[#0d6e6e] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-brand-navy dark:text-white mb-2">{p.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Total Rewards Framework */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs text-[#0d6e6e] font-bold uppercase tracking-wider block mb-2">
              Total Rewards Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight mb-3">
              World-Class Care for High Performers
            </h2>
            <p className="text-sm text-on-surface-variant">
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
                  className="bg-white dark:bg-[#061a1b] rounded-2xl p-7 border border-outline-variant/30 hover:border-[#0d6e6e] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#0d6e6e]/10 text-[#0d6e6e] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-brand-navy dark:text-white">{perk.title}</h3>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Open Roles Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-6 border-b border-outline-variant/30">
          <div>
            <div className="inline-flex items-center gap-2 text-[#0d6e6e] text-xs uppercase tracking-wider font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Active Requisitions (Q1/Q2 2026)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
              Institutional Career Opportunities
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant max-w-md mt-2 lg:mt-0">
            Showing all verified positions across 5 venture subsidiaries. Direct applications receive initial
            technical assessment within 48 business hours.
          </p>
        </div>

        <CareersDirectory />
      </section>

      {/* 4-Step Selection Pipeline & Status Tracker Callout */}
      <section className="bg-surface-container-low py-16 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs text-[#d4a359] font-bold uppercase tracking-wider block">
                Institutional Selection Pipeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white leading-tight">
                Transparent, Rigorous & Rapid Selection
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We value your time. Our hiring system uses automated semantic credential parsing paired with
                direct peer architect interviews. Zero recruiter roadblocks.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0d6e6e]/10 text-[#0d6e6e] flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-navy dark:text-white">
                      Portfolio & Architecture Submission
                    </h4>
                    <p className="text-outline text-xs mt-0.5">
                      Submit code repositories, system diagrams, or portfolio links in under 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0d6e6e]/10 text-[#0d6e6e] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-navy dark:text-white">
                      Peer Technical Assessment (Live Deep Dive)
                    </h4>
                    <p className="text-outline text-xs mt-0.5">
                      60-minute collaborative session with Lead Systems Architect on real-world architecture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0d6e6e]/10 text-[#0d6e6e] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-navy dark:text-white">
                      Venture MD Dialogue & Executive Offer
                    </h4>
                    <p className="text-outline text-xs mt-0.5">
                      Direct compensation, profit-sharing, and equity onboarding with venture leadership.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-card-dark text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#35b0aa]">
                    Live Candidate Telemetry
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Tracker Active
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold">Already applied for a role?</h3>
                  <p className="text-xs text-outline-variant leading-relaxed">
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] text-white font-semibold text-xs py-3.5 rounded-xl shadow-md transition-all"
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
          <span className="text-xs text-[#d4a359] font-bold uppercase tracking-wider block mb-2">
            Voices from the Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy dark:text-white tracking-tight">
            Hear from Our Architects & Leads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-7 flex flex-col justify-between">
              <p className="text-xs text-on-surface-variant italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <h4 className="font-bold text-xs text-brand-navy dark:text-white">{t.name}</h4>
                <p className="text-[11px] text-[#0d6e6e] font-medium mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs text-[#0d6e6e] font-bold uppercase tracking-wider block mb-2">
            Clear Answers
          </span>
          <h2 className="text-2xl font-bold text-brand-navy dark:text-white">Frequently Asked Hiring Questions</h2>
        </div>

        <div className="space-y-3">
          {hiringFaqs.map((faq) => (
            <details
              key={faq.q}
              className="glass-card rounded-xl p-5 group open:border-[#0d6e6e]/50 cursor-pointer"
            >
              <summary className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-[#0d6e6e] text-lg font-mono group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-3 pt-3 border-t border-outline-variant/20">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
