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
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-14 sm:pt-32 sm:pb-18 lg:pt-36 overflow-hidden border-b border-slate-200/80">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/heroes/global-network-bg.jpg')` }}
        />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/insights"
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
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Editorial Excerpt */}
          <p className="text-sm sm:text-lg text-slate-700 font-normal leading-relaxed border-l-4 border-teal-600 pl-5 italic mb-8 bg-teal-50/50 py-3 rounded-r-xl">
            {article.excerpt}
          </p>

          {/* Author Byline Card */}
          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
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
            <a href="mailto:yessbangla.bd@gmail.com" className="text-primary underline">
              yessbangla.bd@gmail.com
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
