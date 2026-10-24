import { getAllProjects } from "@/app/lib/projects";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import PaginatedProjects from "@/app/components/PaginatedProjects";
import {
  AnimatedContainer,
  AnimatedItem,
} from "@/app/components/PageTransition";
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
        <AnimatedContainer>
          {/* Back Link */}
          <AnimatedItem>
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
          </AnimatedItem>

          {/* Editorial Header */}
          <AnimatedItem className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
          </AnimatedItem>

          {/* Paginated Projects List (3 per page) */}
          <PaginatedProjects
            projects={projects}
            itemsPerPage={3}
            isRtl={isRtl}
          />
        </AnimatedContainer>
      </main>
    </div>
  );
}
