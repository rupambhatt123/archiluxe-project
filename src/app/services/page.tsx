import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import CTA from "@/components/CTA";
import rawSiteData from "@/data/websiteData.json";
import { ArrowRight } from "lucide-react";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const architecture = siteData.categories?.Architecture?.sections;
const servicesSection = architecture?.Services?.variants?.ArchiServices1;
const servicesList: any[] = servicesSection?.items || [];
const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;

export const metadata: Metadata = {
  title: `Our Services | ${common.siteName || "ArchiLuxe"}`,
  description: servicesSection?.description || "Explore our comprehensive architectural and interior design services.",
};

export default function ServicesPage() {
  const badgeTitle = servicesSection?.badge?.replace(/—/g, "").trim() || "OUR SERVICES";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      <Navbar activePage="Services" />

      {/* Dynamic Page Banner */}
      <PageBanner
        title={badgeTitle}
        bgImage={pageBanner?.bgOverlayImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services" },
        ]}
      />

      {/* Services Grid Section */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-6 h-[1.5px] bg-[#b88344]"></span>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {badgeTitle}
            </span>
            <span className="w-6 h-[1.5px] bg-[#b88344]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black text-[#14171c] tracking-tight leading-[1.15]">
            {servicesSection?.titleLine1 || "Designing Spaces"}{" "}
            <span className="text-[#b88344]">
              {servicesSection?.titleHighlight || "for Every Vision"}
            </span>
          </h2>

          <p className="text-xs sm:text-[13.5px] text-neutral-600 mt-2 font-normal leading-relaxed">
            {servicesSection?.description}
          </p>
        </div>

        {/* All Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((srv: any, index: number) => {
            const serviceSlug =
              srv.slug ||
              srv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

            return (
              <div
                key={srv.id || srv.title || index}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-[#14171c] group-hover:text-[#b88344] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mt-2.5">
                      {srv.desc || srv.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/services/${serviceSlug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#b88344] hover:text-[#a07136] group-hover:translate-x-1 transition-all"
                  >
                    View Service Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}