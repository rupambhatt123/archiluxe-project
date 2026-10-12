"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HardHat, Building2, Maximize2, Users2 } from "lucide-react";
import siteData from "@/data/websiteData.json";

interface StatsProps {
  category?: string;
  variant?: string;
}

const iconMap: Record<string, any> = {
  hardHat: HardHat,
  building: Building2,
  maximize: Maximize2,
  users: Users2,
};

// Smooth Counter Function
function CounterNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState(0);

  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let startTime: number | null = null;
    const duration = 1800;

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOut * targetNumber);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats({
  category = "Architecture",
  variant = "ArchiStatsCounter1",
}: StatsProps) {
  const currentCategory =
    (siteData as any).categories?.[category as keyof typeof siteData.categories];
  
  const statsVariants =
    currentCategory?.sections?.StatsCounter?.variants ||
    currentCategory?.sections?.Stats?.variants;

  const data = statsVariants?.[variant as keyof typeof statsVariants];

  const statsList = data?.items || data?.stats || [
    { value: "22", label: "Years of Experience", icon: "hardHat" },
    { value: "282+", label: "Projects Completed", icon: "building" },
    { value: "420k", label: "Square Feet Covered", icon: "maximize" },
    { value: "93%", label: "Positive Feedbacks", icon: "users" },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-14 lg:-mt-16 bg-white pt-3 pb-4 sm:pb-7 px-3 sm:px-6 md:px-10 border-y border-neutral-100/90 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        {/* Mobile: 1 Single Horizontal Line (Scrollable without breaking), Desktop: 4 Col Grid */}
        <div className="flex md:grid md:grid-cols-4 items-center overflow-x-auto no-scrollbar gap-4 md:gap-0 pb-1 md:pb-0">
          {statsList.map((st: any, idx: number) => {
            const Icon = iconMap[st.icon] || HardHat;
            const isLast = idx === statsList.length - 1;

            return (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`shrink-0 flex items-center gap-2.5 sm:gap-4 justify-start sm:justify-center px-2 sm:px-4 ${
                  !isLast ? "md:border-r md:border-neutral-200/70" : ""
                }`}
              >
                {/* Circular Badge */}
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#fbf5eb] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#b88344] stroke-[1.8]" />
                </div>

                {/* Number & Label */}
                <div className="flex flex-col min-w-0">
                  <div className="text-lg sm:text-3xl font-extrabold text-[#14171c] tracking-tight leading-tight">
                    <CounterNumber value={st.value} />
                  </div>
                  <div className="text-[10.5px] sm:text-[13px] text-neutral-500 font-medium whitespace-nowrap mt-0.5">
                    {st.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}