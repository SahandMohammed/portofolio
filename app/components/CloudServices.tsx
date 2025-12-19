"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Shield, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

export default function CloudServices() {
  const t = useTranslations("CloudServices");

  const services = [
    {
      key: "infrastructure",
      icon: Cloud,
    },
    {
      key: "server",
      icon: Server,
    },
    {
      key: "environment",
      icon: Settings,
    },
    {
      key: "security",
      icon: Shield,
    },
  ];

  return (
    <section
      id="cloud-services"
      className="snap-section py-20 relative block md:flex md:items-center"
    >
      <SectionBackground variant="cloud" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 w-full"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            {t.rich("title", {
              gradient: (chunks) => (
                <span className="text-gradient">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-muted max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass p-8 rounded-2xl border-l-4 border-l-primary hover:bg-surface transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {t(`services.${service.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
