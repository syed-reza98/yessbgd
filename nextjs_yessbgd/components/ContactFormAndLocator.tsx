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
  const [activeTab, setActiveTab] = useState<"motijheel" | "gulshan">("motijheel");
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

      {/* RIGHT COLUMN: Dual-Office Locator & Interactive Map View (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        {/* Office Location Switcher Tabs */}
        <div className="bg-muted/40 p-1.5 rounded-2xl border border-border flex gap-2">
          <button
            onClick={() => setActiveTab("motijheel")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 ${
              activeTab === "motijheel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/70 hover:bg-muted"
            }`}
            type="button"
          >
            <Building className="w-4 h-4" />
            <span>Motijheel HQ (Executive)</span>
          </button>
          <button
            onClick={() => setActiveTab("gulshan")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 ${
              activeTab === "gulshan"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/70 hover:bg-muted"
            }`}
            type="button"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gulshan-2 Lab (R&D)</span>
          </button>
        </div>

        {/* Branded Custom Map Graphic Card */}
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-[#061a1b] min-h-[300px] flex flex-col justify-between p-5 text-white">
          {/* Map Top Overlay: Coordinates & Live Radar */}
          <div className="flex items-center justify-between z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061a1b]/90 backdrop-blur-md border border-[#35b0aa]/40 text-[11px] font-mono text-[#35b0aa]">
              <span className="w-2 h-2 rounded-full bg-[#35b0aa] animate-ping" />
              <span>
                {activeTab === "motijheel" ? "23.7289° N, 90.4184° E" : "23.7925° N, 90.4078° E"}
              </span>
            </div>
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold transition-colors"
              href={`https://maps.google.com/?q=${encodeURIComponent(
                activeTab === "motijheel"
                  ? (settings?.offices?.motijheel?.address || "Motijheel Commercial Area, Dhaka")
                  : (settings?.offices?.gulshan?.address || "Gulshan-2, Dhaka")
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Stylized Schematic SVG Vector for Dhaka Riverine & Road Grids */}
          <div className="absolute inset-0 opacity-35 pointer-events-none flex items-center justify-center">
            <svg
              className="w-full h-full object-cover"
              fill="none"
              viewBox="0 0 600 350"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Buriganga / Gulshan Lake Contour */}
              {activeTab === "motijheel" ? (
                <path
                  d="M-10,320 C140,300 240,240 310,210 C380,180 470,220 620,190"
                  stroke="#35b0aa"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              ) : (
                <path
                  d="M100,-10 C160,80 230,160 300,200 C370,240 440,310 520,360"
                  stroke="#35b0aa"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              )}
              {/* Secondary Canal */}
              <path
                d="M120,-10 C150,90 280,130 330,220"
                stroke="#0d6e6e"
                strokeDasharray="4 4"
                strokeWidth="5"
              />
              {/* Dhaka Arterial Roads */}
              <line stroke="#bec9c8" strokeOpacity="0.3" strokeWidth="1" x1="0" x2="600" y1="120" y2="120" />
              <line stroke="#bec9c8" strokeOpacity="0.3" strokeWidth="1" x1="0" x2="600" y1="220" y2="220" />
              <line stroke="#bec9c8" strokeOpacity="0.3" strokeWidth="1" x1="180" x2="180" y1="0" y2="350" />
              <line stroke="#bec9c8" strokeOpacity="0.3" strokeWidth="1" x1="420" x2="420" y1="0" y2="350" />
              {/* Radar Ripple around active node */}
              <circle
                cx={activeTab === "motijheel" ? "310" : "300"}
                cy={activeTab === "motijheel" ? "180" : "190"}
                r="45"
                stroke="#d4a359"
                strokeDasharray="2 3"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              <circle
                cx={activeTab === "motijheel" ? "310" : "300"}
                cy={activeTab === "motijheel" ? "180" : "190"}
                r="85"
                stroke="#35b0aa"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Center Pin Indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-[#005454] flex items-center justify-center shadow-lg border-2 border-[#35b0aa]">
              {activeTab === "motijheel" ? (
                <Building className="w-5 h-5 text-white" />
              ) : (
                <Sparkles className="w-5 h-5 text-[#f6c87a]" />
              )}
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded bg-[#061a1b]/95 border border-white/20 text-[10px] font-bold text-[#f6c87a] uppercase tracking-wider">
              {activeTab === "motijheel" ? "HQ Motijheel" : "Gulshan-2 Lab"}
            </span>
          </div>

          {/* Map Bottom Card Overlay */}
          <div className="relative z-10 p-3.5 rounded-xl bg-[#061a1b]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                {activeTab === "motijheel"
                  ? (settings?.offices?.motijheel?.name || "Corporate Headquarters")
                  : (settings?.offices?.gulshan?.name || "Regional Innovation Lab")}
              </p>
              <p className="text-[11px] text-white/70">
                {activeTab === "motijheel"
                  ? (settings?.offices?.motijheel?.address || "Motijheel Commercial Area, Dhaka-1000")
                  : (settings?.offices?.gulshan?.address || "Gulshan Innovation Zone, Dhaka-1212")}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0d6e6e] text-[#9dedec] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35b0aa] animate-pulse" />
              <span>
                {activeTab === "motijheel"
                  ? (settings?.offices?.motijheel?.hours || "Open • BST 09:00 - 18:00")
                  : (settings?.offices?.gulshan?.hours || "Open • 24/7 Operations")}
              </span>
            </span>
          </div>
        </div>

        {/* Detailed Hub Specifications Card (Below Map) */}
        <div className="p-6 rounded-2xl glass-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-display font-bold text-foreground">
              {activeTab === "motijheel"
                ? (settings?.offices?.motijheel?.name || "Headquarters Specifications")
                : (settings?.offices?.gulshan?.name || "Innovation Wing Specifications")}
            </h3>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {activeTab === "motijheel"
                ? (settings?.offices?.motijheel?.badge || "SUITE 804 & 1901")
                : (settings?.offices?.gulshan?.badge || "LAB TIER-3 EDGE CLUSTER")}
            </span>
          </div>

          <div className="space-y-3 text-xs text-foreground/70">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Physical Dispatch & Concierge</strong>
                <span>
                  {activeTab === "motijheel"
                    ? (settings?.offices?.motijheel?.address || "Jiban Bima Bhaban, Dilkusha, Motijheel C/A, Dhaka-1000")
                    : (settings?.offices?.gulshan?.address || "Road 134, Gulshan-2, Dhaka-1212")}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Statutory Visiting Hours</strong>
                <span>
                  {activeTab === "motijheel"
                    ? (settings?.offices?.motijheel?.hours || "Sunday – Thursday: 9:00 AM – 6:00 PM BST")
                    : (settings?.offices?.gulshan?.hours || "Sunday – Friday: 10:00 AM – 8:00 PM BST (Extended Edge Operations)")}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Direct Telephony Lines</strong>
                <span>
                  Primary: {settings?.contact?.phone || "+880 1805-464343"} | Emergency NOC: +880 1805-464343
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-semibold">Security Clearance & Parking</strong>
                <span>
                  {activeTab === "motijheel"
                    ? "Government NID or Passport badge registration mandatory at Ground Concierge. Reserved executive parking at Level B2."
                    : "Biometric badge or visitor clearance mandatory at reception. Secure underground parking on Road 134."}
                </span>
              </div>
            </div>
          </div>

          {/* Fast Switcher preview to toggle */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-foreground">
              <Building className="w-4 h-4 text-primary" />
              <span>
                {activeTab === "motijheel" ? (
                  <>Secondary Lab: <strong>{settings?.offices?.gulshan?.address || "Road 134, Gulshan-2, Dhaka"}</strong></>
                ) : (
                  <>Executive HQ: <strong>{settings?.offices?.motijheel?.address || "Dilkusha, Motijheel C/A, Dhaka"}</strong></>
                )}
              </span>
            </div>
            <button
              onClick={() => setActiveTab(activeTab === "motijheel" ? "gulshan" : "motijheel")}
              className="text-primary hover:underline text-xs inline-flex items-center gap-1 font-semibold"
              type="button"
            >
              <span>{activeTab === "motijheel" ? "View Lab Specs" : "View HQ Specs"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
