"use client";

import { motion } from "framer-motion";

interface SectionBackgroundProps {
  variant: "hero" | "skills" | "cloud" | "projects" | "education";
}

// Section-specific decorative elements
export default function SectionBackground({ variant }: SectionBackgroundProps) {
  const variants = {
    hero: (
      <>
        {/* Large gradient blob - top right */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-transparent blur-3xl animate-blob" />
        {/* Smaller blob - bottom left */}
        <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-500/10 via-blue-500/5 to-transparent blur-3xl animate-blob animation-delay-2000" />
        {/* Floating circles glyph */}
        <svg
          className="absolute top-1/4 right-10 w-32 h-32 opacity-20 animate-float"
          viewBox="0 0 100 100"
        >
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="50"
            r="15"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1"
          />
          <circle
            cx="40"
            cy="70"
            r="10"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1"
          />
        </svg>
        {/* Code brackets glyph */}
        <svg
          className="absolute bottom-1/4 left-20 w-20 h-20 opacity-15 animate-float animation-delay-4000"
          viewBox="0 0 100 100"
        >
          <path
            d="M30 20 L10 50 L30 80"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M70 20 L90 50 L70 80"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </>
    ),
    skills: (
      <>
        {/* Gradient mesh blob */}
        <div className="absolute top-20 -right-60 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-cyan-500/15 via-blue-500/10 to-transparent blur-3xl animate-blob" />
        <div className="absolute -bottom-40 left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent blur-3xl animate-blob animation-delay-4000" />
        {/* Grid pattern */}
        <svg
          className="absolute top-10 left-10 w-40 h-40 opacity-10"
          viewBox="0 0 100 100"
        >
          {[0, 25, 50, 75, 100].map((pos) => (
            <g key={pos}>
              <line
                x1={pos}
                y1="0"
                x2={pos}
                y2="100"
                stroke="#3b82f6"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1={pos}
                x2="100"
                y2={pos}
                stroke="#3b82f6"
                strokeWidth="0.5"
              />
            </g>
          ))}
        </svg>
        {/* Gear/cog glyph */}
        <motion.svg
          className="absolute bottom-20 right-20 w-24 h-24 opacity-15"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M50 15 L55 25 L65 20 L62 32 L75 35 L68 45 L80 50 L68 55 L75 65 L62 68 L65 80 L55 75 L50 85 L45 75 L35 80 L38 68 L25 65 L32 55 L20 50 L32 45 L25 35 L38 32 L35 20 L45 25 Z"
            fill="none"
            stroke="url(#skillsGrad)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="url(#skillsGrad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </motion.svg>
        {/* Chip/processor glyph */}
        <svg
          className="absolute top-1/3 left-5 w-16 h-16 opacity-10 animate-float"
          viewBox="0 0 100 100"
        >
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            rx="5"
          />
          {[35, 50, 65].map((pos) => (
            <g key={pos}>
              <line
                x1={pos}
                y1="10"
                x2={pos}
                y2="25"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <line
                x1={pos}
                y1="75"
                x2={pos}
                y2="90"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <line
                x1="10"
                y1={pos}
                x2="25"
                y2={pos}
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <line
                x1="75"
                y1={pos}
                x2="90"
                y2={pos}
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </>
    ),
    cloud: (
      <>
        {/* Cloud blob */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-purple-500/15 via-blue-500/5 to-transparent blur-3xl animate-blob animation-delay-2000" />
        {/* Cloud icon glyph */}
        <svg
          className="absolute top-20 right-10 w-32 h-32 opacity-15 animate-float"
          viewBox="0 0 100 60"
        >
          <path
            d="M25 50 Q5 50 5 35 Q5 20 25 20 Q25 5 45 5 Q65 5 70 20 Q95 15 95 35 Q95 50 75 50 Z"
            fill="none"
            stroke="url(#cloudGrad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
        {/* Server rack glyph */}
        <svg
          className="absolute bottom-1/4 left-10 w-20 h-28 opacity-15 animate-float animation-delay-4000"
          viewBox="0 0 60 100"
        >
          <rect
            x="5"
            y="5"
            width="50"
            height="25"
            rx="3"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <circle cx="45" cy="17" r="3" fill="#10b981" />
          <rect
            x="5"
            y="35"
            width="50"
            height="25"
            rx="3"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <circle cx="45" cy="47" r="3" fill="#3b82f6" />
          <rect
            x="5"
            y="65"
            width="50"
            height="25"
            rx="3"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <circle cx="45" cy="77" r="3" fill="#f59e0b" />
        </svg>
        {/* Network nodes */}
        <svg
          className="absolute top-1/2 right-1/4 w-24 h-24 opacity-10"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="20" r="8" fill="#3b82f6" fillOpacity="0.5" />
          <circle cx="20" cy="70" r="8" fill="#8b5cf6" fillOpacity="0.5" />
          <circle cx="80" cy="70" r="8" fill="#ec4899" fillOpacity="0.5" />
          <line
            x1="50"
            y1="28"
            x2="25"
            y2="65"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <line
            x1="50"
            y1="28"
            x2="75"
            y2="65"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <line
            x1="28"
            y1="70"
            x2="72"
            y2="70"
            stroke="#6366f1"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
      </>
    ),
    projects: (
      <>
        {/* Creative gradient blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-gradient-to-bl from-emerald-500/15 via-blue-500/10 to-transparent blur-3xl animate-blob" />
        <div className="absolute bottom-20 -left-40 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-orange-500/10 via-pink-500/5 to-transparent blur-3xl animate-blob animation-delay-4000" />
        {/* Lightbulb/idea glyph */}
        <svg
          className="absolute top-20 left-10 w-20 h-28 opacity-15 animate-float"
          viewBox="0 0 60 90"
        >
          <path
            d="M30 5 Q55 5 55 35 Q55 50 40 60 L40 70 L20 70 L20 60 Q5 50 5 35 Q5 5 30 5"
            fill="none"
            stroke="url(#projectGrad)"
            strokeWidth="2"
          />
          <line
            x1="22"
            y1="75"
            x2="38"
            y2="75"
            stroke="url(#projectGrad)"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="82"
            x2="36"
            y2="82"
            stroke="url(#projectGrad)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="projectGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
        {/* Window/app frame glyph */}
        <svg
          className="absolute bottom-1/3 right-10 w-24 h-20 opacity-15 animate-float animation-delay-2000"
          viewBox="0 0 100 80"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="70"
            rx="5"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          <line
            x1="5"
            y1="20"
            x2="95"
            y2="20"
            stroke="#10b981"
            strokeWidth="2"
          />
          <circle cx="15" cy="12" r="3" fill="#ef4444" fillOpacity="0.6" />
          <circle cx="25" cy="12" r="3" fill="#fbbf24" fillOpacity="0.6" />
          <circle cx="35" cy="12" r="3" fill="#10b981" fillOpacity="0.6" />
        </svg>
        {/* Code snippet glyph */}
        <svg
          className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10"
          viewBox="0 0 100 100"
        >
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="10"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="20"
            y1="35"
            x2="50"
            y2="35"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="50"
            x2="70"
            y2="50"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="65"
            x2="40"
            y2="65"
            stroke="#ec4899"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </>
    ),
    education: (
      <>
        {/* Academic gradient blob */}
        <div className="absolute -top-20 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-transparent blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl animate-blob animation-delay-2000" />
        {/* Book glyph */}
        <svg
          className="absolute top-20 right-20 w-24 h-24 opacity-15 animate-float"
          viewBox="0 0 100 100"
        >
          <path
            d="M10 20 L10 85 Q50 75 50 75 Q50 75 90 85 L90 20 Q50 10 50 10 Q50 10 10 20"
            fill="none"
            stroke="url(#eduGrad)"
            strokeWidth="2"
          />
          <path d="M50 10 L50 75" stroke="url(#eduGrad)" strokeWidth="2" />
          <defs>
            <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
        {/* Graduation cap glyph */}
        <svg
          className="absolute bottom-1/3 left-10 w-24 h-20 opacity-15 animate-float animation-delay-4000"
          viewBox="0 0 100 80"
        >
          <polygon
            points="50,10 95,30 50,50 5,30"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <path
            d="M20 35 L20 55 Q50 70 80 55 L80 35"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <line
            x1="85"
            y1="30"
            x2="85"
            y2="60"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <circle cx="85" cy="65" r="5" fill="#8b5cf6" fillOpacity="0.5" />
        </svg>
        {/* Atom/science glyph */}
        <svg
          className="absolute top-1/2 right-1/4 w-20 h-20 opacity-10 animate-float animation-delay-2000"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            transform="rotate(0 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke="#ec4899"
            strokeWidth="1.5"
            transform="rotate(120 50 50)"
          />
          <circle cx="50" cy="50" r="6" fill="#3b82f6" fillOpacity="0.6" />
        </svg>
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
      {variants[variant]}
    </div>
  );
}
