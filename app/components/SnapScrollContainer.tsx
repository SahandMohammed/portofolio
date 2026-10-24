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
      // Notify Navbar whether the scroll position is within the top Hero area
      const index = container.scrollTop > window.innerHeight * 0.65 ? 1 : 0;
      window.dispatchEvent(
        new CustomEvent("sectionchange", { detail: { index } })
      );
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {children}
    </div>
  );
}
