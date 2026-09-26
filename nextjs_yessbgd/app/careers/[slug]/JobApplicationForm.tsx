"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Opening } from "@/data/openings";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Send,
  Loader2,
  Lock,
  ArrowRight,
} from "lucide-react";

export function JobApplicationForm({ job }: { job: Opening }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your full name, email, and phone number.");
      return;
    }

    setLoading(true);

    // Simulate submission / Supabase store
    setTimeout(() => {
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const generatedRef = `YESS-ENG-2026-${randomCode}`;

      // Save to localStorage for quick lookup in tracker
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            "yess:lastApplication",
            JSON.stringify({ ref: generatedRef, email: email.trim() })
          );
        } catch {
          // ignore
        }
      }

      setSubmittedRef(generatedRef);
      setLoading(false);
    }, 1200);
  };

  if (submittedRef) {
    return (
      <div className="glass-card rounded-2xl p-7 text-center space-y-5 border-emerald-500/40">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold text-brand-navy dark:text-white">
            Application Dispatched!
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Your application for <strong>{job.title}</strong> has been logged in our secure candidate vault.
            Our technical review team has been notified.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/40 space-y-1">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
            Your Candidate Reference ID
          </span>
          <span className="font-mono text-base font-extrabold text-[#0d6e6e] tracking-wider block">
            {submittedRef}
          </span>
          <span className="text-[10px] text-on-surface-variant">Save this reference for status tracking</span>
        </div>

        <div className="pt-2">
          <Link
            href={`/application-status?ref=${encodeURIComponent(submittedRef)}&email=${encodeURIComponent(email)}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md transition-all"
          >
            <span>Track Application Progress</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-7 shadow-lg shadow-[#0d6e6e]/5 border border-outline-variant/40 space-y-6">
      <div className="border-b border-outline-variant/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d6e6e] block">
          Direct Candidate Application
        </span>
        <h3 className="text-base font-bold text-brand-navy dark:text-white mt-1">Submit Your Profile</h3>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-semibold text-on-surface block mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Syed Reza"
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        <div>
          <label className="font-semibold text-on-surface block mb-1.5">Corporate / Personal Email *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        <div>
          <label className="font-semibold text-on-surface block mb-1.5">Mobile / WhatsApp Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXXXXXXXX"
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        <div>
          <label className="font-semibold text-on-surface block mb-1.5">
            GitHub / LinkedIn / Portfolio URL
          </label>
          <input
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        <div>
          <label className="font-semibold text-on-surface block mb-1.5">Attach Résumé / CV (PDF or DOCX)</label>
          <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-4 text-center hover:border-[#0d6e6e] transition-colors cursor-pointer bg-surface-container-low/40">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex items-center justify-between text-xs text-[#0d6e6e] font-medium px-2">
                <span className="flex items-center gap-1.5 truncate">
                  <FileText className="w-4 h-4 shrink-0" />
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-rose-500 hover:text-rose-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Upload className="w-5 h-5 mx-auto text-outline" />
                <span className="text-[11px] text-on-surface-variant block">
                  Click to upload or drag & drop (Max 5MB)
                </span>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="font-semibold text-on-surface block mb-1.5">
            Short Note on Technical Contributions
          </label>
          <textarea
            rows={3}
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Tell us about a challenging system or project you delivered recently..."
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant rounded-xl p-3 text-xs focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0d6e6e] hover:bg-[#005454] disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-98"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Encrypting & Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application (Instant Review)</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-outline text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-[#d4a359]" />
          <span>256-bit encrypted • We never share candidate dossiers with 3rd parties</span>
        </p>
      </form>
    </div>
  );
}
