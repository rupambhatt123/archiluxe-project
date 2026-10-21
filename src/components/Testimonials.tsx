"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import rawSiteData from "@/data/websiteData.json";

interface TestimonialsProps {
  category?: string;
  variant?: string;
}

const siteData = rawSiteData as any;

export default function Testimonials({
  category = "Architecture",
  variant = "ArchiTestimonials1",
}: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory = siteData.categories?.[category];
  const testVariants = currentCategory?.sections?.Testimonials?.variants;
  const data = testVariants?.[variant];

  const items = data?.items || [];
  const totalItems = items.length;

  // Window resize ke mutabiq screen par kitne cards fit hain track karna
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: 2 cards
      } else {
        setVisibleCount(3); // Desktop: 3 cards
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Utne hi slides/dots jitne actual moves possible hain
  const totalDots = Math.max(1, totalItems - visibleCount + 1);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.firstElementChild as HTMLElement;
    if (card) {
      const cardWidth = card.offsetWidth + 24; // card width + gap
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIdx(Math.max(0, Math.min(index, totalDots - 1)));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const targetCard = container.children[index] as HTMLElement;
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIdx(index);
    }
  };

  const handlePrev = () => {
    const prev = activeIdx === 0 ? totalDots - 1 : activeIdx - 1;
    scrollToSlide(prev);
  };

  const handleNext = () => {
    const next = activeIdx >= totalDots - 1 ? 0 : activeIdx + 1;
    scrollToSlide(next);
  };

  if (!data || !items.length) return null;

  return (
    <section
      id="testimonials"
      className="relative bg-[#faf7f0] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden selection:bg-[#b88344] selection:text-white w-full"
    >
      {/* Background Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-[500px] h-[350px] bg-gradient-to-r from-[#b88344]/15 via-[#d4af37]/10 to-transparent blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-10 w-[550px] h-[380px] bg-gradient-to-l from-[#b88344]/15 via-[#cda260]/10 to-transparent blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {data.badge?.replace(/—/g, "").trim() || "TESTIMONIALS"}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-[52px] font-black text-[#14171c] leading-[1.08] tracking-tight">
            {data.titleLine1 || "What People Say About"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b88344] via-[#cda260] to-[#b88344] block sm:inline">
              {data.titleHighlight || "Our Design Studio"}
            </span>
          </h2>

          <p className="text-neutral-600 font-medium text-xs sm:text-[14px] mt-2 max-w-xl mx-auto leading-relaxed">
            {data.description || data.subtitle}
          </p>
        </div>

        {/* Carousel Viewport: Phone = 1 card, Tablet = 2 cards, Desktop = 3 cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-6 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item: any, idx: number) => {
            const clientName = item.name || item.author || "Client";
            const clientRole = item.role || item.designation || "Homeowner";
            const clientQuote = item.quote || item.feedback || item.text;

            return (
              <div
                key={item.id || idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start relative bg-white rounded-3xl p-6 sm:p-7 border border-[#b88344]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#b88344]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-[#14171c] via-[#b88344] to-[#14171c] transition-all duration-300 group-hover:w-[7px]" />

                <div>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#fbf4eb] to-[#f2dfc5] border border-[#b88344]/40 flex items-center justify-center text-[#b88344] mb-4 transition-all duration-300 group-hover:scale-110 shadow-sm shrink-0">
                    <Quote size={20} className="stroke-[2.4] rotate-180" />
                  </div>

                  <p className="text-[13px] sm:text-[14px] text-neutral-800 font-medium leading-[1.65] min-h-[85px]">
                    "{clientQuote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-5 mt-4 border-t border-neutral-100">
                  <img
                    src={item.avatar || item.image || "/hero.png"}
                    alt={clientName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#b88344] shadow-md shrink-0"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#14171c] tracking-tight group-hover:text-[#b88344] transition-colors leading-snug">
                      {clientName}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#b88344] font-semibold tracking-wide uppercase mt-0.5">
                      {clientRole}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls: Dots matching exact slide shifts */}
        {totalDots > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30 cursor-pointer"
            >
              <ChevronLeft size={18} className="stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalDots }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
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
              className="w-10 h-10 rounded-2xl bg-[#eee7d8] hover:bg-[#b88344] text-[#14171c] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md border border-[#b88344]/30 cursor-pointer"
            >
              <ChevronRight size={18} className="stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}