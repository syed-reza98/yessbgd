"use client";

import { Share2 } from "lucide-react";

export function ShareArticleButton({ title }: { title: string }) {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-[#0d6e6e] transition-colors flex items-center gap-1.5"
    >
      <Share2 className="w-3.5 h-3.5" />
      <span>Share Paper</span>
    </button>
  );
}
