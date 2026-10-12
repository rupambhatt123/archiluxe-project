"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

export default function ProjectsPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;

  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const projectsData = architecture?.Projects?.variants?.ArchiProjects1;
  const ctaData = architecture?.CTA?.variants?.ArchiCTA1;

  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projectsData?.items || []
      : (projectsData?.items || []).filter(
          (item: any) => item.category === activeCategory
        );

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Projects" />

      {/* 2. Standardized High-Impact PageBanner */}
      <PageBanner
        title={projectsData?.badge?.replace(/—/g, "").trim() || "Our Projects"}
        breadcrumbs={[{ label: "Projects" }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      {/* 3. PROJECTS SHOWCASE & FILTER PILLS */}
      <section className="pt-8 sm:pt-10 pb-14 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {projectsData?.badge?.replace(/—/g, "").trim() || "OUR PROJECTS"}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black text-[#14171c] tracking-tight leading-[1.12]">
            {projectsData?.titleLine1 || "Crafting"}{" "}
            <span className="text-[#b88344]">
              {projectsData?.titleHighlight || "Architectural Visions"}
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed mt-2">
            {projectsData?.description}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {projectsData?.categories?.map((cat: string) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? "bg-[#b88344] text-white border-[#b88344] shadow-md shadow-[#b88344]/30"
                    : "bg-white text-[#14171c] border-neutral-200/70 hover:bg-[#faf7f2] hover:border-[#b88344]/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredProjects.map((item: any, idx: number) => (
              <motion.div
                key={item.id || item.slug || idx}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_3px_18px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#b88344]/30 border border-neutral-100 flex flex-col justify-between group transition-all duration-300"
              >
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-[#14171c]/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#14171c] group-hover:text-[#b88344] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/projects/${item.slug || item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b88344] group-hover:translate-x-1 transition-transform"
                    >
                      View Project Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-9 h-9 rounded-xl bg-white hover:bg-[#faf7f2] text-[#14171c] border border-neutral-200/80 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-[#b88344] text-white shadow-md shadow-[#b88344]/30"
                  : "bg-white hover:bg-[#faf7f2] text-[#14171c] border border-neutral-200/80"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="w-9 h-9 rounded-xl bg-white hover:bg-[#faf7f2] text-[#14171c] border border-neutral-200/80 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* 4. Dynamic CTA Section */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-[#faf8f5] overflow-hidden border-t border-neutral-200/60">
        <div className="max-w-[1380px] mx-auto">
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 bg-[#fdfcf9] min-h-[260px] sm:min-h-[290px] flex items-center">
            <img
              src={ctaData?.bgImage || "/hero.png"}
              alt="Ready to Build Your Vision"
              className="absolute inset-0 w-full h-full object-cover object-right md:object-[right_center]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85";
              }}
            />

            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#fdfcf9] via-[#fdfcf9]/95 sm:via-[#fdfcf9]/90 md:via-[#fdfcf9]/80 to-transparent w-full md:w-[70%] pointer-events-none" />

            <div className="relative z-10 px-6 sm:px-10 md:px-14 py-8 sm:py-10 max-w-xl md:max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#14171c] tracking-tight leading-[1.15]">
                {ctaData?.titleLine1 || "Ready to Build"}{" "}
                <span className="text-[#b88344]">
                  {ctaData?.titleHighlight || "Your Vision?"}
                </span>
              </h2>

              <p className="text-xs sm:text-[13.5px] text-neutral-600 font-medium leading-relaxed mt-2.5 max-w-md">
                {ctaData?.description ||
                  "Let's create inspiring spaces together. Get in touch with our team today."}
              </p>

              <div className="pt-5 sm:pt-6">
                <Link
                  href={ctaData?.button?.href || "/contact"}
                  className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a07136] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#b88344]/30 hover:scale-105 transition-all duration-200"
                >
                  {ctaData?.button?.label || "Contact Us"}{" "}
                  <ArrowRight size={15} className="stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}