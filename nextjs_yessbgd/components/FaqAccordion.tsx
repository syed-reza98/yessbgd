"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Shield,
  Clock,
  Sparkles,
  FileCheck,
  CreditCard,
  Building,
  HelpCircle,
} from "lucide-react";

type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
};

const faqData: FaqItem[] = [
  {
    id: "ip-ownership",
    category: "Ventures & IP",
    question: "Do clients receive 100% ownership of source code and intellectual property?",
    answer:
      "Yes, unconditionally. Under our Turnkey EPC and Dedicated Pod agreements, all foreground intellectual property, custom architecture, database schemas, and codebase assets are assigned directly to the client upon milestone settlement. We retain zero proprietary lock-in on custom-built client solutions.",
    tags: ["IP Ownership", "Pricing & SPV", "General"],
  },
  {
    id: "pricing-models",
    category: "Engagement & Pricing",
    question: "How do your pricing and engagement models compare with typical IT agencies?",
    answer:
      "Unlike traditional hourly billing firms, YESS operates as a venture foundry and engineering consultancy. We offer three primary models: (1) Strategic Advisory at fixed-scope sprint rates; (2) Dedicated Autonomous Engineering Pods at monthly retainer rates with committed SLAs; and (3) Turnkey EPC with equity co-investment or milestone milestone disbursement.",
    tags: ["Pricing & SPV", "General"],
  },
  {
    id: "sla-guarantees",
    category: "Delivery, SLA & Support",
    question: "What SLA response times and uptime guarantees do you provide?",
    answer:
      "For mission-critical sovereign systems, we offer up to a 99.99% availability SLA backed by contractually enforced financial credits. Critical Sev-1 incidents receive a guaranteed 15-minute response time with dedicated senior DevOps architects dispatched 24/7.",
    tags: ["SLAs", "Delivery, SLA & Support"],
  },
  {
    id: "national-reach",
    category: "General & National Reach",
    question: "How does YESS Bangladesh operate across all 64 districts?",
    answer:
      "Our dual innovation hubs in Motijheel and Gulshan serve as core command centers, while our decentralized field engineering network supports IoT sensors, cold-chain logistics, and digital banking terminals deployed across all 8 administrative divisions and 64 districts nationwide.",
    tags: ["64 Districts", "General & National Reach"],
  },
  {
    id: "security-audits",
    category: "Security & Governance",
    question: "How do you handle compliance, security audits, and data localization?",
    answer:
      "All architectures strictly enforce zero-trust network segmentation, 256-bit AES encryption at rest, and full domestic data localization conforming to Bangladesh Bank guidelines, ICT Act provisions, and upcoming Data Protection Acts. We conduct continuous third-party penetration testing.",
    tags: ["Legacy Audit", "Security & Governance"],
  },
  {
    id: "bilateral-nda",
    category: "Security & Governance",
    question: "Can we sign a bilateral Non-Disclosure Agreement (NDA) before sharing technical specs?",
    answer:
      "Absolutely. We mandate bilateral NDAs as standard operating procedure prior to any architectural discovery, code review, or proprietary requirement briefing. Our standard NDA or client-provided enterprise covenants can be executed digitally within hours.",
    tags: ["Pricing & SPV", "Security & Governance"],
  },
  {
    id: "ott-streaming",
    category: "Ventures & IP",
    question: "What capabilities distinguish Akash OTT Media from generic video platforms?",
    answer:
      "Akash OTT Media utilizes a proprietary ultra-low-latency WebRTC and adaptive HLS pipeline engineered specifically for South Asian bandwidth profiles. It includes native multi-DRM rights protection, dynamic local ad-insertion, and automated peering across domestic BDIX IXPs.",
    tags: ["IP Ownership", "Ventures & IP"],
  },
  {
    id: "legacy-modernization",
    category: "Delivery, SLA & Support",
    question: "Can you modernize our existing monolithic legacy software without downtime?",
    answer:
      "Yes. We specialize in the strangler-fig pattern, incrementally decoupling legacy databases and monolithic backends into resilient microservices and edge APIs. We run blue-green and canary deployments to ensure zero service disruption during transition.",
    tags: ["Legacy Audit", "Delivery, SLA & Support"],
  },
  {
    id: "spv-formation",
    category: "Engagement & Pricing",
    question: "How does joint venture SPV formation work with YESS Bangladesh?",
    answer:
      "For strategic national transformations, YESS partners with institutional conglomerates to incorporate dedicated Special Purpose Vehicles (SPVs) under RJSC Bangladesh. YESS provides tech equity, architecture, and team talent, while partners contribute capitalization and market access.",
    tags: ["Pricing & SPV", "Engagement & Pricing"],
  },
];

const categories = [
  "All Questions",
  "General & National Reach",
  "Engagement & Pricing",
  "Delivery, SLA & Support",
  "Security & Governance",
  "Ventures & IP",
];

export function FaqAccordion() {
  const [selectedCategory, setSelectedCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["ip-ownership", "pricing-models"]);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchCategory =
        selectedCategory === "All Questions" || item.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic, e.g. pricing, NDA, OTT, SLA, cloud residency..."
            className="w-full bg-white dark:bg-[#061a1b] border border-outline-variant/60 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#0d6e6e]"
          />
        </div>

        {/* Quick Topic Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-outline font-medium mr-1">Quick Search Topics:</span>
          {["All", "Pricing & SPV", "IP Ownership", "SLAs", "64 Districts", "Legacy Audit"].map(
            (tag) => {
              const active = searchQuery === (tag === "All" ? "" : tag);
              return (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag === "All" ? "" : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#0d6e6e] text-white shadow-sm"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                  }`}
                >
                  {tag}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const count =
            cat === "All Questions"
              ? faqData.length
              : faqData.filter((f) => f.category === cat).length;
          const active = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                active
                  ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <HelpCircle className="w-10 h-10 text-outline mx-auto mb-2 opacity-60" />
            <h3 className="font-bold text-base text-brand-navy dark:text-white">
              No questions found
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Try adjusting your search query or select another category.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl p-6 hover:border-[#0d6e6e]/40 transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full text-left flex items-start justify-between gap-4 select-none cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#0d6e6e] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-brand-navy dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-[#0d6e6e] transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#0d6e6e]/10" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-outline-variant/30 text-xs sm:text-sm text-on-surface-variant leading-relaxed space-y-3">
                    <p>{faq.answer}</p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {faq.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-container text-outline"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
