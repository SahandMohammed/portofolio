"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce web application built with Next.js and NestJS, featuring real-time inventory and secure payments.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    image: "linear-gradient(to bottom right, #3b82f6, #8b5cf6)", // Placeholder
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management tool for teams, built with Flutter and Firebase for real-time updates across devices.",
    tags: ["Flutter", "Firebase", "Dart", "Mobile"],
    image: "linear-gradient(to bottom right, #10b981, #3b82f6)", // Placeholder
    link: "#",
    github: "#",
  },
  {
    title: "Healthcare Portal",
    description:
      "Secure patient portal for accessing medical records and scheduling appointments, compliant with healthcare standards.",
    tags: ["React", "Spring Boot", "MySQL", "Docker"],
    image: "linear-gradient(to bottom right, #f59e0b, #ef4444)", // Placeholder
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="snap-section py-20 relative overflow-visible flex items-center"
    >
      <SectionBackground variant="projects" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 w-full"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A selection of projects that demonstrate my expertise in web and
            mobile development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              <div
                className="h-48 w-full relative overflow-hidden"
                style={{ background: project.image }}
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a
                    href={project.github}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href={project.link}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-surface text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
