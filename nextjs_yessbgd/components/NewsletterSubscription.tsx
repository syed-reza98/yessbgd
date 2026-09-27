"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeNewsletterAction } from "@/app/admin/actions";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);
    try {
      await subscribeNewsletterAction(email, "insights");
      setSubscribed(true);
    } catch (err: any) {
      setError(err.message || "Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Subscribed to YESS Institutional Dispatch. Welcome aboard!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
      <input
        id="newsletter-email-input"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter enterprise email..."
        aria-label="Enter enterprise email to subscribe"
        className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-none focus:border-[#35b0aa]"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0d6e6e] hover:bg-[#005454] text-white text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        <span>{loading ? "Joining..." : "Subscribe"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </form>
  );
}

