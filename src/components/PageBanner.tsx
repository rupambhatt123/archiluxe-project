"use client";

import Link from "next/link";
import siteData from "@/data/websiteData.json";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageBanner({
  title,
  breadcrumbs = [],
  bgImage,
}: PageBannerProps) {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;
  const bannerData = architecture?.PageBanner?.variants?.ArchiPageBanner1;

  const finalBgImage =
    bgImage ||
    bannerData?.bgOverlayImage ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

  const filteredCrumbs = breadcrumbs.filter(
    (item) => item.label.trim().toLowerCase() !== "home"
  );

  const trail: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...filteredCrumbs,
  ];

  return (
    <section className="relative w-full min-h-[220px] sm:min-h-[250px] md:min-h-[280px] pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#0d0f12] text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={finalBgImage}
          alt={title}
          className="w-full h-full object-cover object-center opacity-50 brightness-95 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0d0f12]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Added uppercase aur tracking-wider */}
        <h1 className="text-2xl sm:text-3xl md:text-[42px] font-black uppercase tracking-wider text-white mb-2 leading-tight drop-shadow-md">
          {title}
        </h1>

        <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-[13px] font-semibold text-neutral-300">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;

            return (
              <div key={index} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-[#b88344] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#b88344] font-bold">
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-[#b88344] font-bold">•</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}