"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { language } = useLanguage();
  const isBn = language === "bn";

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 240) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const animId = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  // Don't render inside admin console
  if (pathname?.startsWith("/admin")) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circular progress parameters
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        left: "max(1.25rem, env(safe-area-inset-left))",
        bottom: pathname !== "/" ? "max(4.75rem, env(safe-area-inset-bottom))" : "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={isBn ? "পৃষ্ঠার শুরুতে যান" : "Scroll to top of page"}
        title={isBn ? "পৃষ্ঠার শুরুতে যান" : "Scroll to top"}
        className="relative group w-12 h-12 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_8px_25px_rgba(0,0,0,0.12)] border border-slate-200/90 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#008744] hover:border-[#008744]/40 hover:shadow-emerald-900/15 transition-all duration-200 active:scale-90 cursor-pointer"
      >
        {/* SVG Scroll Progress Track */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
          viewBox="0 0 48 48"
        >
          {/* Background circle track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="2.5"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Animated progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="text-[#008744] transition-all duration-100 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0" />

        {/* Hover Label Tooltip */}
        <span className="absolute left-full ml-2.5 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-md">
          {isBn ? "উপরে যান" : "Back to Top"}
        </span>
      </button>
    </div>
  );
}
