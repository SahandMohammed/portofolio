"use client";

import React, { useEffect, useRef } from "react";

interface SnapScrollContainerProps {
  children: React.ReactNode;
}

export default function SnapScrollContainer({
  children,
}: SnapScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isContainerScrolling =
        window.getComputedStyle(container).overflowY === "auto" ||
        window.getComputedStyle(container).overflowY === "scroll";

      const scrollTop = isContainerScrolling
        ? container.scrollTop
        : window.scrollY;
      const viewportHeight = isContainerScrolling
        ? container.clientHeight
        : window.innerHeight;

      const index = scrollTop > viewportHeight - 80 ? 1 : 0;
      window.dispatchEvent(
        new CustomEvent("sectionchange", { detail: { index } })
      );
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  );
}
