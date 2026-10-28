"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import rawSiteData from "@/data/websiteData.json";

const siteData = rawSiteData as any;
const common = siteData.common;
const architecture = siteData.categories?.Architecture?.sections;
const navData = architecture?.Navbar?.variants?.ArchiNavbar1;
const projectsList: any[] = architecture?.Projects?.variants?.ArchiProjects1?.items || [];

function normalizeSlug(str: string = "") {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projectDropdownItems = [
    { label: "All Projects", href: "/projects" },
    ...projectsList.map((p: any) => ({
      label: p.title,
      href: `/projects/${p.slug || normalizeSlug(p.title)}`,
    })),
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    {
      label: "Projects",
      href: "/projects",
      dropdown: projectDropdownItems,
    },
    { label: "Our Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-[1360px] mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-neutral-100 px-6 py-2.5 flex items-center justify-between pointer-events-auto">
        
        <Link href="/" className="flex items-center gap-2.5">
          {navData?.logoImage ? (
            <img
              src={navData.logoImage}
              alt={common?.siteName}
              className="h-9 sm:h-10 w-auto object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#14171c] tracking-tight">
                {common?.siteName?.split(" ")[0]}
                <span className="text-[#b88344]">
                  {common?.siteName?.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </div>
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            if (link.dropdown) {
              return (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-200 inline-flex items-center gap-1 ${
                      active
                        ? "bg-[#b88344] text-white shadow-sm"
                        : "text-[#14171c] hover:text-[#b88344]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={14} className="stroke-[2.2] group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  <div className="absolute top-full left-0 pt-2 w-64 hidden group-hover:block z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 max-h-80 overflow-y-auto">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-xs font-bold text-[#14171c] hover:bg-[#faf7f2] hover:text-[#b88344] transition-colors truncate"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-200 ${
                  active
                    ? "bg-[#b88344] text-white shadow-sm"
                    : "text-[#14171c] hover:text-[#b88344]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className={`px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
              pathname.startsWith("/contact")
                ? "bg-[#9e6f33] text-white"
                : "bg-[#b88344] hover:bg-[#a07136] text-white hover:scale-[1.02]"
            }`}
          >
            <span>{navData?.ctaButton || "Contact Us"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#14171c] hover:text-[#b88344]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-[1360px] bg-white rounded-3xl shadow-2xl border border-neutral-100 p-5 space-y-2 pointer-events-auto max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            if (link.dropdown) {
              return (
                <div key={link.label} className="space-y-1">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      active
                        ? "bg-[#b88344] text-white"
                        : "text-[#14171c] hover:bg-[#faf7f2] hover:text-[#b88344]"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <div className="pl-4 space-y-1 border-l-2 border-[#b88344]/20 ml-2">
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-[11px] font-semibold text-neutral-600 hover:text-[#b88344] transition-colors truncate"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  active
                    ? "bg-[#b88344] text-white"
                    : "text-[#14171c] hover:bg-[#faf7f2] hover:text-[#b88344]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-neutral-100">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#b88344] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>{navData?.ctaButton || "Contact Us"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}