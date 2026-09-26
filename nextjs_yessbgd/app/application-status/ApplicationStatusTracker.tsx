"use client";

import { useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Tag,
  Copy,
  Check,
  RefreshCw,
  Wifi,
  FileText,
  User,
  Shield,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Radio,
  Video,
  Handshake,
  BadgeCheck,
  Download,
  CalendarPlus,
  RotateCcw,
  CheckSquare,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  Lock,
  GitBranch,
} from "lucide-react";

export function ApplicationStatusTracker() {
  const searchParams = useSearchParams();
  const queryRef = searchParams.get("ref");
  const queryEmail = searchParams.get("email");

  const [refId, setRefId] = useState(queryRef || "YESS-ENG-2026-89412");
  const [candidateEmail, setCandidateEmail] = useState(
    queryEmail || "syed.candidate@example.com"
  );
  const [rememberMe, setRememberMe] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastPingTime, setLastPingTime] = useState("BST 15:42:19");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (queryRef) setRefId(queryRef);
    if (queryEmail) setCandidateEmail(queryEmail);
  }, [queryRef, queryEmail]);

  const handleCopyRef = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = (e: FormEvent) => {
    e.preventDefault();
    setIsRefreshing(true);
    setStatusMessage(null);
    setTimeout(() => {
      const now = new Date();
      setLastPingTime(
        `BST ${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      );
      setIsRefreshing(false);
      setStatusMessage("Dossier credentials synchronized with sovereign talent ledger.");
    }, 600);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Top Notification Ribbon & Utility Bar */}
      <aside className="bg-[#061a1b] text-outline-variant py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 rounded-2xl mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between text-xs tracking-wide gap-3">
          <div className="flex items-center flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#005454]/40 text-[#35b0aa] border border-[#35b0aa]/30 font-semibold tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35b0aa] animate-pulse" />
              TALENT SECURE PORTAL ACTIVE
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden lg:inline text-white/80 text-[11px]">
              • Dhaka BST Operational | Motijheel HQ &amp; Gulshan Innovation Wing
            </span>
            <span className="hidden xl:inline text-white/20">|</span>
            <span className="hidden xl:inline text-white/80 text-[11px]">
              Recruitment Hotline: <strong className="text-white font-semibold">+880 9638-445566</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center text-white/80 gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#d4a359]" />
              <span className="font-medium">ISO/IEC 27001 Certified Vault</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1 text-white">
              <span className="font-semibold text-[#35b0aa]">EN</span>
              <span className="text-white/40">/</span>
              <span className="text-white/60 hover:text-white cursor-pointer">বাংলা</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high dark:bg-white/5 border border-[#35b0aa]/20 text-[#005454] dark:text-[#84d4d3] mb-4 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35b0aa] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#005454] dark:bg-[#35b0aa]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Recruitment Pipeline &amp; Candidate Telemetry
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#005454] dark:text-white mb-4 tracking-tight">
          Track Your{" "}
          <span className="bg-gradient-to-r from-[#005454] via-[#0d6e6e] to-[#35b0aa] bg-clip-text text-transparent">
            Application Status
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Real-time candidate telemetry for engineering, product, and consulting roles across YESS Bangladesh
          ventures. Enter your tracking reference number and registered email to check status.
        </p>
      </section>

      {/* 3. Tracking Form & Lookup Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="liquid-glass rounded-2xl p-7 shadow-xl shadow-primary/5 bg-surface-container-lowest/80 dark:bg-[#061a1b]/80 border border-outline-variant/40">
          <form onSubmit={handleRefresh} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Reference ID Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-on-surface">
                  Application Reference ID
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    placeholder="e.g. YESS-ENG-2026-XXXXX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low/70 dark:bg-[#061a1b] font-mono text-xs text-on-surface focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d6e6e]" />
                  <span>Format: YESS-[DEPT]-[YEAR]-[ID]</span>
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-on-surface">
                  Registered Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low/70 dark:bg-[#061a1b] text-xs text-on-surface focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#d4a359]" />
                  <span>Must match your application dossier email</span>
                </p>
              </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-outline text-[#005454] focus:ring-[#35b0aa] h-4 w-4"
                  />
                  <span>Remember details on this device</span>
                </label>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#005454] dark:text-[#84d4d3] font-medium bg-[#005454]/5 px-2.5 py-1 rounded-md border border-[#005454]/20">
                  <Shield className="w-3.5 h-3.5 text-[#0d6e6e]" />
                  <span>256-bit Encrypted Candidate Session</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isRefreshing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#005454] to-[#0d6e6e] hover:from-[#061a1b] hover:to-[#005454] text-white text-xs font-bold shadow-md shadow-[#0d6e6e]/20 transition-all active:scale-98"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Check Status</span>
              </button>
            </div>
          </form>

          {/* Status feedback message */}
          {statusMessage && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Live Realtime Polling indicator */}
          <div className="mt-4 pt-3 border-t border-dashed border-outline-variant/40 flex items-center justify-between text-xs text-outline">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-[#35b0aa]" />
              <span className="text-on-surface-variant font-medium">Live sovereign connection active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d6e6e] animate-ping" />
              <span>Last ping: Just now ({lastPingTime})</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Application Result Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Executive Application Overview Header Card */}
        <section className="liquid-glass rounded-3xl p-7 sm:p-8 shadow-xl shadow-[#0d6e6e]/5 border border-outline-variant/30 bg-surface-container-lowest dark:bg-[#061a1b]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a359]/15 text-[#7e5713] dark:text-[#f2be71] border border-[#d4a359]/30 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Yess Soft Ltd. (Enterprise Cloud &amp; AI)</span>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-surface-container-high dark:bg-white/5 text-on-surface-variant font-medium">
                  Ventures Division ID: BD-VNT-04
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy dark:text-white tracking-tight">
                Lead Cloud Solutions Architect — Yess Soft Ltd.
              </h2>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-on-surface-variant pt-1">
                <span className="flex items-center gap-1.5 font-medium text-on-surface">
                  <User className="w-3.5 h-3.5 text-[#005454] dark:text-[#84d4d3]" />
                  Applicant: <strong>Syed Reza</strong> (Senior Systems Architect)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-outline" />
                  Applied: September 12, 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-outline" />
                  Dhaka HQ (Motijheel / Hybrid)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono text-xs bg-surface-container dark:bg-white/5 px-2 py-0.5 rounded border border-outline-variant">
                  Ref: {refId}
                  <button
                    onClick={handleCopyRef}
                    className="hover:text-primary ml-1"
                    title="Copy Reference ID"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>
            </div>

            {/* Status Badge & CTA actions */}
            <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a359]/20 border border-[#d4a359]/40 text-[#7e5713] dark:text-[#f2be71] shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a359] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4a359]" />
                </span>
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Interview Round 2 Scheduled</span>
              </div>

              {/* Fast Action Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => alert("Downloading encrypted application dossier PDF...")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high dark:bg-white/10 hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Application PDF</span>
                </button>
                <button
                  onClick={() => alert("Calendar invite exported for Sep 24, 2026 at 3:00 PM BST.")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high dark:bg-white/10 hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Add to Google Calendar</span>
                </button>
                <button
                  onClick={() => alert("Reschedule request forwarded to dedicated talent lead Tariq Al-Mansoor.")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high dark:bg-white/10 hover:bg-surface-container-highest text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reschedule Request</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Five-Stage Executive Evaluation Rail (Stitch Signature Stepper) */}
          <div className="pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#005454] dark:text-[#84d4d3]" />
                <span>Five-Stage Executive Evaluation Rail</span>
              </h3>
              <span className="text-xs font-semibold text-[#005454] dark:text-[#84d4d3]">
                Stage 3 of 5 In Progress (60%)
              </span>
            </div>

            {/* Stepper Track Container */}
            <div className="relative py-4">
              {/* Two-tone Timeline Rail for desktop */}
              <div className="hidden md:block absolute top-10 left-12 right-12 h-1 bg-surface-container-highest dark:bg-white/10 -z-0">
                {/* Active/Completed Segment (50%) */}
                <div className="h-full bg-gradient-to-r from-[#005454] via-[#0d6e6e] to-[#35b0aa] w-[50%]" />
              </div>

              {/* Five Milestone Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                {/* Stage 1: Submitted (Completed) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-[#005454] text-white flex items-center justify-center font-bold shadow-md shadow-[#005454]/20 mb-3 ring-4 ring-white dark:ring-[#061a1b]">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">1. Submitted</span>
                    <p className="text-[11px] text-on-surface-variant">Received &amp; Acknowledged<br />Sep 12, 2026</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#005454]/10 text-[#005454] dark:text-[#84d4d3]">
                      Automated Screening Passed
                    </span>
                  </div>
                </div>

                {/* Stage 2: Under Review (Completed) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-[#005454] text-white flex items-center justify-center font-bold shadow-md shadow-[#005454]/20 mb-3 ring-4 ring-white dark:ring-[#061a1b]">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">2. Under Review</span>
                    <p className="text-[11px] text-on-surface-variant">Technical Profile Screened<br />Sep 15, 2026</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#005454]/10 text-[#005454] dark:text-[#84d4d3]">
                      VP Engineering Cleared
                    </span>
                  </div>
                </div>

                {/* Stage 3: Interview Round 2 (ACTIVE) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-[#061a1b] border-2 border-[#0d6e6e] text-[#0d6e6e] dark:text-[#35b0aa] flex items-center justify-center font-bold shadow-lg shadow-[#0d6e6e]/20 mb-3 ring-4 ring-white dark:ring-[#061a1b] relative">
                    <Video className="w-5 h-5 text-[#0d6e6e] dark:text-[#35b0aa]" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d4a359] rounded-full border-2 border-white dark:border-[#061a1b]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-[#005454] dark:text-[#84d4d3] block">
                      3. Interview Round 2
                    </span>
                    <p className="text-[11px] font-semibold text-on-surface">
                      System Architecture Deep Dive<br />Sep 24, 2026 at 3:00 PM BST
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d4a359]/20 text-[#7e5713] dark:text-[#f2be71] border border-[#d4a359]/40">
                      Google Meet Confirmed
                    </span>
                  </div>
                </div>

                {/* Stage 4: Offer & Terms (Upcoming) */}
                <div className="flex flex-col items-center text-center opacity-65 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-white/5 border-2 border-dashed border-outline-variant text-outline flex items-center justify-center font-bold mb-3 ring-4 ring-white dark:ring-[#061a1b]">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">4. Offer &amp; Terms</span>
                    <p className="text-[11px] text-on-surface-variant">Compensation, Sovereign Equity &amp; IP Agreements</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-surface-container dark:bg-white/5 text-on-surface-variant">
                      Pending Round 2
                    </span>
                  </div>
                </div>

                {/* Stage 5: Hired & Onboarding (Upcoming) */}
                <div className="flex flex-col items-center text-center opacity-65 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-white/5 border-2 border-dashed border-outline-variant text-outline flex items-center justify-center font-bold mb-3 ring-4 ring-white dark:ring-[#061a1b]">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">5. Onboarding</span>
                    <p className="text-[11px] text-on-surface-variant">Day 1 Orientation &amp; Security Enclave Clearance</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-surface-container dark:bg-white/5 text-on-surface-variant">
                      Final Step
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Status Details & Next Steps Bento Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Bento Card: Panel Directive & Instructions (7 cols) */}
          <div className="lg:col-span-7 liquid-glass rounded-3xl p-7 shadow-lg shadow-primary/5 bg-surface-container-lowest dark:bg-[#061a1b] border border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#005454]/10 flex items-center justify-center text-[#005454] dark:text-[#84d4d3]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface">
                    Recruitment Panel Directive
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Direct notes from Yess Soft technical evaluation committee
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#d4a359]/15 text-[#7e5713] dark:text-[#f2be71] text-xs font-bold">
                Action Required
              </span>
            </div>

            {/* Note Callout Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/90 dark:bg-white/5 border border-[#35b0aa]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#005454] dark:text-[#84d4d3] uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Talent Committee Remarks (Round 1 Outcome)</span>
              </div>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed italic">
                &ldquo;Your Round 1 interview results were outstanding. The technical panel has scheduled your
                Round 2 architecture presentation for Thursday at 3:00 PM BST via Google Meet. Check your
                email for calendar invite and presentation rubric.&rdquo;
              </p>
            </div>

            {/* Panelists */}
            <div>
              <span className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block mb-3">
                Evaluation Panel Members
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest/80 dark:bg-white/5 border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-[#0d6e6e] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    AK
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-on-surface">Arif Khan</div>
                    <div className="text-[11px] text-on-surface-variant">Head of Engineering &amp; Chief Architect</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest/80 dark:bg-white/5 border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-[#7e5713] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    SR
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-on-surface">Sadia Rahman</div>
                    <div className="text-[11px] text-on-surface-variant">Chief Operating Officer, Yess Soft Ltd.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div>
              <span className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block mb-3">
                Round 2 Candidate Preparation Checklist
              </span>
              <ul className="space-y-2.5 text-xs text-on-surface">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container/50 dark:bg-white/5">
                  <CheckSquare className="w-4 h-4 text-[#0d6e6e] shrink-0 mt-0.5" />
                  <span>
                    <strong>1. Prepare 20-min distributed system design presentation:</strong> Focus on sovereign multi-region disaster recovery and latency reduction.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container/50 dark:bg-white/5">
                  <CheckSquare className="w-4 h-4 text-[#0d6e6e] shrink-0 mt-0.5" />
                  <span>
                    <strong>2. Review sovereign cloud mesh architecture paper:</strong> Reference YESS whitepaper v4.2 sent to your registered email.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container/50 dark:bg-white/5">
                  <CheckSquare className="w-4 h-4 text-[#0d6e6e] shrink-0 mt-0.5" />
                  <span>
                    <strong>3. Have Github/portfolio repositories ready:</strong> Ensure architecture sketches and infrastructure-as-code samples can be screenshared.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Bento Card: Metadata & Verification Vault (5 cols) */}
          <div className="lg:col-span-5 liquid-glass rounded-3xl p-7 shadow-lg shadow-primary/5 bg-surface-container-lowest dark:bg-[#061a1b] border border-outline-variant/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a359]/15 flex items-center justify-center text-[#7e5713] dark:text-[#f2be71]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-on-surface">Application Vault</h3>
                    <p className="text-xs text-on-surface-variant">Verified dossier credentials</p>
                  </div>
                </div>
                <Shield className="w-5 h-5 text-[#0d6e6e]" />
              </div>

              {/* Documents submitted */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Submitted Documents
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/80 dark:bg-white/5 border border-outline-variant/40">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#005454] dark:text-[#84d4d3]" />
                    <div className="text-xs">
                      <span className="font-semibold text-on-surface block">Resume_Syed_Reza_LeadArchitect.pdf</span>
                      <span className="text-on-surface-variant text-[11px]">2.4 MB • Uploaded Sep 12</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#005454] dark:text-[#84d4d3] bg-[#005454]/10 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/80 dark:bg-white/5 border border-outline-variant/40">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#005454] dark:text-[#84d4d3]" />
                    <div className="text-xs">
                      <span className="font-semibold text-on-surface block">Architecture_Portfolio_Mesh.pdf</span>
                      <span className="text-on-surface-variant text-[11px]">8.9 MB • Uploaded Sep 12</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#005454] dark:text-[#84d4d3] bg-[#005454]/10 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>

              {/* Application Parameters Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase font-bold text-on-surface-variant tracking-wider block">
                  Candidate Parameters
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-surface-container/60 dark:bg-white/5 border border-outline-variant/20">
                    <span className="text-on-surface-variant block mb-1 text-[11px]">Target Compensation</span>
                    <span className="font-bold text-on-surface text-xs sm:text-sm">৳ 320,000 / mo</span>
                    <span className="text-[10px] text-[#0d6e6e] dark:text-[#35b0aa] block">+ Venture Equity Pool</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container/60 dark:bg-white/5 border border-outline-variant/20">
                    <span className="text-on-surface-variant block mb-1 text-[11px]">Declared Notice Period</span>
                    <span className="font-bold text-on-surface text-xs sm:text-sm">30 Calendar Days</span>
                    <span className="text-[10px] text-on-surface-variant block">Immediate buy-out viable</span>
                  </div>
                </div>

                {/* Dedicated HR Lead contact card */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#005454]/5 to-[#d4a359]/10 border border-[#35b0aa]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#0d6e6e] dark:text-[#35b0aa] tracking-wider block">
                      Dedicated Talent Partner
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface block">Tariq Al-Mansoor</span>
                    <span className="text-[11px] text-on-surface-variant">Senior Partner, Executive Search</span>
                  </div>
                  <a
                    href="mailto:careers@yessbgd.com?subject=Inquiry regarding YESS-ENG-2026-89412"
                    className="px-3 py-1.5 rounded-lg bg-[#005454] hover:bg-[#0d6e6e] text-white text-xs font-semibold transition-colors"
                  >
                    Direct Ping
                  </a>
                </div>
              </div>
            </div>

            {/* Audit Log Snippet */}
            <div className="pt-4 border-t border-outline-variant/30 text-[11px] text-outline font-mono flex items-center justify-between">
              <span>Dossier Hash: 8f42..ce91</span>
              <span className="flex items-center gap-1 text-[#005454] dark:text-[#84d4d3]">
                <Clock className="w-3.5 h-3.5" />
                <span>Audit Trail Synced</span>
              </span>
            </div>
          </div>
        </section>

        {/* 7. Direct Candidate Support & Hotline Banner */}
        <section className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-md border border-[#d4a359]/30 bg-surface-container-lowest dark:bg-[#061a1b] relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#d4a359]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4a359]/20 text-[#7e5713] dark:text-[#f2be71] text-xs font-bold">
                <Phone className="w-3.5 h-3.5 text-secondary" />
                <span>TALENT CONCIERGE &amp; CANDIDATE ASSISTANCE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                Need to modify schedule or update submitted credentials?
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
                Our executive recruitment coordination team is on standby during Dhaka business hours (9:00 AM –
                6:30 PM BST) to assist candidates throughout the evaluation lifecycle.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <a
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high dark:bg-white/10 hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-all"
                href="tel:+8809638445566"
              >
                <Phone className="w-3.5 h-3.5 text-[#005454] dark:text-[#84d4d3]" />
                <span>+880 9638-445566</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#005454] hover:bg-[#0d6e6e] text-white text-xs font-semibold shadow-sm transition-all"
                href="mailto:careers@yessbgd.com"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Talent Acquisition Team</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
