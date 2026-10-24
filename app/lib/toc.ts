import GithubSlugger from "github-slugger";
import type { TocItem } from "../components/TableOfContents";

/**
 * Extracts H2 (`##`) and nested H3 (`###`) headings from raw MDX content
 * using GithubSlugger so generated IDs match `rehype-slug` 1:1.
 */
export function extractTocHeadings(mdxContent: string): TocItem[] {
  const slugger = new GithubSlugger();
  // Strip fenced code blocks so `#` comments inside code blocks are ignored
  const cleaned = mdxContent.replace(/```[\s\S]*?```/g, "");

  const items: TocItem[] = [];
  const matches = Array.from(cleaned.matchAll(/^(#{2,3})\s+(.+)$/gm));

  for (const match of matches) {
    const level = match[1].length;
    const rawText = match[2]
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim();

    if (!rawText) continue;
    const id = slugger.slug(rawText);

    if (level === 2) {
      items.push({
        id,
        text: rawText,
        children: [],
      });
    } else if (level === 3 && items.length > 0) {
      items[items.length - 1].children?.push({
        id,
        text: rawText,
      });
    }
  }

  return items;
}
