import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ArrowLeft, FileText, CheckCircle2, Building } from "lucide-react";
import { getPageByPathOrSlug } from "@/lib/cms";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageByPathOrSlug(slug);

  if (!page) {
    const formattedTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${formattedTitle} | YESS Bangladesh`,
      description: `Institutional page for ${formattedTitle} on the YESS Bangladesh platform.`,
    };
  }

  return {
    title: page.seo_title || `${page.name} | YESS Bangladesh`,
    description: page.seo_description || page.hero_subtitle || "Institutional sovereign venture document.",
  };
}

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageByPathOrSlug(slug);

  if (!page) {
    notFound();
  }

  const formattedTitle = page.hero_title || page.name || slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Split body content into paragraphs if provided
  const paragraphs = page.body ? page.body.split(/\n\n+/) : [];

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        eyebrow={page.hero_eyebrow || "INSTITUTIONAL DOCUMENTATION"}
        title={formattedTitle}
        subtitle={page.hero_subtitle || "Sovereign Venture Ecosystem & Practice Capabilities"}
        backgroundImage="/assets/heroes/global-network-bg.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">{formattedTitle}</h2>
              <p className="text-xs text-foreground/60">CMS Page Reference: {page.path || `/p/${slug}`}</p>
            </div>
          </div>

          {paragraphs.length > 0 ? (
            <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/80 leading-relaxed">
              This institutional document is maintained under YESS Bangladesh governance. Content updates are
              managed through our centralized content management registry.
            </p>
          )}

          {/* Structured section data if present in page.data.sections */}
          {Array.isArray(page.data?.sections) && page.data.sections.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              {page.data.sections.map((section: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-muted/20 border border-border space-y-1.5">
                  {section.title && (
                    <h3 className="text-sm font-bold text-foreground">{section.title}</h3>
                  )}
                  {section.content && (
                    <p className="text-xs text-foreground/70 leading-relaxed">{section.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-foreground/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="flex items-center gap-1.5 font-medium text-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Status: Active &amp; Compliant</span>
              </p>
              <p className="text-[11px] text-foreground/60">
                Governing Entity: YESS Bangla Private Limited (RJSC Reg: C-184920)
              </p>
            </div>
            <div className="text-[11px] text-foreground/50 font-mono">
              Node: Dhaka BST
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
