import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
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
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const siteName = common.siteName;

const architecture = siteData.categories?.Architecture?.sections;
const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
const projectsList: any[] = architecture?.Projects?.variants?.ArchiProjects1?.items || [];
const defaultProjectConfig = architecture?.ProjectDetails?.variants?.ArchiProjectDetails1;

const iconMap: Record<string, LucideIcon> = {
  archive: Archive,
  ruler: Maximize2,
  layers: Layers,
  zap: Zap,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
};

function normalizeSlug(str: string = "") {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function findProjectBySlug(targetSlug: string) {
  if (!targetSlug) return null;
  const cleanTarget = normalizeSlug(targetSlug);

  return (
    projectsList.find((p: any) => {
      const slugMatch = p.slug && normalizeSlug(p.slug) === cleanTarget;
      const titleMatch = p.title && normalizeSlug(p.title) === cleanTarget;
      return slugMatch || titleMatch;
    }) || null
  );
}

export async function generateStaticParams() {
  return projectsList.map((p: any) => ({
    slug: p.slug || normalizeSlug(p.title),
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedProject = findProjectBySlug(slug) || defaultProjectConfig;

  return {
    title: `${matchedProject?.title || "Project Details"} | ${siteName}`,
    description: matchedProject?.description || matchedProject?.overview,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const matchedProject = findProjectBySlug(slug);
  const project = matchedProject || defaultProjectConfig;

  if (!project) return null;

  const projectTitle = project.title || defaultProjectConfig?.titleLine1;
  const badgeTitle = project.badge || defaultProjectConfig?.badge;
  const spacedBadge = badgeTitle
    ? badgeTitle.toUpperCase().replace(/—/g, "").trim().split("").join(" ")
    : "";

  const projectDescription = project.description || defaultProjectConfig?.description;
  const projectMeta = project.meta || defaultProjectConfig?.meta;
  const projectGallery = project.gallery || defaultProjectConfig?.gallery;
  const overviewText = project.overview || defaultProjectConfig?.overview;
  const keyHighlights = project.keyHighlights || defaultProjectConfig?.keyHighlights;
  const features = project.features || defaultProjectConfig?.features;
  const beforeAfter = project.beforeAfter || defaultProjectConfig?.beforeAfter;

  return (
    <main className="min-h-screen bg-white text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Projects" />

      {/* 2. Page Banner */}
      <PageBanner
        title={pageBanner?.title || "Project Details"}
        bgImage={project.heroImage || project.image || pageBanner?.bgOverlayImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Project Details" },
        ]}
      />

      {/* 3. Main Content Container */}
      <section className="pt-6 sm:pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10 max-w-[1360px] mx-auto">
        {/* Breadcrumb Trail Strip */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-500 font-medium mb-6">
          <Home size={14} className="text-neutral-600" />
          <Link href="/" className="hover:text-[#b88344] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/projects" className="hover:text-[#b88344] transition-colors">
            Our Projects
          </Link>
          <span>&gt;</span>
          <span className="text-neutral-600 truncate">{projectTitle}</span>
        </div>

        {/* Top Hero Section: Left Text + Meta Card | Right Main Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 sm:mb-10">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-4">
            {spacedBadge && (
              <span className="text-[11px] font-bold tracking-[0.26em] text-[#b88344] block">
                {spacedBadge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#14171c] leading-[1.12] tracking-tight">
              {projectTitle?.includes(" ") ? (
                <>
                  {projectTitle.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-[#b88344]">
                    {projectTitle.split(" ").slice(-1)[0]}
                  </span>
                </>
              ) : (
                projectTitle
              )}
            </h1>

            {projectDescription && (
              <p className="text-[13.5px] sm:text-[14px] text-neutral-600 leading-relaxed font-normal pt-1">
                {projectDescription}
              </p>
            )}

            {/* 3-Column Pill Meta Box */}
            {projectMeta && (
              <div className="bg-[#f4efe6] rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-3 border border-[#ebe3d5] mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <Home size={20} className="stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      Project Type
                    </p>
                    <p className="text-xs sm:text-[13.5px] font-bold text-[#14171c] truncate">
                      {projectMeta.type || project.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-neutral-300/70 pl-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <Calendar size={20} className="stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      Completion Time
                    </p>
                    <p className="text-xs sm:text-[13.5px] font-bold text-[#14171c] truncate">
                      {projectMeta.completionTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-neutral-300/70 pl-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#b88344] shrink-0">
                    <MapPin size={20} className="stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-xs sm:text-[13.5px] font-bold text-[#14171c] truncate">
                      {projectMeta.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Main Showcase Image */}
          {(project.heroImage || project.image) && (
            <div className="lg:col-span-6">
              <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-[28px] overflow-hidden shadow-sm bg-neutral-100">
                <Image
                  src={project.heroImage || project.image}
                  alt={projectTitle}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* 4-Image Horizontal Grid */}
        {projectGallery && projectGallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mb-10 sm:mb-12">
            {projectGallery.slice(0, 4).map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                className="relative h-40 sm:h-48 rounded-2xl overflow-hidden bg-neutral-100 shadow-sm group"
              >
                <Image
                  src={imgUrl}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Mid Row: Project Overview (Left) & Key Highlights (Right) */}
        {(overviewText || (keyHighlights && keyHighlights.length > 0)) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-12">
            {/* Project Overview */}
            {overviewText && (
              <div className="lg:col-span-7 space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14171c] tracking-tight">
                  Project Overview
                </h2>
                <p className="text-[13.5px] sm:text-[14px] text-neutral-600 leading-relaxed font-normal">
                  {overviewText}
                </p>
              </div>
            )}

            {/* Key Highlights Card */}
            {keyHighlights && keyHighlights.length > 0 && (
              <div className="lg:col-span-5 bg-[#f4efe6] rounded-[24px] p-6 sm:p-7 border border-[#ebe3d5]">
                <h3 className="text-base sm:text-lg font-bold text-[#14171c] mb-4 tracking-tight">
                  Key Highlights
                </h3>
                <div className="space-y-3">
                  {keyHighlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-[#b88344] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-neutral-700 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Row: Features & Work Included (Left) & Before & After (Right) */}
        {((features && features.length > 0) || beforeAfter) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Features & Work Included 2-Col Grid */}
            {features && features.length > 0 && (
              <div className="lg:col-span-7 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14171c] tracking-tight">
                  Features &amp; Work Included
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-1">
                  {features.map((feat: any, idx: number) => {
                    const IconComp = iconMap[feat.icon] || Sparkles;

                    return (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#b88344] shrink-0 shadow-sm border border-[#ebe3d5]">
                          <IconComp size={22} className="stroke-[1.9]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#14171c] tracking-tight">
                            {feat.title}
                          </h4>
                          <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed font-normal">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Right: Before & After Card */}
            {beforeAfter && beforeAfter.before && beforeAfter.after && (
              <div className="lg:col-span-5 bg-[#f4efe6] rounded-[24px] p-6 sm:p-7 border border-[#ebe3d5]">
                <h3 className="text-base sm:text-lg font-bold text-[#14171c] mb-4 tracking-tight">
                  Before &amp; After
                </h3>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-200 shadow-sm group">
                    <Image
                      src={beforeAfter.before}
                      alt="Before Remodel"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#14171c]/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-lg">
                      Before
                    </span>
                  </div>

                  <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-200 shadow-sm group">
                    <Image
                      src={beforeAfter.after}
                      alt="After Remodel"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#b88344] text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm">
                      After
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}