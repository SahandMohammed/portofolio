"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("Footer");

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sahandmohammed",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sahandmohammed/",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:sahandmohammed.a@gmail.com",
      icon: Mail,
    },
  ];

  const navLinks = [
    { name: "home", href: "/" },
    { name: "about", href: "#about" },
    { name: "services", href: "#services" },
    { name: "projects", href: "#projects" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "#contact" },
  ];

  return (
    <footer className="snap-section flex flex-col justify-center relative border-t border-[var(--surface-border)] bg-background z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-bold text-3xl tracking-tight text-foreground">
                Sahand<span className="text-primary">.dev</span>
              </span>
            </Link>
            <p className="text-muted text-lg max-w-sm leading-relaxed">
              {t("about")}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 lg:col-start-7">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
              {t("navigation")}
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted hover:text-primary transition-colors duration-300"
                  >
                    <span>{t(`links.${link.name}`)}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="md:col-span-3 lg:col-start-10">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-6">
              {t("social")}
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-muted hover:text-foreground transition-colors duration-300"
                  >
                    <span className="p-2 rounded-full bg-surface border border-[var(--surface-border)] group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                      <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-[var(--surface-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("rights", { year: new Date().getFullYear() })}
          </motion.p>

          <div className="flex gap-8">
            {/* Optional legal links placeholders if needed later */}
          </div>
        </div>
      </div>
    </footer>
  );
}
