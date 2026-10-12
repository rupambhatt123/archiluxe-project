import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import rawSiteData from "@/data/websiteData.json";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const siteName = common.siteName || "ArchiLuxe";

const architecture = siteData.categories?.Architecture?.sections;
const servicesSection = architecture?.Services?.variants?.ArchiServices1;
const servicesList: any[] = servicesSection?.items || servicesSection?.services || [];
const contactData = architecture?.Contact?.variants?.ArchiContact1;
const serviceDetailsConfig = architecture?.ServiceDetails?.variants?.ArchiServiceDetails1;

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  layers: Layers,
  sparkles: Sparkles,
  shield: ShieldCheck,
  building: Building2,
};

// Helper: title se slug banana ya compare karna
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
    slug: srv.slug || normalizeSlug(srv.title) || "service",
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const matchedService = findServiceBySlug(slug);

  const fallbackTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Architectural Service";

  const title = `${matchedService?.title || fallbackTitle} | ${siteName}`;
  const description =
    matchedService?.description ||
    matchedService?.desc ||
    "Expert architectural, interior, and remodeling solutions.";

  return {
    title,
    description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Matched service dhoondhein
  const matchedService = findServiceBySlug(slug);

  // 2. Agar list me item na ho, toh URL slug se title generate karein taaki galat service na dikhe
  const fallbackTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Architectural Service";

  const currentService = matchedService || {
    title: fallbackTitle,
    description:
      "Comprehensive architectural, renovation, and spatial design solutions tailored to your unique site and lifestyle.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  };

  const dynamicServiceTitle = currentService.title;

  // 100% JSON Contact info
  const phoneNumber =
    contactData?.call?.phone || common.phone || "+1 (555) 234-5678";
  const emailAddress =
    contactData?.email?.email || common.email || "contact@archiluxe.com";
  const officeAddress =
    contactData?.office?.address ||
    common.address ||
    "742 Evergreen Terrace, Suite 400, New York, NY";

  // Dynamic Pillars / Highlights
  const pillars = currentService.pillars || serviceDetailsConfig?.pillars || [
    { title: "Custom Planning", icon: "compass" },
    { title: "Modern Materials", icon: "layers" },
    { title: "Aesthetic Precision", icon: "sparkles" },
    { title: "Turnkey Execution", icon: "shield" },
  ];

  // Dynamic Methodology & Deliverables
  const approachParagraph1 =
    currentService.approachP1 ||
    serviceDetailsConfig?.approachP1 ||
    "We believe that every architectural project is an opportunity to elevate daily life through intelligent spatial design, intentional natural lighting, and tactile material palettes.";

  const approachParagraph2 =
    currentService.approachP2 ||
    serviceDetailsConfig?.approachP2 ||
    "From preliminary zoning analyses and 3D architectural visualizations to construction phase documentation, our dedicated studio team guides each phase seamlessly.";

  const deliverablesList: string[] =
    currentService.deliverables ||
    serviceDetailsConfig?.deliverables || [
      "Detailed CAD layout & 3D photorealistic renderings",
      "Material specifications, finishes, and supplier palettes",
      "Structural engineering & MEP coordination documents",
      "Local authority compliance & permit handling",
    ];

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Services" />

      {/* 2. Dynamic Universal PageBanner */}
      <PageBanner
        title={dynamicServiceTitle}
        bgImage={currentService.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: dynamicServiceTitle },
        ]}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR (STICKY) ================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. All Services Navigation Box */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="bg-[#14171c] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  {servicesSection?.badge?.replace(/—/g, "").trim() || "Our Services"}
                </h3>
                <div className="w-10 h-0.5 bg-[#b88344] mt-2 rounded-full" />
              </div>

              <div className="p-3.5 space-y-1.5">
                {servicesList.map((item: any, idx: number) => {
                  const itemSlug = item.slug || normalizeSlug(item.title);
                  const isActive = normalizeSlug(itemSlug) === normalizeSlug(slug);

                  return (
                    <Link
                      key={item.slug || idx}
                      href={`/services/${itemSlug}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                        isActive
                          ? "bg-[#b88344] text-white shadow-sm"
                          : "bg-white text-[#14171c] hover:bg-[#faf7f2] hover:text-[#b88344]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-[#b88344]"
                          }`}
                        />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-neutral-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. Get In Touch Box */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="bg-[#14171c] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  {contactData?.badge?.replace(/—/g, "").trim() || "Get In Touch"}
                </h3>
                <div className="w-10 h-0.5 bg-[#b88344] mt-2 rounded-full" />
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#b88344] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {contactData?.call?.title || "Call Us"}
                    </p>
                    <p className="text-sm font-bold text-[#14171c]">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#b88344] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {contactData?.email?.title || "Email Us"}
                    </p>
                    <p className="text-sm font-bold text-[#14171c]">
                      {emailAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#b88344] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {contactData?.office?.title || "Our Studio"}
                    </p>
                    <p className="text-xs font-semibold text-[#14171c] leading-snug">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {currentService.badge || "SERVICE SPECIFICATION"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#14171c] tracking-tight mt-1">
              {currentService.title}
            </h1>
            <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
              {currentService.description || currentService.desc}
            </p>

            {/* Featured Image with unoptimized flag */}
            <div className="relative h-[280px] sm:h-[420px] w-full rounded-2xl overflow-hidden mt-6 mb-8 shadow-sm bg-neutral-100">
              <Image
                src={
                  currentService.image ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                }
                alt={currentService.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Key Pillars Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[#faf7f2] border border-neutral-100 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/60 mb-10">
              {pillars.map((item: any, i: number) => {
                const IconComp = iconMap[item.icon] || Compass;
                return (
                  <div key={i} className="p-4 text-center flex flex-col items-center justify-center">
                    <IconComp className="w-6 h-6 text-[#b88344] mb-2" />
                    <span className="text-xs font-bold text-[#14171c]">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Overview & Methodology */}
            <div>
              <h2 className="text-2xl font-black text-[#14171c]">
                Approach &amp; Methodology
              </h2>
              <div className="w-12 h-1 bg-[#b88344] mt-2 mb-4 rounded-full" />

              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {approachParagraph1}
              </p>

              <p className="text-neutral-600 text-sm leading-relaxed mb-8">
                {approachParagraph2}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="bg-[#14171c] text-white p-7 sm:p-8 rounded-3xl mb-10">
              <h3 className="font-extrabold text-lg text-white mb-2">
                What We Deliver For {currentService.title}
              </h3>
              <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                Standardized delivery packages tailored for clients, builders, and regulatory bodies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {deliverablesList.map((point: string, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#b88344] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="border border-neutral-100 rounded-2xl p-6 bg-[#faf7f2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-black text-[#14171c] text-base">
                  Ready to discuss your project?
                </h4>
                <p className="text-xs text-neutral-600 mt-1">
                  Schedule an initial architectural design consultation today.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#a07136] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
              >
                Inquire Now <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}