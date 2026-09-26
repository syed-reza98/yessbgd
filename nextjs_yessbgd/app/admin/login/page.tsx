"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#061a1b]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#d4a359]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#d4a359] to-[#0d6e6e] text-white font-extrabold text-2xl shadow-xl shadow-[#0d6e6e]/20 mb-4 border border-white/20">
            Y
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">YESS Bangladesh</h1>
          <p className="text-xs text-[#d4a359] font-semibold tracking-widest uppercase mt-1">
            Executive Admin Console
          </p>
        </div>

        {/* Login Card */}
        <div className="admin-glass-card rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6 pb-3 border-b border-white/10">
            <Lock className="w-4 h-4 text-[#d4a359]" />
            <span>Authenticated Access Only</span>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yessbgd.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#35b0aa] focus:ring-1 focus:ring-[#35b0aa] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#35b0aa] focus:ring-1 focus:ring-[#35b0aa] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white font-bold text-sm shadow-lg shadow-[#0d6e6e]/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Executive Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Compliance & Security Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#d4a359]" />
              <span>RJSC Statutory C-184920</span>
            </span>
            <Link href="/" className="hover:text-white transition-colors">
              Return to Website →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
