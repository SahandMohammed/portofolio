import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Github,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  getProjectBySlug,
  getAllProjects,
  getAllProjectSlugsAllLocales,
} from "../../../lib/projects";
import { extractTocHeadings } from "../../../lib/toc";
import MDXContent from "../../../components/MDXContent";
import TableOfContents from "../../../components/TableOfContents";
import {
  AnimatedContainer,
  AnimatedItem,
} from "../../../components/PageTransition";

export async function generateStaticParams() {
  return getAllProjectSlugsAllLocales();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study | Sahand Mohammed`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "Projects" });

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  // Extract H2 and nested H3 sections for interactive Table of Contents
  const headings = extractTocHeadings(project.content);

  const isRtl = locale === "ckb";
  const isPublicImage = project.image.startsWith("/");

  return (
    <div className="scroll-container">
      <div className="unified-bg" />
      <div className="bg-glow" />

      <main className="min-h-screen pt-32 pb-24 px-8 lg:px-14 max-w-7xl mx-auto relative z-10">
        <AnimatedContainer>
          {/* Back Navigation */}
          <AnimatedItem>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-[#09090f] dark:hover:text-white transition-colors mb-10 group"
            >
              <ArrowLeft
                className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
                  isRtl ? "rotate-180 group-hover:translate-x-1" : ""
                }`}
              />
              <span>{t("backToProjects")}</span>
            </Link>
          </AnimatedItem>

          {/* Top Meta Strip */}
          <AnimatedItem className="flex flex-wrap items-center gap-4 text-xs font-mono text-black/55 dark:text-white/55 mb-6">
            <span className="px-3 py-1 rounded-full border border-black/15 dark:border-white/15 text-[#09090f] dark:text-white uppercase tracking-wider">
              ({project.num}) {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {project.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {project.readTime}
            </span>
          </AnimatedItem>

          {/* Title & Excerpt */}
          <AnimatedItem>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.05] mb-6">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-[#09090f]/75 dark:text-white/75 leading-relaxed mb-10 max-w-4xl">
              {project.excerpt}
            </p>
          </AnimatedItem>

          {/* Project Metadata Bar (Role, Stack, External Links) */}
          <AnimatedItem className="py-6 border-y border-black/12 dark:border-white/12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-12">
            <div className="md:col-span-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-black/45 dark:text-white/45 mb-1">
                {t("roleLabel")}
              </div>
              <div className="text-sm font-medium text-[#09090f] dark:text-white">
                {project.role}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-black/45 dark:text-white/45 mb-1.5">
                {t("techStackLabel")}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-black/[0.04] dark:bg-white/[0.06] text-[#09090f] dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-wrap md:justify-end gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#09090f] text-white dark:bg-white dark:text-[#09090f] text-xs font-mono uppercase tracking-wider hover:opacity-85 transition-opacity"
                >
                  <span>{t("livePreview")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 dark:border-white/20 text-[#09090f] dark:text-white text-xs font-mono uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t("sourceCode")}</span>
                </a>
              )}
            </div>
          </AnimatedItem>

          {/* Cover Image from public/ or Gradient */}
          <AnimatedItem className="w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#070612] mb-14">
            {isPublicImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[520px] object-cover block"
              />
            ) : (
              <div
                className="w-full h-[360px] md:h-[440px]"
                style={{ background: project.image }}
              />
            )}
          </AnimatedItem>

          {/* MDX Case Study Body + Right Minimal TOC */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-12 xl:gap-16 items-start justify-center">
            <AnimatedItem className="w-full max-w-4xl mx-auto xl:mx-0 min-w-0">
              <article id="mdx-article">
                <MDXContent source={project.content} />
              </article>
            </AnimatedItem>

            {headings.length > 0 && (
              <div className="hidden xl:block w-48 shrink-0 sticky top-32 self-start">
                <TableOfContents items={headings} articleId="mdx-article" />
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <AnimatedItem className="mt-20 pt-8 border-t border-black/12 dark:border-white/12 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            <div>
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group inline-flex flex-col gap-1 text-left rtl:text-right"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 dark:text-white/50 inline-flex items-center gap-1.5 group-hover:text-[#09090f] dark:group-hover:text-white transition-colors">
                    <ArrowLeft
                      className={`w-3 h-3 transition-transform group-hover:-translate-x-1 ${
                        isRtl ? "rotate-180 group-hover:translate-x-1" : ""
                      }`}
                    />
                    Previous Project
                  </span>
                  <span className="text-sm font-medium text-[#09090f] dark:text-white group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 text-xs font-mono uppercase tracking-wider text-[#09090f] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span>{t("viewAllProjects")}</span>
              </Link>
            </div>

            <div className="text-right rtl:text-left">
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group inline-flex flex-col gap-1 text-right rtl:text-left"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 dark:text-white/50 inline-flex items-center gap-1.5 justify-end rtl:justify-start group-hover:text-[#09090f] dark:group-hover:text-white transition-colors">
                    Next Project
                    <ArrowRight
                      className={`w-3 h-3 transition-transform group-hover:translate-x-1 ${
                        isRtl ? "rotate-180 group-hover:-translate-x-1" : ""
                      }`}
                    />
                  </span>
                  <span className="text-sm font-medium text-[#09090f] dark:text-white group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {nextProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </AnimatedItem>
        </AnimatedContainer>
      </main>
    </div>
  );
}
