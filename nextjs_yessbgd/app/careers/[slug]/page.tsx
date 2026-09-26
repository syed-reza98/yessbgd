import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { openings, getOpening } from "@/data/openings";
import { JobApplicationForm } from "./JobApplicationForm";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowLeft,
  Shield,
  Layers,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return openings.map((o) => ({
    slug: o.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getOpening(slug);
  if (!job) return { title: "Position Not Found | YESS Bangladesh" };

  return {
    title: `Apply: ${job.title} | YESS Bangladesh`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getOpening(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Top Banner */}
      <section className="pt-10 pb-8 bg-gradient-to-b from-muted/30 via-background to-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all open positions</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {job.dept}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground/80 border border-border/50">
              {job.level} Level
            </span>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              48h Application Review SLA
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            {job.title}
          </h1>

          <p className="text-sm sm:text-base text-foreground/75 max-w-3xl leading-relaxed mb-6">
            {job.summary}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-foreground/60 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {job.type}
            </span>
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4" /> Dhaka Dual-Hub / Hybrid Available
            </span>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Job Description & Requirements (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card rounded-2xl p-7 border border-border space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground pb-3 border-b border-border flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Key Responsibilities
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-7 border border-border space-y-6">
              <h2 className="font-display text-lg font-bold text-foreground pb-3 border-b border-border flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-500" />
                Role Requirements &amp; Background
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6 border border-border space-y-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-primary">
                Direct Architect Evaluation
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                All applications are assessed directly by senior engineers and venture leads. We evaluate
                systems thinking, real code samples, and problem-solving over cosmetic pedigree.
              </p>
            </div>
          </div>

          {/* Right Column: Application Wizard Form (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <JobApplicationForm job={job} />
          </div>
        </div>
      </div>
    </div>
  );
}
