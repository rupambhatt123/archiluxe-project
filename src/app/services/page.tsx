import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services";

// Dynamic JSON data import
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;
const servicesSection =
  siteData?.categories?.Architecture?.sections?.Services?.variants?.ArchiServices1;
const siteName = siteData?.common?.siteName || "ArchiLuxe";

// Dynamic SEO Metadata
export const metadata: Metadata = {
  title: `Our Services | ${siteName}`,
  description:
    servicesSection?.description ||
    "Explore our comprehensive architectural and interior design services.",
};

export default function ServicesPage() {
  const pageTitle = servicesSection?.badge?.replace(/—/g, "").trim() || "Our Services";

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Top Page Banner with Breadcrumb: Home • Our Services */}
      <PageBanner
        title={pageTitle}
        breadcrumbs={[{ label: pageTitle }]}
      />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}