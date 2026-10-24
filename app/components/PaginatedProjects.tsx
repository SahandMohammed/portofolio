"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { EASE_ELEGANT, fadeInUp, staggerContainer } from "../lib/animations";
import type { ProjectMeta } from "../lib/projects";

interface PaginatedProjectsProps {
  projects: ProjectMeta[];
  itemsPerPage?: number;
  isRtl?: boolean;
}

export default function PaginatedProjects({
  projects,
  itemsPerPage = 3,
  isRtl = false,
}: PaginatedProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = projects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startNum = String(totalItems === 0 ? 0 : startIndex + 1).padStart(
    2,
    "0"
  );
  const endNum = String(
    Math.min(startIndex + itemsPerPage, totalItems)
  ).padStart(2, "0");
  const totalNum = String(totalItems).padStart(2, "0");

  return (
    <div>
      {/* Projects Editorial Case Study List */}
      <div className="border-t border-black/12 dark:border-white/12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.25, ease: EASE_ELEGANT },
            }}
          >
            {currentProjects.map((project, idx) => {
              const isPublicImage = project.image.startsWith("/");
              const globalIdx = startIndex + idx + 1;
              return (
                <motion.div key={project.slug} variants={fadeInUp}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group py-10 md:py-14 border-b border-black/12 dark:border-white/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:opacity-85 transition-opacity"
                  >
                    {/* Index + Meta */}
                    <div className="lg:col-span-2 flex lg:flex-col justify-between gap-2">
                      <span className="text-xs font-mono text-black/45 dark:text-white/45">
                        ({project.num || String(globalIdx).padStart(2, "0")})
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-black/50 dark:text-white/50">
                        {project.category}
                      </span>
                    </div>

                    {/* Title + Excerpt + Tags */}
                    <div className="lg:col-span-6 space-y-4">
                      <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white">
                        {project.title}
                      </h2>
                      <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
                        {project.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono border border-black/12 dark:border-white/12 text-[#09090f]/75 dark:text-white/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail Preview + Action Circle */}
                    <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6">
                      <div className="w-full max-w-[260px] aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#070612] relative">
                        {isPublicImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{ background: project.image }}
                          />
                        )}
                      </div>

                      <span className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#09090f] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#09090f] transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Editorial Pagination Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: EASE_ELEGANT }}
        className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="text-xs font-mono text-black/45 dark:text-white/45 uppercase tracking-widest">
          {startNum} — {endNum} / {totalNum}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="w-10 h-10 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-[#09090f] dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-[#09090f] hover:text-white dark:hover:bg-white dark:hover:text-[#09090f] transition-colors cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#09090f] text-white dark:bg-white dark:text-[#09090f] font-medium"
                    : "border border-black/15 dark:border-white/15 text-[#09090f]/70 dark:text-white/70 hover:border-black/40 dark:hover:border-white/40"
                }`}
              >
                {String(page).padStart(2, "0")}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="w-10 h-10 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-[#09090f] dark:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-[#09090f] hover:text-white dark:hover:bg-white dark:hover:text-[#09090f] transition-colors cursor-pointer"
          >
            <ArrowRight className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
