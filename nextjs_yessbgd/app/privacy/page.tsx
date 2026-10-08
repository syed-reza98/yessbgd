import type { Metadata } from "next";
import { getSitePage } from "@/lib/cms";
import {
  ShieldCheck,
  Calendar,
  Building,
  Mail,
  Lock,
  ChevronRight,
  FileText,
  UserCheck,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("privacy");
  return {
    title: page?.seo_title?.replace(/\s*\|\s*YESS Bangladesh$/i, "") || "Privacy Policy",
    description:
      page?.seo_description ||
      "How YESS Bangladesh collects, processes, retains, and protects personal data — adhering to GDPR, CCPA, and Bangladesh Data Protection principles.",
  };
}

const privacySections = [
  {
    id: "sec-1",
    num: "1",
    title: "Data Controller Identity & Scope",
    content:
      "YESS Bangla Private Limited ('YESS Bangladesh', 'we', 'our', 'us') operates as the primary data controller for personal telemetry collected through yessbgd.com and our subsidiary venture platforms. Incorporated under RJSC Registration C-184920, our registered office is located at Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312). Contact our Data Protection Officer at privacy@yessbgd.com.",
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
      "For inquiries, subject access requests (SAR), or compliance audits, direct communications to: Data Protection Officer, YESS Bangladesh, Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312), or via email at privacy@yessbgd.com. We respond within 30 calendar days.",
  },
];

export default async function PrivacyPage() {
  const sitePage = await getSitePage("privacy");
  const sections = (sitePage?.data?.sections as any[]) || privacySections;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Signature Corporate Hero Section */}
      <section className="relative w-full bg-white overflow-hidden min-h-[500px] lg:min-h-[550px] pt-7 pb-20 sm:pt-10 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Photographic backdrop with home 90deg readability mask */}
        <div className="absolute inset-x-0 top-0 z-0 h-[500px] lg:h-[550px] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/trust-handshake-bd.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
            style={{
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 25%, rgba(0,0,0,0.90) 45%, rgba(0,0,0,1) 60%)",
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-6 z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/95 border border-emerald-300/90 px-3.5 py-1.5 rounded-full shadow-xs mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#047857]" aria-hidden="true" />
              <span className="text-[#047857] text-[11px] sm:text-[11.5px] font-extrabold tracking-wider uppercase">
                {sitePage?.hero_eyebrow || "Data protection & privacy architecture"}
              </span>
            </div>

            <h1 className="text-[34px] sm:text-[42px] lg:text-[47px] font-black leading-[1.12] tracking-tight mb-4 sm:mb-5 [text-shadow:_0_0_20px_#ffffff,_0_0_10px_#ffffff,_0_1px_2px_#ffffff]">
              {sitePage?.hero_title ? (
                <span className="block text-[#030D18]">{sitePage.hero_title}</span>
              ) : (
                <>
                  <span className="block text-[#030D18]">Privacy</span>
                  <span className="block text-[#026E4D]">Policy &amp; Data Covenant</span>
                </>
              )}
            </h1>

            <div className="border-l-3 border-[#0E8A44] pl-3.5 py-0.5 mb-6 sm:mb-8 max-w-[450px]">
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#051321] font-bold [text-shadow:_0_0_24px_#ffffff,_0_0_16px_#ffffff,_0_0_8px_#ffffff,_0_1px_2px_#ffffff]">
                {sitePage?.hero_subtitle || "Our commitments around data collection, sovereign cloud residency, retention schedules, and candidate privacy rights across all YESS Bangladesh ventures."}
              </p>
            </div>
          </div>

          {/* Document Release Metadata Strip (home card style) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Document Release
                </span>
                <span className="text-xs font-bold text-[#0D1E2D] mt-0.5 block">
                  Version 2.3 (Data Protection Compliant)
                </span>
              </div>
            </div>

            <div className="p-5 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Effective Date
                </span>
                <span className="text-xs font-bold text-[#0D1E2D] mt-0.5 block">
                  September 2026
                </span>
              </div>
            </div>

            <div className="p-5 rounded-[14px] bg-white/95 border border-gray-100/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-shadow flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                  Encryption Posture
                </span>
                <span className="text-xs font-bold text-[#0D1E2D] mt-0.5 block">
                  AES-256 at Rest • TLS 1.3 Transit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Layout */}
      <div className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
            <div className="glass-card rounded-2xl p-6 border border-border space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-primary pb-2 border-b border-border">
                Privacy Framework ({sections.length} Sections)
              </h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((s: any) => (
                  <a
                    key={s.id || s.title}
                    href={`#${s.id || s.title}`}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted transition-colors truncate"
                  >
                    <span className="font-mono text-[10px] text-foreground/40 w-4">{s.num || "•"}.</span>
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
            {sections.map((s: any) => (
              <section
                key={s.id || s.title}
                id={s.id || s.title}
                className="glass-card rounded-2xl p-7 border border-border hover:border-primary/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {s.num || "§"}
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
        </div>
      </div>
    </div>
  );
}
