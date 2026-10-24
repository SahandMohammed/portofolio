"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

import { fadeInUp, staggerContainer } from "../lib/animations";

export default function Footer() {
  const t = useTranslations("Footer");

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sahandmohammed",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sahandmohammed/",
    },
    {
      name: "Email",
      href: "mailto:sahandmohammed.a@gmail.com",
    },
  ];

  const navLinks = [
    { name: "home", href: "#about" },
    { name: "about", href: "#about" },
    { name: "services", href: "#cloud-services" },
    { name: "projects", href: "#projects" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <footer className="snap-section oxaley-footer-bg flex flex-col justify-between relative z-10 overflow-hidden pt-24 pb-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14 my-auto border-t border-black/12 dark:border-white/12 pt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column with user's SM Logo */}
          <motion.div variants={fadeInUp} className="md:col-span-6 space-y-6">
            <Link href="#about" className="inline-block group">
              <Image
                src="/sm-logo.png"
                alt="Sahand Mohammed Logo"
                width={160}
                height={160}
                className="h-28 md:h-36 lg:h-40 w-auto object-contain invert dark:invert-0 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-muted text-lg md:text-2xl max-w-md leading-snug tracking-tight">
              {t("about")}
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={fadeInUp} className="md:col-span-3 lg:col-start-8">
            <h3 className="text-xs font-mono text-black/45 dark:text-white/45 uppercase tracking-widest mb-5">
              {t("navigation")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#09090f]/80 dark:text-white/80 hover:text-[#09090f] dark:hover:text-white transition-colors"
                  >
                    <span>{t(`links.${link.name}`)}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Column */}
          <motion.div variants={fadeInUp} className="md:col-span-3 lg:col-start-11">
            <h3 className="text-xs font-mono text-black/45 dark:text-white/45 uppercase tracking-widest mb-5">
              {t("social")}
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-[#09090f]/80 dark:text-white/80 hover:text-[#09090f] dark:hover:text-white transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] mx-auto px-8 lg:px-14 mt-16 md:mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted"
      >
        <p>{t("rights", { year: new Date().getFullYear() })}</p>

        <a
          href="#about"
          className="uppercase tracking-widest font-medium text-[#09090f] dark:text-white hover:opacity-60 transition-opacity"
        >
          Back to top ↑
        </a>
      </motion.div>
    </footer>
  );
}
