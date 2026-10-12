"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface ProjectsProps {
  category?: string;
  variant?: string;
}

export default function Projects({
  category = "Architecture",
  variant = "ArchiFeaturedProject1",
}: ProjectsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projectVariants =
    (siteData as any).categories?.[category as keyof typeof siteData.categories]?.sections
      ?.FeaturedProject?.variants;

  const data = projectVariants?.[variant as keyof typeof projectVariants];

  if (!data) return null;

  const projectList: any[] = data.items || [
    {
      projectName: data.projectName,
      projectDesc: data.projectDesc,
      bgImage: data.bgImage,
      meta: data.meta,
      viewProjectLink: data.viewProjectLink,
    },
  ];

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
            — {data.badge || "FEATURED PROJECT"} —
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#14171c]">
            {data.titleLine1 || "Featured"}{" "}
            <span className="text-[#b88344]">{data.titleHighlight || "Project"}</span>
          </h2>
          <p className="text-neutral-500 text-xs sm:text-[13px] max-w-xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projectList.map((item: any, idx: number) => {
            const currentItem = item || data;
            return (
              <div
                key={currentItem.projectName || idx}
                className="w-full shrink-0 snap-center relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl min-h-[460px] sm:min-h-[500px] flex items-end"
              >
                <img
                  src={currentItem.bgImage || data.bgImage}
                  alt={currentItem.projectName || data.projectName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10 w-full p-5 sm:p-8 md:p-12 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-5 sm:gap-8">
                  <div className="bg-[#b88344]/95 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-2xl max-w-md text-white shadow-xl">
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3">
                      {currentItem.projectName}
                    </h3>
                    <p className="text-xs text-white/90 leading-relaxed">
                      {currentItem.projectDesc}{" "}
                      <Link
                        href={currentItem.viewProjectLink || data.viewProjectLink || "/projects"}
                        className="font-bold underline cursor-pointer hover:text-neutral-200"
                      >
                        ... see more
                      </Link>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white text-[11px] sm:text-xs bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-3.5 sm:p-0 rounded-xl">
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Clients:
                      </span>
                      <span className="font-bold">{currentItem.meta?.clients || data.meta?.clients}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Area:
                      </span>
                      <span className="font-bold">{currentItem.meta?.area || data.meta?.area}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Project year:
                      </span>
                      <span className="font-bold">{currentItem.meta?.projectYear || data.meta?.projectYear}</span>
                    </div>
                    <div>
                      <span className="text-neutral-300 md:text-neutral-400 block font-semibold mb-0.5">
                        Project type:
                      </span>
                      <span className="font-bold">{currentItem.meta?.projectType || data.meta?.projectType}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 pt-1 sm:pt-0">
                    <button
                      type="button"
                      onClick={prevProject}
                      aria-label="Previous Project"
                      className="bg-white/90 text-[#14171c] p-3 rounded-xl hover:bg-white shadow-md transition-transform hover:scale-105 cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextProject}
                      aria-label="Next Project"
                      className="bg-white/90 text-[#14171c] p-3 rounded-xl hover:bg-white shadow-md transition-transform hover:scale-105 cursor-pointer md:hidden"
                    >
                      <ArrowRight size={16} />
                    </button>
                    <Link
                      href={data.newProjectsLink || "/projects"}
                      className="bg-[#b88344] hover:bg-[#a07136] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105 shrink-0"
                    >
                      New Projects <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projectList.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-1.5 pt-4">
            {projectList.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIdx === idx
                    ? "w-6 bg-[#b88344]"
                    : "w-1.5 bg-neutral-300 hover:bg-[#b88344]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}