"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

export default function ProjectsPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;

  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const projectsData = architecture?.Projects?.variants?.ArchiProjects1;

  const [activeCategory, setActiveCategory] = useState("All Projects");

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
      <section className="pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
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
      </section>

      <Footer />
    </main>
  );
}