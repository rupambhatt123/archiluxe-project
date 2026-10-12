"use client";

import { useState, useRef, useEffect } from "react";
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

  // Robust fallback if JSON is completely empty or missing
  const defaultServices = [
    {
      title: "Residential Architecture",
      desc: "Thoughtfully designed homes that blend comfort, style and functionality.",
      icon: "home",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Commercial Architecture",
      desc: "Innovative commercial spaces that enhance productivity and brand value.",
      icon: "building",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Interior Designing",
      desc: "Elegant interiors that reflect your personality and make every space extraordinary.",
      icon: "sofa",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Renovation & Remodeling",
      desc: "Transforming existing spaces into modern, functional and stylish environments.",
      icon: "wrench",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Landscape Design",
      desc: "Beautiful outdoor spaces that bring nature, balance and tranquility.",
      icon: "leaf",
      image:
        "https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Planning & Consultation",
      desc: "Expert guidance from concept to execution for successful and hassle-free projects.",
      icon: "fileText",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=80",
    },
  ];

  // Dynamic lookup for array keys (services or items)
  const servicesList = data?.services || data?.items || defaultServices;
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
    <section className="relative bg-[#faf8f5] pt-6 sm:pt-8 pb-10 sm:pb-12 px-4 sm:px-6 md:px-8 overflow-hidden selection:bg-[#b88344] selection:text-white">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-7">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {data?.badge?.replace(/—/g, "").trim() || "OUR SERVICES"}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-[#14171c] tracking-tight leading-[1.12]">
            {data?.titleLine1 || "Designing Spaces"}{" "}
            <span className="text-[#b88344]">
              {data?.titleHighlight || "for Every Vision"}
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed mt-1.5">
            {data?.description ||
              data?.subtitle ||
              "From concept to completion, we offer a full range of architectural and design services to create functional, beautiful and sustainable spaces."}
          </p>
        </div>

        {/* Dynamic Responsive Container: 
            Mobile: Swipe-Snappable row showing exactly 1 Card front & center
            Desktop: Standard grid view */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesList.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Home;
            const cardLink = item.href || item.link || item.slug || "/services";
            const cardBtnLabel = item.buttonText || item.cta || globalBtnText;
            const descriptionText = item.desc || item.description || "";

            return (
              <div
                key={item.title || idx}
                className="w-full md:w-auto shrink-0 snap-center group bg-white rounded-2xl p-3.5 border border-neutral-100 shadow-[0_3px_18px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#b88344]/30 transition-all duration-300 flex items-stretch gap-3.5 min-h-[190px]"
              >
                {/* Left Side: Content & Actions */}
                <div className="w-[53%] flex flex-col justify-between py-0.5">
                  <div>
                    {/* Circle Icon Badge */}
                    <div className="w-10 h-10 rounded-full bg-[#fbf5eb] flex items-center justify-center text-[#b88344] mb-2 shrink-0 group-hover:bg-[#b88344] group-hover:text-white transition-colors duration-300">
                      <Icon size={18} className="stroke-[1.8]" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#14171c] tracking-tight leading-snug group-hover:text-[#b88344] transition-colors mb-1">
                      {item.title}
                    </h3>

                    {/* Dynamic Description */}
                    <p className="text-[11px] sm:text-[11.5px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                      {descriptionText}
                    </p>
                  </div>

                  {/* Dynamic Action Button Link */}
                  <div className="pt-1.5">
                    <Link
                      href={cardLink}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88344] hover:text-[#9e6f33] transition-colors group/link"
                    >
                      {cardBtnLabel}{" "}
                      <ArrowRight
                        size={12}
                        className="stroke-[2.2] transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Dynamic Image */}
                <div className="w-[47%] relative rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        defaultServices[idx % defaultServices.length].image;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-Only Interactive Smooth Dot indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-4.5">
          {servicesList.map((_: any, idx: number) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Scroll to Service Card ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === idx
                  ? "w-6 bg-[#b88344]"
                  : "w-1.5 bg-neutral-300 hover:bg-[#b88344]/50"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}