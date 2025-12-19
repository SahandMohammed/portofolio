"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Universal shapes that travel between sections when scrolling
export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform values based on scroll position
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "300vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "250vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "400vh"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0vh", "350vh"]);
  const y5 = useTransform(scrollYProgress, [0, 1], ["0vh", "450vh"]);

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Large floating ring - travels from top-left to bottom-right */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-20 -left-20"
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="opacity-20"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating triangle glyph */}
      <motion.div
        style={{ y: y2, rotate: rotate2, scale: scale1 }}
        className="absolute top-40 right-10"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="opacity-15"
        >
          <polygon
            points="60,10 110,100 10,100"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="2"
          />
          <polygon
            points="60,25 95,90 25,90"
            fill="none"
            stroke="url(#grad2)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Hexagon shape */}
      <motion.div
        style={{ y: y3, rotate: rotate1, scale: scale2 }}
        className="absolute top-[30vh] left-[5vw]"
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          className="opacity-10"
        >
          <polygon
            points="75,5 135,40 135,110 75,145 15,110 15,40"
            fill="url(#grad3)"
            stroke="url(#grad3)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cross/Plus glyph */}
      <motion.div
        style={{ y: y4, rotate: rotate3 }}
        className="absolute top-[60vh] right-[15vw]"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-20">
          <path
            d="M40 10 L40 70 M10 40 L70 40"
            stroke="url(#grad4)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Diamond shape */}
      <motion.div
        style={{ y: y5, rotate: rotate2 }}
        className="absolute top-[80vh] left-[10vw]"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="opacity-15"
        >
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="none"
            stroke="url(#grad5)"
            strokeWidth="2"
          />
          <polygon
            points="50,20 80,50 50,80 20,50"
            fill="url(#grad5)"
            stroke="none"
          />
          <defs>
            <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Dots pattern - follows scroll slowly */}
      <motion.div style={{ y: y2 }} className="absolute top-[50vh] right-[8vw]">
        <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-30">
          <circle cx="10" cy="10" r="3" fill="#3b82f6" fillOpacity="0.5" />
          <circle cx="30" cy="10" r="3" fill="#8b5cf6" fillOpacity="0.5" />
          <circle cx="50" cy="10" r="3" fill="#ec4899" fillOpacity="0.5" />
          <circle cx="10" cy="30" r="3" fill="#8b5cf6" fillOpacity="0.5" />
          <circle cx="30" cy="30" r="3" fill="#ec4899" fillOpacity="0.5" />
          <circle cx="50" cy="30" r="3" fill="#3b82f6" fillOpacity="0.5" />
          <circle cx="10" cy="50" r="3" fill="#ec4899" fillOpacity="0.5" />
          <circle cx="30" cy="50" r="3" fill="#3b82f6" fillOpacity="0.5" />
          <circle cx="50" cy="50" r="3" fill="#8b5cf6" fillOpacity="0.5" />
        </svg>
      </motion.div>

      {/* Wave line */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[120vh] left-[20vw]"
      >
        <svg
          width="200"
          height="50"
          viewBox="0 0 200 50"
          className="opacity-20"
        >
          <path
            d="M0 25 Q25 0, 50 25 T100 25 T150 25 T200 25"
            fill="none"
            stroke="url(#grad6)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Spiral glyph */}
      <motion.div
        style={{ y: y4, rotate: rotate1 }}
        className="absolute top-[150vh] right-[25vw]"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="opacity-15"
        >
          <path
            d="M50 50 C50 45, 55 40, 60 40 C70 40, 75 50, 75 55 C75 70, 60 80, 45 80 C25 80, 15 60, 15 45 C15 20, 40 5, 60 5"
            fill="none"
            stroke="url(#grad7)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Star shape */}
      <motion.div
        style={{ y: y5, rotate: rotate2, scale: scale1 }}
        className="absolute top-[200vh] left-[30vw]"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-20">
          <polygon
            points="40,5 47,30 75,30 52,48 60,75 40,58 20,75 28,48 5,30 33,30"
            fill="url(#grad8)"
            stroke="none"
          />
          <defs>
            <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
