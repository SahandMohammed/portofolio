"use client";

import { motion } from "framer-motion";
import { Code, Server, Terminal, Cpu, Globe, Database } from "lucide-react";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

const skills = [
  {
    category: "Frontend Development",
    icon: Globe,
    description:
      "Building responsive, interactive, and performant user interfaces.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Flutter",
      "Dart",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50",
  },
  {
    category: "Backend Engineering",
    icon: Server,
    description:
      "Designing scalable architectures and robust server-side logic.",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Firebase",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50",
  },
  {
    category: "DevOps & Tools",
    icon: Terminal,
    description:
      " streamlining deployment pipelines and ensuring system reliability.",
    items: ["Git", "Docker", "Jenkins", "CI/CD", "Jira", "Linux", "AWS Basics"],
    gradient: "from-orange-500/20 to-red-500/20",
    border: "group-hover:border-orange-500/50",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="snap-section py-20 relative overflow-visible flex items-center"
    >
      <SectionBackground variant="skills" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 w-full"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A versatile technology stack that enables me to build end-to-end
            solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.category}
              variants={fadeInUp}
              className={`group relative p-8 rounded-3xl border border-[var(--surface-border)] bg-[var(--card-bg)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${skill.border}`}
            >
              {/* Gradient Background Effect on Hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}
              />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 rounded-2xl bg-surface border border-[var(--surface-border)]`}
                >
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {skill.category}
                </h3>
              </div>

              <p className="text-muted text-sm mb-6 leading-relaxed">
                {skill.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface border border-[var(--surface-border)] text-muted-foreground group-hover:text-foreground group-hover:border-primary/20 transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
