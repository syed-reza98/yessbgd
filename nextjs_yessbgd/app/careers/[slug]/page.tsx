import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { openings, getOpening } from "@/data/openings";
import { getOpenings, getOpeningBySlug } from "@/lib/cms";
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
  const all = await getOpenings();
  return all.map((o) => ({
    slug: o.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getOpeningBySlug(slug);
  if (!job) return { title: "Position Not Found" };

  return {
    title: `Apply: ${job.title}`,
    description: job.summary,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getOpeningBySlug(slug);

  if (!job) {
    notFound();
  }


  return (
    <div className="space-y-12 pb-20">
      {/* Top Banner (Signature Light Corporate Hero) */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-14 sm:pt-10 lg:pt-14">
        {/* Backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/about-team-bd.jpg"
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

        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all open positions</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs">
              {job.dept}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-700 border border-slate-200 shadow-2xs">
              {job.level} Level
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full shadow-2xs">
              48h Application Review SLA
            </span>
          </div>

          <h1 className="font-black text-[30px] sm:text-[38px] lg:text-[44px] text-[#030D18] tracking-tight leading-[1.15] mb-4 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
            {job.title}
          </h1>

          <p className="text-[14.5px] sm:text-[15.5px] text-[#051321] font-bold max-w-3xl leading-[1.7] mb-6 [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_1px_2px_#ffffff]">
            {job.summary}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> {job.type}
            </span>
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-teal-600" /> Dhaka Dual-Hub / Hybrid Available
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
