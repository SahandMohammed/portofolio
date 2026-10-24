"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import type { ProjectMeta } from "../lib/projects";

interface ProjectsProps {
  projects: ProjectMeta[];
}

export default function Projects({ projects }: ProjectsProps) {
  const t = useTranslations("Projects");
  const displayedProjects = projects.slice(0, 3);

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
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
              {t.rich("title", {
                gradient: (chunks) => (
                  <span className="text-black/40 dark:text-white/40 block">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-muted max-w-md text-sm md:text-base leading-snug mt-4">
              {t("subtitle")}
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
          >
            <span>{t("viewAllProjects")}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </motion.div>

        {/* Editorial Index List (Agency Portfolio Style, Linking to MDX Case Studies) */}
        <div className="border-t border-black/12 dark:border-white/12">
          {displayedProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={fadeInUp}
              className="py-8 md:py-10 border-b last:border-b-0 border-black/12 dark:border-white/12"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline hover:opacity-75 transition-opacity"
              >
                <div className="md:col-span-1 text-xs font-mono text-black/40 dark:text-white/40">
                  ({project.num || String(idx + 1).padStart(2, "0")})
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">
                    {project.excerpt}
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
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
