"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface SnapScrollContainerProps {
  children: React.ReactNode;
}

const ANIMATION_DURATION = 700; // ms for smooth section transition
const WHEEL_COOLDOWN = 750; // ms lock to prevent multi-section skipping

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function SnapScrollContainer({
  children,
}: SnapScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);

  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lastTriggerTimeRef = useRef(0);
  const lastWheelEventTimeRef = useRef(0);
  const lastWheelDeltaRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const getSections = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".snap-section")
    );
  }, []);

  const animateScrollTo = useCallback(
    (targetTop: number, onComplete?: () => void) => {
      const container = containerRef.current;
      if (!container) return;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      const startTop = container.scrollTop;
      const distance = targetTop - startTop;

      if (Math.abs(distance) < 2) {
        container.scrollTop = targetTop;
        isAnimatingRef.current = false;
        onComplete?.();
        return;
      }

      isAnimatingRef.current = true;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const eased = easeInOutCubic(progress);

        container.scrollTop = startTop + distance * eased;

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(step);
        } else {
          container.scrollTop = targetTop;
          isAnimatingRef.current = false;
          rafIdRef.current = null;
          onComplete?.();
        }
      };

      rafIdRef.current = requestAnimationFrame(step);
    },
    []
  );

  const scrollToSection = useCallback(
    (index: number, updateHash = false) => {
      const sections = getSections();
      if (sections.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
      const targetSection = sections[clampedIndex];
      if (!targetSection) return;

      activeIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);
      lastTriggerTimeRef.current = performance.now();

      if (updateHash && targetSection.id) {
        window.history.replaceState(null, "", `#${targetSection.id}`);
      }

      animateScrollTo(targetSection.offsetTop);
    },
    [getSections, animateScrollTo]
  );

  const handleStepScroll = useCallback(
    (direction: 1 | -1) => {
      const container = containerRef.current;
      if (!container || isAnimatingRef.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const currentIdx = activeIndexRef.current;
      const currentSection = sections[currentIdx];

      // If a section is taller than the viewport (e.g. on mobile screens),
      // scroll through its internal overflow before snapping to the next section
      if (currentSection) {
        const sectionTop = currentSection.offsetTop;
        const sectionBottom = sectionTop + currentSection.offsetHeight;
        const viewportTop = container.scrollTop;
        const viewportBottom = viewportTop + container.clientHeight;
        const stepAmount = Math.round(container.clientHeight * 0.75);

        if (direction > 0 && viewportBottom < sectionBottom - 8) {
          const nextScrollTop = Math.min(
            viewportTop + stepAmount,
            sectionBottom - container.clientHeight
          );
          lastTriggerTimeRef.current = performance.now();
          animateScrollTo(nextScrollTop);
          return;
        }

        if (direction < 0 && viewportTop > sectionTop + 8) {
          const prevScrollTop = Math.max(viewportTop - stepAmount, sectionTop);
          lastTriggerTimeRef.current = performance.now();
          animateScrollTo(prevScrollTop);
          return;
        }
      }

      const nextIndex = currentIdx + direction;
      if (nextIndex < 0 || nextIndex >= sections.length) return;

      scrollToSection(nextIndex);
    },
    [getSections, animateScrollTo, scrollToSection]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = getSections();
    setSectionCount(sections.length);

    // Check initial URL hash on mount
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const hashIndex = sections.findIndex((s) => s.id === targetId);
      if (hashIndex !== -1) {
        activeIndexRef.current = hashIndex;
        setActiveIndex(hashIndex);
        container.scrollTop = sections[hashIndex].offsetTop;
      }
    }

    const handleWheel = (e: WheelEvent) => {
      // Always prevent default normal browser scrolling
      e.preventDefault();

      const now = performance.now();
      const absDelta = Math.abs(e.deltaY);
      const timeSinceLastWheel = now - lastWheelEventTimeRef.current;
      const prevDelta = lastWheelDeltaRef.current;

      lastWheelEventTimeRef.current = now;
      lastWheelDeltaRef.current = absDelta;

      // Ignore microscopic trackpad jitter
      if (absDelta < 4) return;

      // Detect physical mouse wheel vs trackpad momentum:
      // Physical wheel: deltaMode === 1 (DOM_DELTA_LINE) or discrete pause (>80ms) or sharp delta spike
      const isPhysicalWheelOrNewGesture =
        e.deltaMode === 1 ||
        timeSinceLastWheel > 80 ||
        absDelta > prevDelta * 1.6;

      if (isAnimatingRef.current) {
        return;
      }

      const timeSinceLastTrigger = now - lastTriggerTimeRef.current;

      // Cooldown check: block trailing trackpad inertia while allowing deliberate new wheel steps
      if (timeSinceLastTrigger < WHEEL_COOLDOWN) {
        if (!isPhysicalWheelOrNewGesture || timeSinceLastTrigger < 450) {
          return;
        }
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      handleStepScroll(direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (!isAnimatingRef.current) handleStepScroll(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (!isAnimatingRef.current) handleStepScroll(-1);
      } else if (e.key === " ") {
        e.preventDefault();
        if (!isAnimatingRef.current) handleStepScroll(e.shiftKey ? -1 : 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        if (!isAnimatingRef.current) scrollToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        const allSections = getSections();
        if (!isAnimatingRef.current && allSections.length > 0) {
          scrollToSection(allSections.length - 1);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Disable normal free touch scrolling so only section snap happens
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null || e.changedTouches.length === 0) {
        return;
      }
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) < 40 || isAnimatingRef.current) return;

      const direction = deltaY > 0 ? 1 : -1;
      handleStepScroll(direction);
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href === "/" || href === "#") {
        e.preventDefault();
        scrollToSection(0);
        window.history.replaceState(null, "", window.location.pathname);
        return;
      }

      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const id = href.slice(hashIndex + 1);
        if (!id) return;

        const allSections = getSections();
        const sectionIdx = allSections.findIndex((s) => s.id === id);
        if (sectionIdx !== -1) {
          e.preventDefault();
          scrollToSection(sectionIdx, true);
        }
      }
    };

    const handleResize = () => {
      const allSections = getSections();
      const currentSection = allSections[activeIndexRef.current];
      if (currentSection && containerRef.current && !isAnimatingRef.current) {
        containerRef.current.scrollTop = currentSection.offsetTop;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [getSections, handleStepScroll, scrollToSection]);

  return (
    <>
      <div ref={containerRef} className="scroll-container">
        {children}
      </div>

      {/* Desktop Section Navigation Indicator Dots */}
      {sectionCount > 1 && (
        <div
          className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
          aria-label="Section navigation"
        >
          {Array.from({ length: sectionCount }).map((_, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSection(idx)}
                aria-label={`Go to section ${idx + 1}`}
                className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isActive ? "w-3 h-8" : "w-3 h-3"
                }`}
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-7 bg-primary shadow-md shadow-primary/40"
                      : "w-2 h-2 bg-foreground/25 dark:bg-white/25 group-hover:bg-primary/70 group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
