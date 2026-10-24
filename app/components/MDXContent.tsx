import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
}

function Figure({ src, alt = "", caption }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || caption || "Article image"}
          loading="lazy"
          className="w-full h-auto object-cover block"
        />
      </div>
      {(caption || alt) && (
        <figcaption className="mt-3 text-center text-xs font-mono text-black/50 dark:text-white/50 tracking-tight">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  );
}

interface ImageGridProps {
  cols?: 2 | 3;
  children: React.ReactNode;
}

function ImageGrid({ cols = 2, children }: ImageGridProps) {
  return (
    <div
      className={`my-10 grid grid-cols-1 gap-6 ${
        cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

function Callout({ title, children }: CalloutProps) {
  return (
    <div className="my-8 p-6 rounded-2xl border border-black/12 dark:border-white/12 bg-black/[0.02] dark:bg-white/[0.03]">
      {title && (
        <div className="text-xs font-mono uppercase tracking-widest text-primary dark:text-indigo-400 mb-2.5 font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-indigo-400 inline-block" />
          {title}
        </div>
      )}
      <div className="text-sm md:text-base text-[#09090f]/85 dark:text-white/85 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

// Custom components for MDX
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl md:text-5xl font-medium tracking-[-0.03em] mb-6 mt-12 text-[#09090f] dark:text-white leading-tight scroll-mt-28"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl md:text-3xl font-medium tracking-[-0.025em] mb-4 mt-12 pt-4 border-t border-black/10 dark:border-white/10 text-[#09090f] dark:text-white scroll-mt-28"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl md:text-2xl font-medium tracking-tight mb-3 mt-8 text-[#09090f] dark:text-white scroll-mt-28"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg md:text-xl font-medium tracking-tight mb-2 mt-6 text-[#09090f] dark:text-white scroll-mt-28"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-6 text-base md:text-lg leading-[1.8] text-[#09090f]/80 dark:text-white/80"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 mb-6 space-y-2.5 text-base md:text-lg text-[#09090f]/80 dark:text-white/80"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 mb-6 space-y-2.5 text-base md:text-lg text-[#09090f]/80 dark:text-white/80"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="px-6 py-4 my-8 border-l-2 border-[#09090f] dark:border-white bg-black/[0.02] dark:bg-white/[0.03] italic text-lg md:text-xl text-[#09090f] dark:text-white font-medium tracking-tight [&>p]:mb-0"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded-md bg-black/[0.06] dark:bg-white/[0.08] text-[#09090f] dark:text-indigo-300 font-mono text-[0.875em]"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="p-5 rounded-2xl mb-8 overflow-x-auto bg-[#09090f] text-white/90 border border-black/10 dark:border-white/10 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit font-mono"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02] shadow-xs">
      <table className="w-full text-left rtl:text-right text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-black/[0.035] dark:bg-white/[0.04] border-b border-black/10 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-[#09090f] dark:text-white"
      {...props}
    />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-black/5 dark:divide-white/5" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="py-3.5 px-5 font-semibold text-[#09090f] dark:text-white whitespace-nowrap" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="py-3.5 px-5 text-[#09090f]/80 dark:text-white/80 leading-relaxed align-top"
      {...props}
    />
  ),
  del: (props: React.HTMLAttributes<HTMLElement>) => (
    <del className="line-through text-black/40 dark:text-white/40" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[#09090f] dark:text-white font-medium underline decoration-black/30 dark:decoration-white/30 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#09090f] dark:text-white" {...props} />
  ),
  hr: () => (
    <hr className="my-12 border-t border-black/12 dark:border-white/12" />
  ),
  // Inline Markdown Image: ![Caption or Alt](/images/...)
  // Uses <span> blocks so it remains valid HTML when nested inside a <p> tag
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-10">
      <span className="block overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={props.src}
          alt={props.alt || ""}
          loading="lazy"
          className="w-full h-auto object-cover block"
        />
      </span>
      {props.alt && (
        <span className="block mt-3 text-center text-xs font-mono text-black/50 dark:text-white/50 tracking-tight">
          {props.alt}
        </span>
      )}
    </span>
  ),
  Figure,
  ImageGrid,
  Callout,
};

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
      }}
    />
  );
}
