"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface BannerProps {
  category?: string;
  variant?: string;
}

export default function Banner({
  category = "Architecture",
  variant = "ArchiBanner1",
}: BannerProps) {
  const currentCategory =
    (siteData as any).categories?.[category as keyof typeof siteData.categories];
  const bannerVariants = currentCategory?.sections?.Banner?.variants;
  const data = bannerVariants?.[variant as keyof typeof bannerVariants];

  if (!data) return null;

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[640px] md:h-[90vh] md:max-h-[820px] overflow-hidden bg-[#0d0f12] text-[#14171c] selection:bg-[#b88344] selection:text-white flex flex-col justify-between">
      {/* 1. Full Bleed Background Image */}
      <img
        src="/hero.png"
        alt={data.titleHighlight || "Modern Architecture"}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay: Mobile par halka sa strong taaki text readable ho */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/30 md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent w-full md:w-[65%]" />

      {/* 2. Content Block - Mobile par naturally spaced & spread */}
      <div className="relative z-10 max-w-[1360px] mx-auto w-full px-5 sm:px-10 md:px-14 pt-28 sm:pt-32 md:pt-0 md:h-full flex flex-col justify-center flex-1">
        <div className="max-w-xl pb-16 sm:pb-20 md:pb-16 space-y-3 sm:space-y-4">
          {/* Badge & Line */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-6 sm:w-8 h-[2px] bg-[#b88344]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#14171c]">
              {data.badge || "MODERN SPACES FOR BETTER LIVING"}
            </span>
          </div>

          {/* Main Headline: Mobile par balanced size taaki congested na lage */}
          <h1 className="text-[34px] xs:text-[38px] sm:text-5xl md:text-[68px] font-black text-[#14171c] leading-[1.12] sm:leading-[1.08] tracking-tight">
            {data.titleLine1 || "Inspired"}{" "}
            <span className="text-[#b88344] block sm:inline">
              {data.titleHighlight || "Spaces"}
            </span>{" "}
            <span className="block">{data.titleLine2 || "for Life"}</span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-neutral-700 text-[13px] sm:text-[14px] leading-relaxed max-w-md font-normal pt-1">
            {data.description ||
              "Creative architecture, functional design and sustainable solutions for a better tomorrow."}
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            {data.buttons?.map((btn: any) => (
              <Link
                key={btn.label}
                href={btn.href || "/projects"}
                className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#a07136] text-white px-6 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-[#b88344]/30 hover:scale-105 transition-all duration-200"
              >
                {btn.label} <ArrowRight size={15} className="stroke-[2.5]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Strip - Desktop untouched (right fixed), Mobile clean horizontal scroll without overlap */}
      <div className="relative sm:absolute sm:bottom-0 sm:right-0 z-20 w-full sm:w-auto flex items-stretch bg-white/95 backdrop-blur-md sm:bg-white rounded-t-2xl sm:rounded-tl-[36px] sm:rounded-tr-none shadow-xl border-t sm:border-t-0 border-neutral-200/80 overflow-hidden">
        <div className="flex items-center py-3 sm:py-5 px-4 sm:px-8 md:px-12 gap-5 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar flex-1">
          {data.stripHighlights?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <span className="text-xl sm:text-3xl md:text-[34px] font-black text-[#14171c] tracking-tight leading-none">
                {item.id}
              </span>
              <div className="text-left leading-tight">
                <span className="block text-xs sm:text-[13px] font-bold text-[#14171c] whitespace-nowrap">
                  {item.title}
                </span>
                <span className="block text-[10px] sm:text-[11px] text-neutral-500 whitespace-nowrap mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={data.buttons?.[0]?.href || "/projects"}
          aria-label="Explore Projects"
          className="bg-[#10141a] hover:bg-[#b88344] text-white px-4 sm:px-8 flex items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <ArrowRight size={18} className="stroke-[2.2]" />
        </Link>
      </div>
    </section>
  );
}