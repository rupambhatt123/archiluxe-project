"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface AboutProps {
  category?: string;
  variant?: string;
}

export default function About({
  category = "Architecture",
  variant = "ArchiAbout1",
}: AboutProps) {
  const currentCategory =
    siteData.categories?.[category as keyof typeof siteData.categories];
  const aboutVariants = currentCategory?.sections?.About?.variants;
  const data = aboutVariants?.[variant as keyof typeof aboutVariants];

  if (!data) return null;

  const badgeText = data.badge?.replace(/—/g, "").trim() || "About Us";

  return (
    <section
      id="about"
      className="relative bg-[#faf7f0] pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 md:px-10 overflow-hidden selection:bg-[#b88344] selection:text-white"
    >
      {/* Dynamic Watermark Outline Text from JSON Badge */}
      <div
        aria-hidden="true"
        className="absolute top-2 left-4 md:left-8 pointer-events-none select-none z-0"
      >
        <span
          className="text-[90px] sm:text-[130px] md:text-[160px] font-black tracking-tight uppercase leading-none opacity-20 text-transparent"
          style={{
            WebkitTextStroke: "1.5px #d8c4a4",
          }}
        >
          {badgeText}
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top Header Block - 100% from JSON */}
        <div className="mb-6 sm:mb-8 max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-[#14171c] tracking-tight leading-[1.1]">
            {data.titleLine1 || "Foundations of"} <br />
            <span className="text-[#b88344]">
              {data.titleHighlight || "ArchiLuxe"}
            </span>
          </h2>

          <div className="w-10 h-[2px] bg-[#b88344] mt-3.5 mb-2.5" />

          <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
            {data.subtitle ||
              "Crafting Architectural Designs and Masterpieces Interior Wonders"}
          </p>
        </div>

        {/* Main Composition: Image + TALL Extended Black Card */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-start mt-8">
          
          {/* Left: Dynamic Main Image from JSON */}
          <div className="lg:col-span-7 relative z-10">
            {/* Warm Gold Accent Corner Tab */}
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-[#f3e7d3] rounded-2xl pointer-events-none z-0" />

            <div className="relative z-10 w-full h-[320px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-neutral-200 border border-neutral-100">
              <img
                src={data.mainImage || "/hero.png"}
                alt={data.titleHighlight || "Foundations of ArchiLuxe"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>
          </div>

          {/* Right: Black Card - Dynamic Points from JSON */}
          <div className="lg:col-span-5 bg-[#1b2026] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/5 relative z-20 mt-6 lg:mt-0 lg:-ml-10 lg:-translate-y-12 flex flex-col justify-between">
            <div className="space-y-6 sm:space-y-7">
              {data.points?.map((pt) => (
                <div key={pt.id} className="flex gap-4 sm:gap-5 items-start">
                  {/* Point ID from JSON */}
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none shrink-0 w-11">
                    {pt.id}
                  </span>

                  {/* Vertical Divider & Details from JSON */}
                  <div className="border-l border-white/20 pl-4 space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button - Dynamic Href & Label from JSON */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                href={data.button?.href || "/about"}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-[#b88344] transition-colors group"
              >
                {data.button?.label || "Learn more About Us"}{" "}
                <ArrowRight
                  size={15}
                  className="stroke-[2.2] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}