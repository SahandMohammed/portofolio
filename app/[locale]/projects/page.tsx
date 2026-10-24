import { getAllProjects } from "@/app/lib/projects";
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
    title: "Projects | Sahand Mohammed",
    description:
      "Selected software engineering case studies, web platforms, and mobile applications.",
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  const projects = getAllProjects(locale);
  const t = await getTranslations({ locale, namespace: "Projects" });
  const isRtl = locale === "ckb";

  return (
    <div className="scroll-container">
      <div className="unified-bg" />
      <div className="bg-glow" />

      <main className="min-h-screen pt-32 pb-24 px-8 lg:px-14 max-w-[1400px] mx-auto relative z-10">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-[#09090f] dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft
            className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
              isRtl ? "rotate-180 group-hover:translate-x-1" : ""
            }`}
          />
          <span>{t("backToProjects")}</span>
        </Link>

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
            {t.rich("title", {
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

        {/* Projects Editorial Case Study List */}
        <div className="border-t border-black/12 dark:border-white/12">
          {projects.map((project, idx) => {
            const isPublicImage = project.image.startsWith("/");
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group py-10 md:py-14 border-b border-black/12 dark:border-white/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:opacity-85 transition-opacity"
              >
                {/* Index + Meta */}
                <div className="lg:col-span-2 flex lg:flex-col justify-between gap-2">
                  <span className="text-xs font-mono text-black/45 dark:text-white/45">
                    ({project.num || String(idx + 1).padStart(2, "0")})
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
            );
          })}
        </div>
      </main>
    </div>
  );
}
