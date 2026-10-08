import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Phone,
  HelpCircle,
  Activity,
  Server,
  Zap,
  RotateCw,
  Lock,
  Tv,
} from "lucide-react";
import { services } from "@/data/services";
import { getServices, getServiceBySlug } from "@/lib/cms";
import { ServiceFaqDrawer } from "@/components/ServiceFaqDrawer";

export async function generateStaticParams() {
  const all = await getServices();
  return all.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.desc,
  };
}


const deliveryPhases = [
  {
    step: "Phase 01",
    title: "Scoping & Blueprinting",
    desc: "Rigorous technical discovery, dependency mapping, threat modelling, and architecture review within 3 business days.",
    tat: "Days 1–3",
  },
  {
    step: "Phase 02",
    title: "Sprint Execution",
    desc: "Bi-weekly agile sprints with automated continuous integration, staging deployments, and weekly Friday live demos.",
    tat: "Sprint Cadence",
  },
  {
    step: "Phase 03",
    title: "Load & Security Audits",
    desc: "High-concurrency stress testing, static code analysis (SAST), penetration testing, and BDIX latency optimization.",
    tat: "Milestone Audit",
  },
  {
    step: "Phase 04",
    title: "SRE SLA Handover",
    desc: "Production cutover, automated observability dashboards, 24/5 to 24/7 SLA activation, and continuous retainers.",
    tat: "Continuous SLA",
  },
];

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = (service as any).icon || services.find((s: any) => s.slug === service.slug)?.icon || Tv;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Service Hero with Live Edge Node Telemetry Card */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-16 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24">
        {/* Backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/centricity.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
                <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                  Enterprise practice
                </span>
              </div>
              <h1 className="font-black text-[34px] sm:text-[42px] lg:text-[47px] text-[#030D18] tracking-tight leading-[1.12] [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
                {service.title}
              </h1>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#051321] font-bold max-w-2xl leading-[1.7] [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_1px_2px_#ffffff]">
                {service.intro}
              </p>

              {/* Telemetry Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200/90 text-xs text-slate-700 font-medium shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Zero-Buffer CDN</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200/90 text-xs text-slate-700 font-medium shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sovereign Encryption</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200/90 text-xs text-slate-700 font-medium shadow-2xs">
                  <RotateCw className="w-3.5 h-3.5 text-teal-700" />
                  <span>Bi-Weekly Sprints</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-slate-200/90 text-xs text-slate-700 font-medium shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bilateral NDA</span>
                </div>
              </div>
            </div>

            {/* Right Live Edge Node Telemetry Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl p-6 bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-900 tracking-wide">National Live Edge Node</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
                    Active Telemetry
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70">
                    <div className="text-[11px] text-slate-500 font-medium">Peak Load Concurrency</div>
                    <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
                      1.2M+ <span className="text-xs font-normal text-slate-500">concurrent txns</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70">
                      <div className="text-[10px] text-slate-500 font-medium">Local Edge Latency</div>
                      <div className="text-base font-bold font-display text-emerald-700 mt-0.5">&lt; 14ms BDIX</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70">
                      <div className="text-[10px] text-slate-500 font-medium">Contracted SLA</div>
                      <div className="text-base font-bold font-display text-amber-700 mt-0.5">99.98% Core</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Sovereign Cloud &amp; Dhaka BST Validated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Split */}
      <section className="py-16 bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Capabilities, Deliverables, Process, FAQs */}
            <div className="lg:col-span-8 flex flex-col space-y-12">
              {/* Technical Capabilities */}
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Core Technical Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {service.capabilities.map((cap) => (
                    <div
                      key={cap.title}
                      className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-colors"
                    >
                      <h3 className="font-display font-bold text-base text-foreground">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnkey Deliverables List */}
              <div className="glass-card rounded-2xl p-8 border border-border">
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  Turnkey Deliverables &amp; Artifacts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 text-xs font-semibold text-foreground/80"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnkey Service Delivery Framework (4 Cards) */}
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                  Turnkey Service Delivery Framework
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70 mb-6">
                  Our structured delivery lifecycle ensures transparency, risk mitigation, and verifiable progress at every step.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {deliveryPhases.map((phase) => (
                    <div
                      key={phase.step}
                      className="rounded-2xl p-5 border border-border glass-card hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {phase.step}
                        </span>
                        <span className="text-[11px] font-semibold text-foreground/50">
                          {phase.tat}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-foreground">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  Target Architecture &amp; Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-secondary border border-border text-xs font-bold text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Collapsible FAQ Accordion Drawer */}
              {service.faqs && service.faqs.length > 0 && (
                <ServiceFaqDrawer
                  faqs={service.faqs}
                  title={`${service.title} FAQs`}
                  subtitle="Detailed answers regarding architecture, SLAs, commercial frameworks, and integration pipelines."
                />
              )}
            </div>

            {/* Right 4 Cols: Pricing & Consultation Intake */}
            <div className="lg:col-span-4 flex flex-col space-y-8">
              <div className="glass-card-strong rounded-2xl p-6 border border-border shadow-md">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4a359]">
                  COMMERCIAL TERMS
                </span>
                <h4 className="font-display font-bold text-lg text-foreground mt-1 mb-4">
                  Baseline Investment
                </h4>

                <div className="space-y-4 text-sm pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">From</span>
                    <span className="font-extrabold text-xl text-primary">
                      {service.pricing.from}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Structure</span>
                    <span className="font-semibold text-foreground">
                      {service.pricing.model}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Estimated TAT</span>
                    <span className="font-semibold text-foreground">
                      {service.pricing.timeline}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold text-xs block shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Request Technical Proposal
                  </Link>
                  <Link
                    href="/about/methodology"
                    prefetch={false}
                    className="w-full text-center py-2.5 rounded-xl bg-secondary text-foreground font-semibold text-xs block border border-border hover:bg-secondary/80 transition-all"
                  >
                    Explore Delivery Methodology →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
