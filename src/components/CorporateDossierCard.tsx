"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, FileText, CheckCircle2, ShieldCheck, Sparkles, Lock, ArrowDownToLine } from "lucide-react";

export function CorporateDossierCard() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("bn") ? "bn" : "en";
  const [lang, setLang] = useState<"en" | "bn">(currentLang);
  const [format, setFormat] = useState<"pdf" | "docx">("pdf");

  const downloadHref =
    format === "pdf"
      ? `/yess-bangla-company-profile${lang === "bn" ? "-bn" : ""}.pdf`
      : `/yess-bangla-company-profile${lang === "bn" ? "-bn" : ""}.docx`;

  const fileName =
    format === "pdf"
      ? `yess-bangla-company-profile${lang === "bn" ? "-bn" : ""}.pdf`
      : `yess-bangla-company-profile${lang === "bn" ? "-bn" : ""}.docx`;

  const metaText =
    lang === "en"
      ? format === "pdf"
        ? "Official 2026 Edition • 24 Pages • 2.8 MB PDF"
        : "Enterprise Editable Format • 24 Pages • 1.4 MB DOCX"
      : format === "pdf"
      ? "অফিসিয়াল ২০২৬ সংস্করণ • ২৪ পৃষ্ঠা • ২.৮ মেগাবাইট PDF"
      : "এন্টারপ্রাইজ সংস্করণ • ২৪ পৃষ্ঠা • ১.৪ মেগাবাইট DOCX";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-6 shadow-md backdrop-blur-xl sm:p-7 transition-all hover:border-primary/50">
      {/* Brand accent ambient glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              <Sparkles className="h-3 w-3" />
              {t("home.downloadCards.officialDossier", "Executive Dossier")}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              BASIS Accredited
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-lg font-bold sm:text-xl text-foreground">
            {lang === "en"
              ? "YESS Bangla Corporate Profile & Ecosystem Statement"
              : "ইয়েস বাংলা কোম্পানি প্রফাইল ও প্রাতিষ্ঠানিক বিবরণী"}
          </h3>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-lg">
            {lang === "en"
              ? "Official executive overview covering our 13 subsidiaries, enterprise service architecture, leadership governance, audited track record, and ISO-9001 quality framework."
              : "আমাদের ১৩টি অঙ্গপ্রতিষ্ঠান, এন্টারপ্রাইজ সার্ভিস ফ্রেমওয়ার্ক, পরিচালনা পর্ষদ, সাফল্য ও আইএসও-৯০০১ মান নিয়ন্ত্রণ রূপরেখার প্রাতিষ্ঠানিক প্রামাণ্য দলিল।"}
          </p>
        </div>

        <div className="hidden sm:grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <FileText className="h-7 w-7" />
        </div>
      </div>

      {/* Segmented Controls Strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Selector */}
          <div
            role="group"
            aria-label="Document language"
            className="inline-flex rounded-full border border-border/80 bg-background/90 p-1 text-xs shadow-xs"
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold transition-all ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>🇬🇧</span> English
            </button>
            <button
              type="button"
              onClick={() => setLang("bn")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-semibold transition-all ${
                lang === "bn"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>🇧🇩</span> বাংলা
            </button>
          </div>

          {/* Format Selector */}
          <div
            role="group"
            aria-label="Document format"
            className="inline-flex rounded-full border border-border/80 bg-background/90 p-1 text-xs shadow-xs"
          >
            <button
              type="button"
              onClick={() => setFormat("pdf")}
              className={`rounded-full px-3.5 py-1 text-[11px] font-semibold transition-all ${
                format === "pdf"
                  ? "bg-secondary text-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              PDF Document
            </button>
            <button
              type="button"
              onClick={() => setFormat("docx")}
              className={`rounded-full px-3.5 py-1 text-[11px] font-semibold transition-all ${
                format === "docx"
                  ? "bg-secondary text-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Word (.docx)
            </button>
          </div>
        </div>

        {/* Download Action */}
        <a
          href={downloadHref}
          download={fileName}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowDownToLine className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          <span>{lang === "en" ? "Download Executive Dossier" : "ডাউনলোড করুন (ফ্রি)"}</span>
        </a>
      </div>

      {/* Meta footnote */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5 font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          {metaText}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/80">
          Digital Signature: SHA-256 Validated • Release 2026.1
        </span>
      </div>
    </div>
  );
}
