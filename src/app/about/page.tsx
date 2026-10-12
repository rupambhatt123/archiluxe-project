"use client";

import Link from "next/link";
import {
  Users,
  Lightbulb,
  Cog,
  Gem,
  Leaf,
  Headphones,
  ArrowRight,
  Rocket,
  Eye,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import siteData from "@/data/websiteData.json";

// Icon mapping for Why Choose Us features
const iconMap: Record<string, LucideIcon> = {
  Users,
  Lightbulb,
  Cog,
  Gem,
  Leaf,
  Headphones,
};

export default function AboutPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;

  // 100% Dynamic Section Extracts from JSON
  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const timelineData = architecture?.Timeline?.variants?.ArchiTimeline1;
  const whyChooseUsData = architecture?.WhyChooseUs?.variants?.ArchiWhyChooseUs1;
  const missionVisionData = architecture?.MissionVision?.variants?.ArchiMissionVision1;
  const ctaData = architecture?.CTA?.variants?.ArchiCTA1;

  const timelineItems: any[] = timelineData?.items || [];
  const whyFeaturesList: any[] = whyChooseUsData?.features || whyChooseUsData?.items || [];

  // Robust Card Extraction: works with items, cards, or individual mission/vision keys
  const missionVisionCards: any[] =
    missionVisionData?.items ||
    missionVisionData?.cards ||
    [
      missionVisionData?.mission
        ? {
            title: missionVisionData.mission.title || "Our Mission",
            description: missionVisionData.mission.description,
            image:
              missionVisionData.mission.image ||
              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
          }
        : null,
      missionVisionData?.vision
        ? {
            title: missionVisionData.vision.title || "Our Vision",
            description: missionVisionData.vision.description,
            image:
              missionVisionData.vision.image ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          }
        : null,
    ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Floating Header Navigation */}
      <Navbar activePage="About Us" />

      {/* 2. Dynamic Universal PageBanner */}
      <PageBanner
        title={pageBanner?.title || "About Us"}
        breadcrumbs={[{ label: pageBanner?.title || "About Us" }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      {/* 3. Dynamic About Section */}
      <About />

      {/* 4. Dynamic Stats Counter */}
      <Stats />

      {/* 5. 100% Dynamic Timeline / Journey Section */}
      {timelineData && (
        <section className="relative py-12 sm:py-16 md:py-20 bg-[#faf8f5] px-4 sm:px-6 md:px-12 overflow-hidden border-t border-neutral-200/60">
          <div
            aria-hidden="true"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#b88344]/15 via-[#d4af37]/10 to-transparent blur-[140px] pointer-events-none"
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span className="w-8 h-[1.5px] bg-[#b88344]" />
                <span className="text-xs font-black tracking-[0.24em] uppercase text-[#b88344]">
                  {timelineData.badge?.replace(/—/g, "").trim() || "OUR JOURNEY"}
                </span>
                <span className="w-8 h-[1.5px] bg-[#b88344]" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#14171c] tracking-tight">
                {timelineData.titleLine1 || "Milestones"} &{" "}
                <span className="text-[#b88344]">
                  {timelineData.titleHighlight || "Evolution"}
                </span>
              </h2>
            </div>

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
                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
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
                              {item.subtitle}:{" "}
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

      {/* 6. 100% Dynamic Why Choose Us Section */}
      {whyChooseUsData && (
        <section className="relative bg-[#fcfbf9] py-14 sm:py-18 px-4 sm:px-6 lg:px-10 overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading & Content */}
            <div className="lg:col-span-3 space-y-4 pr-0 lg:pr-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[2px] bg-[#b88344]" />
                <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#14171c]">
                  {whyChooseUsData.badge?.replace(/—/g, "").trim() || "WHY CHOOSE US"}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-[#14171c] leading-[1.08] tracking-tight">
                {whyChooseUsData.titleLine1 || "Why Choose"} <br />
                <span className="text-[#b88344]">
                  {whyChooseUsData.titleHighlight || "Archiluxe"}
                </span>
              </h2>

              <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed font-normal pt-1">
                {whyChooseUsData.description ||
                  "We combine creativity, functionality and expertise to deliver architectural and interior spaces that exceed expectations."}
              </p>

              <div className="pt-2">
                <Link
                  href={whyChooseUsData.button?.href || "/contact"}
                  className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#a27137] text-white px-7 py-3.5 rounded-lg text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  {whyChooseUsData.button?.label || "Learn More"}{" "}
                  <ArrowRight size={16} className="stroke-[2.2]" />
                </Link>
              </div>
            </div>

            {/* Center Column: Dynamic Highlight Image */}
            <div className="lg:col-span-4 relative flex justify-center py-2">
              <div className="relative w-full max-w-[390px] h-[450px] sm:h-[470px]">
                <div className="absolute -top-3.5 -right-3.5 w-32 h-32 bg-[#b88344] rounded-2xl pointer-events-none z-0 shadow-sm" />

                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative z-10 bg-neutral-200 border border-white">
                  <img
                    src={whyChooseUsData.mainImage || "/w1.png"}
                    alt="Why Choose Archiluxe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Features Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
              {whyFeaturesList.map((item: any, idx: number) => {
                const IconComponent =
                  iconMap[item.icon] || (idx % 3 === 0 ? Users : Lightbulb);
                const isSolidGold = item.isSolidGold ?? (idx === 0 || idx === 3);

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
                      {item.desc || item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* 7. 100% Dynamic Mission & Vision Section */}
      {missionVisionData && (
        <section className="relative overflow-hidden selection:bg-[#b88344] selection:text-white bg-[#faf8f5] border-t border-neutral-200/60">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-[#111519] pointer-events-none z-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
              style={{
                backgroundImage: `url('${missionVisionData.bgImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#111519]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1380px] mx-auto py-10 sm:py-12 md:py-14 px-4 sm:px-8 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              <div className="lg:col-span-4 text-white space-y-3 pr-0 lg:pr-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-[2px] bg-[#b88344]" />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-300">
                    {missionVisionData.badge?.replace(/—/g, "").trim() || "MISSION & VISION"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white leading-[1.08] tracking-tight">
                  {missionVisionData.titleLine1 || "Our Mission"} <br />
                  <span className="text-[#b88344]">
                    {missionVisionData.titleHighlight || "& Vision"}
                  </span>
                </h2>

                <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-sm pt-1">
                  {missionVisionData.description ||
                    "Guided by a clear purpose and a bold vision, we design spaces that inspire, enrich lives, and create a sustainable tomorrow."}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {missionVisionCards.map((card: any, idx: number) => {
                  const CardIcon = idx === 0 ? Rocket : Eye;

                  return (
                    <div
                      key={card.title || idx}
                      className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-[200px] sm:h-[220px] rounded-2xl overflow-hidden mb-6 bg-neutral-200">
                          <img
                            src={
                              card.image ||
                              (idx === 0
                                ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80")
                            }
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute -bottom-3 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#c89858] to-[#9e6f33] text-white flex items-center justify-center shadow-md shadow-[#b88344]/40 border-2 border-white z-10">
                            <CardIcon size={20} className="stroke-[2.2]" />
                          </div>
                        </div>

                        <h3 className="text-[22px] sm:text-[24px] font-bold text-[#14171c] tracking-tight mb-1.5 pt-1">
                          {card.title}
                        </h3>
                        <div className="w-11 h-[2px] bg-[#b88344] mb-3" />

                        <p className="text-[12px] sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                          {card.desc || card.description}
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

      {/* 8. 100% Dynamic CTA Section */}
      {ctaData && (
        <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-[#faf8f5] overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-[1380px] mx-auto">
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 bg-[#fdfcf9] min-h-[260px] sm:min-h-[290px] flex items-center">
              
              <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[54%] overflow-hidden z-0">
                <img
                  src={ctaData.bgImage || "/hero.png"}
                  alt={ctaData.titleHighlight || "Architecture Vision"}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div
                aria-hidden="true"
                className="hidden md:block absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, #fdfbf7 0%, #fdfbf7 46%, rgba(253,251,247,0.85) 52%, rgba(253,251,247,0.3) 60%, transparent 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="md:hidden absolute inset-0 z-10 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/90 to-[#fdfbf7]/40 pointer-events-none"
              />

              <div className="relative z-20 w-full md:w-[62%] lg:w-[55%] py-8 sm:py-10 md:py-12 px-6 sm:px-10 md:px-14 flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-black text-[#14171c] leading-[1.1] tracking-[-0.02em]">
                  {ctaData.titleLine1 || "Ready to Build"}{" "}
                  <span className="text-[#b88344]">
                    {ctaData.titleHighlight || "Your Vision?"}
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-[17px] text-neutral-600 font-medium leading-relaxed mt-2.5 sm:mt-3 max-w-xl">
                  {ctaData.description ||
                    "Let’s create inspiring spaces together. Get in touch with our team today."}
                </p>

                <div className="pt-5 sm:pt-6">
                  <Link
                    href={ctaData.button?.href || "/contact"}
                    className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a17035] text-white px-8 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold shadow-md shadow-[#b88344]/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    {ctaData.button?.label || "Contact Us"}{" "}
                    <ArrowRight size={18} className="stroke-[2.5]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 9. Dynamic Footer */}
      <Footer />
    </main>
  );
}