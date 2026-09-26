"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#061a1b] text-white/90 border-t border-white/10 pt-16 pb-24 lg:pb-12 relative z-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Headquarters */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow p-0.5 flex items-center justify-center">
                <div className="h-full w-full bg-[#061a1b] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-base tracking-tighter text-accent">
                    YB
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  YESS <span className="text-primary-glow font-bold">Bangladesh</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-white/50 font-semibold">
                  Sovereign Enterprise Studio
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-white/70 max-w-sm mt-1">
              Building national digital infrastructure, enterprise software systems, media OTT platforms, and cold-chain agritech networks across all 64 districts of Bangladesh.
            </p>

            <div className="flex flex-col gap-2.5 mt-2 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>
                  Office: Block-A, Road-3, House-127 (Green View), Mirpur-12, Dhaka-1216
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:+8801805464343" className="hover:text-white transition-colors">
                  +880 1805-464343
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:yessbangla.bd@gmail.com" className="hover:text-white transition-colors">
                  yessbangla.bd@gmail.com
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit text-xs text-white/60 mt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>RJSC Registration: C-184920</span>
            </div>
          </div>

          {/* Col 3: Subsidiary Ventures */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Ventures
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/ventures/yess-soft" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Yess Soft Ltd.</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/services/akash-ott" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Akash OTT Media</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-white transition-colors">
                  Shondhaan Portal
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-white transition-colors">
                  YESS Organic Haat
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="hover:text-white transition-colors">
                  DeshLogix Freight
                </Link>
              </li>
              <li>
                <Link href="/ventures" className="text-primary-glow font-semibold hover:underline">
                  All 13 Subsidiaries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Disciplines & Solutions */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Enterprise Cloud & AI
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Bespoke Software & ERP
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  OTT & Media Distribution
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing" className="hover:text-white transition-colors">
                  Manufacturing & RMG IoT
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Turnkey EPC Architecture
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Industries Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Portal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Governance
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About the Group
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="hover:text-white transition-colors">
                  Executive Leadership & Board
                </Link>
              </li>
              <li>
                <Link href="/about/methodology" className="hover:text-white transition-colors">
                  Engineering Methodology
                </Link>
              </li>
              <li>
                <Link href="/about/awards" className="hover:text-white transition-colors">
                  Awards & Accreditations
                </Link>
              </li>
              <li>
                <Link href="/application-status" className="hover:text-white transition-colors flex items-center gap-1.5 text-primary-glow font-medium">
                  <span>Candidate Status Tracker</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Knowledge Base
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} YESS Bangla Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
