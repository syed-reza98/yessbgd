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
      <aside className="glass-card text-foreground/70 py-2.5 px-4 sm:px-6 lg:px-8 border border-border rounded-2xl mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between text-xs tracking-wide gap-3">
          <div className="flex items-center flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              TALENT SECURE PORTAL ACTIVE
            </span>
            <span className="hidden md:inline text-foreground/20">|</span>
            <span className="hidden lg:inline text-foreground/70 text-[11px]">
              • Dhaka BST Operational | Motijheel HQ &amp; Gulshan Innovation Wing
            </span>
            <span className="hidden xl:inline text-foreground/20">|</span>
            <span className="hidden xl:inline text-foreground/70 text-[11px]">
              Recruitment Hotline: <strong className="text-foreground font-semibold">+880 9638-445566</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center text-foreground/70 gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">ISO/IEC 27001 Certified Vault</span>
            </div>
            <span className="text-foreground/20">|</span>
            <div className="flex items-center gap-1 text-foreground">
              <span className="font-semibold text-primary">EN</span>
              <span className="text-foreground/40">/</span>
              <span className="text-foreground/60 hover:text-foreground cursor-pointer">বাংলা</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Recruitment Pipeline &amp; Candidate Telemetry
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground mb-4 tracking-tight">
          Track Your{" "}
          <span className="text-primary">
            Application Status
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Real-time candidate telemetry for engineering, product, and consulting roles across YESS Bangladesh
          ventures. Enter your tracking reference number and registered email to check status.
        </p>
      </section>

      {/* 3. Tracking Form & Lookup Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="glass-card rounded-2xl p-7 border border-border shadow-sm">
          <form onSubmit={handleRefresh} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Reference ID Input */}
              <div className="space-y-1.5">
                <label htmlFor="tracker-ref-id" className="block text-xs font-bold text-foreground">
                  Application Reference ID
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
                  <input
                    id="tracker-ref-id"
                    type="text"
                    required
                    value={refId}
                    onChange={(e) => setRefId(e.target.value)}
                    placeholder="e.g. YESS-ENG-2026-XXXXX"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background font-mono text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <p className="text-[11px] text-foreground/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Format: YESS-[DEPT]-[YEAR]-[ID]</span>
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="tracker-email" className="block text-xs font-bold text-foreground">
                  Registered Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/40 w-4 h-4" />
                  <input
                    id="tracker-email"
                    type="email"
                    required
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <p className="text-[11px] text-foreground/60 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-primary" />
                  <span>Must match your application dossier email</span>
                </p>
              </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="tracker-remember-me" className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-foreground/70">
                  <input
                    id="tracker-remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>Remember details on this device</span>
                </label>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span>256-bit Encrypted Candidate Session</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isRefreshing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-md transition-all active:scale-98"
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
          <div className="mt-4 pt-3 border-t border-dashed border-border flex items-center justify-between text-xs text-foreground/60">
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground/70 font-medium">Live sovereign connection active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span>Last ping: Just now ({lastPingTime})</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Active Application Result Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Executive Application Overview Header Card */}
        <section className="glass-card rounded-3xl p-7 sm:p-8 border border-border shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Yess Soft Ltd. (Enterprise Cloud &amp; AI)</span>
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-foreground/70 font-medium border border-border">
                  Ventures Division ID: BD-VNT-04
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-foreground tracking-tight">
                Lead Cloud Solutions Architect — Yess Soft Ltd.
              </h2>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-foreground/70 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Applicant: <strong>Syed Reza</strong> (Senior Systems Architect)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-foreground/40" />
                  Applied: September 12, 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-foreground/40" />
                  Dhaka HQ (Motijheel / Hybrid)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono text-xs bg-muted px-2 py-0.5 rounded border border-border">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Interview Round 2 Scheduled</span>
              </div>

              {/* Fast Action Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => alert("Downloading encrypted application dossier PDF...")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Application PDF</span>
                </button>
                <button
                  onClick={() => alert("Calendar invite exported for Sep 24, 2026 at 3:00 PM BST.")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-semibold transition-colors"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Add to Google Calendar</span>
                </button>
                <button
                  onClick={() => alert("Reschedule request forwarded to dedicated talent lead Tariq Al-Mansoor.")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-rose-600 dark:text-rose-400 border border-border text-xs font-semibold transition-colors"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-primary" />
                <span>Five-Stage Executive Evaluation Rail</span>
              </h3>
              <span className="text-xs font-semibold text-primary">
                Stage 3 of 5 In Progress (60%)
              </span>
            </div>

            {/* Stepper Track Container */}
            <div className="relative py-4">
              {/* Two-tone Timeline Rail for desktop */}
              <div className="hidden md:block absolute top-10 left-12 right-12 h-1 bg-muted border border-border -z-0">
                {/* Active/Completed Segment (50%) */}
                <div className="h-full bg-primary w-[50%]" />
              </div>

              {/* Five Milestone Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                {/* Stage 1: Submitted (Completed) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md shadow-primary/20 mb-3 ring-4 ring-background">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground block">1. Submitted</span>
                    <p className="text-[11px] text-foreground/70">Received &amp; Acknowledged<br />Sep 12, 2026</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      Automated Screening Passed
                    </span>
                  </div>
                </div>

                {/* Stage 2: Under Review (Completed) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md shadow-primary/20 mb-3 ring-4 ring-background">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground block">2. Under Review</span>
                    <p className="text-[11px] text-foreground/70">Technical Profile Screened<br />Sep 15, 2026</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      VP Engineering Cleared
                    </span>
                  </div>
                </div>

                {/* Stage 3: Interview Round 2 (ACTIVE) */}
                <div className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold shadow-lg shadow-primary/20 mb-3 ring-4 ring-background relative">
                    <Video className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-background" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-primary block">
                      3. Interview Round 2
                    </span>
                    <p className="text-[11px] font-semibold text-foreground">
                      System Architecture Deep Dive<br />Sep 24, 2026 at 3:00 PM BST
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      Google Meet Confirmed
                    </span>
                  </div>
                </div>

                {/* Stage 4: Offer & Terms (Upcoming) */}
                <div className="flex flex-col items-center text-center opacity-65 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-border text-foreground/40 flex items-center justify-center font-bold mb-3 ring-4 ring-background">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground block">4. Offer &amp; Terms</span>
                    <p className="text-[11px] text-foreground/70">Compensation, Sovereign Equity &amp; IP Agreements</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-foreground/60 border border-border">
                      Pending Round 2
                    </span>
                  </div>
                </div>

                {/* Stage 5: Hired & Onboarding (Upcoming) */}
                <div className="flex flex-col items-center text-center opacity-65 group cursor-default">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-border text-foreground/40 flex items-center justify-center font-bold mb-3 ring-4 ring-background">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-bold text-foreground block">5. Onboarding</span>
                    <p className="text-[11px] text-foreground/70">Day 1 Orientation &amp; Security Enclave Clearance</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-foreground/60 border border-border">
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
          <div className="lg:col-span-7 glass-card rounded-3xl p-7 border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-foreground">
                    Recruitment Panel Directive
                  </h3>
                  <p className="text-xs text-foreground/70">
                    Direct notes from Yess Soft technical evaluation committee
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold">
                Action Required
              </span>
            </div>

            {/* Note Callout Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Talent Committee Remarks (Round 1 Outcome)</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed italic">
                &ldquo;Your Round 1 interview results were outstanding. The technical panel has scheduled your
                Round 2 architecture presentation for Thursday at 3:00 PM BST via Google Meet. Check your
                email for calendar invite and presentation rubric.&rdquo;
              </p>
            </div>

            {/* Panelists */}
            <div>
              <span className="text-xs uppercase font-bold text-foreground/60 tracking-wider block mb-3">
                Evaluation Panel Members
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                    AK
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">Arif Khan</div>
                    <div className="text-[11px] text-foreground/60">Head of Engineering &amp; Chief Architect</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                    SR
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">Sadia Rahman</div>
                    <div className="text-[11px] text-foreground/60">Chief Operating Officer, Yess Soft Ltd.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Checklist */}
            <div>
              <span className="text-xs uppercase font-bold text-foreground/60 tracking-wider block mb-3">
                Round 2 Candidate Preparation Checklist
              </span>
              <ul className="space-y-2.5 text-xs text-foreground/80">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border">
                  <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>1. Prepare 20-min distributed system design presentation:</strong> Focus on sovereign multi-region disaster recovery and latency reduction.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border">
                  <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>2. Review sovereign cloud mesh architecture paper:</strong> Reference YESS whitepaper v4.2 sent to your registered email.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border">
                  <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>3. Have Github/portfolio repositories ready:</strong> Ensure architecture sketches and infrastructure-as-code samples can be screenshared.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Bento Card: Metadata & Verification Vault (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-7 border border-border shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-foreground">Application Vault</h3>
                    <p className="text-xs text-foreground/70">Verified dossier credentials</p>
                  </div>
                </div>
                <Shield className="w-5 h-5 text-primary" />
              </div>

              {/* Documents submitted */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-foreground/60 tracking-wider block">
                  Submitted Documents
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <div className="text-xs">
                      <span className="font-semibold text-foreground block">Resume_Syed_Reza_LeadArchitect.pdf</span>
                      <span className="text-foreground/60 text-[11px]">2.4 MB • Uploaded Sep 12</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <div className="text-xs">
                      <span className="font-semibold text-foreground block">Architecture_Portfolio_Mesh.pdf</span>
                      <span className="text-foreground/60 text-[11px]">8.9 MB • Uploaded Sep 12</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>

              {/* Application Parameters Grid */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase font-bold text-foreground/60 tracking-wider block">
                  Candidate Parameters
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-muted/30 border border-border">
                    <span className="text-foreground/60 block mb-1 text-[11px]">Target Compensation</span>
                    <span className="font-bold text-foreground text-xs sm:text-sm">৳ 320,000 / mo</span>
                    <span className="text-[10px] text-primary block">+ Venture Equity Pool</span>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30 border border-border">
                    <span className="text-foreground/60 block mb-1 text-[11px]">Declared Notice Period</span>
                    <span className="font-bold text-foreground text-xs sm:text-sm">30 Calendar Days</span>
                    <span className="text-[10px] text-foreground/60 block">Immediate buy-out viable</span>
                  </div>
                </div>

                {/* Dedicated HR Lead contact card */}
                <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-primary tracking-wider block">
                      Dedicated Talent Partner
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground block">Tariq Al-Mansoor</span>
                    <span className="text-[11px] text-foreground/60">Senior Partner, Executive Search</span>
                  </div>
                  <a
                    href="mailto:careers@yessbgd.com?subject=Inquiry regarding YESS-ENG-2026-89412"
                    className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors"
                  >
                    Direct Ping
                  </a>
                </div>
              </div>
            </div>

            {/* Audit Log Snippet */}
            <div className="pt-4 border-t border-border text-[11px] text-foreground/60 font-mono flex items-center justify-between">
              <span>Dossier Hash: 8f42..ce91</span>
              <span className="flex items-center gap-1 text-primary">
                <Clock className="w-3.5 h-3.5" />
                <span>Audit Trail Synced</span>
              </span>
            </div>
          </div>
        </section>

        {/* 7. Direct Candidate Support & Hotline Banner */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-border relative overflow-hidden shadow-sm">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>TALENT CONCIERGE &amp; CANDIDATE ASSISTANCE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">
                Need to modify schedule or update submitted credentials?
              </h3>
              <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl">
                Our executive recruitment coordination team is on standby during Dhaka business hours (9:00 AM –
                6:30 PM BST) to assist candidates throughout the evaluation lifecycle.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <a
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-semibold transition-all"
                href="tel:+8809638445566"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>+880 9638-445566</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all"
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
