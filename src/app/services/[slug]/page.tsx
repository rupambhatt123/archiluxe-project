import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import rawSiteData from "@/data/websiteData.json";
import {
  ArrowRight,
  Package,
  Layers,
  Lightbulb,
  Maximize2,
  Plug,
  Award,
  LucideIcon,
} from "lucide-react";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const siteName = common.siteName;

const architecture = siteData.categories?.Architecture?.sections;
const servicesSection = architecture?.Services?.variants?.ArchiServices1;
const servicesList: any[] = servicesSection?.items || servicesSection?.services || [];
const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;

const iconMap: Record<string, LucideIcon> = {
  package: Package,
  layers: Layers,
  lightbulb: Lightbulb,
  maximize: Maximize2,
  plug: Plug,
  award: Award,
};

function normalizeSlug(str: string = "") {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function findServiceBySlug(targetSlug: string) {
  if (!targetSlug) return null;
  const cleanTarget = normalizeSlug(targetSlug);

  return (
    servicesList.find((srv: any) => {
      const slugMatch = srv.slug && normalizeSlug(srv.slug) === cleanTarget;
      const titleMatch = srv.title && normalizeSlug(srv.title) === cleanTarget;
      return slugMatch || titleMatch;
    }) || null
  );
}

export async function generateStaticParams() {
  return servicesList.map((srv: any) => ({
    slug: srv.slug || normalizeSlug(srv.title),
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedService = findServiceBySlug(slug);

  return {
    title: `${matchedService?.title} | ${siteName}`,
    description: matchedService?.description || matchedService?.desc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentService = findServiceBySlug(slug);

  if (!currentService) return null;

  const serviceTitle = currentService.title;
  const badgeTitle = currentService.badge || currentService.title;

  const paragraph1 =
    currentService.paragraph1 || currentService.description || currentService.desc;
  const paragraph2 = currentService.paragraph2 || currentService.approachP2;

  const expYears = currentService.expYears;
  const expLabel = currentService.expLabel;
  const expHeading = currentService.expHeading;
  const expDesc = currentService.expDesc;

  const features: any[] = currentService.features || [];

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] selection:bg-[#b88344] selection:text-white">
      {/* 1. Navbar */}
      <Navbar activePage="Services" />

      {/* 2. Page Banner */}
      <PageBanner
        title={pageBanner?.title || "Service Details"}
        bgImage={pageBanner?.bgOverlayImage || currentService.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Service Details" },
        ]}
      />

      {/* 3. Main Body Container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="lg:col-span-3 space-y-2.5 lg:sticky lg:top-28 pt-1">
            {servicesList.map((item: any, idx: number) => {
              const itemSlug = item.slug || normalizeSlug(item.title);
              const isActive = normalizeSlug(itemSlug) === normalizeSlug(slug);

              return (
                <Link
                  key={item.slug || idx}
                  href={`/services/${itemSlug}`}
                  className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-[13px] sm:text-[14px] font-bold transition-all duration-200 block ${
                    isActive
                      ? "bg-[#b88344] text-white shadow-md shadow-[#b88344]/30"
                      : "bg-[#f4f2ec] text-[#14171c] hover:bg-[#eae5da]"
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  {isActive && (
                    <ArrowRight size={16} className="stroke-[2.5] shrink-0 ml-2" />
                  )}
                </Link>
              );
            })}
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <div className="lg:col-span-9 space-y-8 sm:space-y-10 pt-1">
            
            {/* Top Row: Left Content + Right Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* Left Column: Badge, Title & Paragraphs */}
              <div className="md:col-span-7 space-y-3.5">
                {badgeTitle && (
                  <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#b88344] block">
                    {badgeTitle}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#14171c] leading-[1.18] tracking-tight">
                  {currentService.headline || serviceTitle}
                </h1>

                {paragraph1 && (
                  <p className="text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal pt-1">
                    {paragraph1}
                  </p>
                )}

                {paragraph2 && (
                  <p className="text-[13px] sm:text-[13.5px] text-neutral-600 leading-relaxed font-normal">
                    {paragraph2}
                  </p>
                )}
              </div>

              {/* Right Column: Dynamic Image */}
              {currentService.image && (
                <div className="md:col-span-5">
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] rounded-3xl overflow-hidden shadow-sm bg-neutral-200 border border-neutral-100">
                    <Image
                      src={currentService.image}
                      alt={serviceTitle}
                      fill
                      unoptimized
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Middle Row: Experience Highlight Card (Sirf tab render hoga jab JSON me exp details hon) */}
            {(expYears || expHeading) && (
              <div className="bg-[#f4f2ec] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                {expYears && (
                  <div className="shrink-0">
                    <div className="text-4xl sm:text-5xl font-black text-[#b88344] leading-none tracking-tight">
                      {expYears}
                    </div>
                    {expLabel && (
                      <div className="text-xs sm:text-[13px] font-medium text-neutral-600 mt-1 whitespace-nowrap">
                        {expLabel}
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t sm:border-t-0 sm:border-l border-neutral-300/80 pt-4 sm:pt-0 sm:pl-8 space-y-1.5">
                  {expHeading && (
                    <h3 className="text-base sm:text-lg font-bold text-[#14171c] tracking-tight">
                      {expHeading}
                    </h3>
                  )}
                  {expDesc && (
                    <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                      {expDesc}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Row: Features Grid (Sirf JSON items render honge) */}
            {features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 pt-2">
                {features.map((feat: any, idx: number) => {
                  const IconComponent = iconMap[feat.icon] || Package;

                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#eae6dc] flex items-center justify-center text-[#b88344] shrink-0 shadow-sm">
                        <IconComponent size={24} className="stroke-[1.9]" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[15px] sm:text-[16px] font-bold text-[#14171c] tracking-tight leading-snug">
                          {feat.title}
                        </h4>
                        <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed font-normal">
                          {feat.desc || feat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}