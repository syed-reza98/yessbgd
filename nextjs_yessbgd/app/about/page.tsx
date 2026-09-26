import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Globe2,
  Zap,
  ArrowRight,
  CheckCircle2,
  Binary,
  Flame,
  Cpu,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "About the Group | YESS Bangladesh",
  description:
    "Learn about YESS Bangladesh — our corporate mission, executive leadership, institutional methodology, and national impact across 64 districts.",
};

export default function AboutPage() {
  const pillars = [
    {
      href: "/about/mission",
      icon: Target,
      title: "Strategic Mission & Purpose",
      desc: "Empowering organizations across Bangladesh with sovereign technology, venture acceleration, and high-impact digital infrastructure.",
      tag: "Core Mandate",
    },
    {
      href: "/about/leadership",
      icon: Users,
      title: "Executive Leadership & Board",
      desc: "Meet our board members, principal architects, and senior practice partners steering national conglomerate ventures.",
      tag: "Governance",
    },
    {
      href: "/about/awards",
      icon: Award,
      title: "Awards & Accreditations",
      desc: "Recognized nationally by BASIS, the ICT Division, and accredited under ISO 9001:2015 and ISO/IEC 27001 standards.",
      tag: "Recognition",
    },
    {
      href: "/about/methodology",
      icon: Cpu,
      title: "Engineering Methodology",
      desc: "Our sovereign SDLC lifecycle: bi-weekly agile sprints, zero-trust cloud hardening, automated CI/CD, and Tier-3 SRE operations.",
      tag: "Sovereign SDLC",
    },
    {
      href: "/about/standards",
      icon: ShieldCheck,
      title: "Quality Standards & QA",
      desc: "IEEE 829 test automation pyramids, ISO/IEC 27001 security enclaves, and 99.9% uptime SLA service guarantees.",
      tag: "Institutional QA",
    },
  ];

  const milestones = [
    {
      year: "2014",
      title: "YESS Bangla Founded",
      desc: "Established as a boutique management and technology advisory in Dhaka focusing on SME modernization.",
    },
    {
      year: "2018",
      title: "IT Services Division & Enterprise Cloud",
      desc: "Launched Yess Soft, expanding into web, mobile, distributed microservices, and ERP systems.",
    },
    {
      year: "2021",
      title: "Media Operations & Akash TV",
      desc: "Formed strategic media operations powering low-latency live news and digital broadcasting.",
    },
    {
      year: "2024",
      title: "Akash OTT Live Streaming Infrastructure",
      desc: "Rolled out proprietary national OTT streaming architecture serving over 4.8 million concurrent digital viewers.",
    },
    {
      year: "2026",
      title: "Nationwide Footprint & 13 Conglomerate Subsidiaries",
      desc: "Active deployments across all 64 districts in Bangladesh with $50M+ cumulative portfolio valuation.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="ABOUT YESS BANGLADESH"
        title="Pioneering Sovereign Enterprise & Venture Building"
        subtitle="A decade of engineering, consulting, and building resilient digital platforms across Bangladesh and global trade corridors."
      />

      {/* 1. 5 Pillars Exploration Grid */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              INSTITUTIONAL FOUNDATION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Explore Our Strategic Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.href}
                  href={pillar.href}
                  className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-secondary text-foreground border border-border">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-2.5 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>Read Deep Dive</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Managing Director Keynote Card */}
      <section className="py-16 bg-[#f4f8f8] border-y border-[#eaf2f2]">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                WHY CONGLOMERATES PARTNER WITH US
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground">
                Customer-Centric. Tech-Driven. Results-Focused.
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                When you engage with YESS Bangladesh, you partner with dedicated principal engineers and advisors who adapt to your governance requirements. We prioritize absolute code ownership, robust data sovereignty, and uncompromised uptime.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "100% Foreground IP & repository handover",
                  "Nationwide presence across all 64 districts",
                  "Tier-3 & Tier-4 domestic data center residency",
                  "24/7 contracted SRE with sub-15 min SLA",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs font-semibold text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl border border-white/60">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#061a1b] text-accent font-display font-extrabold text-xl flex items-center justify-center shadow-md">
                    EH
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Md Enamul Hayder
                    </h3>
                    <p className="text-xs text-foreground/60 font-semibold">
                      Managing Director, YESS Bangla Group
                    </p>
                  </div>
                </div>
                <blockquote className="mt-5 text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary pl-4">
                  "Our promise is simple: we treat every client's mission-critical operations as if they were our own. That is how we have earned trust across Bangladesh for over a decade."
                </blockquote>

                {/* Circular Corporate Seal Stamp matching Stitch Section 3 */}
                <div className="mt-5 p-3 rounded-2xl bg-white/5 border border-dashed border-[#d4a359]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#d4a359] flex items-center justify-center text-[#d4a359] font-bold text-xs">
                      RJSC
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#d4a359] block uppercase tracking-wider">
                        STATUTORY SEAL • GOVBD
                      </span>
                      <span className="text-[10px] text-foreground/70">
                        Reg: C-184920/2022 • Founded in Dhaka
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-foreground/60 font-medium">
                    Dhaka HQ Executive Office
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Connect directly</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Milestone Timeline (2014–2026) */}
      <section className="py-20 bg-background">
        <div className="container-tight max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              HISTORICAL TRAJECTORY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Milestones Along Our Journey
            </h2>
          </div>

          <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-8 pl-8 sm:pl-10 space-y-10">
            {milestones.map((m) => (
              <div key={m.year} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-md group-hover:scale-125 transition-transform">
                  ●
                </div>
                <div className="inline-block px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1">
                  {m.year}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {m.title}
                </h3>
                <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Explore YESS Bangladesh Further (Stitch Section 4 exact match) */}
      <section className="py-20 bg-[#f4f8f8] border-t border-[#eaf2f2]">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-primary font-bold uppercase tracking-wider">
                INSTITUTIONAL EXPLORATION
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-1">
                Explore YESS Bangladesh Further
              </h2>
            </div>
            <p className="text-sm text-foreground/70 max-w-md mt-2 md:mt-0 leading-relaxed">
              Access deep-dive disclosures, engineering roadmaps, and statutory board reports across our corporate structure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Executive Board */}
            <Link
              href="/about/leadership"
              className="glass-card rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Executive Board
                </h3>
                <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                  Governed by high-integrity operators, technologists, and public policy pioneers steering 13 sovereign subsidiaries.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Leadership</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Accreditations */}
            <Link
              href="/about/awards"
              className="glass-card rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Accreditations
                </h3>
                <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                  ISO-aligned quality management, BASIS member certification, and national technology achievement awards.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Citations</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Engineering SDLC */}
            <Link
              href="/about/methodology"
              className="glass-card rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  Engineering SDLC
                </h3>
                <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                  Our proven 4-step delivery lifecycle: Discover, Design, Deliver, and Operate with automated GitOps pipelines.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Methodology</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 4: QA Framework */}
            <Link
              href="/about/standards"
              className="glass-card rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-12 w-12 rounded-xl bg-[#d4a359]/15 text-[#7e5713] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  QA Framework
                </h3>
                <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                  Zero-trust security enclaves, IEEE 829 test automation pyramids, and contracted 99.9% uptime SLA commitments.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>View Standards</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
