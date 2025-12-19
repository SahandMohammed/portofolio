"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";
import type { BlogMeta } from "../lib/blog";

interface BlogsProps {
  posts: BlogMeta[];
}

export default function Blogs({ posts }: BlogsProps) {
  const t = useTranslations("Sections");

  return (
    <section
      id="blogs"
      className="snap-section py-20 relative block md:flex md:items-center"
    >
      <SectionBackground variant="blogs" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 w-full"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            {t.rich("latestArticlesTitle", {
              gradient: (chunks) => (
                <span className="text-gradient">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              variants={fadeInUp}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
            >
              <div
                className="h-48 w-full relative overflow-hidden"
                style={{ background: blog.image }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-muted mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${blog.slug}`} className="hover:underline">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-muted text-sm mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    {t("readArticle")}
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-surface border border-[var(--surface-border)] text-foreground font-medium transition-all duration-300 hover:bg-[var(--surface-border)] hover:scale-105 group"
          >
            {t("viewAllPosts")}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
