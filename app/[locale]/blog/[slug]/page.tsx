import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  getBlogPostBySlug,
  getAllBlogSlugsAllLocales,
} from "../../../lib/blog";
import MDXContent from "../../../components/MDXContent";

export async function generateStaticParams() {
  return getAllBlogSlugsAllLocales();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Sahand Mohammed`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "Sections" });

  if (!post) {
    notFound();
  }

  const isRtl = locale === "ckb";
  const isPublicImage = post.image.startsWith("/");

  return (
    <div className="scroll-container">
      <div className="unified-bg" />
      <div className="bg-glow" />

      <main className="min-h-screen pt-32 pb-24 px-8 lg:px-14 max-w-5xl mx-auto relative z-10">
        {/* Back Navigation */}
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-[#09090f] dark:hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft
            className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
              isRtl ? "rotate-180 group-hover:translate-x-1" : ""
            }`}
          />
          <span>{t("backToArticles")}</span>
        </Link>

        {/* Top Meta Strip */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-black/55 dark:text-white/55 mb-6">
          <span className="px-3 py-1 rounded-full border border-black/15 dark:border-white/15 text-[#09090f] dark:text-white uppercase tracking-wider">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Title & Excerpt */}
        <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.06] mb-6">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-[#09090f]/75 dark:text-white/75 leading-relaxed mb-10 max-w-3xl">
          {post.excerpt}
        </p>

        {/* Cover Image from public/ or Gradient */}
        <div className="w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#070612] mb-14">
          {isPublicImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover block"
            />
          ) : (
            <div
              className="w-full h-[360px] md:h-[420px]"
              style={{ background: post.image }}
            />
          )}
        </div>

        {/* MDX Article Body */}
        <article className="max-w-3xl mx-auto">
          <MDXContent source={post.content} />
        </article>

        {/* Footer Strip */}
        <div className="mt-20 pt-8 border-t border-black/12 dark:border-white/12 flex flex-wrap justify-between items-center gap-4">
          <span className="text-sm text-black/60 dark:text-white/60">
            {t("thanksReading")}
          </span>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#09090f] dark:text-white hover:opacity-65 transition-opacity"
          >
            <ArrowLeft
              className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`}
            />
            <span>{t("viewAllPosts")}</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
