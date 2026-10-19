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

// Refined Smooth Counter Function
function CounterNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const [displayValue, setDisplayValue] = useState(0);

  const numericMatch = value?.toString().match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value ? value.toString().replace(/\d+/g, "") : "";

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let startTime: number | null = null;
    const duration = 2000;

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
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

  // 100% directly loaded from JSON
  const statsList: any[] = data?.items || data?.stats || [];

  if (!statsList.length) return null;

  return (
    <section className="relative z-20 -mt-8 sm:-mt-14 lg:-mt-16 bg-white pt-4 pb-5 sm:pb-8 px-4 sm:px-6 md:px-10 border-y border-neutral-100/90 shadow-sm overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:grid md:grid-cols-4 items-center overflow-x-auto no-scrollbar gap-5 md:gap-0 pb-1 md:pb-0">
          {statsList.map((st: any, idx: number) => {
            const Icon = iconMap[st.icon] || HardHat;
            const isLast = idx === statsList.length - 1;

            return (
              <motion.div
                key={st.label || idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`shrink-0 flex items-center gap-3 sm:gap-4.5 justify-start sm:justify-center px-3 sm:px-5 ${
                  !isLast ? "md:border-r md:border-neutral-200/80" : ""
                }`}
              >
                {/* Noticeably Larger Icon Circle Badge */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#fbf5eb] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#b88344] stroke-[1.9]" />
                </div>

                {/* Number & Label */}
                <div className="flex flex-col min-w-0">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14171c] tracking-tight leading-tight">
                    <CounterNumber value={st.value} />
                  </div>
                  <div className="text-xs sm:text-[13.5px] text-neutral-500 font-medium whitespace-nowrap mt-0.5">
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