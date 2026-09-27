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
    title: `${service.title} | YESS Bangladesh`,
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

  const Icon = service.icon;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Service Hero with Live Edge Node Telemetry Card */}
      <section className="relative pt-28 pb-16 sm:pt-32 lg:pt-36 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 border-b border-slate-200/80">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/general/centricity.png')` }}
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container-tight relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <li><Link href="/" className="hover:text-teal-700 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/services" className="hover:text-teal-700 transition-colors">Services</Link></li>
              <li>/</li>
              <li className="text-teal-700 font-bold">{service.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold tracking-widest uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                <span>ENTERPRISE PRACTICE</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
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
                    className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold text-xs block shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Request Technical Proposal
                  </Link>
                  <Link
                    href="/about/methodology"
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
