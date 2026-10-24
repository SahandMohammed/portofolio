"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Education() {
  const t = useTranslations("Education");

  return (
    <section
      id="education"
      className="snap-section py-24 relative flex items-center bg-transparent"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-black/12 dark:border-white/12 pt-12">
          {/* Left Editorial Heading */}
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02] mb-6">
              {t.rich("title", {
                gradient: (chunks) => (
                  <span className="text-black/40 dark:text-white/40 block">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-muted text-sm md:text-base max-w-sm leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Right Clean Editorial Specification (No boxy AI card) */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-widest text-black/45 dark:text-white/45 mb-3">
              {t("location")}
            </div>

            <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white mb-2">
              {t("degree")}
            </h3>

            <div className="text-lg md:text-xl text-black/55 dark:text-white/55 mb-8">
              {t("university")}
            </div>

            <p className="text-muted text-base leading-relaxed max-w-2xl mb-10">
              {t("description")}
            </p>

            <div className="pt-6 border-t border-black/12 dark:border-white/12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-black/60 dark:text-white/60">
              {[
                "Software Engineering",
                "System Analysis",
                "Data Structures",
                "Algorithms",
              ].map((tag, idx, arr) => (
                <span key={tag}>
                  {tag}
                  {idx < arr.length - 1 && (
                    <span className="ml-6 text-black/20 dark:text-white/20">
                      ,
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
