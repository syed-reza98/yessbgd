"use client";

import { type ReactNode } from "react";
import Image from "next/image";

/**
 * Home-contract page hero: white photographic backdrop with a 90deg
 * readability mask, left-aligned eyebrow pill + two-tone headline +
 * accented lede. Mirrors app/HomeClient.tsx so every route shares
 * one hero language (container, type scale, pill, halo).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  backgroundImage = "/assets/Hero_Background.webp",
  imageOpacity = "opacity-100",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  backgroundImage?: string;
  imageOpacity?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px]">
      {/* Photographic backdrop with home 90deg readability mask */}
      {backgroundImage && (
        <div className={`absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none ${imageOpacity}`}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
            }}
          />
        </div>
      )}

      <div
        className={`relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28 ${
          isCenter ? "text-center" : ""
        }`}
      >
        {/* Eyebrow pill (home style: white/95, green dot) */}
        {eyebrow && (
          <div
            className={`inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5 ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
            <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Headline (home scale: 34/42/47, tight, halo for photo legibility) */}
        <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 text-balance [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
          {title}
        </h1>

        {/* Lede (home description: accented, bold ink, halo) */}
        {subtitle && (
          <div
            className={`border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px] ${
              isCenter ? "mx-auto text-left" : ""
            }`}
          >
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
              {subtitle}
            </p>
          </div>
        )}

        {/* Children (CTAs, metric cards, search) */}
        {children && <div className={`mt-8 ${isCenter ? "flex justify-center" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}
