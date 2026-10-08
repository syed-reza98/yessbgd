import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { insights, getInsight } from "@/data/insights";
import { getInsights, getInsightBySlug } from "@/lib/cms";
import { ShareArticleButton } from "./ShareArticleButton";
import { CitationBox } from "@/components/CitationBox";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  Bookmark,
  Shield,
  ArrowRight,
  BookOpen,
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const all = await getInsights();
  return all.map((i) => ({
    slug: i.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) return { title: "Insight Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, allInsights] = await Promise.all([
    getInsightBySlug(slug),
    getInsights(),
  ]);

  if (!article) {
    notFound();
  }

  const related = allInsights.filter((i) => i.slug !== article.slug).slice(0, 3);


  return (
    <div className="space-y-12 pb-24">
      {/* Top Banner & Article Header (Signature Light Corporate Hero) */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-14 sm:pt-10 lg:pt-14">
        {/* Backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/heroes/global-network-bg.webp"
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

        <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10">
          <Link
            href="/insights"
            prefetch={false}
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Insights &amp; Intelligence</span>
          </Link>

          {/* Metadata Pills Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-teal-50 text-teal-800 border border-teal-200/80 shadow-2xs">
              {article.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Peer-Reviewed &amp; Certified</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-slate-500 bg-white border border-slate-200 shadow-2xs">
              <code>WP-BD-2026-ARCH</code>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[30px] sm:text-[38px] lg:text-[44px] font-black text-[#030D18] tracking-tight leading-[1.15] mb-6 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
            {article.title}
          </h1>

          {/* Editorial Excerpt */}
          <p className="text-[14.5px] sm:text-[16px] text-[#051321] font-bold leading-[1.7] border-l-3 border-[#0E8A44] pl-4 py-1 mb-8 [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_1px_2px_#ffffff]">
            {article.excerpt}
          </p>

          {/* Author Byline Card */}
          <div className="p-5 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white font-bold text-sm tracking-wider border-2 border-amber-400/50 shadow-sm">
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"
                  title="Verified Author"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm sm:text-base text-slate-900">
                    {article.author.name}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
                <p className="text-xs text-amber-700 font-medium mt-0.5">{article.author.role}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Published by YESS Institutional Research &amp; Strategy Council
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <ShareArticleButton title={article.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Article Longform Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-6 text-sm sm:text-base text-foreground/80 leading-relaxed">
          {article.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground pt-4 pb-1 border-b border-border">
                  {sec.heading}
                </h2>
              )}
              <p className="whitespace-pre-line">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Citation Box Component */}
        <CitationBox
          title={article.title}
          author={article.author.name}
          year="2025"
          slug={article.slug}
        />

        {/* Institutional Statutory Seal Footer in Article */}
        <div className="mt-8 pt-8 border-t border-border p-6 rounded-2xl bg-muted/30 border border-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Institutional Research Integrity</span>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            All whitepapers and architectural blueprints published by YESS Bangladesh undergo peer review
            by our Executive Architecture Board. For licensing, reprinting, or strategic advisory, contact{" "}
            <a href="mailto:info@yessbd.com" className="text-primary underline">
              info@yessbd.com
            </a>
            .
          </p>
        </div>
      </article>

      {/* Related Insights Grid */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 border-t border-border">
          <div className="mb-8">
            <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-1">
              Further Intelligence
            </span>
            <h3 className="text-xl font-display font-bold text-foreground">Related Insights &amp; Papers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                prefetch={false}
                className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-primary">{item.tag}</span>
                  <h4 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-foreground/70 line-clamp-2">{item.excerpt}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs text-foreground/60">
                  <span>{item.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
