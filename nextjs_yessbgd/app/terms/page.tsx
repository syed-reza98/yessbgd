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
  Sparkles,
} from "lucide-react";
import { getSitePage } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("terms");
  return {
    title: page?.seo_title || "Terms of Service | YESS Bangladesh",
    description:
      page?.seo_description ||
      page?.hero_subtitle ||
      "The master institutional agreement governing enterprise software deliverables, Statements of Work (SOW), foreground intellectual property transfer, and binding dispute resolution with YESS Bangladesh.",
  };
}

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

export default async function TermsPage() {
  const sitePage = await getSitePage("terms");
  const activeClauses = (sitePage?.data?.clauses as typeof clauses) || clauses;
  const meta = sitePage?.data?.meta || {};

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-28 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: `url('/assets/trust-handshake-bd.jpg')` }}
        />
        {/* Subtle Decorative Grid Glow & Brand Ambience */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0d6e6e_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-teal-700">Terms of Service</span>
          </nav>

          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{sitePage?.hero_eyebrow || "— STATUTORY CORPORATE GOVERNANCE & LEGAL FRAMEWORK —"}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              {sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Terms of{" "}
                  <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Institutional Service
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed mb-10">
              {sitePage?.hero_subtitle ||
                "The master institutional agreement governing enterprise software deliverables, Statements of Work (SOW), foreground intellectual property transfer, statutory withholding tax, sovereign data residency, and binding dispute resolution with YESS Bangladesh."}
            </p>
          </div>

          {/* Document Release Metadata Strip (3 Glass Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Document Release
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                  {meta.releaseVersion || "Version 2.4 (Statutory Revision)"}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Effective Date
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                  {meta.effectiveDate || "September 2026 (Operational)"}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Legal Jurisdiction
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                  {meta.jurisdiction || "Courts of Dhaka, Bangladesh (RJSC C-184920)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <main className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky 14-Clause Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-primary pb-2 border-b border-border">
                Table of Contents (14 Clauses)
              </h2>
              <nav className="space-y-1.5 text-xs">
                {activeClauses.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted transition-colors truncate"
                  >
                    <span className="font-mono text-[10px] text-foreground/40 w-4">{c.num}.</span>
                    <span className="truncate">{c.title}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-border text-[11px] text-foreground/60 space-y-2">
                <p>Need a custom enterprise agreement or legal review?</p>
                <a
                  href="mailto:legal@yessbgd.com"
                  className="text-primary font-semibold hover:underline block"
                >
                  legal@yessbgd.com
                </a>
              </div>
            </div>
          </aside>

          {/* Clause Content Body (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {activeClauses.map((c) => (
              <section
                key={c.id}
                id={c.id}
                className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {c.num}
                  </span>
                  <h2 className="text-base sm:text-lg font-display font-bold text-foreground">
                    {c.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed pl-10">
                  {c.content}
                </p>
              </section>
            ))}

            {/* Bottom Institutional Seal Card */}
            <div className="p-6 rounded-2xl bg-muted/30 border border-border flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-display font-bold text-xs text-foreground">
                  Statutory Registrar of Joint Stock Companies (RJSC)
                </span>
                <p className="text-[11px] text-foreground/60">
                  Incorporated as YESS Bangla Private Limited • Certificate of Incorporation C-184920
                </p>
              </div>
              <Shield className="w-8 h-8 text-primary shrink-0" />
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
