"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Search,
  Menu as MenuIcon,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Layers,
  Wrench,
  Leaf,
  Server,
  PlayCircle,
  Code2,
  Newspaper,
  Tv,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { CmsMenuItem, CompanySettings } from "@/lib/cms";

const FEATURED_VENTURES = [
  {
    slug: "yess-service",
    title: "Shondhaan",
    category: "Home & Professional Services",
    icon: Wrench,
    logoUrl: "/coins/shondhaan-logo.png",
    color: "text-emerald-700 bg-emerald-50",
    href: "/ventures/yess-service",
  },
  {
    slug: "yess-organic-haat",
    title: "Organic Haat",
    category: "AgriTech & Fresh Food",
    icon: Leaf,
    logoUrl: "/coins/organic-haat-logo.png",
    color: "text-amber-700 bg-amber-50",
    href: "/ventures/yess-organic-haat",
  },
  {
    slug: "yess-soft",
    title: "Yess Soft",
    category: "Software & IT Solutions",
    icon: Code2,
    logoUrl: "/coins/yess-soft.png",
    color: "text-blue-700 bg-blue-50",
    href: "/ventures/yess-soft",
  },
  {
    slug: "yess-host",
    title: "Yess Host",
    category: "Hosting & Cloud Infrastructure",
    icon: Server,
    logoUrl: "/coins/yess-host.png",
    color: "text-purple-700 bg-purple-50",
    href: "/ventures/yess-host",
  },
  {
    slug: "akash-news",
    title: "The Daily Akash",
    category: "Digital Newspaper & Media",
    icon: Newspaper,
    logoUrl: "/coins/the-daily-akash.png",
    color: "text-orange-700 bg-orange-50",
    href: "/services/akash-news",
  },
  {
    slug: "akash-tv",
    title: "Akash TV",
    category: "Broadcast Television",
    icon: Tv,
    logoUrl: "/coins/akash-tv.png",
    color: "text-pink-700 bg-pink-50",
    href: "/ventures/akash-tv",
  },
  {
    slug: "akash-ott",
    title: "Akash OTT",
    category: "Streaming & Entertainment",
    icon: PlayCircle,
    logoUrl: "/coins/akash-ott.png",
    color: "text-violet-700 bg-violet-50",
    href: "/services/akash-ott",
  },
];

export function Header({
  headerMenus,
  settings,
  ventures: _ventures,
}: {
  headerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: unknown[];
}) {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileVenturesOpen, setMobileVenturesOpen] = useState(false);
  const [venturesDropdownOpen, setVenturesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterVentures = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setVenturesDropdownOpen(true);
  };

  const handleMouseLeaveVentures = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setVenturesDropdownOpen(false);
    }, 180);
  };

  // Dynamic Navigation from CMS with complete legacy Next.js fallback links
  const rawNavLinks = headerMenus && headerMenus.length > 0 ? headerMenus : [
    { id: "1", href: "/", label: "Home", label_bn: "হোম" },
    { id: "2", href: "/about", label: "About", label_bn: "আমাদের সম্পর্কে" },
    { id: "3", href: "/services", label: "Services", label_bn: "সার্ভিস" },
    { id: "4", href: "/ventures", label: "Ventures", label_bn: "ভেঞ্চার", badge: "13 Active" },
    { id: "5", href: "/industries", label: "Industries", label_bn: "ইন্ডাস্ট্রি" },
    { id: "6", href: "/insights", label: "Insights", label_bn: "ইনসাইট" },
    { id: "7", href: "/careers", label: "Careers", label_bn: "ক্যারিয়ার", badge: "Hiring" },
    { id: "8", href: "/contact", label: "Contact", label_bn: "যোগাযোগ" },
  ];

  const getLabel = (item: { label: string; label_bn?: string | null }) => {
    return language === "bn" && item.label_bn ? item.label_bn : item.label;
  };

  const isLinkActive = (href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileVenturesOpen(false);
    setVenturesDropdownOpen(false);
    setSearchOpen(false);
  };

  const logoUrl = settings?.branding?.logoUrl || "/assets/yess-bangla-logo.png";
  const brandName = settings?.branding?.companyName || "Yess Bangla";

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-200 ${
          scrolled ? "shadow-sm border-gray-200/80" : ""
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
          {/* Brand Logo: Original Yess Bangla Logo */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            aria-label="Yess Bangla Home"
          >
            <div className="relative h-8 sm:h-9 md:h-10 w-auto flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src={logoUrl}
                alt={brandName}
                width={120}
                height={42}
                className="h-full w-auto object-contain max-h-full"
                priority
              />
            </div>
          </Link>

          {/* Main Navigation Menu (All original Next.js links) */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-6 text-[13px] xl:text-[14px]">
            {rawNavLinks.map((link) => {
              const active = isLinkActive(link.href);
              const isVentures = link.href === "/ventures";

              if (isVentures) {
                return (
                  <div
                    key={link.id || link.href}
                    className="relative"
                    onMouseEnter={handleMouseEnterVentures}
                    onMouseLeave={handleMouseLeaveVentures}
                  >
                    <Link
                      href="/ventures"
                      onClick={handleLinkClick}
                      className={`inline-flex items-center gap-1.5 py-1 transition-colors ${
                        active || venturesDropdownOpen
                          ? "nav-link-active"
                          : "text-[#475569] hover:text-[#0E8A44]"
                      }`}
                    >
                      <span>{getLabel(link)}</span>
                      {link.badge && (
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-[#0E8A44] font-semibold border border-emerald-100">
                          {link.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          venturesDropdownOpen ? "rotate-180 text-[#0E8A44]" : "text-gray-400"
                        }`}
                      />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {venturesDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] xl:w-[600px] bg-white rounded-2xl border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.1)] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseEnter={handleMouseEnterVentures}
                        onMouseLeave={handleMouseLeaveVentures}
                      >
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                          <span className="text-[11px] font-bold text-[#0E8A44] uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                            <span>Our Flagship Subsidiaries</span>
                          </span>
                          <Link
                            href="/ventures"
                            onClick={handleLinkClick}
                            className="text-[11px] font-semibold text-gray-500 hover:text-[#0E8A44] transition-colors"
                          >
                            View All 13 Ventures &rarr;
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {FEATURED_VENTURES.map((v) => {
                            const Icon = v.icon;
                            return (
                              <Link
                                key={v.slug}
                                href={v.href}
                                onClick={handleLinkClick}
                                className="group p-2 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2.5 text-left"
                              >
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E8A44] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden p-1">
                                  {v.logoUrl ? (
                                    <Image
                                      src={v.logoUrl}
                                      alt={v.title}
                                      width={28}
                                      height={28}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Icon className="w-4 h-4" />
                                  )}
                                </div>
                                <div className="truncate">
                                  <div className="font-bold text-[12.5px] text-[#0D1E2D] group-hover:text-[#0E8A44] transition-colors truncate">
                                    {v.title}
                                  </div>
                                  <div className="text-[10px] text-gray-400 truncate">
                                    {v.category}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.id || link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`inline-flex items-center gap-1.5 py-1 transition-colors ${
                    active
                      ? "nav-link-active"
                      : "text-[#475569] hover:text-[#0E8A44]"
                  }`}
                >
                  <span>{getLabel(link)}</span>
                  {link.badge && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-[#0E8A44] font-semibold border border-emerald-100">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Utility Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            {/* Language Selector */}
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center space-x-1.5 text-[#0D1E2D] hover:text-[#0E8A44] transition-colors text-[13px] font-medium cursor-pointer"
              aria-label="Select Language"
            >
              <Globe className="w-4 h-4 text-[#0D1E2D]" strokeWidth={1.8} />
              <span className="text-[13px] font-semibold">
                {language === "en" ? "EN" : "বাং"}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" strokeWidth={2.5} />
            </button>

            {/* Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#0D1E2D] hover:text-[#0E8A44] transition-colors p-1 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" strokeWidth={2.2} />
            </button>

            {/* Mobile Menu Toggle Button (Hamburger) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#0D1E2D] hover:text-[#0E8A44] transition-colors p-1 ml-1 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={2.4} />
              ) : (
                <MenuIcon className="w-5 h-5" strokeWidth={2.4} />
              )}
            </button>

            {/* Primary CTA Button (Desktop) */}
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center space-x-2 bg-gradient-to-r from-[#0E8A44] to-[#0a7539] hover:from-[#0a7539] hover:to-[#075f2e] text-white text-[13px] font-semibold px-4.5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>{language === "bn" ? "যোগাযোগ করুন" : "Get in Touch"}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white/98 backdrop-blur-md px-6 py-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-[1240px] mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "bn"
                    ? "ব্র্যান্ড, পরিষেবা বা তথ্য অনুসন্ধান করুন..."
                    : "Search brands, services, or information..."
                }
                className="w-full text-sm text-[#0D1E2D] placeholder-gray-400 bg-transparent focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded cursor-pointer"
              >
                ESC
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200 max-h-[calc(100vh-68px)] overflow-y-auto">
            <nav className="flex flex-col space-y-2 text-[14.5px] font-medium">
              {rawNavLinks.map((link) => {
                const isVentures = link.href === "/ventures";
                if (isVentures) {
                  return (
                    <div key={link.id || link.href} className="flex flex-col">
                      <div className="flex items-center justify-between py-1.5">
                        <Link
                          href="/ventures"
                          onClick={handleLinkClick}
                          className={`flex items-center gap-2 ${
                            isLinkActive(link.href)
                              ? "text-[#0E8A44] font-bold"
                              : "text-[#475569] hover:text-[#0E8A44]"
                          }`}
                        >
                          <Layers className="w-4 h-4" />
                          <span>{getLabel(link)}</span>
                          {link.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-[#0E8A44] font-semibold border border-emerald-100">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileVenturesOpen(!mobileVenturesOpen)}
                          className="p-1 text-gray-500 hover:text-[#0E8A44]"
                          aria-label="Toggle ventures list"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              mobileVenturesOpen ? "rotate-180 text-[#0E8A44]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Expandable Ventures List */}
                      {mobileVenturesOpen && (
                        <div className="pl-4 py-2 space-y-2 border-l-2 border-emerald-100 ml-2">
                          {FEATURED_VENTURES.map((v) => (
                            <Link
                              key={v.slug}
                              href={v.href}
                              onClick={handleLinkClick}
                              className="flex items-center gap-2.5 py-1 text-[13px] text-[#475569] hover:text-[#0E8A44]"
                            >
                              <div className="w-6 h-6 rounded bg-emerald-50 text-[#0E8A44] flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                                {v.logoUrl ? (
                                  <Image
                                    src={v.logoUrl}
                                    alt={v.title}
                                    width={20}
                                    height={20}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <v.icon className="w-3.5 h-3.5" />
                                )}
                              </div>
                              <div className="truncate">
                                <div className="font-semibold leading-tight truncate">{v.title}</div>
                                <div className="text-[10px] text-gray-400 truncate">{v.category}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.id || link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`py-1.5 transition-colors flex items-center justify-between ${
                      isLinkActive(link.href)
                        ? "text-[#0E8A44] font-bold"
                        : "text-[#475569] hover:text-[#0E8A44]"
                    }`}
                  >
                    <span>{getLabel(link)}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-[#0E8A44] font-semibold border border-emerald-100">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Track Application Status Portal */}
              <Link
                href="/application-status"
                onClick={handleLinkClick}
                className="py-1.5 text-emerald-800 font-semibold flex items-center justify-between border-t border-gray-100 pt-2"
              >
                <span>{language === "bn" ? "আবেদন ট্র্যাকিং পোর্টাল" : "Track Application Status"}</span>
                <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Portal
                </span>
              </Link>
            </nav>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "bn" : "en")}
                className="flex items-center space-x-2 text-sm font-semibold text-[#0D1E2D]"
              >
                <Globe className="w-4 h-4 text-[#0E8A44]" />
                <span>{language === "en" ? "বাংলা সংস্করণ" : "English Version"}</span>
              </button>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="inline-flex items-center space-x-1.5 bg-[#0E8A44] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-sm"
              >
                <span>{language === "bn" ? "যোগাযোগ" : "Get in Touch"}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
