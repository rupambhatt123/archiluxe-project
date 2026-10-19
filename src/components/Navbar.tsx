"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface NavbarProps {
  activePage?: string;
  category?: string;
}

export default function Navbar({
  activePage = "Home",
  category = "Architecture",
}: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const headerData =
    (siteData as any)?.categories?.[category as keyof typeof siteData.categories]?.sections
      ?.Header?.variants?.ArchiHeader1;

  if (!headerData) return null;

  const toggleMobileDropdown = (title: string) => {
    setMobileDropdown((prev) => (prev === title ? null : title));
  };

  // Fixed Smart URL Resolver: Parent context ke hisaab se path resolve karega
  const resolveChildHref = (child: any, parentLink: any) => {
    if (child.path) return child.path;

    const parentTitle = (parentLink?.title || "").toLowerCase().trim();
    const childTitle = (child.title || "").toLowerCase().trim();

    if (parentTitle.includes("project")) {
      if (childTitle.includes("overview") || childTitle.includes("all")) {
        return "/projects";
      }
      const slug = childTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `/projects/${slug}`;
    }

    if (parentTitle.includes("service")) {
      if (childTitle.includes("overview") || childTitle.includes("all")) {
        return "/services";
      }
      const slug = childTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `/services/${slug}`;
    }

    return child.path || "/";
  };

  // 1. Duplicate Contact filter
  // 2. Services dropdown remove karke direct clean link
  const filteredNavLinks = (headerData.navLinks || [])
    .filter((link: any) => {
      if (!headerData.ctaButton) return true;
      const linkTitle = (link.title || "").toLowerCase().trim();
      const linkPath = (link.path || "").toLowerCase().trim();
      const ctaText = (headerData.ctaButton.text || "").toLowerCase().trim();
      const ctaPath = (headerData.ctaButton.path || "").toLowerCase().trim();

      const isDuplicateContact =
        (linkTitle === "contact" || linkTitle === "contact us") &&
        (ctaText.includes("contact") || ctaPath.includes("contact"));

      return !isDuplicateContact && linkPath !== ctaPath;
    })
    .map((link: any) => {
      const linkTitle = (link.title || "").toLowerCase().trim();
      if (linkTitle === "services" || linkTitle === "our services") {
        return {
          ...link,
          path: link.path || "/services",
          children: undefined,
        };
      }
      return link;
    });

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full pt-4 md:pt-6 px-4 md:px-8 pointer-events-none">
      <div className="max-w-[1340px] mx-auto bg-white/95 backdrop-blur-md rounded-[28px] md:rounded-full px-5 md:px-7 py-2 md:py-2.5 shadow-2xl border border-white/60 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/l1.png"
            alt={headerData.logoText || "Archiluxe"}
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-all"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-semibold text-neutral-800">
          {filteredNavLinks.map((link: any) => {
            const hasChildren = Boolean(link.children && link.children.length > 0);
            const isCurrent =
              activePage.toLowerCase() === link.title.toLowerCase();

            return (
              <div
                key={link.title}
                className="relative group py-1"
                onMouseEnter={() => hasChildren && setActiveDropdown(link.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.path || "/"}
                  onClick={() => setActiveDropdown(null)}
                  className={`flex items-center gap-1.5 transition-colors py-1.5 ${
                    isCurrent
                      ? "bg-[#b88344] text-white px-4 py-1.5 rounded-full font-bold shadow-md shadow-[#b88344]/30"
                      : "text-neutral-700 hover:text-[#b88344]"
                  }`}
                >
                  {link.title}
                  {hasChildren && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.title ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {hasChildren && (
                  <div
                    className={`absolute top-full left-0 pt-2 w-64 z-50 transition-all duration-200 ${
                      activeDropdown === link.title
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 py-3 px-2 space-y-1">
                      {link.children.map((child: any) => (
                        <Link
                          key={child.title}
                          href={resolveChildHref(child, link)}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-[#fbf9f5] hover:text-[#b88344] rounded-xl transition-colors"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {headerData.ctaButton && (
            <Link
              href={headerData.ctaButton.path || "/contact"}
              className="bg-[#b88344] hover:bg-[#a07136] text-white px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-[#b88344]/30 transition-all hover:scale-105 shrink-0"
            >
              <span>{headerData.ctaButton.text}</span> <ArrowRight size={14} />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f8f5f0] border border-neutral-200 text-[#14171c] hover:bg-[#b88344] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden max-w-[1340px] mx-auto mt-2 bg-white rounded-3xl p-5 shadow-2xl border border-neutral-100 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5 divide-y divide-neutral-100">
            {filteredNavLinks.map((link: any) => {
              const hasChildren = Boolean(link.children && link.children.length > 0);
              const isCurrent =
                activePage.toLowerCase() === link.title.toLowerCase();
              const isChildOpen = mobileDropdown === link.title;

              return (
                <div key={link.title} className="pt-2 first:pt-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.path || "/"}
                      onClick={() => !hasChildren && setMobileMenuOpen(false)}
                      className={`text-sm font-bold py-1.5 transition-colors ${
                        isCurrent ? "text-[#b88344]" : "text-[#14171c] hover:text-[#b88344]"
                      }`}
                    >
                      {link.title}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => toggleMobileDropdown(link.title)}
                        aria-label={`Toggle ${link.title} submenu`}
                        className="p-2 text-neutral-500 hover:text-[#b88344] transition-colors cursor-pointer"
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isChildOpen ? "rotate-180 text-[#b88344]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && isChildOpen && (
                    <div className="mt-1.5 mb-2 pl-3 py-1 space-y-1 bg-[#fcfbf9] rounded-2xl border border-neutral-100/80">
                      {link.children.map((child: any) => (
                        <Link
                          key={child.title}
                          href={resolveChildHref(child, link)}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileDropdown(null);
                          }}
                          className="block py-2 px-2 text-xs font-semibold text-neutral-600 hover:text-[#b88344] hover:bg-white rounded-xl transition-colors"
                        >
                          • {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}