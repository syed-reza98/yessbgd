"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { ventures } from "@/data/ventures";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t("nav.home", "Home") },
    { href: "/about", label: t("nav.about", "About") },
    { href: "/ventures", label: t("nav.ventures", "Ventures") },
    { href: "/services", label: t("nav.services", "Services") },
    { href: "/industries", label: t("nav.industries", "Industries") },
    { href: "/insights", label: t("nav.insights", "Insights") },
    { href: "/careers", label: t("nav.careers", "Careers") },
    { href: "/contact", label: t("nav.contact", "Contact") },
  ];

  return (
    <>
      {/* 1. Top Utility Ribbon */}
      <div className="bg-[#061a1b] text-white/80 text-[12px] py-1.5 px-4 border-b border-white/10 hidden sm:block relative z-50">
        <div className="container-tight flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dhaka BST Operational</span>
              <span className="text-white/40">|</span>
              <span>Motijheel HQ & Gulshan Innovation Wing</span>
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span>Statutory RJSC Reg: C-184920</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+8801805464343"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-accent" />
              <span>+880 1805-464343</span>
            </a>
            <span className="text-white/30">|</span>
            <Link
              href="/application-status"
              className="hover:text-primary-glow font-medium transition-colors"
            >
              Track Application
            </Link>
            <span className="text-white/30">|</span>
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 active:scale-95"
              aria-label="Toggle Language"
            >
              <Globe className="h-3 w-3 text-accent" />
              <span>{language === "en" ? "বাংলা" : "EN"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Floating Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#061a1b]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-white/15"
            : "bg-[#061a1b]/90 backdrop-blur-md py-3.5 border-b border-white/10"
        }`}
      >
        <div className="container-tight flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-white shadow-sm border border-white/20">
              <Image
                src="/assets/yess-bangla-logo.png"
                alt="YESS Bangladesh"
                width={130}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col pl-2 border-l border-white/20">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white leading-none">
                YESS <span className="text-emerald-400 font-bold">Bangladesh</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-[#f87171] font-bold mt-0.5">
                Venture Builder • Sovereign Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-white bg-emerald-500/20 border border-emerald-500/40 font-semibold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/application-status"
              className="text-xs font-semibold px-3 py-2 rounded-xl text-[#d4a359] bg-[#d4a359]/10 hover:bg-[#d4a359]/20 transition-all border border-[#d4a359]/30 hidden xl:flex items-center gap-1.5"
            >
              <span>Track Status</span>
            </Link>

            <Link
              href="/contact"
              className="text-xs sm:text-sm font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white hover:from-[#006A4E] hover:to-[#085252] shadow-md shadow-emerald-950/40 hover:shadow-emerald-950/60 transition-all flex items-center gap-1.5 group"
            >
              <span>Let's Talk</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Bar: Language Toggle + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="px-2 py-1 text-xs rounded-lg border border-white/20 bg-white/10 font-bold text-white"
            >
              {language === "en" ? "বাংলা" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-white/20 bg-white/10 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] bottom-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border p-6 overflow-y-auto flex flex-col gap-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/application-status"
              className="px-4 py-3 rounded-xl text-base font-semibold text-primary bg-primary/10 border border-primary/20 mt-2 flex items-center justify-between"
            >
              <span>Track Application Status</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20">Portal</span>
            </Link>
            <Link
              href="/faq"
              className="px-4 py-3 rounded-xl text-base font-semibold text-foreground/80 hover:bg-secondary"
            >
              FAQ & Knowledge Base
            </Link>
          </nav>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
              Direct Corporate Desks
            </p>
            <a
              href="tel:+8801805464343"
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-foreground text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>+880 1805-464343 (Dhaka HQ)</span>
            </a>
            <a
              href="mailto:yessbangla.bd@gmail.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-foreground text-sm font-medium"
            >
              <Mail className="h-4 w-4 text-primary" />
              <span>yessbangla.bd@gmail.com</span>
            </a>
          </div>

          <div className="mt-auto pt-4">
            <Link
              href="/contact"
              className="w-full text-center py-3.5 rounded-xl bg-primary text-white font-bold block shadow-md"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
