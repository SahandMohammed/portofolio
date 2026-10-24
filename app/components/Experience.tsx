"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Experience() {
  const t = useTranslations("Experience");

  const experiences = [
    { key: "dreamIt", num: "01", hasCompanyLocation: true },
    { key: "airport", num: "02", hasCompanyLocation: true },
    { key: "seray", num: "03", hasCompanyLocation: true },
    { key: "freelance", num: "04", hasCompanyLocation: false },
  ];

  return (
    <section
      id="experience"
      className="snap-section py-24 relative flex items-center bg-transparent"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        {/* Editorial Header */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
            {t.rich("title", {
              gradient: (chunks) => (
                <span className="text-black/40 dark:text-white/40 block">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="text-muted max-w-sm text-sm md:text-base leading-snug">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Clean Editorial Hairline Rows */}
        <div className="border-t border-black/12 dark:border-white/12">
          {experiences.map((exp) => (
            <motion.div
              key={exp.key}
              variants={fadeInUp}
              className="group py-8 md:py-10 border-b border-black/12 dark:border-white/12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-colors"
            >
              {/* Index & Period */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <span className="text-xs font-mono text-black/40 dark:text-white/40">
                  ({exp.num})
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-black/55 dark:text-white/55">
                  {t(`items.${exp.key}.period`)}
                </span>
              </div>

              {/* Role & Company */}
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#09090f] dark:text-white mb-1">
                  {t(`items.${exp.key}.role`)}
                </h3>
                {exp.hasCompanyLocation && (
                  <p className="text-sm text-black/55 dark:text-white/55">
                    {t(`items.${exp.key}.company`)},{" "}
                    {t(`items.${exp.key}.location`)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-5">
                <p className="text-muted text-sm md:text-base leading-relaxed">
                  {t(`items.${exp.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
