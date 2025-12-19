import { getAllBlogPosts } from "@/app/lib/blog";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sections" });
  return {
    title: `Blog | Sahand.dev`, // Simple title fallback
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const posts = getAllBlogPosts(locale);
  const t = await getTranslations({ locale, namespace: "Sections" });

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden">
      <div className="min-h-screen pt-32 pb-20 px-6 relative">
        {/* Backgrounds */}
        <div className="unified-bg fixed inset-0 z-[-2]" />
        <div className="bg-glow fixed inset-0 z-[-1]" />

        <div className="container mx-auto">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {t.rich("latestArticlesTitle", {
                gradient: (chunks) => (
                  <span className="text-gradient">{chunks}</span>
                ),
              })}
            </h1>
            <p className="text-muted text-lg md:text-xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((blog) => (
              <div
                key={blog.slug}
                className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl"
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
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="hover:underline"
                    >
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
