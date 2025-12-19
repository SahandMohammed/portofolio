---
description: How to add a new blog article to the portfolio
---

# Adding a New Blog Article

To add a new blog article to your portfolio, follow these simple steps:

## 1. Create a new MDX file

Create a new `.mdx` file in the `/content/blog/` directory. The filename will become the URL slug.

**Example:** `content/blog/my-new-article.mdx` → `/blog/my-new-article`

## 2. Add frontmatter metadata

At the top of your MDX file, add the required metadata between `---` markers:

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

## 6. Features

- **Automatic reading time** - Calculated based on content length
- **Date formatting** - Dates are automatically formatted nicely
- **Syntax highlighting** - Code blocks are highlighted automatically
- **SEO metadata** - Title and description are generated for each page
- **Static generation** - Pages are pre-rendered for fast loading

That's it! Your new article will automatically appear on the homepage and have its own dedicated page.
