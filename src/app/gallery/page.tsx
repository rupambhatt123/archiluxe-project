"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

export default function GalleryPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;
  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const galleryData = architecture?.Gallery?.variants?.ArchiGallery1;

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const filteredItems =
    activeCategory === "All"
      ? galleryData?.items || []
      : (galleryData?.items || []).filter(
          (item: any) => item.category === activeCategory
        );

  useEffect(() => {
    setMobileIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : 0
        );
      }
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      <PageBanner
        title={galleryData?.badge?.replace(/—/g, "").trim()}
        breadcrumbs={[{ label: galleryData?.badge?.replace(/—/g, "").trim() }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      <section className="pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {galleryData?.badge?.replace(/—/g, "").trim()}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black text-[#14171c] tracking-tight leading-[1.12]">
            {galleryData?.titleLine1}{" "}
            <span className="text-[#b88344]">
              {galleryData?.titleHighlight}
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed mt-2">
            {galleryData?.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-7 sm:mb-9">
          {galleryData?.categories?.map((cat: string) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
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

        <div className="block sm:hidden">
          {filteredItems.length > 0 && (
            <div className="relative">
              <div
                onClick={() => setSelectedImageIndex(mobileIndex)}
                className="relative h-64 w-full rounded-2xl overflow-hidden shadow-[0_3px_18px_rgba(0,0,0,0.06)] border border-neutral-100 bg-neutral-100"
              >
                <img
                  src={filteredItems[mobileIndex]?.image}
                  alt={filteredItems[mobileIndex]?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#b88344]">
                    {filteredItems[mobileIndex]?.category}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug mt-1">
                    {filteredItems[mobileIndex]?.title}
                  </h4>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                {filteredItems.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      mobileIndex === idx
                        ? "w-6 bg-[#b88344]"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.div
          layout
          className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((item: any, idx: number) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative h-52 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-[0_3px_18px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#b88344]/30 border border-neutral-100 bg-neutral-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#b88344]">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug mt-1">
                    {item.title}
                  </h4>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#b88344] text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev !== null
                    ? (prev - 1 + filteredItems.length) % filteredItems.length
                    : 0
                );
              }}
              className="absolute left-2 sm:left-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#b88344] text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredItems.length : 0
                );
              }}
              className="absolute right-2 sm:right-4 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#b88344] text-white flex items-center justify-center transition-colors z-50 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className="w-full h-auto max-h-[72vh] object-contain rounded-t-2xl"
              />

              <div className="w-full text-center py-2.5 bg-black/75 backdrop-blur-md rounded-b-2xl px-4">
                <span className="text-[10px] font-bold text-[#b88344] uppercase tracking-widest">
                  {filteredItems[selectedImageIndex].category}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-white mt-0.5 line-clamp-1">
                  {filteredItems[selectedImageIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}