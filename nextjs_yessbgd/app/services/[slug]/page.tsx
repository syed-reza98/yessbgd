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
} from "lucide-react";
import { services } from "@/data/services";
import { PageHero } from "@/components/PageHero";

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | YESS Bangladesh`,
    description: service.desc,
  };
}

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="flex flex-col w-full">
      <PageHero
        eyebrow="ENTERPRISE DISCIPLINE"
        title={service.title}
        subtitle={service.intro}
      />

      <section className="py-16 bg-background">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Capabilities, Deliverables, Process */}
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
                      className="glass-card rounded-2xl p-6 border border-border"
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

              {/* Deliverables List */}
              <div className="glass-card rounded-2xl p-8 border border-border">
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  Turnkey Deliverables & Output
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

              {/* Technology Stack */}
              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-4">
                  Target Architecture & Stack
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

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {service.faqs.map((f, i) => (
                      <div
                        key={i}
                        className="glass-card rounded-2xl p-6 border border-border"
                      >
                        <h4 className="font-display font-bold text-sm text-foreground">
                          {f.q}
                        </h4>
                        <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                          {f.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
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

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold text-xs block shadow-sm hover:bg-primary/90 transition-all"
                  >
                    Request Technical Proposal
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
