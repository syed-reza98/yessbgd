"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  X,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface HomeClientProps {
  sitePage?: unknown;
  initialVentures?: unknown[];
}

export function HomeClient({ sitePage: _sitePage, initialVentures: _initialVentures }: HomeClientProps) {
  const { language } = useLanguage();
  const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);

  // Counter animations using IntersectionObserver
  const [counts, setCounts] = useState({
    years: 0,
    team: 0,
    districts: 0,
  });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsStoryVideoOpen(false);
    };
    if (isStoryVideoOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isStoryVideoOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            const duration = 1200; // ms
            const startTime = performance.now();

            const targets = { years: 11, team: 500, districts: 64 };

            const step = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);

              setCounts({
                years: Math.floor(eased * targets.years),
                team: Math.floor(eased * targets.team),
                districts: Math.floor(eased * targets.districts),
              });

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCounts(targets);
              }
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  return (
    <div className="w-full bg-white text-[#0D1E2D]">
      {/* ======================================================== */}
      {/* 2. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px]">
        {/* Hero Background Image (Full on mobile with vertical fade, Right 72% on desktop with horizontal fade) */}
        <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[72%] z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/Hero_Background.jpeg"
            alt="Yess Bangla Modern Workspace"
            className="w-full h-full object-cover object-[28%_bottom] sm:object-[28%_center] lg:object-left"
          />
          {/* Mobile Vertical Gradient Overlay: Solid white on text & avatars, smooth fade over mid-section */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white via-[52%] to-transparent to-[76%] lg:hidden" />
          {/* Desktop Progressive Horizontal Gradient Overlay */}
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 8%, rgba(255,255,255,0.50) 18%, rgba(255,255,255,0.18) 28%, rgba(255,255,255,0) 36%)",
            }}
          />
          {/* Subtle Bottom soft fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/80 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
          <div className="flex flex-col lg:flex-row items-start justify-between">
            {/* Left Column: Typography, Tagline, CTAs, Social Proof */}
            <div className="w-full lg:w-[460px] pt-1 sm:pt-2">
              {/* Tagline Pill */}
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-emerald-100 px-3 py-1 rounded-full shadow-xs mb-4 sm:mb-5">
                <span className="w-2 h-2 rounded-full bg-[#0E8A44]" />
                <span className="text-[#0E8A44] text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase">
                  {language === "bn"
                    ? "স্মার্ট বাংলাদেশ বিনির্মাণে একসাথে"
                    : "A Smarter Bangladesh Together"}
                </span>
              </div>

              {/* Main Bold Headline */}
              <h1 className="text-[34px] sm:text-[42px] lg:text-[46px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5">
                {language === "bn" ? (
                  <>
                    <span className="block text-[#0D1E2D]">স্মার্ট সমাধানের জন্য</span>
                    <span className="block text-[#0E8A44]">আপনার ইকোসিস্টেম</span>
                  </>
                ) : (
                  <>
                    <span className="block text-[#0D1E2D]">Your Ecosystem for</span>
                    <span className="block text-[#0E8A44]">Smart Solutions</span>
                  </>
                )}
              </h1>

              {/* Description Paragraph */}
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[#475569] mb-6 sm:mb-8 max-w-[390px]">
                {language === "bn"
                  ? "ইয়েস বাংলায় আমরা এমন ব্যবসা গড়ে তুলি যা মানুষের জীবনে বাস্তব ইতিবাচক পরিবর্তন আনে — পরিষেবা, তাজা খাবার, প্রযুক্তি, সংবাদ ও বিনোদনের মাধ্যমে।"
                  : "At YESS Bangla, we build and grow businesses that bring real value to people — through services, fresh food, technology, news and entertainment."}
              </p>

              {/* Action Buttons (Responsive row on mobile) */}
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-9 flex-wrap gap-y-2.5">
                {/* Primary Button */}
                <a
                  href="#brands"
                  className="inline-flex items-center space-x-2 bg-[#0E8A44] hover:bg-[#0a7539] text-white text-[12.5px] sm:text-[13.5px] font-semibold px-4.5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-sm hover:shadow transition-all"
                >
                  <span>
                    {language === "bn" ? "আমাদের ব্র্যান্ডসমূহ" : "Explore Our Brands"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </a>

                {/* Secondary Button: Watch Story with dark play circle */}
                <button
                  type="button"
                  onClick={() => setIsStoryVideoOpen(true)}
                  className="inline-flex items-center space-x-2.5 bg-white/90 hover:bg-white border border-gray-300 hover:border-gray-400 text-[#0D1E2D] text-[12.5px] sm:text-[13.5px] font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-xs transition-all cursor-pointer"
                >
                  <span>
                    {language === "bn" ? "আমাদের গল্প শুনুন" : "Watch Our Story"}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#0D1E2D] flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 text-white fill-current ml-0.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Center & Right: Floating Brand Badges over Hero Image */}
            <div className="relative w-full h-[290px] sm:h-[320px] lg:h-[450px] lg:flex-1 mt-6 lg:mt-0 pointer-events-none">
              {/* 1. Shondhaan */}
              <div className="float-card-1 absolute top-[4%] left-[2%] sm:left-[4%] lg:top-[12%] lg:left-[28%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto -rotate-2 lg:rotate-0 scale-[0.84] sm:scale-100 origin-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0E8A44] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Shondhaan
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Service Marketplace
                  </p>
                </div>
              </div>

              {/* 2. Organic Haat */}
              <div className="float-card-2 absolute top-[34%] left-[3%] sm:left-[5%] lg:top-[36%] lg:left-[30%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto rotate-1 lg:rotate-0 scale-[0.84] sm:scale-100 origin-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EAB308] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Organic Haat
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Fresh &amp; Healthy Food
                  </p>
                </div>
              </div>

              {/* 3. Yess Soft */}
              <div className="float-card-3 absolute top-[64%] left-[1%] sm:left-[3%] lg:top-[60%] lg:left-[28%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto -rotate-2 lg:rotate-0 scale-[0.84] sm:scale-100 origin-left">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <span className="text-white font-mono font-bold text-[12px] sm:text-[13px] leading-none">
                    &lt;/&gt;
                  </span>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Yess Soft
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    IT Solutions
                  </p>
                </div>
              </div>

              {/* 4. The Daily Akash */}
              <div className="float-card-4 absolute top-[0%] right-[1%] sm:right-[3%] lg:top-[8%] lg:right-[1.5%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto -rotate-3 lg:rotate-0 scale-[0.84] sm:scale-100 origin-right">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EA580C] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    The Daily Akash
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    News &amp; Media
                  </p>
                </div>
              </div>

              {/* 5. Akash TV */}
              <div className="float-card-5 absolute top-[26%] right-[2%] sm:right-[4%] lg:top-[30%] lg:right-[1.5%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto rotate-1 lg:rotate-0 scale-[0.84] sm:scale-100 origin-right">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#DB2777] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Akash TV
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Television
                  </p>
                </div>
              </div>

              {/* 6. Akash OTT */}
              <div className="float-card-6 absolute top-[52%] right-[2%] sm:right-[4%] lg:top-[52%] lg:right-[1.5%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto -rotate-1 lg:rotate-0 scale-[0.84] sm:scale-100 origin-right">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#8B5CF6] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Akash OTT
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Entertainment
                  </p>
                </div>
              </div>

              {/* 7. Yess Host */}
              <div className="float-card-7 absolute top-[76%] right-[1%] sm:right-[3%] lg:top-[74%] lg:right-[1.5%] z-20 bg-white/95 backdrop-blur-sm rounded-[12px] sm:rounded-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 flex items-center space-x-2.5 sm:space-x-3 pointer-events-auto rotate-1 lg:rotate-0 scale-[0.84] sm:scale-100 origin-right">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#0D1E2D] leading-tight">
                    Yess Host
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-[#64748B] leading-tight mt-0.5">
                    Hosting &amp; Cloud
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FLOATING STATS BAR CARD                               */}
      {/* ======================================================== */}
      <section
        ref={statsRef}
        className="relative z-30 max-w-[1200px] mx-auto px-6 -mt-8 sm:-mt-10 lg:-mt-12"
      >
        <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.07)] border border-gray-100/90 py-4 px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {/* Metric 1: 11+ Years of Journey */}
            <div className="flex items-center space-x-4 md:pr-6 md:border-r border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#E8F8EE] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-[#0E8A44]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-[#0D1E2D] tracking-tight leading-none">
                  <span>{counts.years}</span>+
                </div>
                <div className="text-[12px] text-[#64748B] font-normal leading-tight mt-1">
                  {language === "bn" ? "বছরের পথচলা" : "Years of Journey"}
                </div>
              </div>
            </div>

            {/* Metric 2: 500+ Team Members */}
            <div className="flex items-center space-x-4 md:px-6 md:border-r border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#FFF2EB] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-[#F15A24]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-[#0D1E2D] tracking-tight leading-none">
                  <span>{counts.team}</span>+
                </div>
                <div className="text-[12px] text-[#64748B] font-normal leading-tight mt-1">
                  {language === "bn" ? "কর্মী সদস্য" : "Team Members"}
                </div>
              </div>
            </div>

            {/* Metric 3: Millions People Reached */}
            <div className="flex items-center space-x-4 md:px-6 md:border-r border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-[#9333EA]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="10" width="3.5" height="11" rx="1.5" />
                  <rect x="10.25" y="5" width="3.5" height="16" rx="1.5" />
                  <rect x="16.5" y="13" width="3.5" height="8" rx="1.5" />
                  <circle cx="12" cy="2" r="1.5" />
                </svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-[#0D1E2D] tracking-tight leading-none">
                  {language === "bn" ? "লাখো" : "Millions"}
                </div>
                <div className="text-[12px] text-[#64748B] font-normal leading-tight mt-1">
                  {language === "bn" ? "মানুষের সেবা" : "People Reached"}
                </div>
              </div>
            </div>

            {/* Metric 4: 64+ Districts Presence */}
            <div className="flex items-center space-x-4 md:pl-6">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-[#2563EB]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <div className="text-[22px] sm:text-[24px] font-extrabold text-[#0D1E2D] tracking-tight leading-none">
                  <span>{counts.districts}</span>+
                </div>
                <div className="text-[12px] text-[#64748B] font-normal leading-tight mt-1">
                  {language === "bn" ? "জেলায় উপস্থিতি" : "Districts Presence"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OUR BRANDS SECTION                                    */}
      {/* ======================================================== */}
      <section id="brands" className="pt-16 pb-20 max-w-[1200px] mx-auto px-6">
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className="w-6 h-[2.5px] bg-[#0E8A44] rounded-full" />
              <span className="text-[#0E8A44] text-[11px] font-bold tracking-widest uppercase">
                {language === "bn" ? "আমাদের ব্র্যান্ডসমূহ" : "Our Brands"}
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[38px] font-extrabold text-[#0D1E2D] leading-[1.12] tracking-tight">
              {language === "bn" ? (
                <>
                  সাতটি শক্তিশালী ব্র্যান্ড।
                  <br />
                  একটি অভিন্ন লক্ষ্য।
                </>
              ) : (
                <>
                  Seven Powerful Brands.
                  <br />
                  One Shared Vision.
                </>
              )}
            </h2>
          </div>

          {/* Right Description & Navigation Arrows */}
          <div className="flex items-end space-x-6">
            <p className="text-[14px] text-[#475569] leading-relaxed max-w-[460px]">
              {language === "bn"
                ? "প্রয়োজনীয় পরিষেবা থেকে তাজা খাবার, সফটওয়্যার, ক্লাউড হোস্টিং, সংবাদ ও বিনোদন — আমাদের ব্র্যান্ডগুলো একসাথে কাজ করে একটি স্মার্ট বাংলাদেশ বিনির্মাণে।"
                : "From essential services to fresh food, software, hosting, news and entertainment — our brands work together to create opportunities and a smarter, more connected Bangladesh."}
            </p>
            <div className="hidden sm:flex items-center shrink-0">
              <Link
                href="/ventures"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white hover:from-[#0B7339] hover:via-[#047857] hover:to-[#0A5A5A] text-[13px] font-bold shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/25 hover:scale-[1.03] active:scale-95 transition-all duration-200 group cursor-pointer"
              >
                <span>{language === "bn" ? "আরও লোড হচ্ছে..." : "Loading More..."}</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 1: 4 Cards (Shondhaan, Organic Haat, Yess Soft, Yess Host) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {/* Card 1: Shondhaan */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              {/* Photo Banner with rounded top */}
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_shondhaan_pure.jpg"
                  alt="Shondhaan Service Marketplace App"
                  className="card-visual w-full h-full object-cover object-center"
                />
                {/* Overlapping Icon Circle with White Ring */}
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#0E8A44] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>
              {/* Card Body */}
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Shondhaan
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  Service Marketplace
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "আপনার আশেপাশের বিশ্বস্ত পরিষেবা ও দক্ষ পেশাদারদের সহজে খুঁজে নিন।"
                    : "Find trusted services, professionals and solutions around you."}
                </p>
              </div>
            </div>
            {/* Card Button */}
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/ventures/yess-service"
                className="inline-flex items-center space-x-1.5 border border-[#0E8A44] hover:bg-[#0E8A44] text-[#0E8A44] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Shondhaan</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 2: Organic Haat */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_organichaat_pure.jpg"
                  alt="Organic Haat Fresh Produce"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#16A34A] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Organic Haat
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  AgriTech &amp; Fresh Food
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "কৃষকের মাঠ থেকে সরাসরি নিরাপদ, পুষ্টিকর ও তাজা খাদ্য আপনার খাবার টেবিলে।"
                    : "Bringing fresh, healthy and safe food from farmers to your table."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/ventures/yess-organic-haat"
                className="inline-flex items-center space-x-1.5 border border-[#16A34A] hover:bg-[#16A34A] text-[#16A34A] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Organic Haat</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 3: Yess Soft */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_yesssoft_pure.jpg"
                  alt="Yess Soft Software & IT Solutions"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#2563EB] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-4.5 h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="4" cy="4" r="2.5" />
                    <circle cx="12" cy="4" r="2.5" />
                    <circle cx="20" cy="4" r="2.5" />
                    <circle cx="4" cy="12" r="2.5" />
                    <circle cx="12" cy="12" r="2.5" />
                    <circle cx="20" cy="12" r="2.5" />
                    <circle cx="4" cy="20" r="2.5" />
                    <circle cx="12" cy="20" r="2.5" />
                    <circle cx="20" cy="20" r="2.5" />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Yess Soft
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  Software &amp; IT Solutions
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "ব্যবসায়িক অগ্রযাত্রায় আধুনিক কাস্টম সফটওয়্যার, ক্লাউড ও এন্টারপ্রাইজ সল্যুশন।"
                    : "Custom software, digital solutions and technology services for businesses."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/ventures/yess-soft"
                className="inline-flex items-center space-x-1.5 border border-[#2563EB] hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Yess Soft</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 4: Yess Host */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_yesshost_pure.jpg"
                  alt="Yess Host Cloud & Hosting Services"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#7C3AED] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Yess Host
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  Hosting &amp; Cloud Services
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "উচ্চগতির হোস্টিং, ডোমেন ও নিরাপদ ক্লাউড ইনফ্রাস্ট্রাকচার আপনার ডিজিটাল উপস্থিতির জন্য।"
                    : "Reliable hosting, domains and cloud solutions for your digital journey."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/ventures/yess-host"
                className="inline-flex items-center space-x-1.5 border border-[#7C3AED] hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Yess Host</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 2: 3 Cards (The Daily Akash, Akash TV, Akash OTT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 5: The Daily Akash */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_dailyakash_pure.jpg"
                  alt="The Daily Akash Journalism & Media"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#EA580C] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="7" y1="8" x2="17" y2="8" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="7" y1="16" x2="13" y2="16" />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  The Daily Akash
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  News &amp; Media
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "বস্তুনিষ্ঠ সংবাদ, গভীর বিশ্লেষণ এবং বাংলাদেশের ইতিবাচক পরিবর্তনের খবর।"
                    : "Reliable news, insights and stories that matter to Bangladesh."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/services/akash-news"
                className="inline-flex items-center space-x-1.5 border border-[#EA580C] hover:bg-[#EA580C] text-[#EA580C] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore The Daily Akash</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 6: Akash TV */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_akashtv_pure.jpg"
                  alt="Akash TV Broadcast Studio"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#DB2777] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Akash TV
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  Television
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "তথ্যবহুল, শিক্ষণীয় ও মানুষের কথা নিয়ে অনুষ্ঠানমালা একটি উজ্জ্বল আগামীর জন্য।"
                    : "Informative, engaging and people-focused programs for a brighter Bangladesh."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/ventures/akash-tv"
                className="inline-flex items-center space-x-1.5 border border-[#DB2777] hover:bg-[#DB2777] text-[#DB2777] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Akash TV</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Card 7: Akash OTT */}
          <div className="brand-interactive-card bg-white rounded-[20px] border border-gray-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative overflow-visible h-[116px] bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/card_akashott_pure.jpg"
                  alt="Akash OTT Streaming Platform"
                  className="card-visual w-full h-full object-cover object-center"
                />
                <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-[#8B5CF6] ring-4 ring-white shadow-md flex items-center justify-center text-white z-10">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </div>
              <div className="pt-7 px-5 pb-3">
                <h3 className="text-[16px] font-bold text-[#0D1E2D] leading-tight">
                  Akash OTT
                </h3>
                <p className="text-[11.5px] text-[#64748B] font-normal leading-tight mt-0.5 mb-2.5">
                  Entertainment
                </p>
                <p className="text-[12.5px] leading-relaxed text-[#475569]">
                  {language === "bn"
                    ? "সিনেমা, নাটক, ডকুমেন্টারি এবং বিনোদন — যেকোনো স্থানে, যেকোনো সময়ে।"
                    : "Movies, dramas, documentaries and more — anytime, anywhere on Akash OTT."}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/services/akash-ott"
                className="inline-flex items-center space-x-1.5 border border-[#8B5CF6] hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                <span>Explore Akash OTT</span>
                <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. OUR IMPACT SECTION BANNER                             */}
      {/* ======================================================== */}
      <section id="impact" className="max-w-[1200px] mx-auto px-6 mb-7">
        <div className="relative rounded-[26px] overflow-hidden shadow-md bg-[#052419]">
          {/* City Skyline Background Image covering right side */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[62%] z-0 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/impact_bg_perfect.jpg"
              alt="Dhaka City Skyline Panorama"
              className="w-full h-full object-cover object-right"
            />
            {/* Dark Green Gradient Overlay on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#052419] via-[#052419]/90 to-transparent w-full md:w-[45%]" />
          </div>

          {/* Impact Content Container */}
          <div className="relative z-10 px-8 py-10 lg:px-12 lg:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Side: Header, Description & White Solid Pill Button */}
            <div className="w-full md:w-[48%]">
              <div className="flex items-center space-x-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-[#22C55E] rounded-full" />
                <span className="text-[#22C55E] text-[10.5px] font-bold tracking-widest uppercase">
                  {language === "bn" ? "আমাদের প্রভাব" : "Our Impact"}
                </span>
              </div>

              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-white leading-[1.15] tracking-tight mb-3">
                {language === "bn" ? (
                  <>
                    মানুষকে ক্ষমতায়ন।
                    <br />
                    সমাজকে <span className="text-[#22C55E]">সুদৃঢ়করণ।</span>
                  </>
                ) : (
                  <>
                    Empowering People.
                    <br />
                    Strengthening <span className="text-[#22C55E]">Communities.</span>
                  </>
                )}
              </h2>

              <p className="text-[13.5px] leading-relaxed text-white/80 mb-6 max-w-[420px]">
                {language === "bn"
                  ? "প্রযুক্তি, দৈনন্দিন পরিষেবা, বিশুদ্ধ খাবার, তথ্য ও সুস্থ বিনোদনের মাধ্যমে আমরা সুযোগ তৈরি করি এবং গড়ে তুলি এক স্বনির্ভর, স্মার্ট বাংলাদেশ।"
                  : "Through technology, services, fresh food, media and entertainment, we create opportunities and help build a smarter, more inclusive Bangladesh."}
              </p>

              <Link
                href="/about/standards"
                className="inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-[#0D1E2D] text-[13px] font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors"
              >
                <span>{language === "bn" ? "বিস্তারিত প্রভাব দেখুন" : "See Our Impact"}</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Right Side: 2x2 Grid of Floating White Stat Cards */}
            <div className="w-full md:w-[48%] grid grid-cols-2 gap-3.5">
              {/* Stat 1: Millions */}
              <div className="bg-white rounded-[16px] shadow-md px-4 py-3 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#E8F8EE] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[#0E8A44]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-[#0D1E2D] leading-tight">
                    {language === "bn" ? "লাখো" : "Millions"}
                  </div>
                  <div className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                    {language === "bn" ? "মানুষের সেবা" : "People Reached"}
                  </div>
                </div>
              </div>

              {/* Stat 2: 500+ */}
              <div className="bg-white rounded-[16px] shadow-md px-4 py-3 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF2EB] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[#F15A24]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-[#0D1E2D] leading-tight">
                    500+
                  </div>
                  <div className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                    {language === "bn" ? "কর্মী সদস্য" : "Team Members"}
                  </div>
                </div>
              </div>

              {/* Stat 3: 11+ */}
              <div className="bg-white rounded-[16px] shadow-md px-4 py-3 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#F3E8FF] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[#9333EA]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="4" y="10" width="3.5" height="11" rx="1.5" />
                    <rect x="10.25" y="5" width="3.5" height="16" rx="1.5" />
                    <rect x="16.5" y="13" width="3.5" height="8" rx="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-[#0D1E2D] leading-tight">
                    11+
                  </div>
                  <div className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                    {language === "bn" ? "বছরের পথচলা" : "Years of Journey"}
                  </div>
                </div>
              </div>

              {/* Stat 4: 64+ */}
              <div className="bg-white rounded-[16px] shadow-md px-4 py-3 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[#2563EB]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-[#0D1E2D] leading-tight">
                    64+
                  </div>
                  <div className="text-[10.5px] text-[#64748B] leading-tight mt-0.5">
                    {language === "bn" ? "জেলায় উপস্থিতি" : "Districts Presence"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION (CTA) BANNER SECTION                   */}
      {/* ======================================================== */}
      <section className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="relative rounded-[26px] overflow-hidden shadow-md bg-[#052419]">
          {/* Right Side Panoramic Photo: Dhaka sunset with the man in the green Yess Bangla polo */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[62%] lg:w-[60%] overflow-hidden pointer-events-none z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/cta_right_half.jpg"
              alt="Be a Part of A Smarter Bangladesh"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark Green Gradient Overlay on left side of image for seamless blend */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-44 bg-gradient-to-r from-[#052419] via-[#052419]/90 to-transparent" />
          </div>

          {/* CTA Text Content Container */}
          <div className="relative z-10 px-8 py-9 lg:px-12 lg:py-10 flex flex-col md:flex-row items-center justify-between">
            {/* Left Side Content */}
            <div className="w-full md:w-[50%]">
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="w-6 h-[2px] bg-[#22C55E] rounded-full" />
                <span className="text-[#22C55E] text-[10.5px] font-bold tracking-widest uppercase">
                  {language === "bn" ? "চলুন একসাথে গড়ি" : "Let's Build Together"}
                </span>
              </div>

              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-[1.18] tracking-tight mb-2.5">
                {language === "bn" ? (
                  <>
                    স্মার্ট বাংলাদেশ বিনির্মাণে
                    <br />
                    <span className="text-[#22C55E]">আমাদের অংশীদার হোন।</span>
                  </>
                ) : (
                  <>
                    Be a Part of
                    <br />
                    <span className="text-[#22C55E]">A Smarter Bangladesh.</span>
                  </>
                )}
              </h2>

              <p className="text-[13px] leading-relaxed text-white/80 mb-5 max-w-[420px]">
                {language === "bn"
                  ? "গ্রাহক, অংশীদার, বিনিয়োগকারী কিংবা মেধাবী কর্মী — আসুন আমরা একসাথে ইতিবাচক পরিবর্তন সৃষ্টি করি।"
                  : "Whether you're a customer, partner, investor or talent — let's create real impact together."}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white hover:bg-gray-100 text-[#0D1E2D] text-[13px] font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors"
              >
                <span>{language === "bn" ? "যোগাযোগ করুন" : "Get in Touch"}</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Right Side: spacer so the man and sunset script shine through */}
            <div className="hidden md:block w-[45%] h-24 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* STORY VIDEO MODAL DIALOG                                 */}
      {/* ======================================================== */}
      {isStoryVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsStoryVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-slate-950/60">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="h-4 w-4 text-[#22C55E]" />
                {language === "bn"
                  ? "ইয়েস বাংলা — আমাদের সাফল্যের গল্প"
                  : "Yess Bangla — Our Story"}
              </span>
              <button
                type="button"
                onClick={() => setIsStoryVideoOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Close story video modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Yess Bangla Corporate Journey"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
