"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface CTAProps {
  category?: string;
  variant?: string;
}

export default function CTA({
  category = "Architecture",
  variant = "ArchiCTA1",
}: CTAProps) {
  // JSON path: categories[category].sections.CTA.variants[variant]
  const ctaSection =
    siteData.categories?.[category as keyof typeof siteData.categories]?.sections?.CTA?.variants;

  const data = ctaSection?.[variant as keyof typeof ctaSection];

  if (!data) return null;

  // Exact 1st Reference Image (Evening luxury villa with pool)
  const referenceImage =
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85";

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-[#faf8f5] overflow-hidden border-t border-neutral-200/60 selection:bg-[#b88344] selection:text-white">
      <div className="max-w-[1380px] mx-auto">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 bg-[#fdfcf9] min-h-[260px] sm:min-h-[290px] flex items-center">
          
          {/* 1. Background Villa Image (Positioned Right) */}
          <img
            src={referenceImage}
            alt={data.titleHighlight || "Ready to Build Your Vision"}
            className="absolute inset-0 w-full h-full object-cover object-right md:object-[right_center]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = referenceImage;
            }}
          />

          {/* 2. Soft White/Cream Gradient Mask for Sharp Text Contrast */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#fdfcf9] via-[#fdfcf9]/95 sm:via-[#fdfcf9]/90 md:via-[#fdfcf9]/80 to-transparent w-full md:w-[70%] pointer-events-none" />

          {/* 3. Left Content Block */}
          <div className="relative z-10 px-6 sm:px-10 md:px-14 py-8 sm:py-10 max-w-xl md:max-w-2xl">
            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#14171c] tracking-tight leading-[1.15]">
              {data.titleLine1 || "Ready to Build"}{" "}
              <span className="text-[#b88344]">
                {data.titleHighlight || "Your Vision?"}
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-[13.5px] text-neutral-600 font-medium leading-relaxed mt-2.5 max-w-md">
              {data.description ||
                "Let's create inspiring spaces together. Get in touch with our team today."}
            </p>

            {/* Action Button */}
            <div className="pt-5 sm:pt-6">
              <Link
                href={data.button?.href || "/contact"}
                className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a07136] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#b88344]/30 hover:shadow-lg hover:shadow-[#b88344]/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                {data.button?.label || "Contact Us"}{" "}
                <ArrowRight size={15} className="stroke-[2.5]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}