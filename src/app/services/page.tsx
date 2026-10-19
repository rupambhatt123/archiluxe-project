import Link from "next/link";
import type { Metadata } from "next";
import {
  Home,
  Building2,
  Sofa,
  Wrench,
  Leaf,
  FileText,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const architecture = siteData.categories?.Architecture?.sections;
const servicesSection = architecture?.Services?.variants?.ArchiServices1;
const servicesList: any[] = servicesSection?.services || servicesSection?.items || [];
const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  building: Building2,
  sofa: Sofa,
  wrench: Wrench,
  leaf: Leaf,
  fileText: FileText,
};

export const metadata: Metadata = {
  title: `Our Services | ${common.siteName || "ArchiLuxe"}`,
  description:
    servicesSection?.description ||
    "Explore our comprehensive architectural and interior design services.",
};

export default function ServicesPage() {
  const badgeTitle =
    servicesSection?.badge?.replace(/—/g, "").trim() || "OUR SERVICES";
  const globalBtnText =
    servicesSection?.buttonText || servicesSection?.button?.label || "Read More";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Services" />

      {/* 2. Dynamic Universal Page Banner */}
      <PageBanner
        title={badgeTitle}
        bgImage={pageBanner?.bgOverlayImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services" },
        ]}
      />

      {/* 3. Services Listing Section (Exact Homepage Card Pattern) */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {badgeTitle}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#14171c] tracking-tight leading-[1.15]">
            {servicesSection?.titleLine1}{" "}
            <span className="text-[#b88344]">
              {servicesSection?.titleHighlight}
            </span>
          </h2>

          <p className="text-xs sm:text-[14px] text-neutral-600 mt-2 font-normal leading-relaxed">
            {servicesSection?.description || servicesSection?.subtitle}
          </p>
        </div>

        {/* All Services Grid Layout matching Homepage design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {servicesList.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Home;

            const rawSlug =
              item.slug ||
              item.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const cardLink =
              item.href ||
              item.link ||
              (rawSlug ? `/services/${rawSlug}` : "/services");

            const cardBtnLabel = item.buttonText || item.cta || globalBtnText;
            const descriptionText = item.desc || item.description || "";

            return (
              <div
                key={item.id || item.slug || item.title || idx}
                className="group bg-white rounded-3xl p-5 sm:p-5.5 border border-neutral-100 shadow-[0_4px_22px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#b88344]/30 hover:-translate-y-1 transition-all duration-300 flex items-stretch gap-4 sm:gap-5 min-h-[215px] sm:min-h-[225px]"
              >
                {/* Left Side: Details & Actions */}
                <div className="w-[52%] flex flex-col justify-between py-1">
                  <div>
                    {/* Circle Icon Badge */}
                    <div className="w-11 h-11 rounded-full bg-[#fbf5eb] flex items-center justify-center text-[#b88344] mb-2.5 shrink-0 group-hover:bg-[#b88344] group-hover:text-white transition-colors duration-300">
                      <Icon size={20} className="stroke-[1.9]" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-[#14171c] tracking-tight leading-snug group-hover:text-[#b88344] transition-colors mb-1.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11.5px] sm:text-[12.5px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                      {descriptionText}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={cardLink}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#b88344] hover:text-[#9e6f33] transition-colors group/link"
                    >
                      <span>{cardBtnLabel}</span>
                      <ArrowRight
                        size={13}
                        className="stroke-[2.3] transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Image Container */}
                <div className="w-[48%] relative rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Footer (CTA completely removed from this page) */}
      <Footer />
    </main>
  );
}