"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const addressDisplay =
    (language === "bn" ? settings?.contact?.addressBn : settings?.contact?.address) ||
    settings?.offices?.headquarters?.address ||
    settings?.contact?.address ||
    "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)";
  const regNumber = settings?.branding?.registrationNo || "C-184920";
  const logoUrl = settings?.branding?.logoUrl || "/assets/yess-bangla-logo.png";
  const brandName = settings?.branding?.legalName || settings?.branding?.companyName || "Yess Bangla Private Limited";

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
    <footer data-public-footer="true" className="bg-slate-50 text-slate-700 border-t border-slate-200/90 pt-16 pb-24 lg:pb-12 relative z-10">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Headquarters */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={brandName}
                  width={130}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col pl-3 border-l border-slate-200 text-left">
                <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 leading-tight">
                  {brandName}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">
                  Where Solution Begins
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 max-w-sm mt-1">
              {language === "bn" && settings?.footer?.missionNarrativeBn
                ? settings.footer.missionNarrativeBn
                : settings?.footer?.missionNarrativeEn ||
                  "Pioneering institutional venture building, engineering resilient technological backbone infrastructures, and empowering youth-led socioeconomic transformation across South Asia."}
            </p>

            <div className="flex flex-col gap-2.5 mt-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">
                    {language === "bn" ? "কর্পোরেট হেডকোয়ার্টার:" : "Corporate Headquarters:"}
                  </span>
                  <span>{addressDisplay}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="h-4 w-4 text-amber-600 shrink-0" />
                <a href={`tel:${phoneTel}`} className="hover:text-emerald-700 transition-colors">
                  {phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-700 shrink-0" />
                <a href={`mailto:${emailDisplay}`} className="hover:text-emerald-700 transition-colors">
                  {emailDisplay}
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 w-fit text-xs text-slate-600 mt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Registration: RJSC GovBD / {regNumber} • Founded in Dhaka</span>
            </div>

            {settings?.socials && (
              <div className="flex items-center gap-3 pt-2 text-slate-500">
                {settings.socials.linkedin && (
                  <a
                    href={settings.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors text-xs font-semibold"
                  >
                    LinkedIn
                  </a>
                )}
                {settings.socials.twitter && (
                  <a
                    href={settings.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors text-xs font-semibold"
                  >
                    X (Twitter)
                  </a>
                )}
                {settings.socials.youtube && (
                  <a
                    href={settings.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors text-xs font-semibold"
                  >
                    YouTube
                  </a>
                )}
                {settings.socials.facebook && (
                  <a
                    href={settings.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors text-xs font-semibold"
                  >
                    Facebook
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Sovereign Ventures Portfolio */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-amber-700">
              {settings?.footer?.colTitles?.ventures || "Ventures"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {displayVentures.map((v: any) => (
                <li key={v.slug}>
                  <Link
                    href={`/ventures/${v.slug}`}
                    className="hover:text-emerald-700 transition-colors flex items-center justify-between group"
                  >
                    <span>{v.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ventures" className="text-emerald-700 font-semibold hover:underline block pt-1">
                  All {ventures?.length || 13} Subsidiaries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Governance & Policy */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-amber-700">
              {settings?.footer?.colTitles?.governance || "Governance"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {govLinks.map((link: any) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-700 transition-colors">
                    {language === "bn" && link.label_bn ? link.label_bn : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Headquarters & Executive Dispatch Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-3" id="contact">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-amber-700">
              {language === "bn" && settings?.footer?.newsletterTitleBn
                ? settings.footer.newsletterTitleBn
                : settings?.footer?.newsletterTitleEn || settings?.footer?.colTitles?.headquarters || "Headquarters & Insights"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "bn" && settings?.footer?.newsletterDescBn
                ? settings.footer.newsletterDescBn
                : settings?.footer?.newsletterDescEn ||
                  "Quarterly macro research, policy briefings, and sovereign technology dispatches delivered to institutional partners."}
            </p>

            {/* Newsletter Subscribe Box with Real DB Action */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <label htmlFor="footer-sub-email" className="text-[11px] text-slate-500 font-medium">
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
                  className="bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 w-full"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-4 py-2 rounded-xl bg-[#008744] hover:bg-[#059669] text-white font-bold text-xs shadow-xs transition-all whitespace-nowrap active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {subscribing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{subscribing ? "Joining..." : "Subscribe"}</span>
                </button>
              </div>
              {subSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-1 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Subscribed to YESS Institutional Intelligence!</span>
                </div>
              )}
              {subError && (
                <span className="text-xs text-rose-600 mt-1">{subError}</span>
              )}
            </form>

            <div className="pt-2">
              <Link
                href={settings?.footer?.candidateTrackerHref || "/application-status"}
                className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-semibold hover:underline"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>
                  {language === "bn" && settings?.footer?.candidateTrackerLabelBn
                    ? settings.footer.candidateTrackerLabelBn
                    : settings?.footer?.candidateTrackerLabelEn || "Candidate Application Tracker →"}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {currentYear} {brandName}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
            {footerMenus && footerMenus.length > 0 ? (
              footerMenus.map((link: any) => (
                <Link
                  key={link.id || link.href}
                  className="hover:text-emerald-700 transition-colors"
                  href={link.href}
                >
                  {language === "bn" && link.label_bn ? link.label_bn : link.label}
                </Link>
              ))
            ) : (
              <>
                <Link className="hover:text-emerald-700 transition-colors" href="/ventures">
                  Ventures Portfolio
                </Link>
                <Link className="hover:text-emerald-700 transition-colors" href="/about/leadership">
                  Corporate Governance
                </Link>
                <Link className="hover:text-emerald-700 transition-colors" href="/about/standards">
                  Impact & Sustainability
                </Link>
                <Link className="hover:text-emerald-700 transition-colors" href="/about/awards">
                  Annual Reports
                </Link>
                <Link className="hover:text-emerald-700 transition-colors" href="/privacy">
                  Privacy Policy
                </Link>
                <Link className="hover:text-emerald-700 transition-colors" href="/terms">
                  Terms of Service
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

