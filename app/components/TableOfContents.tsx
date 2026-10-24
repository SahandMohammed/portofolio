"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface TocSubItem {
  id: string;
  text: string;
}

export interface TocItem {
  id: string;
  text: string;
  children?: TocSubItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
  articleId?: string;
}

export default function TableOfContents({
  items,
  articleId = "mdx-article",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const tocListRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const clickLockRef = useRef<{
    lockedUntil: number;
    targetId: string;
  } | null>(null);

  const getScrollContainer = useCallback((): HTMLElement | null => {
    if (typeof document === "undefined") return null;
    const el = document.querySelector(".scroll-container") as HTMLElement | null;
    if (!el) return null;
    const overflowY = window.getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") {
      return el;
    }
    return null;
  }, []);

  // Keep active heading visible inside the compact TOC list if it overflows
  useEffect(() => {
    const listEl = tocListRef.current;
    const activeEl = itemRefs.current[activeId];
    if (!listEl || !activeEl) return;

    const listRect = listEl.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    const itemOffsetInList = itemRect.top - listRect.top + listEl.scrollTop;
    const targetScrollTop =
      itemOffsetInList - listEl.clientHeight / 2 + itemRect.height / 2;

    listEl.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: "smooth",
    });
  }, [activeId]);

  // Scroll highlight + bottom calculation
  useEffect(() => {
    if (items.length === 0) return;

    const rawContainer = document.querySelector(
      ".scroll-container"
    ) as HTMLElement | null;
    let rafId: number | null = null;

    const updateActiveHeading = () => {
      const now = Date.now();
      if (clickLockRef.current && now < clickLockRef.current.lockedUntil) {
        setActiveId(clickLockRef.current.targetId);
        return;
      }

      const container = getScrollContainer();
      const scrollTop = container ? container.scrollTop : window.scrollY;
      const clientHeight = container
        ? container.clientHeight
        : window.innerHeight;
      const scrollHeight = container
        ? container.scrollHeight
        : document.documentElement.scrollHeight;
      const containerTop = container
        ? container.getBoundingClientRect().top
        : 0;

      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const articleEl = document.getElementById(articleId);

      let articleBottom = scrollHeight;
      if (articleEl) {
        const rect = articleEl.getBoundingClientRect();
        const articleTop = rect.top - containerTop + scrollTop;
        articleBottom = articleTop + articleEl.offsetHeight;
      }

      // Dynamic trigger line with bottom calculation:
      // Normally 145px from top of viewport. Near the bottom of the article/page,
      // the trigger line smoothly sweeps down toward the bottom of the viewport
      // so short sections at the end highlight sequentially.
      const baseTrigger = 145;
      const effectiveBottomScroll = Math.min(
        maxScroll,
        Math.max(0, articleBottom - clientHeight * 0.25)
      );
      const bottomZoneHeight = Math.min(clientHeight * 0.7, 460);
      const remainingToBottom = Math.max(0, effectiveBottomScroll - scrollTop);

      let triggerLine = baseTrigger;
      if (remainingToBottom < bottomZoneHeight && effectiveBottomScroll > 0) {
        const bottomRatio = 1 - remainingToBottom / bottomZoneHeight;
        const easedRatio = Math.pow(bottomRatio, 1.35);
        triggerLine =
          baseTrigger + easedRatio * (clientHeight - baseTrigger - 48);
      }

      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - containerTop;
        if (top <= triggerLine) {
          current = item.id;
        }
      }

      // Absolute bottom safeguard
      if (maxScroll > 0 && maxScroll - scrollTop <= 6) {
        const last = items[items.length - 1];
        if (last) current = last.id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveHeading();
        rafId = null;
      });
    };

    updateActiveHeading();

    if (rawContainer) {
      rawContainer.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rawContainer) {
        rawContainer.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [items, articleId, getScrollContainer]);

  const scrollToHeading = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const container = getScrollContainer();
    const headerOffset = 108;

    clickLockRef.current = {
      lockedUntil: Date.now() + 800,
      targetId: id,
    };
    setActiveId(id);

    if (container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const maxScroll = Math.max(
        0,
        container.scrollHeight - container.clientHeight
      );
      const rawTargetTop =
        targetRect.top - containerRect.top + container.scrollTop - headerOffset;

      container.scrollTo({
        top: Math.min(maxScroll, Math.max(0, rawTargetTop)),
        behavior: "smooth",
      });
    } else {
      const rawTargetTop =
        targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: Math.max(0, rawTargetTop),
        behavior: "smooth",
      });
    }

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-32 w-48">
      <div className="text-[10px] font-mono uppercase tracking-widest text-black/40 dark:text-white/40 mb-2.5 pl-3">
        On this page
      </div>

      <nav
        ref={tocListRef}
        className="max-h-[calc(100dvh-12rem)] overflow-y-auto border-l border-black/10 dark:border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              href={`#${item.id}`}
              onClick={(e) => scrollToHeading(e, item.id)}
              title={item.text}
              className={`block pl-3 py-1 -ml-px border-l text-[11px] leading-snug transition-colors truncate ${
                isActive
                  ? "border-[#09090f] dark:border-white text-[#09090f] dark:text-white font-medium"
                  : "border-transparent text-black/40 dark:text-white/40 hover:text-black/75 dark:hover:text-white/75"
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
