import { getAllBlogPosts } from "@/app/lib/blog";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  await params;
  return {
    title: "Blog | Sahand Mohammed",
    description:
      "Articles, architectural deep-dives, and engineering insights.",
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllBlogPosts(locale);
  const t = await getTranslations({ locale, namespace: "Sections" });
  const isRtl = locale === "ckb";

  return (
    <div className="scroll-container">
      <div className="unified-bg" />
      <div className="bg-glow" />

      <main className="min-h-screen pt-32 pb-24 px-8 lg:px-14 max-w-[1400px] mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-[#09090f] dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft
            className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
              isRtl ? "rotate-180 group-hover:translate-x-1" : ""
            }`}
          />
          <span>{t("backToArticles")}</span>
        </Link>

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
            {t.rich("latestArticlesTitle", {
              gradient: (chunks) => (
                <span className="text-black/40 dark:text-white/40 block">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="text-muted max-w-md text-sm md:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Clean Editorial Journal List */}
        <div className="border-t border-black/12 dark:border-white/12">
          {posts.map((blog, idx) => {
            const isPublicImage = blog.image.startsWith("/");
            return (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group py-10 md:py-12 border-b border-black/12 dark:border-white/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:opacity-85 transition-opacity"
              >
                {/* Date + Read Time */}
                <div className="lg:col-span-2 space-y-1">
                  <div className="text-xs font-mono text-black/45 dark:text-white/45">
                    0{idx + 1} — {blog.date}
                  </div>
                  <div className="text-xs font-mono text-black/40 dark:text-white/40">
                    {blog.readTime}
                  </div>
                </div>

                {/* Title + Excerpt + Category */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider border border-black/12 dark:border-white/12 text-[#09090f]/70 dark:text-white/70">
                    {blog.category}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-[#09090f] dark:text-white">
                    {blog.title}
                  </h2>
                  <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Cover Thumbnail + Action Circle */}
                <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6">
                  <div className="w-full max-w-[240px] aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#070612] relative">
                    {isPublicImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: blog.image }}
                      />
                    )}
                  </div>

                  <span className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#09090f] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#09090f] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
