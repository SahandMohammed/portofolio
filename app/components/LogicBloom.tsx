"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function LogicBloom() {
  const t = useTranslations("LogicBloom");

  return (
    <section
      id="logicbloom"
      className="snap-section py-24 relative flex items-center bg-transparent"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-black/12 dark:border-white/12 pt-16 md:py-24">
          {/* Left Column - LogicBloom Logo & Personal Note */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
            {/* LogicBloom Logo - flush aligned on the top-left */}
            <div className="-ml-3 sm:-ml-4 -mt-3">
              <Image
                src="/Navy-transparent.svg"
                alt="LogicBloom — Business, Progress Engineered"
                width={460}
                height={146}
                className="h-20 sm:h-24 md:h-28 w-auto object-contain dark:brightness-0 dark:invert transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            <p className="text-base md:text-lg text-[#09090f] dark:text-white font-medium leading-snug max-w-sm pt-1">
              “{t("heyNote")}”
            </p>
          </motion.div>

          {/* Right Column - Tagline, Description & Pillars */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-black/12 dark:lg:border-white/12 space-y-6"
          >
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] text-[#09090f] dark:text-white leading-tight">
                {t.rich("tagline", {
                  gradient: (chunks) => (
                    <span className="text-black/40 dark:text-white/40">
                      {chunks}
                    </span>
                  ),
                })}
              </h3>
            </div>

            <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl">
              {t("description")}
            </p>

            {/* Pillars */}
            <div className="pt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs md:text-sm text-black/60 dark:text-white/60">
              {[
                "Custom Software Engineering",
                "Business Systems",
                "Web & Mobile Platforms",
                "Cloud & Digital Transformation",
              ].map((pillar, idx, arr) => (
                <span
                  key={pillar}
                  className="inline-flex items-center whitespace-nowrap"
                >
                  <span>{pillar}</span>
                  {idx < arr.length - 1 && (
                    <span className="ml-3.5 text-black/20 dark:text-white/20 select-none">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
