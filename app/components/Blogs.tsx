"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import type { BlogMeta } from "../lib/blog";

interface BlogsProps {
  posts: BlogMeta[];
}

export default function Blogs({ posts }: BlogsProps) {
  const t = useTranslations("Sections");

  return (
    <section
      id="blogs"
      className="snap-section py-20 relative flex items-center bg-white dark:bg-[#03020a]"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
            {t.rich("latestArticlesTitle", {
              gradient: (chunks) => (
                <span className="text-black/40 dark:text-white/40 block">
                  {chunks}
                </span>
              ),
            })}
          </h2>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
          >
            <span>{t("viewAllPosts")}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </motion.div>

        {/* Clean Editorial Journal List (No AI Cards) */}
        <div className="border-t border-black/12 dark:border-white/12">
          {posts.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              variants={fadeInUp}
              className="py-8 md:py-10 border-b border-black/12 dark:border-white/12"
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline hover:opacity-75 transition-opacity"
              >
                <div className="md:col-span-2 text-xs font-mono text-black/45 dark:text-white/45">
                  0{idx + 1} — {blog.date}
                </div>

                <div className="md:col-span-5">
                  <h3 className="text-xl md:text-3xl font-medium tracking-tight text-[#09090f] dark:text-white">
                    {blog.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-muted text-sm line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="md:col-span-1 flex md:justify-end items-center gap-2 text-xs uppercase tracking-widest text-[#09090f] dark:text-white">
                  <span className="w-9 h-9 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:bg-[#09090f] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#09090f] transition-colors">
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
