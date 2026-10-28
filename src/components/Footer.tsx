"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Mail, Phone, Clock, ArrowUp } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface FooterProps {
  category?: string;
  variant?: string;
}

function FacebookIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M9.198 21.5h4v-8.01h2.67l.4-3.1h-3.07V8.41c0-.9.25-1.52 1.54-1.52h1.65V4.12c-.29-.04-1.27-.12-2.42-.12-2.39 0-4.03 1.46-4.03 4.14v2.25H7.2v3.1h2v8.01z" />
    </svg>
  );
}

function XTwitterIcon() {
  return (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.301-.15-1.782-.88-2.059-.98-.277-.1-.478-.15-.678.15-.2.3-.778.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.678-1.636-.929-2.242-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.229 3.113c.15.201 2.124 3.243 5.146 4.549.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 21.8a9.73 9.73 0 0 1-4.97-1.36l-.356-.211-3.696.969.986-3.603-.232-.37A9.743 9.743 0 1 1 21.78 12.04c0 5.38-4.37 9.76-9.74 9.76z" />
    </svg>
  );
}

export default function Footer({
  category = "Architecture",
  variant = "ArchiFooter1",
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentCategory =
    siteData.categories?.[category as keyof typeof siteData.categories];

  const footerData =
    currentCategory?.sections?.Footer?.variants?.[
      variant as keyof typeof currentCategory.sections.Footer.variants
    ];

  const servicesList =
    currentCategory?.sections?.Services?.variants?.ArchiServices1?.items || [];
  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Our Services", href: "/services" },
    { title: "Projects", href: "/projects" },
    { title: "Our Team", href: "/team" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact Us", href: "/contact" },
  ];

  const defaultServices = [
    { title: "Home Renovation", href: "/services" },
    { title: "Kitchen Remodeling", href: "/services" },
    { title: "Bathroom Renovation", href: "/services" },
    { title: "Interior Remodeling", href: "/services" },
    { title: "Exterior Renovation", href: "/services" },
    { title: "Commercial Renovation", href: "/services" },
    { title: "Architectural Design", href: "/services" },
  ];

  const renderedServices =
    servicesList.length > 0
      ? servicesList.slice(0, 7).map((srv: any) => ({
          title: srv.title,
          href: srv.slug ? `/services/${srv.slug}` : "/services",
        }))
      : defaultServices;

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://facebook.com",
    },
    {
      name: "X",
      icon: XTwitterIcon,
      href: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: "https://instagram.com",
    },
    {
      name: "YouTube",
      icon: YouTubeIcon,
      href: "https://youtube.com",
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: "https://whatsapp.com",
    },
  ];

  return (
    <footer className="relative bg-[#10141a] text-white pt-12 sm:pt-14 pb-5 px-5 sm:px-8 md:px-14 border-t border-white/10 overflow-hidden">
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none bg-no-repeat bg-right bg-contain hidden lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')",
        }}
      />

      <div className="relative z-10 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-[#222934]">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src={footerData?.logoImage || "/l2.webp"}
                alt={siteData.common?.siteName || "Archiluxe Architecture Firm"}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/l1.webp";
                }}
              />
            </Link>

            <p className="text-[13px] text-neutral-400 font-normal leading-relaxed pr-2 sm:pr-4">
              {footerData?.about ||
                "We create innovative architecture and interior spaces that blend aesthetics, functionality, and sustainability. From residential to commercial projects, we bring your vision to life with thoughtful design and expert execution."}
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-8 h-8 rounded-full border border-neutral-600/80 hover:border-[#b88344] bg-transparent hover:bg-[#b88344] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3.5">
            <div>
              <h4 className="text-[15px] font-bold tracking-tight text-white">
                Quick Links
              </h4>
              <div className="w-7 h-[2px] bg-[#b88344] mt-1.5"></div>
            </div>

            <ul className="space-y-2 text-[13px] text-neutral-300">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 hover:text-[#b88344] transition-colors leading-snug group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#b88344] stroke-[2.2] shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3.5">
            <div>
              <h4 className="text-[15px] font-bold tracking-tight text-white">
                Our Services
              </h4>
              <div className="w-7 h-[2px] bg-[#b88344] mt-1.5"></div>
            </div>

            <ul className="space-y-2 text-[13px] text-neutral-300">
              {renderedServices.map((srv: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={srv.href}
                    className="flex items-center gap-1.5 hover:text-[#b88344] transition-colors leading-snug group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-[#b88344] stroke-[2.2] shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                    <span className="truncate">{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3.5">
            <div>
              <h4 className="text-[15px] font-bold tracking-tight text-white">
                Get In Touch
              </h4>
              <div className="w-7 h-[2px] bg-[#b88344] mt-1.5"></div>
            </div>

            <div className="space-y-3 pt-0.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b88344] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-[#b88344]/30">
                  <MapPin size={15} />
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white leading-tight">
                    Office Location
                  </strong>
                  <span className="text-[12px] text-neutral-400 leading-tight block mt-0.5">
                    {footerData?.location || "100 S Main Street, New York, NY 10001"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b88344] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-[#b88344]/30">
                  <Mail size={15} />
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white leading-tight">
                    Email Us
                  </strong>
                  <a
                    href={`mailto:${footerData?.email || "contact@archiluxe.com"}`}
                    className="text-[12px] text-neutral-400 hover:text-[#b88344] transition-colors leading-tight block mt-0.5"
                  >
                    {footerData?.email || "contact@archiluxe.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b88344] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-[#b88344]/30">
                  <Phone size={15} />
                </div>
                <div>
                  <strong className="block text-[13px] font-bold text-white leading-tight">
                    Call Us
                  </strong>
                  <a
                    href={`tel:${(footerData?.phone || "+1 (800) 123-4567").replace(/[^0-9+]/g, "")}`}
                    className="text-[12px] text-neutral-400 hover:text-[#b88344] transition-colors leading-tight block mt-0.5"
                  >
                    {footerData?.phone || "+1 (800) 123-4567"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[12px] text-neutral-400 gap-3">
          <p>
            {footerData?.copyright || "Copyright © 2026 Archiluxe. All Rights Reserved."}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-8 h-8 rounded-full bg-[#b88344] text-white flex items-center justify-center hover:bg-[#a07136] transition-all shadow-md shadow-[#b88344]/30 cursor-pointer"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}