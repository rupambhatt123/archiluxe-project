"use client";

import Link from "next/link";
import {
  Home,
  CheckCircle2,
  Calendar,
  MapPin,
  Archive,
  Maximize2,
  Layers,
  Zap,
  Lightbulb,
  Sparkles,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

// Dynamic Icon Mapping
const iconMap: Record<string, LucideIcon> = {
  archive: Archive,
  ruler: Maximize2,
  layers: Layers,
  zap: Zap,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
};

export default function ProjectDetailPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;
  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const project =
    architecture?.ProjectDetails?.variants?.ArchiProjectDetails1 ||
    architecture?.Projects?.variants?.ArchiProjects1?.items?.[0];
  const ctaData = architecture?.CTA?.variants?.ArchiCTA1;

  if (!project) return null;

  const projectTitle =
    project.title ||
    `${project.titleLine1 || "Luxury"} ${project.titleHighlight || "Project"}`;

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Projects" />

      {/* 2. Universal Dynamic Page Banner */}
      <PageBanner
        title={projectTitle}
        bgImage={project.heroImage || project.image || pageBanner?.bgOverlayImage}
        breadcrumbs={[
          { label: "Our Projects", href: "/projects" },
          { label: projectTitle },
        ]}
      />

      {/* 3. MAIN CONTENT WRAPPER */}
      <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        
        {/* 2-Column Balanced Hero: Info & 3 Meta Cards | Hero Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div className="space-y-3.5">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase text-[#b88344] block">
                {project.badge?.replace(/—/g, "").trim() || "PROJECT DETAIL"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black text-[#14171c] tracking-tight leading-[1.12]">
                {project.titleLine1 || projectTitle}{" "}
                {project.titleHighlight && (
                  <span className="text-[#b88344]">{project.titleHighlight}</span>
                )}
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-neutral-600 font-normal leading-[1.75] pt-1">
                {project.description}
              </p>
            </div>

            {/* 3 Inline Meta Cards from JSON */}
            {project.meta && (
              <div className="grid grid-cols-3 gap-3 bg-[#fdfbf7] p-4 sm:p-5 rounded-2xl border border-neutral-100 mt-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <Home size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Project Type
                    </p>
                    <p className="text-xs sm:text-[14px] font-bold text-[#14171c] truncate">
                      {project.meta.type || project.category || "Architecture"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-neutral-200/60 pl-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Completion Time
                    </p>
                    <p className="text-xs sm:text-[14px] font-bold text-[#14171c] truncate">
                      {project.meta.completionTime || "2024 - 2025"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-neutral-200/60 pl-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-xs sm:text-[14px] font-bold text-[#14171c] truncate">
                      {project.meta.location || "California, USA"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[400px] bg-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <img
              src={project.heroImage || project.image}
              alt={projectTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4-Image Horizontal Strip from JSON */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mt-7">
            {project.gallery.map((img: string, i: number) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden h-36 sm:h-44 bg-neutral-100 group shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
              >
                <img
                  src={img}
                  alt={`Gallery Snapshot ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            ))}
          </div>
        )}

        {/* Project Overview (Left) & Key Highlights (Right) from JSON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-9">
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#14171c] mb-2.5">
              Project Overview
            </h3>
            <p className="text-sm sm:text-[15px] text-neutral-600 font-normal leading-[1.7]">
              {project.overview || project.description}
            </p>
          </div>

          {project.keyHighlights && (
            <div className="lg:col-span-5 bg-[#fbf9f5] rounded-2xl p-5 sm:p-6 border border-neutral-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h4 className="text-sm sm:text-[15px] font-bold text-[#14171c] mb-3">
                Key Highlights
              </h4>
              <div className="space-y-2.5">
                {project.keyHighlights.map((h: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-neutral-700 font-medium"
                  >
                    <CheckCircle2 size={17} className="text-[#b88344] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features & Work Included (Left) & Before & After (Right) from JSON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-9">
          <div className="lg:col-span-7">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#14171c] mb-4">
              Features &amp; Work Included
            </h3>
            {project.features && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feat: any, idx: number) => {
                  const Icon = iconMap[feat.icon] || Sparkles;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fcf6ed] flex items-center justify-center text-[#b88344] shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-[13.5px] font-bold text-[#14171c]">
                          {feat.title}
                        </h4>
                        <p className="text-[11.5px] sm:text-xs text-neutral-500 leading-normal mt-0.5">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Before & After Card from JSON */}
          {project.beforeAfter && (
            <div className="lg:col-span-5 bg-[#fbf9f5] rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h4 className="text-sm sm:text-[15px] font-bold text-[#14171c] mb-3">
                Before &amp; After
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative rounded-xl overflow-hidden h-36 sm:h-40 bg-neutral-200">
                  <img
                    src={project.beforeAfter.before}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    Before
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden h-36 sm:h-40 bg-neutral-200">
                  <img
                    src={project.beforeAfter.after || project.heroImage || project.image}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#b88344] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    After
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Dynamic CTA SECTION */}
      {ctaData && (
        <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-[#faf8f5] overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-[1380px] mx-auto">
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 bg-[#fdfcf9] min-h-[260px] sm:min-h-[290px] flex items-center">
              <img
                src={ctaData.bgImage || "/hero.png"}
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
                  {ctaData.titleLine1 || "Ready to Build"}{" "}
                  <span className="text-[#b88344]">
                    {ctaData.titleHighlight || "Your Vision?"}
                  </span>
                </h2>

                <p className="text-xs sm:text-[13.5px] text-neutral-600 font-medium leading-relaxed mt-2.5 max-w-md">
                  {ctaData.description ||
                    "Let's create inspiring spaces together. Get in touch with our team today."}
                </p>

                <div className="pt-5 sm:pt-6">
                  <Link
                    href={ctaData.button?.href || "/contact"}
                    className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a07136] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#b88344]/30 hover:scale-105 transition-all duration-200"
                  >
                    {ctaData.button?.label || "Contact Us"}{" "}
                    <ArrowRight size={15} className="stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}