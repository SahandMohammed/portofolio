"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function CloudServices() {
  const t = useTranslations("CloudServices");

  const services = [
    { key: "infrastructure", num: "01" },
    { key: "server", num: "02" },
    { key: "environment", num: "03" },
    { key: "security", num: "04" },
  ];

  return (
    <section
      id="cloud-services"
      className="snap-section py-20 relative flex items-center bg-white dark:bg-[#03020a]"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Statement */}
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

          {/* Right Architectural Hairline Grid (No boxy AI cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-black/12 dark:border-white/12">
            {services.map((service, idx) => (
              <motion.div
                key={service.key}
                variants={fadeInUp}
                className={`py-8 sm:p-8 border-b border-black/12 dark:border-white/12 ${
                  idx % 2 === 1
                    ? "sm:border-l sm:border-black/12 dark:sm:border-white/12"
                    : "sm:pl-0"
                }`}
              >
                <div className="text-xs font-mono text-black/40 dark:text-white/40 mb-6">
                  ({service.num})
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[#09090f] dark:text-white mb-3">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
