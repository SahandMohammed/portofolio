"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Projects() {
  const t = useTranslations("Projects");

  const projects = [
    {
      key: "ecommerce",
      num: "01",
      tags: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      key: "taskApp",
      num: "02",
      tags: ["Flutter", "Firebase", "Dart", "Mobile"],
      link: "#",
      github: "#",
    },
    {
      key: "healthcare",
      num: "03",
      tags: ["React", "Spring Boot", "MySQL", "Docker"],
      link: "#",
      github: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="snap-section py-24 relative flex items-center bg-transparent"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
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

        {/* Editorial Index List (Agency Portfolio Style, No AI Cards) */}
        <div className="border-t border-black/12 dark:border-white/12">
          {projects.map((project) => (
            <motion.a
              key={project.key}
              href={project.link}
              variants={fadeInUp}
              className="group py-8 md:py-10 border-b border-black/12 dark:border-white/12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline hover:opacity-75 transition-opacity"
            >
              <div className="md:col-span-1 text-xs font-mono text-black/40 dark:text-white/40">
                ({project.num})
              </div>

              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white">
                  {t(`${project.key}.title`)}
                </h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-muted text-sm leading-relaxed">
                  {t(`${project.key}.description`)}
                </p>
              </div>

              <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                <span className="text-xs text-black/50 dark:text-white/50">
                  {project.tags.join(" , ")}
                </span>
                <span className="w-9 h-9 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#09090f] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#09090f] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
