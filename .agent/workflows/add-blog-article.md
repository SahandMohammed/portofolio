---
description: How to add a new blog article to the portfolio
---

# Adding a New Blog Article

To add a new blog article to your portfolio, follow these simple steps:

## 1. Create a new MDX file

Create a new `.mdx` file in the appropriate locale folder:

- **English**: `/content/blog/en/your-article-slug.mdx`
- **Kurdish**: `/content/blog/ckb/your-article-slug.mdx`

**Note**: The filename (slug) should be the same in both locales for proper linking.

**Example:** `content/blog/en/my-new-article.mdx` → `/blog/my-new-article`

## 2. Add frontmatter metadata

At the top of your MDX file, add the required metadata between `---` markers:

### English Example:

```yaml
---
title: "Your Article Title"
excerpt: "A brief description of your article (shown in previews)"
date: "2025-12-19"
category: "Frontend" # Options: Frontend, Backend, AI & Tech, DevOps, etc.
image: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)" # Header gradient
featured: true # Set to true to highlight this post
---
```

### Kurdish Example:

```yaml
---
title: "ناونیشانی بابەتەکەت"
excerpt: "وەسفێکی کورت لە بابەتەکەت (لە پێشبینیندا دەردەکەوێت)"
date: "2025-12-19"
category: "ڕووکار" # بژاردەکان: ڕووکار، پشتەوە، AI و تەکنەلۆژیا، دێڤئۆپس، هتد.
image: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)"
featured: true
---
```

## 3. Write your content in Markdown

Below the frontmatter, write your article using standard Markdown:

```markdown
This is the introduction paragraph.

## Section Heading

Regular paragraphs with **bold** and _italic_ text.

### Subsection

- Bullet points
- Another point

> Blockquotes for important callouts

\`\`\`typescript
// Code blocks with syntax highlighting
const example = "Hello World";
\`\`\`
```

## 4. Available Frontmatter Fields

| Field      | Required | Description                                |
| ---------- | -------- | ------------------------------------------ |
| `title`    | Yes      | The article title                          |
| `excerpt`  | Yes      | Brief description (1-2 sentences)          |
| `date`     | Yes      | Publication date (YYYY-MM-DD format)       |
| `category` | Yes      | Article category                           |
| `image`    | No       | CSS gradient for header (default provided) |
| `featured` | No       | Set to `true` to feature this post         |

## 5. Gradient Examples

```yaml
# Blue to Purple
image: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)"

# Teal to Blue
image: "linear-gradient(to bottom right, #14b8a6, #3b82f6)"

# Purple to Pink
image: "linear-gradient(to bottom right, #8b5cf6, #ec4899)"

# Orange to Red
image: "linear-gradient(to bottom right, #f59e0b, #ef4444)"

# Green to Cyan
image: "linear-gradient(to bottom right, #10b981, #06b6d4)"
```

## 6. Localization Structure

```
content/
└── blog/
    ├── en/
    │   ├── future-of-web-development.mdx
    │   ├── mastering-scroll-snap.mdx
    │   └── optimizing-nestjs.mdx
    └── ckb/
        ├── future-of-web-development.mdx  # Same slug!
        ├── mastering-scroll-snap.mdx
        └── optimizing-nestjs.mdx
```

**Important**: Use the same slug (filename) for both languages so they link correctly.

## 7. Features

- **Automatic reading time** - Calculated based on content length
- **Localized date formatting** - Dates are formatted per locale
- **Localized reading time** - "5 min read" becomes "5 خولەک خوێندنەوە" in Kurdish
- **Syntax highlighting** - Code blocks are highlighted automatically
- **SEO metadata** - Title and description are generated for each page
- **Static generation** - Pages are pre-rendered for fast loading
- **Fallback support** - If a post doesn't exist in a locale, it falls back to English

## 8. Adding a Single-Language Article

If you only want to write in one language:

1. Create the MDX file in just one locale folder (e.g., `content/blog/en/my-article.mdx`)
2. The system will automatically show the English version for Kurdish users as a fallback

That's it! Your new article will automatically appear on the homepage in the correct language!
