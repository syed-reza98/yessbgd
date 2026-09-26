"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  Lock,
} from "lucide-react";

export function ContactFormAndLocator() {
  const [activeTab, setActiveTab] = useState<"motijheel" | "gulshan">("motijheel");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Sovereign Enterprise Architecture");
  const [message, setMessage] = useState("");
  const [requestNda, setRequestNda] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email address, and inquiry message.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Enterprise Inquiry Portal (7 cols) */}
      <div className="lg:col-span-7 glass-card rounded-3xl p-7 sm:p-9 shadow-lg border border-outline-variant/40 space-y-6">
        <div className="border-b border-outline-variant/30 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d6e6e] block">
            Direct Institutional Inquiries
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy dark:text-white mt-1">
            Initiate Sovereign Discussion
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Connect directly with our partners and engineering directors. Executive response guaranteed within 1 business day.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy dark:text-white">
              Inquiry Dispatched to Executive Desk
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your message regarding &ldquo;{subject}&rdquo; has been logged.
              {requestNda && " A standard bilateral NDA will be counter-signed prior to our introductory call."}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage("");
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-surface-container text-xs font-semibold hover:bg-surface-container-high transition-colors"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-on-surface block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arif Rahman"
                  className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
                />
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1.5">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com.bd"
                  className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-on-surface block mb-1.5">Mobile / Direct PABX</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
                />
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1.5">Subject / Focus Area</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs text-on-surface-variant focus:outline-none focus:border-[#0d6e6e]"
                >
                  <option>Sovereign Enterprise Architecture</option>
                  <option>Venture Co-Investment & SPV</option>
                  <option>Dedicated Pod Engineering</option>
                  <option>Akash OTT Media Telco Licensing</option>
                  <option>Agritech & Supply Chain Modernization</option>
                  <option>CyberKilla SecOps Audit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1.5">Inquiry Details *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Outline your strategic objectives, scale, and anticipated delivery milestones..."
                className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl p-3 text-xs focus:outline-none focus:border-[#0d6e6e]"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
              <input
                type="checkbox"
                id="nda-checkbox"
                checked={requestNda}
                onChange={(e) => setRequestNda(e.target.checked)}
                className="mt-0.5 rounded border-outline text-[#0d6e6e] focus:ring-[#0d6e6e] w-4 h-4"
              />
              <label htmlFor="nda-checkbox" className="text-xs text-on-surface-variant cursor-pointer">
                <strong>Request Bilateral Non-Disclosure Agreement (NDA)</strong> execution prior to sharing
                technical requirements.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-[#0d6e6e]/20 transition-all active:scale-98"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Enterprise Inquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Right Column: Dual-Office Locator (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Office Tab Switcher */}
        <div className="glass-card rounded-2xl p-2 flex items-center gap-2 border border-outline-variant/40">
          <button
            onClick={() => setActiveTab("motijheel")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "motijheel"
                ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Motijheel HQ (Executive)
          </button>

          <button
            onClick={() => setActiveTab("gulshan")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "gulshan"
                ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Gulshan-2 (R&D Lab)
          </button>
        </div>

        {/* Office Details Card */}
        {activeTab === "motijheel" ? (
          <div className="glass-card rounded-3xl p-7 shadow-lg border border-outline-variant/40 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4a359]">
                Institutional Headquarters
              </span>
              <h3 className="text-lg font-extrabold text-brand-navy dark:text-white">
                Motijheel Executive Center
              </h3>
              <p className="text-xs text-on-surface-variant">
                Sonali Tower, Level 9, Motijheel Commercial Area, Dhaka-1000, Bangladesh
              </p>
            </div>

            <div className="space-y-3 text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>+880 1805-464343 (Board Sec Ext: 101 / 102)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>executive@yessbgd.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>Sunday – Thursday: 09:00 – 18:00 BST</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#d4a359] shrink-0" />
                <span>RJSC Statutory Registration: C-184920</span>
              </div>
            </div>

            {/* Map Link / Coordinate Visual */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-outline">
                <span>GPS: 23.7330° N, 90.4172° E</span>
                <span className="text-[#0d6e6e] font-semibold">Financial Hub</span>
              </div>
              <a
                href="https://maps.google.com/?q=Motijheel+Dhaka"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-[#061a1b] border border-outline-variant text-xs font-semibold text-[#0d6e6e] hover:border-[#0d6e6e] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-7 shadow-lg border border-outline-variant/40 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#35b0aa]">
                Innovation & Engineering Wing
              </span>
              <h3 className="text-lg font-extrabold text-brand-navy dark:text-white">
                Gulshan-2 Innovation Labs
              </h3>
              <p className="text-xs text-on-surface-variant">
                Road 45, Gulshan-2, Dhaka-1212, Bangladesh
              </p>
            </div>

            <div className="space-y-3 text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>+880 1805-464343 (Direct Lab Ext: 401)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>labs@yessbgd.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#0d6e6e] shrink-0" />
                <span>Sunday – Friday: 10:00 – 20:00 BST</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-[#35b0aa] shrink-0" />
                <span>Tier-3 Edge Dev Cluster & Hardware Lab</span>
              </div>
            </div>

            {/* Map Link / Coordinate Visual */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-outline">
                <span>GPS: 23.7925° N, 90.4078° E</span>
                <span className="text-[#35b0aa] font-semibold">Innovation Zone</span>
              </div>
              <a
                href="https://maps.google.com/?q=Gulshan+2+Dhaka"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-[#061a1b] border border-outline-variant text-xs font-semibold text-[#0d6e6e] hover:border-[#0d6e6e] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
