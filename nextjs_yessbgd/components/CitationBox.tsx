"use client";

import { useState } from "react";
import { Share2, Copy, Check, BookOpen, Quote } from "lucide-react";

interface CitationBoxProps {
  title: string;
  author: string;
  year?: string;
  slug: string;
}

export function CitationBox({ title, author, year = "2025", slug }: CitationBoxProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"ieee" | "bibtex" | "apa">("ieee");

  const ieeeCitation = `${author}, "${title}," YESS Bangladesh Research & Technical Whitepaper Series, ${year}.`;
  const apaCitation = `${author}. (${year}). ${title}. YESS Bangladesh Institutional Research Series.`;
  const bibtexCitation = `@article{yess_${slug.replace(/-/g, "_")},
  author    = {${author}},
  title     = {${title}},
  journal   = {YESS Bangladesh Sovereign Research Series},
  year      = {${year}},
  url       = {https://yessbgd.com/insights/${slug}}
}`;

  const currentCitation =
    activeTab === "ieee"
      ? ieeeCitation
      : activeTab === "apa"
      ? apaCitation
      : bibtexCitation;

  const copyToClipboard = (text: string, format: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2500);
    }
  };

  const shareSocial = (platform: "twitter" | "linkedin" | "facebook") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} — YESS Bangladesh Whitepaper`);

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  return (
    <section className="glass-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm my-10 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-foreground">
              Formal Citation &amp; Strategic Dissemination
            </h4>
            <p className="text-xs text-foreground/65">
              Cite as: {author} ({year}) • Sovereign Architecture Series
            </p>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted border border-border text-xs font-semibold">
          {(["ieee", "apa", "bibtex"] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveTab(fmt)}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === fmt
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-background/60"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Code Container */}
      <div className="mt-4 p-4 rounded-xl bg-muted/70 border border-border font-mono text-xs text-foreground/85 relative group">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto text-[11px] sm:text-xs">
          {currentCitation}
        </pre>
        <button
          onClick={() => copyToClipboard(currentCitation, activeTab)}
          className="mt-3 sm:mt-0 sm:absolute sm:top-3 sm:right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
        >
          {copiedFormat === activeTab ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy {activeTab.toUpperCase()}</span>
            </>
          )}
        </button>
      </div>

      {/* Social Sharing Strip */}
      <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-foreground/60 font-medium">Distribute to institutional stakeholders:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shareSocial("twitter")}
            className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="font-bold">𝕏</span>
            <span>Twitter / X</span>
          </button>
          <button
            onClick={() => shareSocial("linkedin")}
            className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-[#0077b5] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="font-bold">in</span>
            <span>LinkedIn</span>
          </button>
          <button
            onClick={() => shareSocial("facebook")}
            className="px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-[#1877f2] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="font-bold">f</span>
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </section>
  );
}
