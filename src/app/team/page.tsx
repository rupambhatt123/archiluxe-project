"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export default function TeamPage() {
  const architecture = (siteData as any)?.categories?.Architecture?.sections;
  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const teamSection = architecture?.Team?.variants?.ArchiTeam1;
  const ctaData = architecture?.CTA?.variants?.ArchiCTA1;

  const members: any[] = teamSection?.members || [];

  const bannerTitle =
    teamSection?.badge?.replace(/—/g, "").trim() ||
    pageBanner?.title ||
    "Our Team";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar activePage="Our Team" />

      {/* 2. 100% Dynamic PageBanner */}
      <PageBanner
        title={bannerTitle}
        breadcrumbs={[{ label: bannerTitle }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      {/* 3. Team Grid Section */}
      <section className="pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto relative">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
            <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
              {teamSection?.badge?.replace(/—/g, "").trim() || "OUR TEAM"}
            </span>
            <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black text-[#14171c] tracking-tight leading-[1.12]">
            {teamSection?.titleLine1 || "Meet Our"}{" "}
            <span className="text-[#b88344]">
              {teamSection?.titleHighlight || "Creative Team"}
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed mt-2">
            {teamSection?.description ||
              "A dedicated team of designers, planners and project experts working together to create beautiful and functional spaces for your home."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {members.map((member: any, idx: number) => {
            const socials = [
              {
                icon: LinkedinIcon,
                label: "LinkedIn",
                url: member.socials?.linkedin || "https://linkedin.com",
              },
              {
                icon: InstagramIcon,
                label: "Instagram",
                url: member.socials?.instagram || "https://instagram.com",
              },
              {
                icon: FacebookIcon,
                label: "Facebook",
                url: member.socials?.facebook || "https://facebook.com",
              },
              {
                icon: TwitterIcon,
                label: "Twitter",
                url: member.socials?.twitter || "https://twitter.com",
              },
            ];

            return (
              <motion.div
                key={member.name || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-[0_3px_18px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#b88344]/30 transition-all duration-300 border border-neutral-100 flex flex-col justify-between group"
              >
                <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden relative mb-3 bg-neutral-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  <div
                    className="absolute bottom-0 right-0 w-9 h-9 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 50%, #b88344 50%)",
                    }}
                  />
                </div>

                <div className="text-center px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-[15px] sm:text-[16px] text-[#14171c] tracking-tight group-hover:text-[#b88344] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[11.5px] font-bold text-[#b88344] mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] sm:text-[11.5px] text-neutral-500 leading-relaxed font-normal mt-1.5 line-clamp-2">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-3 pb-0.5">
                    {socials.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={item.label}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} ${item.label}`}
                          className="w-7 h-7 rounded-full bg-[#fbf5eb] text-[#b88344] hover:bg-[#b88344] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. 100% Dynamic CTA Section */}
      {ctaData && (
        <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-10 bg-[#faf8f5] overflow-hidden border-t border-neutral-200/60">
          <div className="max-w-[1380px] mx-auto">
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 bg-[#fdfcf9] min-h-[260px] sm:min-h-[290px] flex items-center">
              <img
                src={ctaData.bgImage || "/hero.png"}
                alt={ctaData.titleHighlight || "Architecture Vision"}
                className="absolute inset-0 w-full h-full object-cover object-right md:object-[right_center]"
              />

              <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#fdfcf9] via-[#fdfcf9]/95 sm:via-[#fdfcf9]/90 md:via-[#fdfcf9]/80 to-transparent w-full md:w-[70%] pointer-events-none" />

              <div className="relative z-10 px-6 sm:px-10 md:px-14 py-8 sm:py-10 max-w-xl md:max-w-2xl">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black text-[#14171c] tracking-tight leading-[1.15]">
                  {ctaData.titleLine1 || "Ready to Build"}{" "}
                  <span className="text-[#b88344]">
                    {ctaData.titleHighlight || "Your Vision?"}
                  </span>
                </h2>

                <p className="text-xs sm:text-[13.5px] text-neutral-600 font-medium leading-relaxed mt-2.5 max-w-md">
                  {ctaData.description ||
                    "Let's create inspiring spaces together. Get in touch with our team today."}
                </p>

                <div className="pt-5 sm:pt-6">
                  <Link
                    href={ctaData.button?.href || "/contact"}
                    className="inline-flex items-center gap-2.5 bg-[#b88344] hover:bg-[#a07136] text-white px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#b88344]/30 hover:scale-105 transition-all duration-200"
                  >
                    {ctaData.button?.label || "Contact Us"}{" "}
                    <ArrowRight size={15} className="stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}