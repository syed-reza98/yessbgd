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
} from "lucide-react";

type PipelineStep = {
  id: number;
  title: string;
  subtitle: string;
  status: "completed" | "current" | "upcoming";
  timestamp?: string;
  notes?: string;
};

export function ApplicationStatusTracker() {
  const searchParams = useSearchParams();
  const queryRef = searchParams.get("ref");
  const queryEmail = searchParams.get("email");

  const [refId, setRefId] = useState(queryRef || "YESS-ENG-2026-89412");
  const [candidateEmail, setCandidateEmail] = useState(
    queryEmail || "syed.candidate@example.com"
  );
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastPingTime, setLastPingTime] = useState("15:42:19 BST");

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
    setTimeout(() => {
      const now = new Date();
      setLastPingTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")} BST`
      );
      setIsRefreshing(false);
    }, 600);
  };

  const pipeline: PipelineStep[] = [
    {
      id: 1,
      title: "Application Submitted",
      subtitle: "Dossier encrypted & logged",
      status: "completed",
      timestamp: "Sep 12, 2026 • 11:20 BST",
      notes: "Resume, portfolio, and architecture credentials verified by automated parser.",
    },
    {
      id: 2,
      title: "Technical Screening",
      subtitle: "Peer Architect Review",
      status: "completed",
      timestamp: "Sep 15, 2026 • 14:00 BST",
      notes: "Reviewed by Sumaiya Rahman (Head of Engineering). Score: 96/100 (Advanced Systems).",
    },
    {
      id: 3,
      title: "Panel Interview Round 2",
      subtitle: "Live System Design Deep Dive",
      status: "current",
      timestamp: "Sep 28, 2026 • 16:00 BST",
      notes:
        "Interviewers: Arif Khan (Chief Architect) & Sadia Rahman (Venture Lead). Session link sent via calendar.",
    },
    {
      id: 4,
      title: "Executive Dialogue & Offer",
      subtitle: "Comp & Equity Allocation",
      status: "upcoming",
      timestamp: "Estimated: Oct 3, 2026",
      notes: "Direct discussion on executive profit-sharing pools and venture equity.",
    },
    {
      id: 5,
      title: "Onboarding & Day 1",
      subtitle: "Dhaka Dual-Hub Integration",
      status: "upcoming",
      timestamp: "Estimated: Mid-October 2026",
      notes: "Hardware provisioning (Apple M3 Max / Linux Rig) & security badge creation.",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-[#0d6e6e]/20 text-[#0d6e6e] mb-6 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35b0aa] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0d6e6e]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Recruitment Pipeline & Candidate Telemetry
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight mb-4">
          Track Your{" "}
          <span className="bg-gradient-to-r from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] bg-clip-text text-transparent">
            Application Status
          </span>
        </h1>

        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Real-time candidate telemetry for engineering, product, and consulting roles across YESS
          Bangladesh ventures. Enter your tracking reference number and registered email to check status.
        </p>
      </section>

      {/* Lookup Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-3xl p-7 shadow-xl shadow-[#0d6e6e]/5">
          <form onSubmit={handleRefresh} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-navy dark:text-white">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-white dark:bg-[#061a1b] font-mono text-xs text-on-surface focus:outline-none focus:border-[#0d6e6e]"
                  />
                </div>
                <p className="text-[11px] text-outline">Format: YESS-[DEPT]-[YEAR]-[ID]</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-brand-navy dark:text-white">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-white dark:bg-[#061a1b] text-xs text-on-surface focus:outline-none focus:border-[#0d6e6e]"
                  />
                </div>
                <p className="text-[11px] text-outline">Must match your application dossier email</p>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Shield className="w-4 h-4 text-[#0d6e6e]" />
                <span>256-bit Encrypted Candidate Session</span>
              </div>

              <button
                type="submit"
                disabled={isRefreshing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0d6e6e] hover:bg-[#005454] text-white text-xs font-semibold shadow-md transition-all active:scale-98"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Check Status</span>
              </button>
            </div>
          </form>

          {/* Realtime Live Telemetry Ping */}
          <div className="mt-4 pt-3 border-t border-dashed border-outline-variant/40 flex items-center justify-between text-xs text-outline">
            <div className="flex items-center gap-2 text-[#0d6e6e] font-medium">
              <Wifi className="w-3.5 h-3.5" />
              <span>Live sovereign connection active</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Last ping: Just now ({lastPingTime})</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Application Result Dossier */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Executive Header Card */}
        <section className="glass-card rounded-3xl p-7 sm:p-8 shadow-xl border border-outline-variant/40 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4a359]/15 text-[#7e5713] dark:text-[#f2be71] border border-[#d4a359]/30 text-xs font-bold">
                  ★ Yess Soft Ltd. (Enterprise Cloud & AI)
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-medium">
                  Ventures Division ID: BD-VNT-04
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy dark:text-white tracking-tight">
                Lead Cloud Solutions Architect — Yess Soft Ltd.
              </h2>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-on-surface-variant pt-1">
                <span className="flex items-center gap-1.5 font-medium text-on-surface">
                  <User className="w-3.5 h-3.5 text-[#0d6e6e]" />
                  Applicant: <strong>Syed Reza</strong>
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
                <span className="flex items-center gap-1.5 font-mono text-xs bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
                  Ref: {refId}
                  <button onClick={handleCopyRef} className="hover:text-primary ml-1" title="Copy Reference">
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#35b0aa]/15 text-[#005454] dark:text-[#84d4d3] border border-[#35b0aa]/40">
                <span className="w-2 h-2 rounded-full bg-[#35b0aa] animate-ping" />
                STAGE 3: INTERVIEW ROUND 2
              </span>
              <span className="text-[11px] text-outline">Response SLA: 48h active</span>
            </div>
          </div>

          {/* Canonical 5-Stage Stepper */}
          <div className="space-y-6 pt-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-outline">
              Canonical Selection Stepper
            </h3>

            <div className="relative space-y-6 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-outline-variant/50">
              {pipeline.map((step) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";
                const isUpcoming = step.status === "upcoming";

                return (
                  <div key={step.id} className="relative flex items-start gap-4">
                    {/* Circle Node */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-xs transition-transform duration-200 ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : isCurrent
                          ? "bg-[#0d6e6e] text-white ring-4 ring-[#0d6e6e]/20 shadow-lg scale-105"
                          : "bg-surface-container text-outline border border-outline-variant"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5 animate-pulse" />
                      ) : (
                        step.id
                      )}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`flex-1 rounded-2xl p-5 border transition-all ${
                        isCurrent
                          ? "bg-white dark:bg-[#061a1b] border-[#0d6e6e] shadow-md shadow-[#0d6e6e]/10"
                          : isCompleted
                          ? "bg-surface-container-low border-outline-variant/40"
                          : "bg-surface-container-lowest/50 border-dashed border-outline-variant/30 opacity-70"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-brand-navy dark:text-white">
                            {step.title}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0d6e6e]/10 text-[#0d6e6e]">
                              Current Stage
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-outline">{step.timestamp}</span>
                      </div>

                      <p className="text-xs text-on-surface-variant mb-2">{step.subtitle}</p>

                      {step.notes && (
                        <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 text-xs text-on-surface-variant font-mono leading-relaxed">
                          <strong>Direct Note:</strong> {step.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Next Directives & Panel Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-brand-navy dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0d6e6e]" />
              Scheduled Session Details
            </h3>
            <div className="text-xs text-on-surface-variant space-y-2">
              <p>
                <strong>Date & Time:</strong> Monday, September 28, 2026 • 16:00 BST
              </p>
              <p>
                <strong>Format:</strong> Google Meet (Encrypted Sovereign Room)
              </p>
              <p>
                <strong>Focus Area:</strong> Zero-Trust Mesh & K8s Distributed Ledgers
              </p>
              <p>
                <strong>Panel Members:</strong> Arif Khan (Chief Architect) & Sadia Rahman (Venture Lead)
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-brand-navy dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#d4a359]" />
              Candidate Attachments Vault
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <span className="font-medium text-on-surface">Syed_Reza_Systems_CV_2026.pdf</span>
                <span className="text-[10px] text-emerald-600 font-bold">VERIFIED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <span className="font-medium text-on-surface">Distributed_Architecture_Portfolio.pdf</span>
                <span className="text-[10px] text-emerald-600 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
