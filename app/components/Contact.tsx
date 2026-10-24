"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Contact() {
  const t = useTranslations("Contact");

  const contactInfo = {
    email: "sahandmohammed.a@gmail.com",
    phone: "+964 771 157 4683",
    location: "Sulaymaniyah, Iraq",
    maps: "https://maps.google.com/?q=Sulaymaniyah,Iraq",
  };

  return (
    <section
      id="contact"
      className="snap-section relative flex items-center justify-center min-h-[100dvh] py-24 overflow-hidden bg-transparent"
    >
      <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-14 z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] text-[#09090f] dark:text-white leading-[0.98]">
              {t.rich("title", {
                gradient: (chunks) => (
                  <span className="text-black/40 dark:text-white/40 block">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-sm md:text-base text-muted max-w-xs leading-snug md:text-right">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Clean Hairline Contact Row */}
          <motion.div
            variants={fadeInUp}
            className="border-t border-black/12 dark:border-white/12 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
          >
            <div className="md:col-span-6">
              <div className="text-xs font-mono uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">
                (01) Email
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="group inline-flex items-center gap-3 text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white hover:opacity-60 transition-opacity break-all"
              >
                <span>{contactInfo.email}</span>
                <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-mono uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">
                (02) Phone
              </div>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="text-lg md:text-2xl font-medium tracking-tight text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
              >
                {contactInfo.phone}
              </a>
            </div>

            <div className="md:col-span-3 md:text-right">
              <div className="text-xs font-mono uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">
                (03) Location
              </div>
              <a
                href={contactInfo.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-lg md:text-2xl font-medium tracking-tight text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
              >
                <span>{contactInfo.location}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
