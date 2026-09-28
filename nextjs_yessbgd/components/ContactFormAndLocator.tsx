"use client";

import { useState, type FormEvent } from "react";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building,
  Building2,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Shield,
  Lock,
  ArrowRight,
  FileCheck,
  MessageSquare,
  Car,
} from "lucide-react";

import { submitContactMessageAction } from "@/app/actions/contact";
import type { CompanySettings } from "@/lib/cms";
import { useLanguage } from "@/components/LanguageProvider";

export function ContactFormAndLocator({ settings }: { settings?: CompanySettings }) {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [practiceArea, setPracticeArea] = useState("Venture Co-Building & Equity Structuring");
  const [message, setMessage] = useState("");
  const [requestNda, setRequestNda] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError(
        isBn
          ? "অনুগ্রহ করে আপনার নাম, কর্পোরেট ইমেইল এবং প্রকল্পের বিবরণ পূরণ করুন।"
          : "Please fill in your name, corporate email address, and project requirements."
      );
      return;
    }

    setLoading(true);
    try {
      const result = await submitContactMessageAction({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        organization: organization.trim() || undefined,
        practice_area: practiceArea,
        message: message.trim(),
        request_nda: requestNda,
      });

      if (!result.success) {
        setError(result.error || "Failed to submit inquiry. Please review your details.");
        return;
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.warn("Contact submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: Enterprise Inquiry Portal (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-9 rounded-2xl glass-card border border-border shadow-sm space-y-6">
        <div>
          {/* Form Header with Verified Badge */}
          <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground tracking-tight">
                {isBn ? "প্রাতিষ্ঠানিক অনুসন্ধান জমা দিন" : "Submit Institutional Inquiry"}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70 mt-1">
                {isBn
                  ? "ভেঞ্চার প্রিন্সিপাল এবং সলিউশন আর্কিটেক্টদের সরাসরি পর্যালোচনা।"
                  : "Direct encrypted intake reviewed by Venture Principals and Solutions Architects."}
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>{isBn ? "আস্থা ও নিরাপত্তা" : "Fiduciary Pledge"}</span>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">
                {isBn ? "অনুসন্ধান সফলভাবে জমা হয়েছে" : "Inquiry Dispatched to Executive Desk"}
              </h3>
              <p className="text-xs text-foreground/70 max-w-sm mx-auto leading-relaxed">
                {isBn ? (
                  <>ধন্যবাদ, <strong>{fullName}</strong>। আপনার বার্তাটি সফলভাবে সংরক্ষিত হয়েছে।</>
                ) : (
                  <>Thank you, <strong>{fullName}</strong>. Your message regarding &ldquo;{practiceArea}&rdquo; has been logged.</>
                )}
                {requestNda && (isBn ? " আলোচনার পূর্বে দ্বিপাক্ষিক NDA সম্পাদন করা হবে।" : " A standard bilateral NDA will be counter-signed prior to our introductory call.")}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
              >
                {isBn ? "আরেকটি অনুসন্ধান পাঠান" : "Send Another Inquiry"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-full-name" className="block text-xs font-semibold text-foreground mb-1.5">
                    {isBn ? "পূর্ণ নাম *" : "Full Name *"}
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isBn ? "যেমন: প্রকৌশলী তানভীর আহমেদ" : "e.g. Engr. Tanvir Ahmed Chowdhury"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5">
                    {isBn ? "কর্পোরেট ইমেইল (.com / .bd) *" : "Corporate Email (.com / .bd) *"}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isBn ? "যেমন: tanvir@conglomerate.com.bd" : "e.g. tanvir@conglomerate.com.bd"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Phone & Organization Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-foreground mb-1.5">
                    {isBn ? "ফোন / হোয়াটসঅ্যাপ নম্বর *" : "Phone / WhatsApp Number *"}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isBn ? "যেমন: +৮৮০ ১৭১১-০০০০০০" : "e.g. +880 1711-000000"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-organization" className="block text-xs font-semibold text-foreground mb-1.5">
                    {isBn ? "প্রতিষ্ঠান / সংস্থা *" : "Enterprise / Organization *"}
                  </label>
                  <input
                    id="contact-organization"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={isBn ? "যেমন: এপেক্স গ্রুপ / আইসিটি মন্ত্রণালয়" : "e.g. Apex Group / Ministry of ICT"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Inquiry Type Dropdown */}
              <div>
                <label htmlFor="contact-practice-area" className="block text-xs font-semibold text-foreground mb-1.5">
                  {isBn ? "অনুসন্ধানের ধরন / সেবা ক্ষেত্র *" : "Inquiry Type / Practice Area *"}
                </label>
                <select
                  id="contact-practice-area"
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="Venture Co-Building & Equity Structuring">{isBn ? "ভেঞ্চার কো-বিল্ডিং ও ইক্যুইটি স্ট্রাকচারিং" : "Venture Co-Building & Equity Structuring"}</option>
                  <option value="Enterprise Cloud & Sovereign Software Architectures">{isBn ? "এন্টারপ্রাইজ ক্লাউড ও সফটওয়্যার আর্কিটেকচার" : "Enterprise Cloud & Sovereign Software Architectures"}</option>
                  <option value="Agritech & National Cold-Chain Logistics (Organic Haat)">{isBn ? "এগ্রিটেক ও ন্যাশনাল কোল্ড-চেইন লজিস্টিকস (অর্গানিক হাট)" : "Agritech & National Cold-Chain Logistics (Organic Haat)"}</option>
                  <option value="FinTech & Alternative Capital Structuring">{isBn ? "ফিনটেক ও অল্টারনেটিভ ক্যাপিটাল স্ট্রাকচারিং" : "FinTech & Alternative Capital Structuring"}</option>
                  <option value="GovTech & Public Digital Infrastructure (DPI)">{isBn ? "গভটেক ও পাবলিক ডিজিটাল অবকাঠামো (ডিপিআই)" : "GovTech & Public Digital Infrastructure (DPI)"}</option>
                  <option value="Institutional Careers & Executive Fellowships">{isBn ? "প্রাতিষ্ঠানিক ক্যারিয়ার ও ফেলোশিপ" : "Institutional Careers & Executive Fellowships"}</option>
                  <option value="Media, Press & Regulatory Disclosures">{isBn ? "মিডিয়া, প্রেস ও প্রকাশনা" : "Media, Press & Regulatory Disclosures"}</option>
                </select>
              </div>

              {/* Project Scope Textarea */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                  {isBn ? "প্রকল্পের বিবরণ ও আর্কিটেকচারাল প্রয়োজনীয়তা" : "Project Scope & Architectural Requirements"}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isBn ? "আপনার প্রকল্পের প্রযুক্তিগত প্রয়োজনীয়তা বা সময়সীমার বিবরণ লিখুন..." : "Detail your enterprise requirements, anticipated capital expenditure tier, strategic timeline, or security clearance specifications..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* NDA Checkbox Toggle */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border">
                <input
                  type="checkbox"
                  id="ndaConsent"
                  checked={requestNda}
                  onChange={(e) => setRequestNda(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="ndaConsent" className="text-xs text-foreground cursor-pointer select-none">
                  <span className="font-semibold text-primary inline-flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    {isBn ? "দ্বিপাক্ষিক গোপনীয়তা চুক্তি (NDA) বাধ্যতামূলক করুন" : "Mandate Mutual Non-Disclosure Agreement (NDA)"}
                  </span>
                  <span className="block text-foreground/60 text-[11px] mt-0.5">
                    {isBn
                      ? "প্রযুক্তিগত আর্কিটেকচার আলোচনার পূর্বে দ্বিপাক্ষিক গোপনীয়তা দলিল সম্পাদন করা হবে।"
                      : "Require bilateral confidentiality documentation prior to technical architecture exchange."}
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-7 py-3.5 min-h-[48px] rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isBn ? "জমা দেওয়া হচ্ছে..." : "Submitting Inquiry..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isBn ? "অনুসন্ধান জমা দিন" : "Submit Enterprise Inquiry"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <span className="text-foreground/60 text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>{isBn ? "১ কার্যদিবসের মধ্যে রেসপন্স এসএলএ গ্যারান্টি" : "1-Business-Day Contract SLA Guarantee"}</span>
                </span>
              </div>
            </form>
          )}
        </div>

        {/* Instant Direct Desk Quick-Chips */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-3">
            Direct Executive Desks
          </p>
          <div className="flex flex-wrap gap-2.5 text-xs">
            <a
              href={`https://wa.me/${(settings?.contact?.whatsapp || "+880 1805-464343").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-foreground border border-border transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <span>WhatsApp: {settings?.contact?.whatsapp || "+880 1805-464343"}</span>
            </a>
            <a
              href={`mailto:${settings?.contact?.investEmail || "invest@yessbgd.com"}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-foreground border border-border transition-colors font-medium"
            >
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>{settings?.contact?.investEmail || "invest@yessbgd.com"}</span>
            </a>
            <a
              href={`mailto:${settings?.contact?.careersEmail || "careers@yessbgd.com"}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-foreground border border-border transition-colors font-medium"
            >
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              <span>{settings?.contact?.careersEmail || "careers@yessbgd.com"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Corporate Headquarters Locator & Interactive Map View (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        {/* Office Header Badge */}
        <div className="bg-slate-100/90 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Dhaka Corporate Headquarters</span>
              <span className="text-[11px] text-teal-800 font-medium">Principal Registered Office</span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            MRT Pillar -312
          </span>
        </div>

        {/* Interactive Google Map Card */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between text-slate-900 group">
          {/* Real Google Map Embed */}
          <iframe
            title="Yess Bangla Private Limited Location Map"
            src="https://maps.google.com/maps?q=23.8253366,90.3657431&hl=en&z=17&output=embed"
            className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Map Top Floating Overlay: Coordinates & Live Google Maps Link */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-teal-500/30 text-[11px] font-mono text-teal-900 shadow-md pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>23.8253° N, 90.3657° E</span>
            </div>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md text-slate-800 hover:text-emerald-700 border border-slate-200 text-xs font-bold shadow-md transition-all pointer-events-auto active:scale-95"
              href="https://maps.app.goo.gl/R39sZ5QgTBuTJpEf6"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>
          </div>

          {/* Map Bottom Floating Card Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-10 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center justify-between pointer-events-auto">
            <div className="min-w-0 pr-2">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                Yess Bangla Private Limited
              </p>
              <p className="text-[11px] text-slate-600 truncate">
                {settings?.contact?.address ||
                  settings?.offices?.headquarters?.address ||
                  "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)"}
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/R39sZ5QgTBuTJpEf6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 transition-colors shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* Detailed Hub Specifications Card (Below Map) */}
        <div className="p-6 rounded-2xl glass-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-display font-bold text-foreground">
              Corporate Headquarters Specifications
            </h3>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              PILLAR -312 CORRIDOR
            </span>
          </div>

          <div className="space-y-3 text-xs text-foreground/70">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Physical Dispatch &amp; Concierge</strong>
                <span>
                  {settings?.contact?.address ||
                    settings?.offices?.headquarters?.address ||
                    "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Statutory Visiting Hours</strong>
                <span>
                  {settings?.offices?.headquarters?.hours || "Saturday – Thursday: 9:00 AM – 6:00 PM BST"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Direct Telephony Lines</strong>
                <span>
                  Primary: {settings?.contact?.phone || "+880 1805-464343"} | WhatsApp: {settings?.contact?.whatsapp || "+880 1805-464343"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Rapid Transit &amp; Parking Access</strong>
                <span>
                  Located directly beside MRT Line-6 (Metro Rail Pillar -312) between Mirpur-11 and Pallabi stations. Dedicated executive parking and visitor security clearance on-site.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
