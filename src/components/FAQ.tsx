"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface FAQProps {
  category?: string;
  variant?: string;
}

export default function FAQ({
  category = "Architecture",
  variant = "ArchiFAQ1",
}: FAQProps) {
  const faqSection =
    siteData.categories?.[category as keyof typeof siteData.categories]?.sections?.FAQ?.variants;

  const data = faqSection?.[variant as keyof typeof faqSection];
  const items = data?.items || [];

  const [openId, setOpenId] = useState<number | string | null>(
    items[0]?.id ?? 1
  );

  if (!data || items.length === 0) return null;

  // 2 Columns: 1-5 Left, 6-10 Right
  const midIndex = Math.ceil(items.length / 2);
  const leftColumnItems = items.slice(0, midIndex);
  const rightColumnItems = items.slice(midIndex);

  const renderFaqCard = (faq: any, sequentialNumber: number) => {
    const isOpen = openId === faq.id;
    const cleanedQuestion = faq.question.replace(/^\d+[\.\)]\s*/, "");

    return (
      <div
        key={faq.id}
        className="rounded-xl overflow-hidden transition-all duration-200 border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] bg-white"
      >
        {/* Accordion Question Header - Fixed min-height for uniform alignment */}
        <button
          type="button"
          onClick={() => setOpenId(isOpen ? null : faq.id)}
          className={`w-full min-h-[54px] flex items-center justify-between text-left px-5 py-3 transition-colors duration-200 ${
            isOpen
              ? "bg-[#b88344] text-white"
              : "bg-white text-[#14171c] hover:bg-[#faf7f2]"
          }`}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 pr-3 min-w-0">
            {/* Fixed-width number so text starts at the exact same vertical line */}
            <span
              className={`w-7 shrink-0 text-[14.5px] sm:text-[15px] font-bold tabular-nums ${
                isOpen ? "text-white" : "text-[#b88344]"
              }`}
            >
              {sequentialNumber}.
            </span>
            <span className="text-[13.5px] sm:text-[14px] font-semibold tracking-tight truncate sm:whitespace-normal">
              {cleanedQuestion}
            </span>
          </div>

          {/* Plus/Minus Pill */}
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
              isOpen
                ? "bg-white text-[#b88344]"
                : "bg-[#b88344] text-white"
            }`}
          >
            {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
          </span>
        </button>

        {/* Answer Compartment */}
        {isOpen && (
          <div className="px-5 py-3.5 text-[12.5px] sm:text-[13px] text-neutral-600 font-normal leading-relaxed bg-white border-t border-neutral-100/90">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative bg-[#fcfbf9] py-10 sm:py-14 px-4 sm:px-6 overflow-hidden selection:bg-[#b88344] selection:text-white">
      <div className="max-w-[1080px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-9">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
            <span className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#b88344]">
              {data.badge?.replace(/—/g, "").trim() || "FAQ"}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-black text-[#14171c] tracking-tight leading-[1.12]">
            {data.titleLine1 || "Frequently Asked"}{" "}
            <span className="text-[#b88344]">
              {data.titleHighlight || "Questions"}
            </span>
          </h2>

          <p className="text-[11.5px] sm:text-xs text-neutral-500 font-normal leading-relaxed mt-1.5">
            {data.description ||
              "Find answers to common questions about our design process, services and working approach."}
          </p>
        </div>

        {/* 2-Column Grid with Equal Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-start">
          <div className="space-y-3 sm:space-y-3.5">
            {leftColumnItems.map((faq, idx) => renderFaqCard(faq, idx + 1))}
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {rightColumnItems.map((faq, idx) =>
              renderFaqCard(faq, midIndex + idx + 1)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}