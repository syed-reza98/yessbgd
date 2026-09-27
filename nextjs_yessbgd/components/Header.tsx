"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  Code2,
  Tv,
  PlayCircle,
  Newspaper,
  Leaf,
  Wrench,
  Server,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const FEATURED_VENTURES = [
  {
    slug: "yess-service",
    title: "Shondhaan",
    category: "Home & Professional Services",
    icon: Wrench,
    logoUrl: "/coins/shondhaan.png",
    color: "from-blue-500/10 to-indigo-500/10 text-indigo-700",
    href: "/ventures",
  },
  {
    slug: "yess-organic-haat",
    title: "Organic Haat",
    category: "Organic Marketplace",
    icon: Leaf,
    logoUrl: "/coins/yess-organic-haat.png",
    color: "from-emerald-500/10 to-green-500/10 text-emerald-700",
    href: "/ventures",
  },
  {
    slug: "yess-host",
    title: "Yess Host",
    category: "Hosting & Cloud Infrastructure",
    icon: Server,
    color: "from-teal-500/10 to-cyan-500/10 text-teal-700",
    href: "/ventures",
  },
  {
    slug: "akash-ott",
    title: "Akash OTT",
    category: "Streaming Platform",
    icon: PlayCircle,
    logoUrl: "/coins/akash-ott.png",
    color: "from-sky-500/10 to-blue-500/10 text-sky-700",
    href: "/services/akash-ott",
  },
  {
    slug: "yess-soft",
    title: "Yess Soft",
    category: "Software & IT Solutions",
    icon: Code2,
    logoUrl: "/coins/yess-soft.png",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-700",
    href: "/ventures/yess-soft",
  },
  {
    slug: "the-daily-akash",
    title: "The Daily Akash",
    category: "Digital Newspaper",
    icon: Newspaper,
    logoUrl: "/coins/the-daily-akash.png",
    color: "from-amber-500/10 to-orange-500/10 text-amber-700",
    href: "/ventures",
  },
];

import type { CmsMenuItem, CompanySettings } from "@/lib/cms";

export function Header({
  headerMenus,
  settings,
  ventures,
}: {
  headerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}) {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileVenturesOpen, setMobileVenturesOpen] = useState(false);
  const [venturesDropdownOpen, setVenturesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setVenturesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

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

  // Dynamic Navigation from CMS with fallback
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

  // Active ventures to display in mega-menu
  const displayVentures = ventures && ventures.length > 0
    ? ventures.slice(0, 6).map((v: any) => ({
        slug: v.slug,
        title: v.title,
        category: v.category,
        icon: Wrench,
        logoUrl: v.logoUrl || v.image || `/coins/${v.slug}.png`,
        href: `/ventures/${v.slug}`,
      }))
    : FEATURED_VENTURES;

  // Contact & Brand settings
  const phoneDisplay = settings?.contact?.phone || "+880 1805-464343";
  const phoneTel = phoneDisplay.replace(/[^0-9+]/g, "");
  const regNumber = settings?.branding?.registrationNo || "C-184920";
  const logoUrl = settings?.branding?.logoUrl || "/assets/yess-bangla-logo.png";
  const brandName = settings?.branding?.legalName || "Yess Bangla Private Limited";

  const isVenturesLink = (link: { href: string }) =>
    link.href === "/ventures" || link.href.startsWith("/ventures");


  return (
    <>
      {/* 1. Top Utility Ribbon */}
      <div className="bg-emerald-50/90 text-emerald-900 text-[11px] py-1.5 px-4 border-b border-emerald-200/80 hidden sm:block relative z-50">
        <div className="container-tight flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-900/90 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                {language === "bn" && settings?.header?.ribbonTextBn
                  ? settings.header.ribbonTextBn
                  : settings?.header?.ribbonTextEn || "Dhaka BST Operational"}
              </span>
              <span className="text-emerald-300">|</span>
              <span>{language === "bn" ? "ঢাকা কর্পোরেট হেডকোয়ার্টার" : (settings?.offices?.headquarters?.name || "Dhaka Corporate Headquarters")}</span>
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
              <span>Statutory RJSC Reg: {regNumber}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors text-emerald-900 font-medium"
            >
              <Phone className="h-3 w-3 text-amber-700" />
              <span>{phoneDisplay}</span>
            </a>
            <span className="text-emerald-300">|</span>
            <Link
              href={settings?.header?.trackStatusHref || "/application-status"}
              className="hover:text-emerald-700 font-medium transition-colors text-emerald-900"
            >
              {language === "bn" && settings?.header?.trackStatusTextBn
                ? settings.header.trackStatusTextBn
                : settings?.header?.trackStatusTextEn || "Track Application"}
            </Link>
            <span className="text-emerald-300">|</span>
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 hover:bg-emerald-200/80 text-emerald-900 font-semibold transition-all border border-emerald-300/80 active:scale-95 cursor-pointer"
              aria-label={`Toggle Language (${language === "en" ? "বাংলা" : "EN"})`}
            >
              <Globe className="h-3 w-3 text-amber-700" />
              <span>{language === "en" ? "বাংলা" : "EN"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Floating Island Header */}
      <header
        data-public-header="true"
        className="sticky top-0 z-40 transition-all duration-300 pointer-events-none px-3 sm:px-6 pt-2.5 -mb-[64px] sm:-mb-[92px]"
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl lg:rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-slate-900/5 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 pointer-events-auto ${
            scrolled ? "shadow-2xl shadow-slate-950/15 border-slate-300/90 bg-white" : ""
          }`}
        >
          {/* Brand Logo & Corporate Moniker */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src={logoUrl}
                alt={brandName}
                width={130}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain"
                style={{ width: "auto", height: "auto" }}
                sizes="130px"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col pl-3 border-l border-slate-200 text-left">
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 leading-tight">
                {brandName}
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
                Where Solution Begins
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 relative">
            {rawNavLinks.map((link) => {
              if (isVenturesLink(link)) {
                return (
                  <div
                    key={link.id || link.href}
                    className="relative"
                    onMouseEnter={handleMouseEnterVentures}
                    onMouseLeave={handleMouseLeaveVentures}
                  >
                    <button
                      type="button"
                      onClick={() => setVenturesDropdownOpen(!venturesDropdownOpen)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                        pathname === "/ventures" || pathname.startsWith("/ventures/") || venturesDropdownOpen
                          ? "text-emerald-700 bg-emerald-50 shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                      aria-expanded={venturesDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{getLabel(link)}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-900 font-bold">
                          {link.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          venturesDropdownOpen ? "rotate-180 text-emerald-700" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {venturesDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] xl:w-[620px] bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                        onMouseEnter={handleMouseEnterVentures}
                        onMouseLeave={handleMouseLeaveVentures}
                      >
                        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#d4a359]" />
                            <span>Our Flagship Subsidiaries</span>
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {ventures?.length || 13} Sovereign Assets
                          </span>
                        </div>

                        {/* 2-Column Grid matching reference UI */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {displayVentures.map((v) => {
                            const Icon = (v as any).icon || Wrench;
                            return (
                              <Link
                                key={v.slug}
                                href={v.href || `/ventures/${v.slug}`}
                                className="group p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all flex items-center gap-3 text-left"
                              >
                                <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:shadow-sm transition-all shrink-0">
                                  {v.logoUrl ? (
                                    <Image
                                      src={v.logoUrl}
                                      alt={v.title}
                                      width={36}
                                      height={36}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <Icon className="w-5 h-5 text-teal-700" />
                                  )}
                                </div>
                                <div className="flex flex-col truncate">
                                  <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                    {v.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                                    {v.category}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Footer Link */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500">
                            Looking for custom enterprise partnerships?
                          </span>
                          <Link
                            href="/ventures"
                            className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                          >
                            <span>Explore all {ventures?.length || 13} ventures</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.id || link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                    isActive
                      ? "text-emerald-700 bg-emerald-50 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{getLabel(link)}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>


          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={settings?.header?.trackStatusHref || "/application-status"}
              className="text-xs font-semibold px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all hidden xl:flex items-center gap-1.5"
            >
              <span>
                {language === "bn" && settings?.header?.trackStatusTextBn
                  ? settings.header.trackStatusTextBn
                  : settings?.header?.trackStatusTextEn || "Track Status"}
              </span>
            </Link>

            <Link
              href={settings?.header?.ribbonCtaHref || "/contact"}
              className="text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] hover:from-[#006A4E] hover:to-[#085252] text-white shadow-md shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all flex items-center gap-1.5 active:scale-95 group"
            >
              <span>
                {language === "bn" && settings?.header?.ribbonCtaTextBn
                  ? settings.header.ribbonCtaTextBn
                  : settings?.header?.ribbonCtaTextEn || "Let's Talk"}
              </span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Bar: Language Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="min-h-[44px] px-3.5 py-2 text-xs rounded-full border border-slate-200 bg-slate-100 font-bold text-slate-700 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
              aria-label={`Switch to ${language === "en" ? "Bengali" : "English"}`}
            >
              {language === "en" ? "বাংলা" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[48px] min-h-[48px] p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Backdrop Scrim */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 4. Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-x-3 top-[72px] max-h-[calc(100dvh-92px)] z-[60] bg-white/98 backdrop-blur-2xl border border-slate-200 shadow-2xl rounded-3xl p-6 pb-12 overflow-y-auto flex flex-col gap-5 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav className="flex flex-col gap-1.5">
            {rawNavLinks.map((link) => {
              if (isVenturesLink(link)) {
                return (
                  <div key={link.id || link.href} className="rounded-xl border border-slate-200/80 overflow-hidden my-1">
                    <button
                      type="button"
                      onClick={() => setMobileVenturesOpen(!mobileVenturesOpen)}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-sm font-bold text-slate-800 bg-slate-50/70"
                    >
                      <span>{getLabel(link)} ({ventures?.length || 13} Subsidiaries)</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileVenturesOpen ? "rotate-180 text-emerald-700" : "text-slate-400"
                        }`}
                      />
                    </button>
                    {mobileVenturesOpen && (
                      <div className="p-3 bg-white space-y-1.5 border-t border-slate-200/80">
                        {displayVentures.map((v) => (
                          <Link
                            key={v.slug}
                            href={v.href || `/ventures/${v.slug}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800"
                          >
                            <span>{v.title}</span>
                            <span className="text-[10px] text-slate-500">{v.category}</span>
                          </Link>
                        ))}
                        <Link
                          href="/ventures"
                          className="block pt-2 text-center text-xs font-bold text-emerald-700 hover:underline"
                        >
                          View All {ventures?.length || 13} Ventures →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.id || link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{getLabel(link)}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              href="/application-status"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-700 bg-emerald-50/70 border border-emerald-200 mt-2 flex items-center justify-between"
            >
              <span>Track Application Status</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 font-bold">
                Portal
              </span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              Direct Corporate Desks
            </p>
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-700" />
              <span>{phoneDisplay} (Direct)</span>
            </a>
            <a
              href={`mailto:${settings?.contact?.email || "yessbangla.bd@gmail.com"}`}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              <Mail className="h-3.5 w-3.5 text-emerald-700" />
              <span>{settings?.contact?.email || "yessbangla.bd@gmail.com"}</span>
            </a>
          </div>


          <div className="pt-2 pb-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-full bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white font-bold text-sm block shadow-md shadow-emerald-900/20 active:scale-95 transition-transform"
            >
              Let's Talk — Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
