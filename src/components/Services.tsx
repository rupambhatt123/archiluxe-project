"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Sofa,
  Wrench,
  Leaf,
  FileText,
  ArrowRight,
} from "lucide-react";
import siteData from "@/data/websiteData.json";

interface ServicesProps {
  category?: string;
  variant?: string;
}

const iconMap: Record<string, any> = {
  home: Home,
  building: Building2,
  sofa: Sofa,
  wrench: Wrench,
  leaf: Leaf,
  fileText: FileText,
};

export default function Services({
  category = "Architecture",
  variant = "ArchiServices1",
}: ServicesProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory =
    (siteData as any).categories?.[category as keyof typeof siteData.categories];
  const servicesVariants = currentCategory?.sections?.Services?.variants;
  const data = servicesVariants?.[variant as keyof typeof servicesVariants];

  // 100% direct JSON data extraction without fallback arrays
  const rawServices: any[] = data?.services || data?.items || [];
  const servicesList = rawServices.slice(0, 6);
  const globalBtnText = data?.buttonText || data?.button?.label || "Read More";

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIdx(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: "smooth",
    });
    setActiveIdx(index);
  };

  return (
    <section className="relative bg-[#faf8f5] pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 overflow-hidden selection:bg-[#b88344] selection:text-white">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {data?.badge?.replace(/—/g, "").trim()}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#14171c] tracking-tight leading-[1.15]">
            {data?.titleLine1}{" "}
            <span className="text-[#b88344]">
              {data?.titleHighlight}
            </span>
          </h2>

          <p className="text-xs sm:text-[14px] text-neutral-600 font-normal leading-relaxed mt-2">
            {data?.description || data?.subtitle}
          </p>
        </div>

        {/* Dynamic Responsive Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesList.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Home;

            const rawSlug =
              item.slug ||
              item.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const cardLink =
              item.href ||
              item.link ||
              (rawSlug ? `/services/${rawSlug}` : "/services");

            const cardBtnLabel = item.buttonText || item.cta || globalBtnText;
            const descriptionText = item.desc || item.description || "";

            return (
              <div
                key={item.id || item.slug || item.title || idx}
                className="w-full md:w-auto shrink-0 snap-center group bg-white rounded-3xl p-5 sm:p-5.5 border border-neutral-100 shadow-[0_4px_22px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#b88344]/30 hover:-translate-y-1 transition-all duration-300 flex items-stretch gap-4 sm:gap-5 min-h-[215px] sm:min-h-[225px]"
              >
                {/* Left Side: Content & Actions */}
                <div className="w-[52%] flex flex-col justify-between py-1">
                  <div>
                    {/* Circle Icon Badge */}
                    <div className="w-11 h-11 rounded-full bg-[#fbf5eb] flex items-center justify-center text-[#b88344] mb-2.5 shrink-0 group-hover:bg-[#b88344] group-hover:text-white transition-colors duration-300">
                      <Icon size={20} className="stroke-[1.9]" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-[#14171c] tracking-tight leading-snug group-hover:text-[#b88344] transition-colors mb-1.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11.5px] sm:text-[12.5px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                      {descriptionText}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={cardLink}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#b88344] hover:text-[#9e6f33] transition-colors group/link"
                    >
                      <span>{cardBtnLabel}</span>
                      <ArrowRight
                        size={13}
                        className="stroke-[2.3] transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Image Container */}
                <div className="w-[48%] relative rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-Only Smooth Dots: slides 1 card at a time */}
        <div className="flex md:hidden items-center justify-center gap-2 pt-6">
          {servicesList.map((_: any, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Scroll to Service Card ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx
                  ? "w-7 bg-[#b88344]"
                  : "w-2 bg-neutral-300 hover:bg-[#b88344]/50"
              }`}
            />
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a07136] text-white px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-[#b88344]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight size={16} className="stroke-[2.2]" />
          </Link>
        </div>

      </div>
    </section>
  );
}