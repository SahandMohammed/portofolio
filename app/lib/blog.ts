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
 * Get all blog posts metadata (without content)
 * Sorted by date, newest first
 */
export function getAllBlogPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: formatDate(data.date),
      readTime: stats.text,
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
 * Get a single blog post by slug (includes content)
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    excerpt: data.excerpt || "",
    date: formatDate(data.date),
    readTime: stats.text,
    category: data.category || "General",
    image: data.image || "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
    featured: data.featured || false,
    content,
  };
}

/**
 * Get all blog slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get featured blog posts
 */
export function getFeaturedPosts(): BlogMeta[] {
  return getAllBlogPosts().filter((post) => post.featured);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogMeta[] {
  return getAllBlogPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}

/**
 * Format date string to readable format
 */
function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
