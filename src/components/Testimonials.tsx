"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface TestimonialsProps {
  category?: string;
  variant?: string;
}

export default function Testimonials({
  category = "Architecture",
  variant = "ArchiTestimonials1",
}: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory =
    siteData.categories?.[category as keyof typeof siteData.categories];
  const testVariants = currentCategory?.sections?.Testimonials?.variants;
  const data = testVariants?.[variant as keyof typeof testVariants];

  if (!data || !data.items) return null;

  const totalItems = data.items.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      setActiveIdx(idx);
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

  const handlePrev = () => {
    const prev = activeIdx === 0 ? totalItems - 1 : activeIdx - 1;
    scrollToCard(prev);
  };

  const handleNext = () => {
    const next = activeIdx === totalItems - 1 ? 0 : activeIdx + 1;
    scrollToCard(next);
  };

  return (
    <section
      id="testimonials"
      className="relative bg-[#faf7f0] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10 overflow-hidden selection:bg-[#b88344] selection:text-white"
    >
      {/* 1. Background Golden Aura Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-[550px] h-[350px] bg-gradient-to-r from-[#b88344]/15 via-[#d4af37]/10 to-transparent blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-10 w-[600px] h-[400px] bg-gradient-to-l from-[#b88344]/15 via-[#cda260]/10 to-transparent blur-[120px] pointer-events-none"
      />

      {/* 2. Blueprint Architectural Dot Matrix */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.24]"
        style={{
          backgroundImage:
            "radial-gradient(#b88344 0.75px, transparent 0.75px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <span className="w-9 h-[1.5px] bg-[#b88344]" />
            <span className="text-[12px] font-black tracking-[0.26em] uppercase text-[#b88344]">
              {data.badge || "TESTIMONIALS"}
            </span>
            <span className="w-9 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-[60px] font-black text-[#14171c] leading-[1.06] tracking-[-0.035em]">
            {data.titleLine1 || "What People Say About"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b88344] via-[#cda260] to-[#b88344] block sm:inline">
              {data.titleHighlight || "Our Design Studio"}
            </span>
          </h2>

          <p className="text-neutral-600 font-semibold text-xs sm:text-[15px] mt-2 max-w-xl mx-auto leading-relaxed">
            {(data as any)?.description || "Hear what our clients have to say about working with us."}
          </p>
        </div>

        
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.items.map((item: any, idx: number) => (
            <div
              key={item.name || idx}
              className="w-full shrink-0 snap-center lg:w-auto relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-[#b88344]/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_22px_50px_rgba(184,131,68,0.25)] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group overflow-hidden"
            >
              {/* 3D Golden & Black Metallic Edge (Side Effect) */}
              <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#14171c] via-[#b88344] to-[#14171c] transition-all duration-300 group-hover:w-[7px] group-hover:shadow-[3px_0_14px_rgba(184,131,68,0.6)]" />

              <div>
                {/* 3D Accent Quote Icon Badge */}
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#fbf4eb] to-[#f2dfc5] border border-[#b88344]/40 flex items-center justify-center text-[#b88344] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#14171c] group-hover:text-[#ecc68a] group-hover:border-[#14171c] shadow-sm shrink-0">
                  <Quote size={24} className="stroke-[2.4] rotate-180" />
                </div>

                {/* Feedback Text - Bada aur High-Readability Font */}
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-neutral-800 font-medium leading-[1.65] min-h-[96px]">
                  "{item.quote || item.feedback || item.text}"
                </p>
              </div>

              {/* Client Profile Details */}
              <div className="flex items-center gap-4 pt-5 mt-4 border-t border-neutral-200/70">
                <img
                  src={item.avatar || item.image}
                  alt={item.name}
                  className="w-13 h-13 rounded-full object-cover border-2 border-[#b88344] shadow-md shrink-0 transition-transform duration-300 group-hover:scale-108"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#14171c] tracking-tight group-hover:text-[#b88344] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#b88344] font-bold tracking-wide uppercase mt-0.5">
                    {item.role || item.designation || "Client"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-12 h-12 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30"
          >
            <ChevronLeft size={22} className="stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2">
            {data.items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIdx === i
                    ? "w-8 bg-gradient-to-r from-[#b88344] to-[#d4af37] shadow-sm shadow-[#b88344]/50"
                    : "w-2.5 bg-neutral-300 hover:bg-[#b88344]/60"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="w-12 h-12 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30"
          >
            <ChevronRight size={22} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}