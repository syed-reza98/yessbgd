import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Building,
  Mail,
  Lock,
  ChevronRight,
  FileText,
  UserCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | YESS Bangladesh",
  description:
    "How YESS Bangladesh collects, processes, retains, and protects personal data — adhering to GDPR, CCPA, and Bangladesh Data Protection principles.",
};

const privacySections = [
  {
    id: "sec-1",
    num: "1",
    title: "Data Controller Identity & Scope",
    content:
      "YESS Bangla Private Limited ('YESS Bangladesh', 'we', 'our', 'us') operates as the primary data controller for personal telemetry collected through yessbgd.com and our subsidiary venture platforms. Incorporated under RJSC Registration C-184920, our registered offices are located at Sonali Tower, Level 9, Motijheel C/A and Road 45, Gulshan-2, Dhaka, Bangladesh. Contact our Data Protection Officer at privacy@yessbgd.com.",
  },
  {
    id: "sec-2",
    num: "2",
    title: "Categories of Information Collected",
    content:
      "We collect: (a) Candidate Dossier Data: resumes, identity details, interview performance metrics, and portfolio links; (b) Enterprise Inquiry Data: corporate email, telephone, company representation, and project specifications; (c) Telemetry & Technical Metrics: IP address, user-agent, session logs, and cryptographic authentication tokens.",
  },
  {
    id: "sec-3",
    num: "3",
    title: "Lawful Bases for Processing",
    content:
      "Data processing is executed under strict legal bases: (a) Performance of Contract: fulfilling SOW deliverables and venture partnerships; (b) Legitimate Interests: securing cloud infrastructure and continuous service improvement; (c) Consent: candidate talent recruitment and voluntary intelligence newsletter dispatch; (d) Statutory Compliance: tax withholding reporting to the NBR and banking regulations.",
  },
  {
    id: "sec-4",
    num: "4",
    title: "Sovereign Data Storage & Encryption at Rest",
    content:
      "All client databases, candidate dossiers, and transactional records are encrypted using AES-256 at rest and TLS 1.3 in transit. Primary data storage is domiciled within domestic Tier-3 certified data centers in Bangladesh to guarantee national data sovereignty and minimize trans-border latency.",
  },
  {
    id: "sec-5",
    num: "5",
    title: "Zero Third-Party Sale & Sub-processor Vetting",
    content:
      "We never sell, monetize, or lease personal information or client project specs to third parties or advertising networks. Third-party infrastructure sub-processors (such as cloud hosting and email relays) are engaged under strict bilateral data protection addenda (DPA).",
  },
  {
    id: "sec-6",
    num: "6",
    title: "Data Retention & Archival Schedules",
    content:
      "We retain candidate applications for up to 12 months post-decision unless extended consent is granted. Corporate inquiry records are retained for 24 months. Contractual financial ledgers and tax invoices are retained for seven (7) years to satisfy statutory audit mandates under Bangladeshi company law.",
  },
  {
    id: "sec-7",
    num: "7",
    title: "Candidate & Client Rights",
    content:
      "Under domestic data regulations and international GDPR/CCPA standards, individuals possess the right to: (1) Request access to stored dossiers; (2) Demand rectification of erroneous credentials; (3) Mandate erasure ('right to be forgotten'); (4) Restrict processing; and (5) Withdraw marketing consent instantly.",
  },
  {
    id: "sec-8",
    num: "8",
    title: "Cookie Usage & Session Security",
    content:
      "We utilize strictly necessary HTTP session cookies to preserve candidate tracking state and language preferences (ENG / বাংলা). We do not deploy invasive third-party cross-site behavioral tracking cookies.",
  },
  {
    id: "sec-9",
    num: "9",
    title: "Breach Notification & Incident Response",
    content:
      "In the improbable event of a security incident compromising personal data, YESS enforces a rapid containment protocol and guarantees formal notification to affected individuals and regulatory authorities within 72 hours of verification.",
  },
  {
    id: "sec-10",
    num: "10",
    title: "Data Protection Officer Contact",
    content:
      "For inquiries, subject access requests (SAR), or compliance audits, direct communications to: Data Protection Officer, YESS Bangladesh, Gulshan-2 Innovation Labs, Dhaka-1212, or via email at privacy@yessbgd.com. We respond within 30 calendar days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-[#061a1b] via-[#072426] to-[#061a1b] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10">
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,176,170,0.18),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,163,89,0.12),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-[#0d6e6e]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#d4a359]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6">
            <Link href="/" className="hover:text-[#f6c87a] transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-[#35b0aa]">Privacy Policy</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#35b0aa]/40 text-[#f6c87a] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>— DATA PROTECTION &amp; PRIVACY ARCHITECTURE —</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6 leading-tight">
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#35b0aa] via-[#84d4d3] to-[#d4a359] bg-clip-text text-transparent">
                Policy &amp; Data Covenant
              </span>
              .
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-10">
              Our commitments around data collection, sovereign cloud residency, retention schedules, and
              candidate privacy rights across all YESS Bangladesh ventures.
            </p>
          </div>

          {/* Document Release Metadata Strip (3 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#35b0aa] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Document Release
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  Version 2.3 (Data Protection Compliant)
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#f6c87a] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Effective Date
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  September 2026
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#35b0aa]/50 transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/10 text-[#35b0aa] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Encryption Posture
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  AES-256 at Rest • TLS 1.3 Transit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-primary pb-2 border-b border-border">
                Privacy Framework (10 Sections)
              </h2>
              <nav className="space-y-1.5 text-xs">
                {privacySections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted transition-colors truncate"
                  >
                    <span className="font-mono text-[10px] text-foreground/40 w-4">{s.num}.</span>
                    <span className="truncate">{s.title}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-border text-[11px] text-foreground/60 space-y-2">
                <p>Have privacy questions or wish to exercise data rights?</p>
                <a
                  href="mailto:privacy@yessbgd.com"
                  className="text-primary font-semibold hover:underline block"
                >
                  privacy@yessbgd.com
                </a>
              </div>
            </div>
          </aside>

          {/* Content Body (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {privacySections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {s.num}
                  </span>
                  <h2 className="text-base sm:text-lg font-display font-bold text-foreground">
                    {s.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed pl-10">
                  {s.content}
                </p>
              </section>
            ))}

            {/* Bottom Contact Card */}
            <div className="p-6 rounded-2xl bg-muted/30 border border-border flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-display font-bold text-xs text-foreground">
                  Data Protection Officer (DPO) Desk
                </span>
                <p className="text-[11px] text-foreground/60">
                  Direct inquiries regarding data retention, GDPR SAR, or erasure to privacy@yessbgd.com
                </p>
              </div>
              <Mail className="w-8 h-8 text-primary shrink-0" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
