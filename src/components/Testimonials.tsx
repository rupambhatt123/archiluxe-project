"use client";

import { useState, useRef, useEffect } from "react";
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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const currentCategory =
    siteData.categories?.[category as keyof typeof siteData.categories];
  const testVariants = currentCategory?.sections?.Testimonials?.variants;
  const data = testVariants?.[variant as keyof typeof testVariants];

  if (!data || !data.items) return null;

  const totalItems = data.items.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;

    let closestIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((el, index) => {
      if (el) {
        const diff = Math.abs(el.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = index;
        }
      }
    });

    setActiveIdx(closestIdx);
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const targetElement = cardsRef.current[index];
    if (targetElement) {
      scrollRef.current.scrollTo({
        left: targetElement.offsetLeft,
        behavior: "smooth",
      });
      setActiveIdx(index);
    }
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
      className="relative bg-[#faf7f0] py-10 sm:py-14 md:py-18 px-4 sm:px-6 md:px-10 overflow-hidden selection:bg-[#b88344] selection:text-white"
    >
      {/* Background Golden Aura Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-[550px] h-[350px] bg-gradient-to-r from-[#b88344]/15 via-[#d4af37]/10 to-transparent blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-10 w-[600px] h-[400px] bg-gradient-to-l from-[#b88344]/15 via-[#cda260]/10 to-transparent blur-[120px] pointer-events-none"
      />

      {/* Blueprint Dot Matrix */}
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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {data.badge?.replace(/—/g, "").trim()}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-[52px] font-black text-[#14171c] leading-[1.08] tracking-tight">
            {data.titleLine1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b88344] via-[#cda260] to-[#b88344] block sm:inline">
              {data.titleHighlight}
            </span>
          </h2>

          <p className="text-neutral-600 font-medium text-xs sm:text-[14px] mt-2 max-w-xl mx-auto leading-relaxed">
            {data.description || (data as any).subtitle}
          </p>
        </div>

        {/* Carousel Viewport: Works on both desktop and mobile smoothly */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.items.map((item: any, idx: number) => (
            <div
              key={item.name || idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="w-[90vw] sm:w-[420px] lg:w-[400px] shrink-0 snap-start relative bg-white rounded-3xl p-6 sm:p-7 border border-[#b88344]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#b88344]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Metallic Accent Edge */}
              <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#14171c] via-[#b88344] to-[#14171c] transition-all duration-300 group-hover:w-[7px]" />

              <div>
                {/* Quote Icon Badge */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fbf4eb] to-[#f2dfc5] border border-[#b88344]/40 flex items-center justify-center text-[#b88344] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#14171c] group-hover:text-[#ecc68a] shadow-sm shrink-0">
                  <Quote size={22} className="stroke-[2.4] rotate-180" />
                </div>

                {/* Feedback Text */}
                <p className="text-[14px] sm:text-[15px] text-neutral-800 font-medium leading-[1.65] min-h-[96px]">
                  "{item.quote || item.feedback || item.text}"
                </p>
              </div>

              {/* Client Profile Details */}
              <div className="flex items-center gap-3.5 pt-5 mt-4 border-t border-neutral-100">
                <img
                  src={item.avatar || item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#b88344] shadow-md shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-[#14171c] tracking-tight group-hover:text-[#b88344] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#b88344] font-semibold tracking-wide uppercase mt-0.5">
                    {item.role || item.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-11 h-11 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30 cursor-pointer"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2">
            {data.items.map((_: any, i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
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
            className="w-11 h-11 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30 cursor-pointer"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}