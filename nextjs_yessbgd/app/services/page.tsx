import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Server,
  Code2,
  PlayCircle,
  Leaf,
  Plane,
  Scale,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/services";

export const metadata = {
  title: "Services & Solutions | YESS Bangladesh",
  description:
    "Enterprise cloud engineering, OTT media platforms, bespoke software, and agritech systems with transparent pricing and SLA guarantees.",
};

const engagementModels = [
  {
    name: "Strategic Advisory",
    price: "Fixed-Fee Diagnostic",
    cadence: "1–2 Week Discovery",
    desc: "Rapid architecture audit, technical feasibility assessment, and cloud migration roadmaps.",
    features: [
      "Principal architect code review",
      "Vulnerability & security posture audit",
      "Executive blueprint & cloud cost optimization",
      "Bilateral NDA & IP covenant",
    ],
    highlight: false,
  },
  {
    name: "Dedicated Engineering Pod",
    price: "Monthly Retainer",
    cadence: "Bi-Weekly Agile Sprints",
    desc: "Full-stack squad (Lead Architect, 3 Senior Devs, QA Engineer) dedicated exclusively to your platform.",
    features: [
      "100% code ownership & Git handover",
      "Weekly staging demos every Friday",
      "Integrated CI/CD & automated test coverage",
      "Direct Slack/Teams technical channel",
    ],
    highlight: true,
  },
  {
    name: "Turnkey EPC Platform",
    price: "Milestone-Based",
    cadence: "6–16 Weeks Delivery",
    desc: "End-to-end design, build, and deployment of complex digital infrastructure under contract SLAs.",
    features: [
      "Guaranteed delivery milestone contract",
      "90-day post-launch comprehensive warranty",
      "Tier-3 domestic data center deployment",
      "Executive handover training & runbooks",
    ],
    highlight: false,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="ENTERPRISE PRACTICES & DELIVERY"
        title="Services & Enterprise Solutions"
        subtitle="Sovereign cloud architectures, OTT media platforms, and custom ERP systems engineered for high concurrency."
      />

      {/* 1. Practice Areas Grid */}
      <section className="py-20 bg-background">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              CAPABILITIES DIRECTORY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Our Practice Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="glass-card rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-[#d4a359] px-3 py-1 rounded-full bg-[#d4a359]/10">
                        {item.pricing.timeline}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-border pt-4">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                    <span>Pricing from {item.pricing.from}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Engagement Models Matrix */}
      <section className="py-20 bg-[#f4f8f8] border-y border-[#eaf2f2]">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              COMMERCIAL STRUCTURES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mt-2">
              Flexible Engagement Models
            </h2>
            <p className="text-sm text-foreground/70 mt-2">
              Select the operational engagement model best aligned with your development stage and governance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model) => (
              <div
                key={model.name}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  model.highlight
                    ? "glass-card-strong border-2 border-primary shadow-xl bg-white"
                    : "glass-card border border-border"
                }`}
              >
                {model.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                    MOST SELECTED BY ENTERPRISES
                  </span>
                )}
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground">
                    {model.name}
                  </h3>
                  <div className="mt-3">
                    <span className="font-display font-extrabold text-2xl text-foreground">
                      {model.price}
                    </span>
                    <span className="text-xs text-muted-foreground block font-medium mt-0.5">
                      {model.cadence}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 mt-3 leading-relaxed">
                    {model.desc}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {model.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-foreground/80 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href="/contact"
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold block transition-all shadow-sm ${
                      model.highlight
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    Select Model
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
