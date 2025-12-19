"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const t = useTranslations("Navbar");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("about"), href: isHome ? "#about" : "/#about" },
    { name: t("skills"), href: isHome ? "#skills" : "/#skills" },
    {
      name: t("services"),
      href: isHome ? "#cloud-services" : "/#cloud-services",
    },
    { name: t("projects"), href: isHome ? "#projects" : "/#projects" },
    { name: t("blog"), href: isHome ? "#blogs" : "/#blogs" },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg dark:bg-white/5 dark:border-white/10 ring-1 ring-black/5"
      >
        <a href="#" className="flex items-center gap-2 px-4 py-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
            <Code2 className="text-primary group-hover:text-white w-5 h-5 transition-colors" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Sahand
          </span>
        </a>

        <div className="h-6 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="h-6 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <LanguageSwitcher />

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {t("contact")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 w-full z-50 p-4">
        <div
          className={`flex justify-between items-center p-4 rounded-2xl border border-white/10 bg-background/80 backdrop-blur-xl shadow-lg transition-all duration-300 ${
            scrolled ? "bg-background/95" : ""
          }`}
        >
          <a href="#" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code2 className="text-primary w-5 h-5" />
            </div>
            <span className="font-bold text-lg">Sahand</span>
          </a>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-border mx-1"></div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-1"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-20 left-4 right-4 p-4 rounded-2xl bg-background border border-white/10 shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="p-3 rounded-xl hover:bg-accent hover:text-primary transition-colors text-muted-foreground font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-border my-2" />
                <a
                  href="#contact"
                  className="p-3 text-center rounded-xl bg-primary text-white font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {t("contact")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
