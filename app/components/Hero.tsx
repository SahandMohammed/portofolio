"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";
import TypeWriter from "./TypeWriter";

export default function Hero() {
  const t = useTranslations("Hero");

  // Magnetic/Parallax Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Calculate distance from center
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    // Move content slightly towards mouse (magnetic feel)
    // Adjust divisor to control sensitivity (higher = less movement)
    x.set((clientX - centerX) / 25);
    y.set((clientY - centerY) / 25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      id="about"
      className="snap-section relative flex items-center justify-center min-h-[100dvh]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Section-specific decorative elements */}
      <SectionBackground variant="hero" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ x: springX, y: springY }}
        className="container mx-auto px-6 z-10 text-center"
      >
        <motion.div variants={fadeInUp}>
          <span className="inline-block py-1 px-3 rounded-full bg-surface text-sm font-medium text-primary mb-6">
            {t("available")}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
            {t("greeting")} <TypeWriter text={t("name")} delay={80} />
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("role")}
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full btn-gradient-loop px-8 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            <span className="mr-2">{t("viewProjects")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </a>
          <a
            href="/resume.pdf" // Placeholder
            className="group inline-flex h-12 items-center justify-center rounded-full border border-[var(--surface-border)] bg-surface px-8 font-medium text-foreground transition-all duration-300 hover:bg-[var(--surface-border)] hover:scale-105"
          >
            <Download className="mr-2 h-4 w-4" />
            {t("downloadCv")}
          </a>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center justify-center gap-8 md:gap-12 opacity-80"
        >
          {[
            {
              name: "Next.js",
              icon: "https://cdn.simpleicons.org/nextdotjs/000000/ffffff",
            },
            {
              name: "React",
              icon: "https://cdn.simpleicons.org/react",
            },
            {
              name: "Node.js",
              icon: "https://cdn.simpleicons.org/nodedotjs",
            },
            {
              name: "NestJS",
              icon: "https://cdn.simpleicons.org/nestjs",
            },
          ].map((tech) => (
            <img
              key={tech.name}
              src={tech.icon}
              alt={tech.name}
              title={tech.name}
              className="h-8 w-8 md:h-10 md:w-10 hover:scale-110 transition-transform duration-300"
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {[
            { Icon: Github, href: "https://github.com/sahandmohammed" },
            {
              Icon: Linkedin,
              href: "https://www.linkedin.com/in/sahandmohammed/",
            },
            { Icon: Mail, href: "mailto:sahandmohammed.a@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground hover:scale-110 transition-all p-2"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
