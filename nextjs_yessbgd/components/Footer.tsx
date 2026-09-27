"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { CmsMenuItem, CompanySettings } from "@/lib/cms";
import { subscribeNewsletterAction } from "@/app/admin/actions";

export function Footer({
  footerMenus,
  settings,
  ventures,
}: {
  footerMenus?: CmsMenuItem[];
  settings?: CompanySettings;
  ventures?: any[];
}) {
  const { t, language } = useLanguage();
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes("@")) return;

    setSubscribing(true);
    setSubError(null);
    try {
      await subscribeNewsletterAction(subEmail, "footer");
      setSubSuccess(true);
      setSubEmail("");
      setTimeout(() => setSubSuccess(false), 5000);
    } catch (err: any) {
      setSubError(err.message || "Failed to subscribe.");
    } finally {
      setSubscribing(false);
    }
  };

  const phoneDisplay = settings?.contact?.phone || "+880 1805-464343";
  const phoneTel = phoneDisplay.replace(/[^0-9+]/g, "");
  const emailDisplay = settings?.contact?.email || "yessbangla.bd@gmail.com";
  const hqAddress = settings?.offices?.motijheel?.address || settings?.contact?.address || "Suite 804, City Center Tower, Motijheel C/A, Dhaka-1000";
  const labAddress = settings?.offices?.gulshan?.address || "Gulshan-2, Dhaka-1212, Bangladesh";
  const regNumber = settings?.branding?.registrationNo || "C-184920";
  const logoUrl = settings?.branding?.logoUrl || "/assets/yess-bangla-logo.png";
  const brandName = settings?.branding?.companyName || "YESS Bangladesh";
  const legalName = settings?.branding?.legalName || "Yess Bangla Private Limited";

  const displayVentures = ventures && ventures.length > 0 ? ventures.slice(0, 6) : [
    { slug: "yess-soft", title: "Yess Soft (ERP)" },
    { slug: "shondhaan", title: "Shondhaan Search" },
    { slug: "yess-organic-haat", title: "Organic Haat Agro" },
    { slug: "akash-ott", title: "Akash OTT Media" },
    { slug: "yess-fincorp", title: "Yess FinCorp" },
    { slug: "deshlogix", title: "DeshLogix Express" },
  ];

  const defaultGovLinks = [
    { href: "/about/leadership", label: "Board of Directors", label_bn: "পরিচালনা পর্ষদ" },
    { href: "/about/standards", label: "Impact & Sustainability", label_bn: "টেকসই প্রভাব" },
    { href: "/about/awards", label: "Annual Reports & Awards", label_bn: "বার্ষিক প্রতিবেদন ও সম্মাননা" },
    { href: "/careers", label: "Careers at YESS", label_bn: "ইয়েস-এ ক্যারিয়ার" },
    { href: "/privacy", label: "Privacy Policy", label_bn: "গোপনীয়তা নীতি" },
    { href: "/terms", label: "Terms of Service", label_bn: "ব্যবহারের শর্তাবলী" },
  ];

  const govLinks = footerMenus && footerMenus.length > 0 ? footerMenus : defaultGovLinks;

  const currentYear = new Date().getFullYear();

  return (
    <footer data-public-footer="true" className="bg-[#061a1b] text-white/90 border-t border-white/10 pt-16 pb-24 lg:pb-12 relative z-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white shadow-sm border border-white/20">
                <img
                  src={logoUrl}
                  alt={brandName}
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
                  <span className="font-semibold text-white block">
                    {settings?.offices?.motijheel?.name || "Dhaka Corporate HQ"}:
                  </span>
                  <span>{hqAddress}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#35b0aa] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {settings?.offices?.gulshan?.name || "Regional Innovation Lab"}:
                  </span>
                  <span>{labAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="h-4 w-4 text-[#d4a359] shrink-0" />
                <a href={`tel:${phoneTel}`} className="hover:text-white transition-colors">
                  {phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#35b0aa] shrink-0" />
                <a href={`mailto:${emailDisplay}`} className="hover:text-white transition-colors">
                  {emailDisplay}
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit text-xs text-white/60 mt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Registration: RJSC GovBD / {regNumber} • Founded in Dhaka</span>
            </div>
          </div>

          {/* Column 2: Sovereign Ventures Portfolio */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#d4a359]">
              Ventures
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              {displayVentures.map((v: any) => (
                <li key={v.slug}>
                  <Link
                    href={`/ventures/${v.slug}`}
                    className="hover:text-[#d4a359] transition-colors flex items-center justify-between group"
                  >
                    <span>{v.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ventures" className="text-emerald-400 font-semibold hover:underline block pt-1">
                  All {ventures?.length || 13} Subsidiaries →
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
              {govLinks.map((link: any) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#d4a359] transition-colors">
                    {language === "bn" && link.label_bn ? link.label_bn : link.label}
                  </Link>
                </li>
              ))}
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

            {/* Newsletter Subscribe Box with Real DB Action */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <label htmlFor="footer-sub-email" className="text-[11px] text-white/60">
                Executive Briefing & Sector Reports
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="footer-sub-email"
                  type="email"
                  required
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="corporate.email@domain.com"
                  className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#35b0aa] w-full"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-4 py-2 rounded-xl bg-[#008744] hover:bg-[#059669] text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {subscribing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{subscribing ? "Joining..." : "Subscribe"}</span>
                </button>
              </div>
              {subSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Subscribed to YESS Institutional Intelligence!</span>
                </div>
              )}
              {subError && (
                <span className="text-xs text-rose-400 mt-1">{subError}</span>
              )}
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
            © {currentYear} {brandName} ({legalName}). All rights reserved.
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

