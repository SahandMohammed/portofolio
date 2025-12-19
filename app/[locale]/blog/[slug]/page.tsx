import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  getBlogPostBySlug,
  getAllBlogSlugsAllLocales,
} from "../../../lib/blog";
import MDXContent from "../../../components/MDXContent";

// Generate static params for all blog posts and locales
export async function generateStaticParams() {
  return getAllBlogSlugsAllLocales();
}

// Generate metadata for each blog post
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
  const t = await getTranslations("Sections");

  if (!post) {
    notFound();
  }

  const isRtl = locale === "ckb";

  return (
    <main className="h-screen overflow-y-auto relative pt-30 pb-20 scroll-smooth">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <article className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/#blogs"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft
            className={`w-4 h-4 me-2 transform group-hover:-translate-x-1 transition-transform ${
              isRtl ? "rotate-180 group-hover:translate-x-1" : ""
            }`}
          />
          {t("backToArticles")}
        </Link>

        <div>
          <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-surface border border-white/10 text-primary font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            {post.title}
          </h1>

          <div
            className="w-full h-[400px] rounded-2xl mb-12 relative overflow-hidden"
            style={{ background: post.image }}
          >
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXContent source={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
            <div className="text-muted-foreground">{t("thanksReading")}</div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface transition-colors text-muted-foreground hover:text-foreground">
              <Share2 className="w-4 h-4" />
              {t("shareArticle")}
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
