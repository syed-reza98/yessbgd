import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { insights, getInsight } from "@/data/insights";
import { ShareArticleButton } from "./ShareArticleButton";
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
  return insights.map((i) => ({
    slug: i.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return { title: "Insight Not Found | YESS Bangladesh" };

  return {
    title: `${article.title} | YESS Bangladesh`,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);

  if (!article) {
    notFound();
  }

  const related = insights.filter((i) => i.slug !== article.slug).slice(0, 3);

  return (
    <div className="space-y-12 pb-24">
      {/* Top Banner & Article Header */}
      <section className="pt-10 pb-12 bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0d6e6e] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Insights & Intelligence</span>
          </Link>

          {/* Metadata Pills Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white">
              {article.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
              <Calendar className="w-3.5 h-3.5 text-outline" />
              <span>{article.date}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
              <Clock className="w-3.5 h-3.5 text-outline" />
              <span>{article.readTime}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Peer-Reviewed & Certified</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-outline bg-surface-container-low border border-outline-variant/40">
              <code>WP-BD-2026-ARCH</code>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Editorial Excerpt */}
          <p className="text-sm sm:text-lg text-on-surface-variant font-normal leading-relaxed border-l-3 border-[#0d6e6e] pl-5 italic mb-8">
            {article.excerpt}
          </p>

          {/* Author Byline Card */}
          <div className="glass-card rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0d6e6e] to-[#061a1b] flex items-center justify-center text-white font-bold text-sm tracking-wider border-2 border-[#d4a359] shadow-sm">
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
                  <h3 className="font-bold text-sm sm:text-base text-brand-navy dark:text-white">
                    {article.author.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#0d6e6e]" />
                </div>
                <p className="text-xs text-[#0d6e6e] font-medium mt-0.5">{article.author.role}</p>
                <p className="text-[10px] text-outline mt-0.5">
                  Published by YESS Institutional Research & Strategy Council
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
        <div className="space-y-6 text-sm sm:text-base text-on-surface-variant leading-relaxed">
          {article.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-brand-navy dark:text-white pt-4 pb-1 border-b border-outline-variant/30">
                  {sec.heading}
                </h2>
              )}
              <p className="whitespace-pre-line">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Institutional Statutory Seal Footer in Article */}
        <div className="mt-12 pt-8 border-t border-outline-variant/30 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0d6e6e] uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Institutional Research Integrity</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            All whitepapers and architectural blueprints published by YESS Bangladesh undergo peer review
            by our Executive Architecture Board. For licensing, reprinting, or strategic advisory, contact{" "}
            <a href="mailto:insights@yessbgd.com" className="text-[#0d6e6e] underline">
              insights@yessbgd.com
            </a>
            .
          </p>
        </div>
      </article>

      {/* Related Insights Grid */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 border-t border-outline-variant/30">
          <div className="mb-8">
            <span className="text-xs text-[#0d6e6e] font-bold uppercase tracking-wider block mb-1">
              Further Intelligence
            </span>
            <h3 className="text-xl font-bold text-brand-navy dark:text-white">Related Insights & Papers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="glass-card rounded-2xl p-6 hover:border-[#0d6e6e] transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#0d6e6e]">{item.tag}</span>
                  <h4 className="font-bold text-sm text-brand-navy dark:text-white group-hover:text-[#0d6e6e] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{item.excerpt}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-outline">
                  <span>{item.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0d6e6e] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
