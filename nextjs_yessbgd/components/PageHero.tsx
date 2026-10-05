"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const BREADCRUMB_BN: Record<string, string> = {
  Home: "হোম",
  "About Us": "আমাদের সম্পর্কে",
  About: "আমাদের সম্পর্কে",
  Ventures: "ভেঞ্চার",
  Services: "সেবা",
  Industries: "ইন্ডাস্ট্রি",
  Insights: "ইনসাইট",
  Careers: "ক্যারিয়ার",
  Contact: "যোগাযোগ",
  FAQ: "প্রশ্নোত্তর",
  Awards: "স্বীকৃতি",
  Leadership: "নেতৃত্ব",
  Methodology: "পদ্ধতি",
  Standards: "মানদণ্ড",
  Mission: "মিশন",
  "Terms of Service": "সেবার শর্তাবলী",
  Terms: "সেবার শর্তাবলী",
  "Privacy Policy": "গোপনীয়তা নীতি",
  Privacy: "গোপনীয়তা নীতি",
  "Application Status": "আবেদনের অবস্থা",
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  backgroundImage = "/assets/heroes/hero_6a8951c6b7346.webp",
  imageOpacity = "opacity-30",
  breadcrumbs,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  imageOpacity?: string;
  breadcrumbs?: BreadcrumbItem[];
  align?: "center" | "left";
}) {
  const { language } = useLanguage();
  const isBn = language === "bn";
  const isCenter = align === "center";

  const translateCrumb = (label: string) => {
    if (!isBn) return label;
    return BREADCRUMB_BN[label] || label;
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 border-b border-slate-200/80 min-h-[auto] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-center">
      {/* Background Image Layer with Light Multiplying Overlay (Optimized for Browser Preload Scanner) */}
      {backgroundImage && (
        <>
          <div
            className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 mix-blend-multiply overflow-hidden ${imageOpacity}`}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center pointer-events-none select-none"
            />
          </div>
          {/* Subtle mobile readability gradient veil */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 sm:hidden pointer-events-none" />
        </>
      )}

      {/* Ambient Light Theme Glows & Dot Matrix */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className={`container-tight relative z-10 max-w-5xl ${isCenter ? "text-center mx-auto" : ""}`}>
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-6 flex-wrap ${
              isCenter ? "justify-center" : ""
            }`}
          >
            <Link href="/" prefetch={false} className="hover:text-emerald-700 transition-colors">
              {isBn ? "হোম" : "Home"}
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {crumb.href ? (
                  <Link href={crumb.href} prefetch={false} className="hover:text-emerald-700 transition-colors">
                    {translateCrumb(crumb.label)}
                  </Link>
                ) : (
                  <span className="text-emerald-800 font-bold">{translateCrumb(crumb.label)}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow Badge */}
        {eyebrow && (
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs backdrop-blur-xs ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{eyebrow}</span>
          </div>
        )}

        {/* Display Title */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight text-balance">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal text-pretty ${
              isCenter ? "max-w-2xl mx-auto" : "max-w-3xl"
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* Children (e.g. CTA buttons, search bar, metrics) */}
        {children && <div className={`mt-8 ${isCenter ? "flex justify-center" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}
