"use client";

import Link from "next/link";
import {
  Users,
  Lightbulb,
  Cog,
  Gem,
  Leaf,
  Headphones,
  Target,
  Eye,
  LucideIcon,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  lightbulb: Lightbulb,
  cog: Cog,
  gem: Gem,
  leaf: Leaf,
  headphones: Headphones,
  target: Target,
  eye: Eye,
};

export default function AboutPage() {
  const architecture = siteData?.categories?.Architecture?.sections;

  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const timelineData = architecture?.Timeline?.variants?.ArchiTimeline1;
  const whyChooseUsData = architecture?.WhyChooseUs?.variants?.ArchiWhyChooseUs1;
  const missionVisionData = architecture?.MissionVision?.variants?.ArchiMissionVision1;

  const timelineItems: any[] = timelineData?.items || [];
  const whyFeaturesList: any[] = whyChooseUsData?.features || [];
  const missionVisionCards: any[] = missionVisionData?.items || [];

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      <PageBanner
        title="ABOUT US"
        breadcrumbs={[{ label: "ABOUT US" }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      <About />

      {timelineData && (
        <section className="relative py-12 sm:py-16 md:py-20 bg-[#faf8f5] px-4 sm:px-6 md:px-12 overflow-hidden border-t border-neutral-200/60">
          <div
            aria-hidden="true"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#b88344]/15 via-[#d4af37]/10 to-transparent blur-[140px] pointer-events-none"
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            {(timelineData.badge || timelineData.titleLine1) && (
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                {timelineData.badge && (
                  <div className="flex items-center justify-center gap-2.5 mb-2">
                    <span className="w-8 h-[1.5px] bg-[#b88344]" />
                    <span className="text-xs font-black tracking-[0.24em] uppercase text-[#b88344]">
                      {timelineData.badge.replace(/—/g, "").trim()}
                    </span>
                    <span className="w-8 h-[1.5px] bg-[#b88344]" />
                  </div>
                )}
                <h2 className="text-3xl sm:text-5xl font-black text-[#14171c] tracking-tight">
                  {timelineData.titleLine1}{" "}
                  <span className="text-[#b88344]">
                    {timelineData.titleHighlight}
                  </span>
                </h2>
              </div>
            )}

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#b88344] to-transparent shadow-[0_0_8px_rgba(184,131,68,0.5)]" />

              <div className="space-y-12 sm:space-y-16">
                {timelineItems.map((item: any, idx: number) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <div
                      key={item.year || idx}
                      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-14 ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="w-full md:w-1/2 group">
                        <div className="h-64 sm:h-72 md:h-80 w-full rounded-3xl overflow-hidden shadow-xl border border-[#b88344]/30 relative bg-neutral-200">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>

                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#faf8f5] border-2 border-[#b88344] items-center justify-center shadow-md shadow-[#b88344]/50 z-20">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#b88344] animate-pulse" />
                      </div>

                      <div className="w-full md:w-1/2 space-y-2 text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#b88344]/10 text-[#b88344] font-black text-xs tracking-widest uppercase mb-1">
                          {item.year}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#14171c] tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-[14px] text-neutral-600 leading-relaxed font-normal pt-1">
                          {item.subtitle && (
                            <strong className="text-[#14171c] font-bold">
                              {item.subtitle}{" "}
                            </strong>
                          )}
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {whyChooseUsData && (
        <section className="relative bg-[#fcfbf9] py-14 sm:py-18 px-4 sm:px-6 lg:px-10 overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <div className="lg:col-span-3 space-y-4 pr-0 lg:pr-2">
              {whyChooseUsData.badge && (
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-[2px] bg-[#b88344]" />
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#14171c]">
                    {whyChooseUsData.badge.replace(/—/g, "").trim()}
                  </span>
                </div>
              )}

              <h2 className="text-4xl sm:text-5xl font-black text-[#14171c] leading-[1.08] tracking-tight">
                {whyChooseUsData.titleLine1} <br />
                <span className="text-[#b88344]">
                  {whyChooseUsData.titleHighlight}
                </span>
              </h2>

              <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed font-normal pt-1">
                {whyChooseUsData.description}
              </p>
            </div>

            <div className="lg:col-span-4 relative flex justify-center py-2">
              <div className="relative w-full max-w-[390px] h-[450px] sm:h-[470px]">
                <div className="absolute -top-3.5 -right-3.5 w-32 h-32 bg-[#b88344] rounded-2xl pointer-events-none z-0 shadow-sm" />

                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-neutral-200 border border-white">
                  {whyChooseUsData.centerImage && (
                    <img
                      src={whyChooseUsData.centerImage}
                      alt={whyChooseUsData.titleLine1}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
              {whyFeaturesList.map((item: any, idx: number) => {
                const IconComponent = iconMap[item.icon] || Users;
                const isSolidGold = idx === 0 || idx === 3;

                return (
                  <div
                    key={item.title || idx}
                    className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-start"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3.5 shadow-sm ${
                        isSolidGold
                          ? "bg-gradient-to-br from-[#c89858] to-[#9e6f33] text-white"
                          : "bg-[#fbf4ea] text-[#b88344]"
                      }`}
                    >
                      <IconComponent size={22} className="stroke-[2.2]" />
                    </div>

                    <h3 className="text-[14px] sm:text-[15px] font-bold text-[#14171c] tracking-tight mb-1">
                      {item.title}
                    </h3>

                    <p className="text-[11px] sm:text-[12px] text-neutral-500 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {missionVisionData && (
        <section className="relative overflow-hidden selection:bg-[#b88344] selection:text-white bg-[#faf8f5] border-t border-neutral-200/60">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-[#111519] pointer-events-none z-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#111519]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1380px] mx-auto py-10 sm:py-12 md:py-14 px-4 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              <div className="lg:col-span-4 text-white space-y-3 pr-0 lg:pr-6">
                {missionVisionData.badge && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-[2px] bg-[#b88344]" />
                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-300">
                      {missionVisionData.badge.replace(/—/g, "").trim()}
                    </span>
                  </div>
                )}

                <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.08] tracking-tight">
                  {missionVisionData.titleLine1} <br />
                  <span className="text-[#b88344]">
                    {missionVisionData.titleHighlight}
                  </span>
                </h2>

                <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-sm pt-1">
                  {missionVisionData.description}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {missionVisionCards.map((card: any, idx: number) => {
                  const CardIcon = iconMap[card.icon] || (idx === 0 ? Target : Eye);

                  return (
                    <div
                      key={card.title || idx}
                      className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative mb-7">
                          <div className="h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-neutral-200">
                            {card.image && (
                              <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#c89858] to-[#9e6f33] text-white flex items-center justify-center shadow-lg shadow-[#b88344]/40 border-2 border-white z-20">
                            <CardIcon size={20} className="stroke-[2.2]" />
                          </div>
                        </div>

                        <h3 className="text-[22px] sm:text-[24px] font-bold text-[#14171c] tracking-tight mb-1.5 pt-1">
                          {card.title}
                        </h3>
                        <div className="w-11 h-[2px] bg-[#b88344] mb-3" />

                        <p className="text-[12px] sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      )}
    </main>
  );
}