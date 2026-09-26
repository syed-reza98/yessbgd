"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#061a1b] text-white/90 border-t border-white/10 pt-16 pb-24 lg:pb-12 relative z-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white shadow-sm border border-white/20">
                <img
                  src="/assets/yess-bangla-logo.png"
                  alt="YESS Bangladesh"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col pl-2 border-l border-white/20">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  YESS <span className="text-emerald-400 font-bold">Bangladesh</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#f87171] font-semibold">
                  Sovereign Enterprise Studio
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/70 max-w-sm mt-1">
              Pioneering institutional venture building, engineering resilient technological backbone infrastructures, and empowering youth-led socioeconomic transformation across South Asia.
            </p>

            <div className="flex flex-col gap-2 mt-2 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#d4a359] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Dhaka Corporate HQ:</span>
                  <span>Suite 804, City Center Tower, Motijheel C/A, Dhaka-1000</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#35b0aa] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Regional Innovation Lab:</span>
                  <span>Gulshan-2, Dhaka-1212, Bangladesh</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="h-4 w-4 text-[#d4a359] shrink-0" />
                <a href="tel:+8801805464343" className="hover:text-white transition-colors">
                  +880 1805-464343
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#35b0aa] shrink-0" />
                <a href="mailto:yessbangla.bd@gmail.com" className="hover:text-white transition-colors">
                  yessbangla.bd@gmail.com
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit text-xs text-white/60 mt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Registration: RJSC GovBD / C-184920 • Founded in Dhaka</span>
            </div>
          </div>

          {/* Column 2: Sovereign Ventures Portfolio */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#d4a359]">
              Ventures
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/ventures/yess-soft" className="hover:text-[#d4a359] transition-colors flex items-center justify-between group">
                  <span>Yess Soft (ERP)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-[#d4a359] transition-colors">
                  Shondhaan Search
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-[#d4a359] transition-colors">
                  Organic Haat Agro
                </Link>
              </li>
              <li>
                <Link href="/services/akash-ott" className="hover:text-[#d4a359] transition-colors flex items-center justify-between group">
                  <span>Akash OTT Media</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-[#d4a359] transition-colors">
                  Yess FinCorp
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-[#d4a359] transition-colors">
                  DeshLogix Express
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="text-emerald-400 font-semibold hover:underline block pt-1">
                  All 13 Subsidiaries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Governance & Policy */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#d4a359]">
              Governance
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/about/leadership" className="hover:text-[#d4a359] transition-colors">
                  Board of Directors
                </Link>
              </li>
              <li>
                <Link href="/about/standards" className="hover:text-[#d4a359] transition-colors">
                  Impact & Sustainability
                </Link>
              </li>
              <li>
                <Link href="/about/awards" className="hover:text-[#d4a359] transition-colors">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#d4a359] transition-colors">
                  Careers at YESS
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#d4a359] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#d4a359] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Executive Dispatch Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-3" id="contact">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#d4a359]">
              Headquarters & Insights
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Quarterly macro research, policy briefings, and sovereign technology dispatches delivered to institutional partners.
            </p>
            {/* Inline Newsletter Subscribe Box */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mt-1">
              <label htmlFor="footer-sub-email" className="text-[11px] text-white/60">
                Executive Briefing & Sector Reports
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="footer-sub-email"
                  type="email"
                  placeholder="corporate.email@domain.com"
                  className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#35b0aa] w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#008744] hover:bg-[#059669] text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap active:scale-95"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="pt-2">
              <Link
                href="/application-status"
                className="inline-flex items-center gap-1.5 text-xs text-[#d4a359] hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Candidate Application Tracker →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            © 2025 YESS Bangladesh (yessbgd). All rights reserved. Pioneering institutional venture building.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            <Link className="hover:text-[#d4a359] transition-colors" href="/ventures">
              Ventures Portfolio
            </Link>
            <Link className="hover:text-[#d4a359] transition-colors" href="/about/leadership">
              Corporate Governance
            </Link>
            <Link className="hover:text-[#d4a359] transition-colors" href="/about/standards">
              Impact & Sustainability
            </Link>
            <Link className="hover:text-[#d4a359] transition-colors" href="/about/awards">
              Annual Reports
            </Link>
            <Link className="hover:text-[#d4a359] transition-colors" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-[#d4a359] transition-colors" href="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
