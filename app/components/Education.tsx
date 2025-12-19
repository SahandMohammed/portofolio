"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

export default function Education() {
  const t = useTranslations("Education");

  return (
    <section
      id="education"
      className="snap-section py-20 relative overflow-visible flex items-center"
    >
      <SectionBackground variant="education" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 w-full"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            {t.rich("title", {
              gradient: (chunks) => (
                <span className="text-gradient">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="w-full">
          <motion.div
            variants={fadeInUp}
            className="glass p-8 rounded-2xl border-l-4 border-l-primary hover:bg-surface transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <GraduationCap className="w-32 h-32 text-primary" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t("degree")}
                </h3>
                <h4 className="text-xl text-primary font-medium mb-4">
                  {t("university")}
                </h4>

                <div className="flex flex-wrap gap-4 text-muted text-sm mb-6">
                  {/* <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Graduated 20XX</span> 
                  </div> */}
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{t("location")}</span>
                  </div>
                </div>

                <p className="text-muted leading-relaxed mb-6">
                  {t("description")}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Software Mobile Engineering",
                    "System Analysis",
                    "Data Structures",
                    "Algorithms",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-surface border border-[var(--surface-border)] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
