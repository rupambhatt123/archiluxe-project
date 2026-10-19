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
      <img
        src="/hero.png"
        alt={data.titleHighlight || "Modern Architecture"}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/30 md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent w-full md:w-[65%]" />

      <div className="relative z-10 max-w-[1360px] mx-auto w-full px-5 sm:px-10 md:px-14 pt-28 sm:pt-32 md:pt-0 md:h-full flex flex-col justify-center flex-1">
        <div className="max-w-xl pb-16 sm:pb-20 md:pb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-6 sm:w-8 h-[2px] bg-[#b88344]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#14171c]">
              {data.badge}
            </span>
          </div>

          <h1 className="text-[34px] xs:text-[38px] sm:text-5xl md:text-[68px] font-black text-[#14171c] leading-[1.12] sm:leading-[1.08] tracking-tight">
            {data.titleLine1}{" "}
            <span className="text-[#b88344] block sm:inline">
              {data.titleHighlight}
            </span>{" "}
            <span className="block">{data.titleLine2}</span>
          </h1>

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

      <div className="relative sm:absolute sm:bottom-0 sm:right-0 z-20 w-full sm:w-auto flex items-stretch bg-white/95 backdrop-blur-md sm:bg-white rounded-t-2xl sm:rounded-tl-[44px] sm:rounded-tr-none shadow-2xl border-t sm:border-t-0 border-neutral-200/80 overflow-hidden">
        <div className="grid grid-cols-3 sm:flex sm:items-center py-2.5 sm:py-6 md:py-8 px-2.5 sm:px-10 md:px-14 gap-1.5 sm:gap-10 md:gap-14 flex-1">
          {data.stripHighlights?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-1.5 sm:gap-3.5 min-w-0">
              <span className="text-[17px] xs:text-[19px] sm:text-4xl md:text-[44px] font-black text-[#14171c] tracking-tight leading-none shrink-0">
                {item.id}
              </span>

              <div className="text-left leading-tight min-w-0 flex-1">
                <span className="block text-[10px] xs:text-[11px] sm:text-base md:text-[17px] font-bold text-[#14171c] truncate sm:whitespace-nowrap">
                  {item.title}
                </span>
                <span className="block text-[8px] xs:text-[9px] sm:text-[13px] md:text-sm font-medium text-neutral-500 truncate sm:whitespace-nowrap mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href={data.buttons?.[0]?.href || "/projects"}
          aria-label="Explore Projects"
          className="hidden xs:flex sm:flex bg-[#10141a] hover:bg-[#b88344] text-white px-2.5 sm:px-8 md:px-10 items-center justify-center transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.3]" />
        </Link>
      </div>
    </section>
  );
}