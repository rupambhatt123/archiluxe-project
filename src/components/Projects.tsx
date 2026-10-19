"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import rawSiteData from "@/data/websiteData.json";

interface ProjectsProps {
  category?: string;
  variant?: string;
}

const siteData = rawSiteData as any;

function normalizeSlug(str: string = "") {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Projects({
  category = "Architecture",
  variant = "ArchiFeaturedProject1",
}: ProjectsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const architecture = siteData.categories?.[category]?.sections;
  const featuredVariant = architecture?.FeaturedProject?.variants?.[variant];
  const allProjectsList: any[] = architecture?.Projects?.variants?.ArchiProjects1?.items || [];

  const data = featuredVariant || architecture?.Projects?.variants?.ArchiProjects1;

  if (!data) return null;

  // Har item ke pass display data aur accurate links hon
  const projectList: any[] = allProjectsList.length > 0
    ? allProjectsList.map((p) => ({
        projectName: p.title,
        projectDesc: p.description || p.overview,
        bgImage: p.heroImage || p.image,
        meta: p.meta || {
          clients: "Private Client",
          area: "3,200 m²",
          projectYear: "2024",
          projectType: p.category || "Interior",
        },
        slug: p.slug || normalizeSlug(p.title),
      }))
    : [
        {
          projectName: data.projectName || data.titleLine1 || "Featured Project",
          projectDesc: data.projectDesc || data.description,
          bgImage: data.bgImage,
          meta: data.meta,
          slug: data.slug || "serene-heights",
        },
      ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    if (offsetWidth > 0) {
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIdx(Math.max(0, Math.min(index, projectList.length - 1)));
    }
  };

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const offsetWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: index * offsetWidth,
      behavior: "smooth",
    });
    setActiveIdx(index);
  };

  const nextProject = () => {
    const nextIdx = (activeIdx + 1) % projectList.length;
    scrollToCard(nextIdx);
  };

  const prevProject = () => {
    const prevIdx = (activeIdx - 1 + projectList.length) % projectList.length;
    scrollToCard(prevIdx);
  };

  return (
    <section id="projects" className="py-12 sm:py-18 md:py-24 bg-[#fbf9f5] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#b88344]">
            {data.badge?.replace(/—/g, "").trim() || "OUR PROJECTS"}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#14171c]">
            {data.titleLine1 || "Featured"}{" "}
            <span className="text-[#b88344]">{data.titleHighlight || "Projects"}</span>
          </h2>
          <p className="text-neutral-500 text-xs sm:text-[13px] max-w-xl mx-auto leading-relaxed">
            {data.description || data.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl sm:rounded-3xl w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projectList.map((currentItem: any, idx: number) => {
            const projectSlug = currentItem.slug || normalizeSlug(currentItem.projectName);
            const targetLink = `/projects/${projectSlug}`;

            return (
              <div
                key={currentItem.projectName || idx}
                className="w-full shrink-0 snap-center relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl min-h-[460px] sm:min-h-[520px] flex items-end"
              >
                <img
                  src={currentItem.bgImage || data.bgImage}
                  alt={currentItem.projectName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-5 sm:gap-8">
                  {/* Left Project Info Box */}
                  <div className="bg-[#b88344]/95 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-2xl max-w-md text-white shadow-xl">
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3">
                      {currentItem.projectName}
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed">
                      {currentItem.projectDesc}{" "}
                      <Link
                        href={targetLink}
                        className="font-bold underline cursor-pointer hover:text-neutral-200 transition-colors"
                      >
                        ... see more
                      </Link>
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white text-[11px] sm:text-xs bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-3.5 sm:p-0 rounded-xl">
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Clients:
                      </span>
                      <span className="font-bold">{currentItem.meta?.clients || "Skyline"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Area:
                      </span>
                      <span className="font-bold">{currentItem.meta?.area || "4,800 m²"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Project year:
                      </span>
                      <span className="font-bold">{currentItem.meta?.projectYear || "2024"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Project type:
                      </span>
                      <span className="font-bold">{currentItem.meta?.projectType || "Residential"}</span>
                    </div>
                  </div>

                  {/* Functional Action Buttons */}
                  <div className="flex items-center justify-between md:justify-end gap-3 pt-1 sm:pt-0">
                    <button
                      type="button"
                      onClick={prevProject}
                      aria-label="Previous Project"
                      className="bg-white/90 text-[#14171c] p-3 rounded-xl hover:bg-white hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Next Project"
                      className="bg-white/90 text-[#14171c] p-3 rounded-xl hover:bg-white hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
                    >
                      <ArrowRight size={16} />
                    </button>
                    <Link
                      href="/projects"
                      className="bg-[#b88344] hover:bg-[#a07136] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                    >
                      <span>New Projects</span> <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        {projectList.length > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {projectList.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === idx
                    ? "w-7 bg-[#b88344]"
                    : "w-2 bg-neutral-300 hover:bg-[#b88344]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}