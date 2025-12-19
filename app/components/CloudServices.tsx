"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Shield, Settings } from "lucide-react";
import { fadeInUp, staggerContainer } from "../lib/animations";
import SectionBackground from "./SectionBackground";

const services = [
  {
    title: "Cloud Infrastructure Setup",
    description:
      "Architecting and provisioning secure, scalable cloud environments on AWS, Google Cloud, or DigitalOcean tailored to your application needs.",
    icon: Cloud,
  },
  {
    title: "Server Administration",
    description:
      "Comprehensive management of Linux servers, including configuration, optimization, and routine maintenance to ensure peak performance.",
    icon: Server,
  },
  {
    title: "Environment Management",
    description:
      "Setting up isolated development, staging, and production environments to streamline the software development lifecycle.",
    icon: Settings,
  },
  {
    title: "Security & Compliance",
    description:
      "Implementing robust security protocols, firewalls, and access controls to protect your infrastructure and data.",
    icon: Shield,
  },
];

export default function CloudServices() {
  return (
    <section
      id="cloud-services"
      className="snap-section py-20 relative overflow-visible flex items-center"
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
            Cloud & <span className="text-gradient">DevOps</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Beyond coding, I provide end-to-end infrastructure solutions to
            ensure your applications run smoothly, securely, and efficiently.
          </p>
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
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {service.description}
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
