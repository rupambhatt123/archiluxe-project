"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;

export default function About() {
  const aboutData =
    siteData?.categories?.Architecture?.sections?.About?.variants?.ArchiAbout1;

  if (!aboutData) return null;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto bg-[#faf8f5]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 h-[380px] sm:h-[480px] bg-neutral-200">
            <img
              src={aboutData.mainImage}
              alt={aboutData.titleLine1}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Content & Points */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-[1.5px] bg-[#b88344]" />
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
                {aboutData.badge?.replace(/—/g, "").trim()}
              </span>
              <span className="w-7 h-[1.5px] bg-[#b88344]" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-[#14171c] leading-[1.12] tracking-tight">
              {aboutData.titleLine1}{" "}
              <span className="text-[#b88344]">{aboutData.titleHighlight}</span>
            </h2>

            <p className="text-xs sm:text-[13.5px] text-neutral-600 font-normal leading-relaxed mt-2.5">
              {aboutData.subtitle}
            </p>
          </div>

          {/* Points from JSON */}
          <div className="space-y-4 pt-1">
            {aboutData.points?.map((pt: any) => (
              <div
                key={pt.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-100 shadow-[0_3px_15px_rgba(0,0,0,0.02)] flex items-start gap-4"
              >
                <span className="w-10 h-10 rounded-xl bg-[#b88344]/10 text-[#b88344] font-black text-sm flex items-center justify-center shrink-0">
                  {pt.id}
                </span>
                <div>
                  <h4 className="text-[14px] font-bold text-[#14171c]">
                    {pt.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {aboutData.button && (
            <div className="pt-2">
              <Link
                href={aboutData.button.href}
                className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#a07136] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md shadow-[#b88344]/25 hover:scale-[1.02]"
              >
                <span>{aboutData.button.label}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}