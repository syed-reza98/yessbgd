import type { Metadata } from "next";
import Link from "next/link";
import {
  Gavel,
  Shield,
  Calendar,
  Building,
  CheckCircle2,
  FileText,
  Lock,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | YESS Bangladesh",
  description:
    "The master institutional agreement governing enterprise software deliverables, Statements of Work (SOW), foreground intellectual property transfer, and binding dispute resolution with YESS Bangladesh.",
};

const clauses = [
  {
    id: "sec-1",
    num: "1",
    title: "Acceptance of Terms",
    content:
      "By accessing yessbgd.com or engaging YESS Bangla Private Limited ('YESS Bangladesh', 'we', 'our') for any service, you ('Client', 'you') agree to be bound by these Terms of Service together with any signed Statement of Work ('SOW'). If you do not agree, do not use the Site or our services.",
  },
  {
    id: "sec-2",
    num: "2",
    title: "Services & Statements of Work",
    content:
      "Each paid engagement is governed by a separate written SOW that defines scope, deliverables, milestones, acceptance criteria, timeline, and fees. In the event of conflict, the SOW controls over these terms for that specific engagement. Any change to scope after kick-off requires a written change order signed by both parties.",
  },
  {
    id: "sec-3",
    num: "3",
    title: "Fees, Invoicing & Statutory Taxes",
    content:
      "Unless stated otherwise in an SOW, all fees are quoted in Bangladesh Taka (BDT) and exclude applicable VAT, withholding tax (AIT), or cross-border levies required by the National Board of Revenue (NBR). Invoices are payable within 14 calendar days of issuance via bank wire or authorized payment rails. Overdue balances accrue statutory interest at 1.5% per month.",
  },
  {
    id: "sec-4",
    num: "4",
    title: "Milestone Acceptance & Remediation",
    content:
      "Each deliverable milestone is deemed accepted seven (7) business days following delivery unless the Client provides written itemization of in-scope non-conformities. YESS will remediate verified non-conformities at zero additional cost within the agreed SLA sprint.",
  },
  {
    id: "sec-5",
    num: "5",
    title: "Foreground & Background Intellectual Property",
    content:
      "Upon settlement of milestone fees, YESS assigns 100% of foreground intellectual property rights in custom deliverables, source code, and data models to the Client. YESS retains pre-existing core libraries, tooling, and frameworks ('Background IP') and grants the Client a perpetual, royalty-free, non-exclusive license to use them as embedded in the deliverables.",
  },
  {
    id: "sec-6",
    num: "6",
    title: "Bilateral Confidentiality & Non-Disclosure",
    content:
      "Both parties agree to protect proprietary source code, operational frameworks, financial models, and client telemetry with at least the degree of care used for their own sensitive materials. Confidentiality covenants survive for three (3) years post-termination of the engagement.",
  },
  {
    id: "sec-7",
    num: "7",
    title: "Professional Warranties & Disclaimers",
    content:
      "YESS warrants that all engineering, consulting, and deployment services will be performed with professional skill and diligence by certified personnel adhering to ISO/IEC 27001 and CMMI standards. Except as explicitly stated, free informational tools are provided 'as is'.",
  },
  {
    id: "sec-8",
    num: "8",
    title: "Limitation of Aggregate Liability",
    content:
      "Except for gross negligence, willful misconduct, or direct breaches of intellectual property covenants, each party's aggregate monetary liability under an engagement is strictly capped at the total professional fees paid under that specific SOW in the preceding 12 months.",
  },
  {
    id: "sec-9",
    num: "9",
    title: "Mutual Indemnification",
    content:
      "YESS indemnifies the Client against third-party claims asserting that delivered custom code infringes a registered Bangladeshi intellectual property right. The Client indemnifies YESS against claims arising from Client-supplied specifications or unauthorized downstream modifications.",
  },
  {
    id: "sec-10",
    num: "10",
    title: "Termination & Convenient Offboarding",
    content:
      "Either party may terminate for material breach un-remedied within 15 days of written notice. Client may terminate for convenience subject to payment for completed milestones and non-cancellable third-party commitments, with full delivery of work-in-progress assets.",
  },
  {
    id: "sec-11",
    num: "11",
    title: "Force Majeure Protocols",
    content:
      "Neither party will be held liable for delays or operational stoppages arising from causes beyond reasonable control, including natural catastrophes, severe undersea cable cuts, civil emergencies, or government directives.",
  },
  {
    id: "sec-12",
    num: "12",
    title: "Acceptable Use & Security Posture",
    content:
      "Clients and portal users agree not to decompile, reverse-engineer, execute unauthorized penetration testing against YESS infrastructure, or leverage YESS APIs to violate domestic telecommunications and cybersecurity legislation.",
  },
  {
    id: "sec-13",
    num: "13",
    title: "Governing Law & Dhaka Court Jurisdiction",
    content:
      "These terms are governed exclusively by the laws of the People's Republic of Bangladesh. Unresolved disputes following 30 days of senior executive consultation are subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.",
  },
  {
    id: "sec-14",
    num: "14",
    title: "Statutory Amendments & Notifications",
    content:
      "YESS reserves the right to amend these general terms to reflect statutory changes in taxation, data privacy, or trade regulations. The version active at the time of SOW signature will govern the respective active engagement.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-background border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-outline mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0d6e6e] font-bold">Terms of Service</span>
          </div>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-[#0d6e6e]/20 text-[#0d6e6e] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Gavel className="w-4 h-4" />
              <span>Statutory Corporate Governance & Legal Framework</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy dark:text-white tracking-tight mb-4">
              Terms of{" "}
              <span className="bg-gradient-to-r from-[#0d6e6e] via-[#35b0aa] to-[#d4a359] bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed mb-8">
              The master institutional agreement governing enterprise software deliverables, Statements of
              Work (SOW), foreground intellectual property transfer, statutory withholding tax, sovereign
              data residency, and binding dispute resolution with YESS Bangladesh.
            </p>
          </div>

          {/* Document Release Metadata Strip */}
          <div className="glass-card p-5 rounded-2xl border border-outline-variant/30 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#0d6e6e]/10 text-[#0d6e6e]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                  Document Release
                </span>
                <span className="text-xs font-bold text-brand-navy dark:text-white">
                  Version 2.4 (Statutory Revision)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#0d6e6e]/10 text-[#0d6e6e]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                  Effective Date
                </span>
                <span className="text-xs font-bold text-brand-navy dark:text-white">
                  September 2026 (Operational)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#d4a359]/15 text-[#7e5713] dark:text-[#f2be71]">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                  Legal Jurisdiction
                </span>
                <span className="text-xs font-bold text-brand-navy dark:text-white">
                  Courts of Dhaka, Bangladesh (RJSC C-184920)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky 14-Clause Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 border border-outline-variant/40 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0d6e6e] pb-2 border-b border-outline-variant/30">
                Table of Contents (14 Clauses)
              </h3>
              <nav className="space-y-1.5 text-xs">
                {clauses.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-on-surface-variant hover:text-[#0d6e6e] hover:bg-surface-container transition-colors truncate"
                  >
                    <span className="font-mono text-[10px] text-outline w-4">{c.num}.</span>
                    <span className="truncate">{c.title}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-outline-variant/30 text-[11px] text-outline space-y-2">
                <p>Need a custom enterprise agreement or legal review?</p>
                <a
                  href="mailto:legal@yessbgd.com"
                  className="text-[#0d6e6e] font-semibold hover:underline block"
                >
                  legal@yessbgd.com
                </a>
              </div>
            </div>
          </aside>

          {/* Clause Content Body (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {clauses.map((c) => (
              <section
                key={c.id}
                id={c.id}
                className="glass-card rounded-2xl p-7 border border-outline-variant/40 hover:border-[#0d6e6e]/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#0d6e6e]/10 text-[#0d6e6e] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {c.num}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-brand-navy dark:text-white">
                    {c.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed pl-10">
                  {c.content}
                </p>
              </section>
            ))}

            {/* Bottom Institutional Seal Card */}
            <div className="p-6 rounded-2xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-bold text-xs text-brand-navy dark:text-white">
                  Statutory Registrar of Joint Stock Companies (RJSC)
                </span>
                <p className="text-[11px] text-outline">
                  Incorporated as YESS Bangla Private Limited • Certificate of Incorporation C-184920
                </p>
              </div>
              <Shield className="w-8 h-8 text-[#d4a359] shrink-0" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
