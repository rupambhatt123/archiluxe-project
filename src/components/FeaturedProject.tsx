"use client";

import Link from "next/link";
import siteData from "@/data/websiteData.json";

interface FeaturedProjectsProps {
  category?: string;
  variant?: string;
}

export default function FeaturedProjects({
  category = "Architecture",
  variant = "ArchiFeaturedProject1",
}: FeaturedProjectsProps) {
  const sectionVariants =
    siteData.categories?.[category as keyof typeof siteData.categories]?.sections
      ?.FeaturedProject?.variants;

  const data = sectionVariants?.[variant as keyof typeof sectionVariants];

  if (!data) return null;

  return (
    <section
      id="projects"
      className="relative bg-[#faf7f0] pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 sm:px-8 md:px-12 overflow-hidden selection:bg-[#b88344] selection:text-white"
    >
      {/* 1. Background Golden Aura Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-20 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-[#b88344]/15 via-[#d4af37]/8 to-transparent blur-[130px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#b88344]/12 via-[#cda260]/6 to-transparent blur-[110px] pointer-events-none"
      />

      {/* 2. Blueprint Dot-Grid Mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(#b88344 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 3. Watermark Outline Text "PROJECTS" */}
      <div
        aria-hidden="true"
        className="absolute top-2 right-6 sm:right-16 pointer-events-none select-none z-0 hidden md:block"
      >
        <span
          className="text-[120px] lg:text-[160px] font-black tracking-tight uppercase leading-none opacity-40 text-transparent"
          style={{
            WebkitTextStroke: "1.5px #dccfba",
          }}
        >
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-1.5">
            <span className="w-9 h-[1.5px] bg-[#b88344]" />
            <span className="text-[12px] font-black tracking-[0.25em] uppercase text-[#b88344]">
              {data.badge || "OUR PROJECTS"}
            </span>
            <span className="w-9 h-[1.5px] bg-[#b88344]" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-[64px] font-black text-[#14171c] leading-[1.05] tracking-[-0.035em]">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b88344] via-[#cda260] to-[#b88344]">
              Projects
            </span>
          </h2>

          <p className="text-neutral-500 font-medium text-xs sm:text-sm md:text-[15px] mt-2 max-w-xl mx-auto leading-relaxed">
            {data.description ||
              "Explore our latest architectural and interior design projects that reflect creativity, functionality and modern living."}
          </p>
        </div>

        {/* Showcase Banner Box */}
        <div className="relative">
          {/* Main Hero Image Frame */}
          <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-200 border border-[#b88344]/20 group">
            <img
              src="/10oct.png"
              alt={data.projectName || "Project Showcase"}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Scrim for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

            {/* In-Image Metrics & View Project CTA */}
            <div className="absolute bottom-6 right-6 left-6 md:left-[410px] lg:left-[450px] z-10 flex flex-wrap items-end justify-between gap-6 text-white">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-8 flex-1">
                <div>
                  <span className="text-neutral-300 block text-xs sm:text-[13px] font-semibold mb-1">
                    Clients:
                  </span>
                  <span className="text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight">
                    {data.meta?.clients || "Skyline Builders"}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-300 block text-xs sm:text-[13px] font-semibold mb-1">
                    Area:
                  </span>
                  <span className="text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight">
                    {data.meta?.area || "5,200 m²"}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-300 block text-xs sm:text-[13px] font-semibold mb-1">
                    Project year:
                  </span>
                  <span className="text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight">
                    {data.meta?.projectYear || "2024"}
                  </span>
                </div>

                <div>
                  <span className="text-neutral-300 block text-xs sm:text-[13px] font-semibold mb-1">
                    Project type:
                  </span>
                  <span className="text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight">
                    {data.meta?.projectType || "Residential Interior"}
                  </span>
                </div>
              </div>

              {/* View Project Button */}
              <Link
                href={data.viewProjectLink || "/projects"}
                className="bg-[#b88344] hover:bg-[#a07136] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-black/30 transition-transform hover:scale-105 shrink-0"
              >
                View Project
              </Link>
            </div>
          </div>

          {/* Left Overlapping Brown Card */}
          <div className="md:absolute -bottom-6 left-6 md:left-8 z-20 w-full md:w-[370px] lg:w-[400px] bg-[#b88344] text-white p-7 sm:p-8 rounded-2xl md:rounded-3xl shadow-2xl mt-4 md:mt-0">
            <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight mb-2.5">
              {data.projectName || "Serene Heights"}
            </h3>
            <p className="text-xs sm:text-[14px] text-white/95 leading-relaxed font-normal">
              {data.projectDesc ||
                "A modern living space designed with elegant interiors, open layouts and natural light, creating a perfect blend of comfort and functionality."}{" "}
              <Link
                href={data.viewProjectLink || "/projects"}
                className="font-bold underline hover:text-white/70 transition-colors"
              >
                ... see more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}