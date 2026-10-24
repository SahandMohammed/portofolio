"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Skills() {
  const t = useTranslations("Skills");

  const skills = [
    {
      key: "frontend",
      num: "01",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Flutter",
        "Dart",
      ],
    },
    {
      key: "backend",
      num: "02",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Firebase",
      ],
    },
    {
      key: "devops",
      num: "03",
      items: [
        "Git",
        "Docker",
        "Jenkins",
        "CI/CD",
        "Jira",
        "Linux",
        "AWS Basics",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="snap-section py-24 relative flex items-center bg-transparent"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14"
      >
        {/* Editorial Header */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.035em] text-[#09090f] dark:text-white leading-[1.02]">
            {t.rich("title", {
              gradient: (chunks) => (
                <span className="text-black/40 dark:text-white/40 block">
                  {chunks}
                </span>
              ),
            })}
          </h2>
          <p className="text-muted max-w-sm text-sm md:text-base leading-snug">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Clean Editorial Hairline Rows (No boxy AI cards) */}
        <div className="border-t border-black/12 dark:border-white/12">
          {skills.map((skill) => (
            <motion.div
              key={skill.key}
              variants={fadeInUp}
              className="group py-8 md:py-10 border-b border-black/12 dark:border-white/12 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors"
            >
              <div className="md:col-span-1 text-xs font-mono text-black/40 dark:text-white/40">
                ({skill.num})
              </div>

              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#09090f] dark:text-white mb-1.5">
                  {t(`${skill.key}.title`)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(`${skill.key}.description`)}
                </p>
              </div>

              <div className="md:col-span-7 lg:col-span-8 flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                {skill.items.map((item, i) => (
                  <span
                    key={item}
                    className="inline-flex items-center text-sm md:text-base text-[#09090f]/85 dark:text-white/85 font-normal whitespace-nowrap"
                  >
                    <span>{item}</span>
                    {i < skill.items.length - 1 && (
                      <span className="ml-3.5 text-black/20 dark:text-white/20 select-none font-light">
                        /
                      </span>
                    )}
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
