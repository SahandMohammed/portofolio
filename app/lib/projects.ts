import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface ProjectMeta {
  slug: string;
  num: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  featured?: boolean;
  order?: number;
}

export interface ProjectPost extends ProjectMeta {
  content: string;
}

function getProjectsDir(locale: string = "en"): string {
  return path.join(PROJECTS_DIR, locale);
}

/**
 * Get all projects metadata for a specific locale
 */
export function getAllProjects(locale: string = "en"): ProjectMeta[] {
  const dir = getProjectsDir(locale);

  if (!fs.existsSync(dir)) {
    const fallbackDir = getProjectsDir("en");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getAllProjects("en");
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const projects = files.map((file, index) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      num: data.num || String(index + 1).padStart(2, "0"),
      title: data.title || "Untitled Project",
      excerpt: data.excerpt || "",
      date: data.date ? formatDate(data.date, locale) : "2026",
      readTime: formatReadTime(stats.text, locale),
      category: data.category || "Software Engineering",
      tags: Array.isArray(data.tags) ? data.tags : [],
      image:
        data.image ||
        "/images/projects/ecommerce-architecture.svg",
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      role: data.role || "Lead Software Engineer",
      featured: data.featured ?? true,
      order: typeof data.order === "number" ? data.order : index + 1,
    };
  });

  return projects.sort((a, b) => (a.order || 99) - (b.order || 99));
}

/**
 * Get featured projects for homepage
 */
export function getFeaturedProjects(locale: string = "en"): ProjectMeta[] {
  return getAllProjects(locale).filter((p) => p.featured);
}

/**
 * Get a single project by slug (includes MDX content)
 */
export function getProjectBySlug(
  slug: string,
  locale: string = "en"
): ProjectPost | null {
  const dir = getProjectsDir(locale);
  const filePath = path.join(dir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    if (locale !== "en") {
      const fallbackPath = path.join(getProjectsDir("en"), `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        return getProjectBySlug(slug, "en");
      }
    }
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    num: data.num || "01",
    title: data.title || "Untitled Project",
    excerpt: data.excerpt || "",
    date: data.date ? formatDate(data.date, locale) : "2026",
    readTime: formatReadTime(stats.text, locale),
    category: data.category || "Software Engineering",
    tags: Array.isArray(data.tags) ? data.tags : [],
    image:
      data.image ||
      "/images/projects/ecommerce-architecture.svg",
    liveUrl: data.liveUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    role: data.role || "Lead Software Engineer",
    featured: data.featured ?? true,
    content,
  };
}

/**
 * Get all project slugs for a specific locale
 */
export function getAllProjectSlugs(locale: string = "en"): string[] {
  const dir = getProjectsDir(locale);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get all project slugs across locales for static generation
 */
export function getAllProjectSlugsAllLocales(): {
  locale: string;
  slug: string;
}[] {
  const locales = ["en", "ckb"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getAllProjectSlugs(locale);
    const effectiveSlugs = slugs.length > 0 ? slugs : getAllProjectSlugs("en");
    effectiveSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

function formatDate(date: string | Date, locale: string = "en"): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    return String(date);
  }
  const localeMap: Record<string, string> = {
    en: "en-US",
    ckb: "ckb-IQ",
  };
  return d.toLocaleDateString(localeMap[locale] || "en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatReadTime(time: string, locale: string = "en"): string {
  if (locale === "ckb") {
    const minutes = time.match(/\d+/)?.[0] || "5";
    return `${minutes} خولەک خوێندنەوە`;
  }
  return time;
}
