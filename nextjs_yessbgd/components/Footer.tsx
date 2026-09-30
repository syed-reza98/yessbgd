"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
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
  ventures?: unknown[];
}) {
  const { language } = useLanguage();
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to subscribe.";
      setSubError(errorMessage);
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
  const brandName =
    settings?.branding?.legalName ||
    settings?.branding?.companyName ||
    "Yess Bangla Private Limited";

  const defaultVentures = [
    { slug: "shondhaan", title: "Shondhaan", category: "Home & Professional Services" },
    { slug: "yess-organic-haat", title: "Organic Haat", category: "AgriTech & Food" },
    { slug: "yess-soft", title: "Yess Soft", category: "Enterprise Software" },
    { slug: "yess-host", title: "Yess Host", category: "Cloud & Hosting" },
    { slug: "the-daily-akash", title: "The Daily Akash", category: "News & Media" },
    { slug: "akash-tv", title: "Akash TV", category: "Television" },
    { slug: "akash-ott", title: "Akash OTT", category: "Streaming" },
  ];

  const displayedVentures = (ventures && Array.isArray(ventures) && ventures.length > 0)
    ? (ventures as any[]).slice(0, 7)
    : defaultVentures;

  const govLinks = [
    { href: "/about", label: "About YESS Bangla", label_bn: "আমাদের সম্পর্কে" },
    { href: "/about/leadership", label: "Board of Directors", label_bn: "পরিচালনা পর্ষদ" },
    { href: "/about/standards", label: "Impact & Sustainability", label_bn: "টেকসই প্রভাব" },
    { href: "/about/awards", label: "Annual Reports & Awards", label_bn: "বার্ষিক প্রতিবেদন ও সম্মাননা" },
    { href: "/about/methodology", label: "Venture Methodology", label_bn: "ভেঞ্চার পদ্ধতি" },
    { href: "/careers", label: "Careers at YESS", label_bn: "ইয়েস-এ ক্যারিয়ার" },
    { href: "/application-status", label: "Application Tracker", label_bn: "আবেদন ট্র্যাকিং" },
    { href: "/contact", label: "Contact Desks", label_bn: "যোগাযোগ ডেস্ক" },
  ];

  return (
    <footer
      id="contact"
      data-public-footer="true"
      className="bg-[#042017] text-white pt-14 pb-20 lg:pb-8 border-t border-[#093526]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* 5-Column Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 pb-12">
          {/* Column 1: Brand, Original Logo, Registration, Social Media */}
          <div className="lg:pr-8 lg:border-r border-[#0E3D30] flex flex-col justify-between">
            <div>
              {/* Original Corporate Logo with light pill for contrast */}
              <Link href="/" prefetch={false} className="inline-block mb-3.5 group">
                <div className="bg-white/95 hover:bg-white rounded-xl px-3 py-1.5 inline-flex items-center transition-transform group-hover:scale-105 shadow-sm">
                  <Image
                    src={logoUrl}
                    alt={brandName}
                    width={110}
                    height={34}
                    className="h-6 sm:h-7 w-auto object-contain"
                  />
                </div>
              </Link>

              <p className="text-[12px] text-gray-300/80 leading-relaxed mb-4 max-w-[210px]">
                {language === "bn"
                  ? "স্মার্ট বাংলাদেশ বিনির্মাণে প্রযুক্তি, সেবা ও উদ্ভাবনী উদ্যোগ।"
                  : "Building a Smarter Bangladesh Together through technology, enterprise, and people."}
              </p>

              {/* Statutory RJSC Registration Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#082C21] border border-[#144737] text-[11px] text-emerald-300 font-medium mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>RJSC Reg: {regNumber}</span>
              </div>
            </div>

            {/* Social Icon Circles */}
            <div>
              <p className="text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold mb-2.5">
                {language === "bn" ? "সামাজিক মাধ্যম" : "Connect With Us"}
              </p>
              <div className="flex items-center space-x-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0E8A44] hover:bg-[#16A34A] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0E8A44] hover:bg-[#16A34A] flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0E8A44] hover:bg-[#16A34A] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0E8A44] hover:bg-[#16A34A] flex items-center justify-center text-white transition-colors"
                  aria-label="Twitter X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#0E8A44] hover:bg-[#16A34A] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Governance & Institutional Corridors */}
          <div className="lg:px-8 lg:border-r border-[#0E3D30]">
            <h4 className="text-[13.5px] font-bold text-white mb-4">
              {language === "bn" ? "প্রাতিষ্ঠানিক ও পরিচালনা" : "Governance & About"}
            </h4>
            <ul className="space-y-2.5 text-[12.5px] text-gray-300/80">
              {govLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{language === "bn" && item.label_bn ? item.label_bn : item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#22C55E]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ventures & Subsidiaries */}
          <div className="lg:px-8 lg:border-r border-[#0E3D30]">
            <h4 className="text-[13.5px] font-bold text-white mb-4">
              {language === "bn" ? "আমাদের ভেঞ্চারসমূহ" : "Sovereign Ventures"}
            </h4>
            <ul className="space-y-2.5 text-[12.5px] text-gray-300/80">
              {displayedVentures.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/ventures/${item.slug}`}
                    prefetch={false}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#22C55E]" />
                  </Link>
                </li>
              ))}
              <li className="pt-1.5 border-t border-[#0E3D30]">
                <Link
                  href="/ventures"
                  prefetch={false}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span>{language === "bn" ? "সকল ১৩টি ভেঞ্চার দেখুন" : "View All 13 Ventures"}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Corporate Desks */}
          <div className="lg:px-8 lg:border-r border-[#0E3D30]">
            <h4 className="text-[13.5px] font-bold text-white mb-4">
              {language === "bn" ? "কর্পোরেট যোগাযোগ" : "Corporate Desks"}
            </h4>
            <ul className="space-y-3 text-[12.5px] text-gray-300/80">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span>{addressDisplay}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#22C55E] shrink-0" />
                <a
                  href={`tel:${phoneTel}`}
                  className="hover:text-white transition-colors"
                >
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#22C55E] shrink-0" />
                <a
                  href={`mailto:${emailDisplay}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {emailDisplay}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#22C55E] shrink-0" />
                <a
                  href="https://www.yessbd.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.yessbd.com
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#0E3D30]">
              <Link
                href="/application-status"
                prefetch={false}
                className="inline-flex items-center gap-1.5 text-[11.5px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {language === "bn"
                    ? "আবেদন ট্র্যাকিং পোর্টাল →"
                    : "Candidate Tracker Portal →"}
                </span>
              </Link>
            </div>
          </div>

          {/* Column 5: Stay Connected & Newsletter Form */}
          <div className="lg:pl-8">
            <h4 className="text-[13.5px] font-bold text-white mb-2">
              {language === "bn" ? "ইনসাইটস ও সাবস্ক্রিপশন" : "Executive Insights"}
            </h4>
            <p className="text-[12px] text-gray-300/80 leading-relaxed mb-4">
              {language === "bn"
                ? "আমাদের সর্বশেষ গবেষণা, উদ্যোগ ও আপডেট পেতে সাবস্ক্রাইব করুন।"
                : "Receive quarterly macro research, venture briefings, and institutional updates."}
            </p>

            {/* Input Pill with Submit Button */}
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder={
                  language === "bn" ? "কর্পোরেট ইমেইল ঠিকানা" : "corporate.email@domain.com"
                }
                required
                className="w-full bg-[#082C21] border border-[#144737] rounded-full py-2.5 pl-4 pr-11 text-[12px] text-white placeholder-gray-400 focus:outline-none focus:border-[#22C55E] transition-colors"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="absolute right-1 w-8 h-8 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Subscribe to newsletter"
              >
                {subscribing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                )}
              </button>
            </form>
            {subSuccess && (
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {language === "bn"
                  ? "সফলভাবে সাবস্ক্রাইব করা হয়েছে!"
                  : "Subscribed to Institutional Intelligence!"}
              </p>
            )}
            {subError && (
              <p className="text-[11px] text-rose-400 mt-2">{subError}</p>
            )}
          </div>
        </div>

        {/* Bottom Legal Copyright & Policy Compliance Bar */}
        <div className="pt-6 border-t border-[#0E3D30] flex flex-col sm:flex-row items-center justify-between text-[11.5px] text-gray-400 gap-3">
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {footerMenus && footerMenus.length > 0 ? (
              footerMenus.map((link) => (
                <Link
                  key={link.id || link.href}
                  prefetch={false}
                  className="hover:text-white transition-colors"
                  href={link.href}
                >
                  {language === "bn" && link.label_bn ? link.label_bn : link.label}
                </Link>
              ))
            ) : (
              <>
                <Link href="/ventures" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "ভেঞ্চার পোর্টফোলিও" : "Ventures"}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/about/leadership" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "পরিচালনা" : "Governance"}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/about/standards" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "টেকসই নীতি" : "Sustainability"}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/terms" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions"}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/sitemap.xml" prefetch={false} className="hover:text-white transition-colors">
                  {language === "bn" ? "সাইটম্যাপ" : "Sitemap"}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
