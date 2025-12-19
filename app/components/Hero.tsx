"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

export default function Hero() {
  return (
    <section
      id="about"
      className="snap-section relative flex items-center justify-center pt-20 overflow-visible"
    >
      {/* Section-specific decorative elements */}
      <SectionBackground variant="hero" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 z-10 text-center"
      >
        <motion.div variants={fadeInUp}>
          <span className="inline-block py-1 px-3 rounded-full bg-surface text-sm font-medium text-primary mb-6">
            Available for Work
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
            Hi, I'm <span className="text-gradient">Sahand Mohammed</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            A Software Engineer specializing in building exceptional web and
            mobile application experiences.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105"
          >
            <span className="mr-2">View My Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/resume.pdf" // Placeholder
            className="group inline-flex h-12 items-center justify-center rounded-md border border-[var(--surface-border)] bg-surface px-8 font-medium text-foreground transition-all duration-300 hover:bg-[var(--surface-border)] hover:scale-105"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {[Github, Linkedin, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
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
