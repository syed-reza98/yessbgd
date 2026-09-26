import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ArrowLeft, FileText } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} | YESS Bangladesh`,
    description: `Institutional page for ${formattedTitle} on the YESS Bangladesh platform.`,
  };
}

export default async function DynamicCMSPage({ params }: Props) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        eyebrow="INSTITUTIONAL DOCUMENTATION"
        title={formattedTitle}
        subtitle="Sovereign Venture Ecosystem & Practice Capabilities"
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
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">{formattedTitle}</h2>
              <p className="text-xs text-foreground/60">CMS Page Reference: /p/{slug}</p>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed">
            This institutional document is maintained under YESS Bangladesh governance. Content updates are
            managed through our centralized content management registry.
          </p>

          <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-foreground/70 space-y-1">
            <p>
              <strong>Status:</strong> Active &amp; Compliant
            </p>
            <p>
              <strong>Governing Entity:</strong> YESS Bangla Private Limited (RJSC Reg: C-184920)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
