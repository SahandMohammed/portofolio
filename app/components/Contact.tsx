"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionBackground from "./SectionBackground";
import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Contact() {
  const t = useTranslations("Contact");

  const contactInfo = {
    email: "sahandmohammed.a@gmail.com",
    phone: "+964 771 157 4683",
    location: "Sulaymaniyah, Iraq",
    maps: "https://maps.google.com/?q=Sulaymaniyah,Iraq",
  };

  return (
    <section
      id="contact"
      className="snap-section relative flex items-center justify-center min-h-[100dvh] py-20 overflow-hidden"
    >
      <SectionBackground variant="hero" />

      <div className="container mx-auto px-6 z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-20">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 text-foreground tracking-tighter">
              {t.rich("title", {
                gradient: (chunks) => (
                  <span className="text-gradient">{chunks}</span>
                ),
              })}
            </h2>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed font-light">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Main Action - Email */}
          <motion.div variants={fadeInUp} className="mb-24">
            <a
              href={`mailto:${contactInfo.email}`}
              className="group relative inline-flex flex-col md:flex-row items-center gap-4 text-2xl md:text-6xl font-bold text-foreground hover:text-blue-500 transition-colors duration-500 tracking-tight break-all md:break-normal"
            >
              <span className="break-all">{contactInfo.email}</span>
              <span className="relative flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full border border-current transition-all duration-500 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 md:h-6 md:w-6 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </motion.div>

          {/* Secondary Info Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-3xl mx-auto border-t border-[var(--surface-border)] pt-12"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="flex items-center gap-2 text-muted-foreground uppercase tracking-widest text-sm font-semibold">
                <Phone className="w-4 h-4" />
                Phone
              </span>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="text-2xl md:text-3xl font-medium hover:text-blue-500 transition-colors duration-300"
              >
                {contactInfo.phone}
              </a>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="flex items-center gap-2 text-muted-foreground uppercase tracking-widest text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                Location
              </span>
              <a
                href={contactInfo.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl font-medium hover:text-purple-500 transition-colors duration-300"
              >
                {contactInfo.location}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
