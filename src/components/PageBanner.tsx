import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label?: string;
  href?: string;
}

interface PageBannerProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageBanner({
  title,
  breadcrumbs = [],
  bgImage,
}: PageBannerProps) {
  const filteredCrumbs = breadcrumbs.filter(
    (item) => item?.label && item.label.trim().toLowerCase() !== "home"
  );

  const trail: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...filteredCrumbs,
  ];

  return (
    <section className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center overflow-hidden bg-neutral-900">
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={title || ""}
            fill
            priority
            unoptimized
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-3">
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>
        )}

        {trail.length > 1 && (
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-neutral-300 font-medium">
            {trail.map((crumb, idx) => {
              const isLast = idx === trail.length - 1;
              return (
                <div key={idx} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#b88344] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#b88344] truncate max-w-[200px] sm:max-w-none">
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight size={14} className="text-neutral-500" />}
                </div>
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
}