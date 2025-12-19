import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

/**
 * Get the blog directory for a specific locale
 */
function getBlogDir(locale: string = "en"): string {
  return path.join(BLOG_DIR, locale);
}

/**
 * Get all blog posts metadata (without content) for a specific locale
 * Sorted by date, newest first
 */
export function getAllBlogPosts(locale: string = "en"): BlogMeta[] {
  const blogDir = getBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    // Fallback to default locale if locale-specific folder doesn't exist
    const fallbackDir = getBlogDir("en");
    if (!fs.existsSync(fallbackDir)) {
      return [];
    }
    return getAllBlogPosts("en");
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: formatDate(data.date, locale),
      readTime: formatReadTime(stats.text, locale),
      category: data.category || "General",
      image: data.image || "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
      featured: data.featured || false,
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single blog post by slug for a specific locale (includes content)
 */
export function getBlogPostBySlug(
  slug: string,
  locale: string = "en"
): BlogPost | null {
  const blogDir = getBlogDir(locale);
  const filePath = path.join(blogDir, `${slug}.mdx`);

  // If the file doesn't exist in the current locale, try fallback to English
  if (!fs.existsSync(filePath)) {
    if (locale !== "en") {
      const fallbackPath = path.join(getBlogDir("en"), `${slug}.mdx`);
      if (fs.existsSync(fallbackPath)) {
        return getBlogPostBySlug(slug, "en");
      }
    }
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    date: formatDate(data.date, locale),
    readTime: formatReadTime(stats.text, locale),
    category: data.category || "General",
    image: data.image || "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
    featured: data.featured || false,
    content,
  };
}

/**
 * Get all blog slugs for a specific locale (for static generation)
 */
export function getAllBlogSlugs(locale: string = "en"): string[] {
  const blogDir = getBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get all blog slugs across all locales (for static generation)
 */
export function getAllBlogSlugsAllLocales(): {
  locale: string;
  slug: string;
}[] {
  // Only include 'en' for now - add 'ckb' back when ready
  const locales = ["en"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    const slugs = getAllBlogSlugs(locale);
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

/**
 * Get featured blog posts for a specific locale
 */
export function getFeaturedPosts(locale: string = "en"): BlogMeta[] {
  return getAllBlogPosts(locale).filter((post) => post.featured);
}

/**
 * Get posts by category for a specific locale
 */
export function getPostsByCategory(
  category: string,
  locale: string = "en"
): BlogMeta[] {
  return getAllBlogPosts(locale).filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories for a specific locale
 */
export function getAllCategories(locale: string = "en"): string[] {
  const posts = getAllBlogPosts(locale);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

/**
 * Format date string to readable format based on locale
 */
function formatDate(date: string | Date, locale: string = "en"): string {
  const d = new Date(date);
  const localeMap: Record<string, string> = {
    en: "en-US",
    ckb: "ckb-IQ",
  };

  return d.toLocaleDateString(localeMap[locale] || "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format reading time based on locale
 */
function formatReadTime(time: string, locale: string = "en"): string {
  if (locale === "ckb") {
    // Convert "5 min read" to Kurdish format
    const minutes = time.match(/\d+/)?.[0] || "5";
    return `${minutes} خولەک خوێندنەوە`;
  }
  return time;
}
