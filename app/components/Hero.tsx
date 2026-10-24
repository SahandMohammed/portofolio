"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Hero() {
  const t = useTranslations("Hero");

  const stackAvatars = [
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/000000",
    },
    {
      name: "React",
      icon: "https://cdn.simpleicons.org/react/087ea4",
    },
    {
      name: "Node.js",
      icon: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
      name: "NestJS",
      icon: "https://cdn.simpleicons.org/nestjs/e0234e",
    },
  ];

  return (
    <section
      id="about"
      className="snap-section oxaley-hero-bg relative flex flex-col justify-between min-h-[100dvh] pt-28 pb-8 md:pb-10"
    >
      {/* Main Editorial Split Area */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14 my-auto z-10"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Left - Monumental Stacked Typography (matching image copy.png) */}
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] font-medium tracking-[-0.04em] leading-[0.98]">
              <motion.span variants={fadeInUp} className="block text-white">
                {t("greeting")}
              </motion.span>
              <motion.span variants={fadeInUp} className="block text-white">
                {t("name")}
              </motion.span>
              <motion.span variants={fadeInUp} className="block text-white/40 mt-1">
                Software
              </motion.span>
              <motion.span variants={fadeInUp} className="block text-white/40">
                Engineer.
              </motion.span>
            </h1>

            {/* Overlapping Circular Stack Badges (matching the 4 overlapping circles in image copy.png) */}
            <motion.div variants={fadeInUp} className="mt-9 flex items-center">
              <div className="flex -space-x-2.5">
                {stackAvatars.map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className="w-11 h-11 rounded-full bg-white border-2 border-[#1e1568] flex items-center justify-center shadow-md transition-transform hover:-translate-y-1"
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="ml-5 flex items-center gap-3 text-white/70">
                {[
                  {
                    Icon: Github,
                    href: "https://github.com/sahandmohammed",
                    label: "GitHub",
                  },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/in/sahandmohammed/",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Mail,
                    href: "mailto:sahandmohammed.a@gmail.com",
                    label: "Email",
                  },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Understated Editorial Statement */}
          <motion.div
            variants={fadeInUp}
            className="md:max-w-xs md:text-right md:pt-4"
          >
            <p className="text-sm md:text-base text-white/65 leading-snug tracking-tight">
              {t("role")}
            </p>
            <a
              href="/resume.pdf"
              className="inline-block mt-4 text-xs uppercase tracking-widest text-white/80 hover:text-white border-b border-white/30 pb-0.5 transition-colors"
            >
              {t("downloadCv")}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar - Anchored on the Horizon Glow (matching image copy.png) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14 z-10 pt-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left - SEE OUR PORTFOLIO */}
          <a
            href="#projects"
            className="text-xs md:text-sm font-medium uppercase tracking-wider text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
          >
            {t("viewProjects")}
          </a>

          {/* Center - 3 Sleek Dark Rounded-XL Preview Tiles */}
          <div className="hidden lg:flex items-center gap-3">
            {[
              { label: "Web Platforms", sub: "Next.js / NestJS", href: "#projects" },
              { label: "Mobile Apps", sub: "Flutter / Dart", href: "#projects" },
              { label: "Cloud & DevOps", sub: "Linux / Docker", href: "#cloud-services" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group w-40 h-20 rounded-xl bg-[#070612] border border-white/10 text-white p-3.5 flex flex-col justify-between overflow-hidden relative shadow-lg hover:-translate-y-0.5 transition-transform"
              >
                <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-indigo-500/25 blur-xl group-hover:bg-indigo-400/40 transition-colors" />
                <span className="text-[10px] font-mono text-white/45">
                  0{idx + 1}
                </span>
                <div>
                  <div className="text-xs font-medium tracking-tight text-white">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-white/50">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Right - SCROLL NOW + Circular Down Arrow */}
          <a
            href="#skills"
            className="group inline-flex items-center gap-4 text-xs md:text-sm font-medium uppercase tracking-wider text-[#09090f] dark:text-white hover:opacity-70 transition-opacity"
          >
            <span>Scroll Now</span>
            <span className="w-9 h-9 rounded-full border border-[#09090f]/40 dark:border-white/40 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
              <ArrowDown className="w-4 h-4" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
