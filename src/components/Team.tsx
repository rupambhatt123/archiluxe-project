"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

// Inline Social SVGs
function LinkedInIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 13, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

interface TeamProps {
  category?: string;
  variant?: string;
}

export default function Team({
  category = "Architecture",
  variant = "ArchiTeam1",
}: TeamProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory =
    (siteData as any).categories?.[category as keyof typeof siteData.categories];
  const teamVariants = currentCategory?.sections?.Team?.variants;
  const data = teamVariants?.[variant as keyof typeof teamVariants];

  if (!data || !data.members) return null;

  const displayedMembers = data.members.slice(0, 4);

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
    <section
      id="team"
      className="relative bg-[#faf8f4] pt-5 sm:pt-7 pb-8 sm:pb-10 px-4 sm:px-6 md:px-10 overflow-hidden selection:bg-[#b88344] selection:text-white"
    >
      {/* 1. Vertical Watermark Outline Text */}
      <div
        aria-hidden="true"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 hidden xl:block"
      >
        <span
          className="text-[120px] font-black uppercase tracking-[0.2em] opacity-25 text-transparent"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            WebkitTextStroke: "1.5px #d8c7ad",
          }}
        >
          {data.badge?.replace(/—/g, "").trim() || "TEAM"}
        </span>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Top Header Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 mb-4 sm:mb-5 relative">
          <div className="text-center md:text-left max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-6 h-[1.5px] bg-[#b88344]" />
              <span className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#b88344]">
                {data.badge?.replace(/—/g, "").trim() || "OUR TEAM"}
              </span>
              <span className="w-6 h-[1.5px] bg-[#b88344]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-black text-[#14171c] leading-tight tracking-[-0.03em]">
              {data.titleLine1 || "Meet Our"}{" "}
              <span className="text-[#b88344]">
                {data.titleHighlight || "Creative Team"}
              </span>
            </h2>

            <p className="text-neutral-500 font-medium text-xs sm:text-[12.5px] mt-1 max-w-xl leading-relaxed">
              {data.description ||
                "A passionate group of architects, designers and innovators dedicated to creating exceptional spaces."}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 border-l border-neutral-300 pl-4 py-1 text-right">
            <div className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase leading-snug">
              PEOPLE <br />
              IDEAS <br />
              SPACES <br />
              TOGETHER
            </div>
          </div>
        </div>

        {/* TEAM CARDS CONTAINER: Mobile par compact width & height, Desktop untouched */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayedMembers.map((member: any, idx: number) => (
            <div
              key={member.name || idx}
              className="w-[86vw] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-2xl p-3 sm:p-3.5 border border-neutral-200/80 shadow-[0_3px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#b88344]/40 transition-all duration-300 md:hover:-translate-y-1 flex flex-col justify-between group mx-auto md:mx-0"
            >
              <div>
                {/* Member Picture: Mobile par compact h-[200px], Desktop par aspect-[4/5] */}
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-auto md:aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-2.5 shadow-inner">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#b88344] rotate-45 transform origin-bottom-right shadow-sm"
                  />
                </div>

                {/* Name & Role */}
                <div className="text-center space-y-0.5">
                  <h3 className="text-[14.5px] sm:text-base font-bold text-[#14171c] tracking-tight group-hover:text-[#b88344] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-[#b88344] uppercase tracking-wider">
                    {member.role}
                  </div>
                </div>

                {/* Bio: Mobile par tight leading aur line clamp */}
                <p className="text-[11px] text-neutral-500 font-normal text-center leading-relaxed mt-1.5 line-clamp-2 px-1">
                  {member.bio ||
                    "Dedicated professional bringing creative architectural concepts and functional design to life."}
                </p>
              </div>

              {/* Social Media Link Icons */}
              <div className="flex items-center justify-center gap-1.5 pt-2.5 mt-2 border-t border-neutral-100">
                <a
                  href={member.social?.linkedin || member.socials?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="w-6.5 h-6.5 rounded-full bg-[#f8f2e9] hover:bg-[#b88344] text-[#b88344] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                >
                  <LinkedInIcon size={12} />
                </a>

                <a
                  href={member.social?.instagram || member.socials?.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Instagram`}
                  className="w-6.5 h-6.5 rounded-full bg-[#f8f2e9] hover:bg-[#b88344] text-[#b88344] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                >
                  <InstagramIcon size={12} />
                </a>

                <a
                  href={member.social?.facebook || member.socials?.facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Facebook`}
                  className="w-6.5 h-6.5 rounded-full bg-[#f8f2e9] hover:bg-[#b88344] text-[#b88344] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                >
                  <FacebookIcon size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-3">
          {displayedMembers.map((_: any, i: number) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Go to team card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === i
                  ? "w-5 bg-[#b88344]"
                  : "w-1.5 bg-neutral-300 hover:bg-[#b88344]/50"
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center mt-5 sm:mt-6">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#9f6f35] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold shadow-md shadow-[#b88344]/25 hover:scale-105 transition-all"
          >
            View All Team Members <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}