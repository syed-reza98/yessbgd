"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface ServiceFaqDrawerProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function ServiceFaqDrawer({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Direct answers regarding architecture, SLAs, commercial models, and delivery timelines.",
}: ServiceFaqDrawerProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-display font-bold text-2xl text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-foreground/70 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`rounded-2xl glass-card border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-primary/50 shadow-md bg-muted/30"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm sm:text-base text-foreground">
                    {faq.q}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-border/60 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-foreground/60"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-border/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
