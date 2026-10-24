"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const t = useTranslations("Navbar");

  useEffect(() => {
    setMounted(true);

    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      if (typeof customEvent.detail?.index === "number") {
        setSectionIndex(customEvent.detail.index);
      }
    };

    window.addEventListener("sectionchange", handleSectionChange);
    return () =>
      window.removeEventListener("sectionchange", handleSectionChange);
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

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  // On Hero (index 0), the top is pure black from the Oxaley gradient
  const isOnOxaleySection = isHome && sectionIndex === 0;
  const isOnDarkTop = isOnOxaleySection || resolvedTheme === "dark";

  return (
    <>
      {/* Desktop Navbar - Oxaley Minimalist Editorial Bar */}
      <header
        className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,color] duration-300 ease-out outline-none ring-0 py-5 ${
          isOnOxaleySection
            ? "bg-transparent border-b border-transparent"
            : resolvedTheme === "dark"
            ? "bg-[#03020a]/85 backdrop-blur-xl border-b border-white/10 isolate"
            : "bg-white/90 backdrop-blur-xl border-b border-black/8 isolate"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 lg:px-14 flex items-center justify-between">
          {/* Left - User's SM Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/sm-logo.png"
              alt="Sahand Mohammed Logo"
              width={72}
              height={72}
              priority
              className={`h-14 lg:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isOnDarkTop ? "invert-0" : "invert"
              }`}
            />
          </Link>

          {/* Right Group - Comma-separated links + CONTACT US -> (matching image copy.png) */}
          <div className="flex items-center gap-12 lg:gap-20">
            <nav className="flex items-center text-sm tracking-tight">
              {navLinks.map((link, idx) => (
                <React.Fragment key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-opacity hover:opacity-60 ${
                      isOnDarkTop ? "text-white" : "text-[#09090f]"
                    }`}
                  >
                    {link.name}
                  </a>
                  {idx < navLinks.length - 1 && (
                    <span
                      className={`mx-2 select-none ${
                        isOnDarkTop ? "text-white/50" : "text-black/40"
                      }`}
                    >
                      ,
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.88 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors hover:opacity-70 cursor-pointer flex items-center justify-center relative ${
                  isOnDarkTop ? "text-white" : "text-[#09090f]"
                }`}
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={resolvedTheme}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {resolvedTheme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <a
                href={isHome ? "#contact" : "/#contact"}
                className={`group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-70 ${
                  isOnDarkTop ? "text-white" : "text-[#09090f]"
                }`}
              >
                <span>{t("contact")}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 w-full z-50 p-4">
        <div
          className={`flex flex-col rounded-2xl border transition-[background-color,border-color,color] duration-300 isolate ${
            isOnDarkTop
              ? "bg-black/40 border-transparent backdrop-blur-md text-white"
              : "bg-white/92 border-black/10 backdrop-blur-xl text-[#09090f]"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/sm-logo.png"
                alt="Sahand Logo"
                width={48}
                height={48}
                className={`h-11 w-auto object-contain ${
                  isOnDarkTop ? "invert-0" : "invert"
                }`}
              />
            </Link>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.88 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:opacity-70 transition-colors cursor-pointer flex items-center justify-center relative"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={resolvedTheme}
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {resolvedTheme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
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
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 flex flex-col gap-1">
                  <div className="h-px bg-current/10 my-1" />
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="px-2 py-2.5 text-sm font-medium hover:opacity-60 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <a
                    href={isHome ? "#contact" : "/#contact"}
                    className="mt-2 py-2.5 text-center rounded-xl bg-current/10 text-xs font-semibold uppercase tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("contact")} →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
