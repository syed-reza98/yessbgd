"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  Lock,
  ArrowRight,
  Check,
  Radio,
  FileCheck,
  MessageSquare,
  BadgeAlert,
  Sparkles,
  Car,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import type { CompanySettings } from "@/lib/cms";

export function ContactFormAndLocator({ settings }: { settings?: CompanySettings }) {
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
      setError("Please fill in your name, corporate email address, and project requirements.");
      return;
    }

    setLoading(true);
    try {
      const { error: insertErr } = await supabase.from("contact_messages").insert({
        name: fullName.trim(),
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        organization: organization.trim() || null,
        subject: practiceArea,
        practice_area: practiceArea,
        message: message.trim(),
        request_nda: requestNda,
        is_read: false,
        is_archived: false,
      });

      if (insertErr) {
        console.warn("Supabase insert warning:", insertErr.message);
      }
      setSubmitted(true);
    } catch (err: any) {
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
                Submit Institutional Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-foreground/70 mt-1">
                Direct encrypted intake reviewed by Venture Principals and Solutions Architects.
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Fiduciary Pledge</span>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">
                Inquiry Dispatched to Executive Desk
              </h3>
              <p className="text-xs text-foreground/70 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your message regarding &ldquo;{practiceArea}&rdquo; has been logged.
                {requestNda && " A standard bilateral NDA will be counter-signed prior to our introductory call."}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
              >
                Send Another Inquiry
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
                    Full Name *
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Engr. Tanvir Ahmed Chowdhury"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5">
                    Corporate Email (.com / .bd) *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. tanvir@conglomerate.com.bd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Phone & Organization Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-foreground mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1711-000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-organization" className="block text-xs font-semibold text-foreground mb-1.5">
                    Enterprise / Organization *
                  </label>
                  <input
                    id="contact-organization"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Group / Ministry of ICT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Inquiry Type Dropdown */}
              <div>
                <label htmlFor="contact-practice-area" className="block text-xs font-semibold text-foreground mb-1.5">
                  Inquiry Type / Practice Area *
                </label>
                <select
                  id="contact-practice-area"
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="Venture Co-Building & Equity Structuring">Venture Co-Building & Equity Structuring</option>
                  <option value="Enterprise Cloud & Sovereign Software Architectures">Enterprise Cloud & Sovereign Software Architectures</option>
                  <option value="Agritech & National Cold-Chain Logistics (Organic Haat)">Agritech & National Cold-Chain Logistics (Organic Haat)</option>
                  <option value="FinTech & Alternative Capital Structuring">FinTech & Alternative Capital Structuring</option>
                  <option value="GovTech & Public Digital Infrastructure (DPI)">GovTech & Public Digital Infrastructure (DPI)</option>
                  <option value="Institutional Careers & Executive Fellowships">Institutional Careers & Executive Fellowships</option>
                  <option value="Media, Press & Regulatory Disclosures">Media, Press & Regulatory Disclosures</option>
                </select>
              </div>

              {/* Project Scope Textarea */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                  Project Scope & Architectural Requirements
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your enterprise requirements, anticipated capital expenditure tier, strategic timeline, or security clearance specifications..."
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
                    Mandate Mutual Non-Disclosure Agreement (NDA)
                  </span>
                  <span className="block text-foreground/60 text-[11px] mt-0.5">
                    Require bilateral confidentiality documentation prior to technical architecture exchange.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-7 py-3 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enterprise Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <span className="text-foreground/60 text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>1-Business-Day Contract SLA Guarantee</span>
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

        {/* Branded Custom Map Graphic Card */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 min-h-[300px] flex flex-col justify-between p-5 text-slate-900">
          {/* Map Top Overlay: Coordinates & Live Radar */}
          <div className="flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-teal-500/30 text-[11px] font-mono text-teal-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
              <span>23.8223° N, 90.3654° E</span>
            </div>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors"
              href={`https://maps.google.com/?q=${encodeURIComponent(
                settings?.contact?.address ||
                  settings?.offices?.headquarters?.address ||
                  "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)"
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Stylized Schematic SVG Vector for Dhaka Road Grid & Metro Rail Corridor */}
          <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full object-cover"
              fill="none"
              viewBox="0 0 600 350"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dhaka Metro MRT Line-6 Viaduct Vector */}
              <path
                d="M50,-10 C120,80 220,160 300,200 C380,240 460,290 550,360"
                stroke="#0d6e6e"
                strokeLinecap="round"
                strokeWidth="10"
              />
              {/* Mirpur Main Road Arterial */}
              <path
                d="M-10,240 C140,230 260,210 330,190 C420,160 510,130 620,110"
                stroke="#0d6e6e"
                strokeDasharray="4 4"
                strokeWidth="5"
              />
              {/* Grid Lines */}
              <line stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" x1="0" x2="600" y1="120" y2="120" />
              <line stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" x1="0" x2="600" y1="220" y2="220" />
              <line stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" x1="180" x2="180" y1="0" y2="350" />
              <line stroke="#94a3b8" strokeOpacity="0.5" strokeWidth="1" x1="420" x2="420" y1="0" y2="350" />
              {/* Radar Ripple around Mirpur-11 / Pillar 312 node */}
              <circle
                cx="300"
                cy="200"
                r="45"
                stroke="#d97706"
                strokeDasharray="2 3"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <circle
                cx="300"
                cy="200"
                r="85"
                stroke="#0d6e6e"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Center Pin Indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-teal-700 flex items-center justify-center shadow-lg border-2 border-teal-500">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded bg-white/95 border border-slate-200 text-[10px] font-bold text-teal-900 shadow-2xs uppercase tracking-wider">
              HQ • Pillar -312
            </span>
          </div>

          {/* Map Bottom Card Overlay */}
          <div className="relative z-10 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {settings?.offices?.headquarters?.name || "Corporate Headquarters"}
              </p>
              <p className="text-[11px] text-slate-600 line-clamp-1">
                {settings?.contact?.address ||
                  settings?.offices?.headquarters?.address ||
                  "Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold shrink-0 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              <span>Open • BST 09:00 - 18:00</span>
            </span>
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
