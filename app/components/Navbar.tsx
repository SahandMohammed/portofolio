"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
// Language switcher hidden for now - uncomment when ready
// import LanguageSwitcher from "./LanguageSwitcher";

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
        initial={{ y: -100, opacity: 0, width: 780 }}
        animate={{ y: 0, opacity: 1, width: 780 }}
        whileHover={{
          width: 850,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
          },
        }}
        whileTap={{
          width: 820,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 justify-between items-center px-8 py-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg dark:bg-white/5 dark:border-white/10 ring-1 ring-black/5 cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:border-white/20 active:shadow-2xl active:shadow-primary/20 hover:backdrop-blur-2xl transition-shadow"
      >
        {/* Left group - Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
            <Code2 className="text-primary group-hover:text-white w-5 h-5 transition-colors" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Sahand
          </span>
        </a>

        {/* Center group - Nav Links */}
        <div className="flex items-center gap-1 relative z-10">
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

        {/* Right group - Actions */}
        <div className="flex items-center gap-2">
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

          {/* Language switcher hidden for now - uncomment when ready */}
          {/* <LanguageSwitcher /> */}

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
        <motion.div
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="flex flex-col rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:bg-white/5 dark:border-white/10"
        >
          <div className="flex justify-between items-center p-4">
            <a href="#" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="text-primary w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Sahand</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-white/10 text-foreground transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 flex flex-col gap-2">
                  <div className="h-px bg-white/10 my-1" />
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="p-3 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground font-medium flex items-center justify-between group"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                    </a>
                  ))}
                  <div className="h-px bg-white/10 my-2" />
                  <a
                    href="#contact"
                    className="p-3 text-center rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("contact")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
