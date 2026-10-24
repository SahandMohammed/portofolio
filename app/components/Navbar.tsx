"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Link from "next/link";
import Image from "next/image";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const pathname = usePathname();
  const isHome = pathname === "/";
  const t = useTranslations("Navbar");

  useEffect(() => {
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
    { name: t("experience"), href: isHome ? "#experience" : "/#experience" },
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

      {/* Mobile Navbar - Flush Editorial Header + Full-Screen Overlay */}
      <header
        className={`md:hidden fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,color] duration-300 ease-out ${
          isOpen
            ? isOnDarkTop
              ? "bg-transparent border-b border-transparent text-white"
              : "bg-transparent border-b border-transparent text-[#09090f]"
            : isOnOxaleySection
            ? "bg-transparent border-b border-transparent text-white"
            : resolvedTheme === "dark"
            ? "bg-[#03020a]/85 backdrop-blur-xl border-b border-white/10 text-white"
            : "bg-white/90 backdrop-blur-xl border-b border-black/8 text-[#09090f]"
        }`}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 relative z-50"
          >
            <Image
              src="/sm-logo.png"
              alt="Sahand Logo"
              width={56}
              height={56}
              priority
              className={`h-11 w-auto object-contain transition-all duration-300 ${
                isOnDarkTop ? "invert-0" : "invert"
              }`}
            />
          </Link>

          <div className="flex items-center gap-2.5 relative z-50">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                isOnDarkTop
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-black/10 bg-black/[0.03] text-[#09090f] hover:bg-black/[0.06]"
              }`}
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={resolvedTheme}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
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
              className={`h-9 px-3.5 rounded-full border flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                isOnDarkTop
                  ? isOpen
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : isOpen
                  ? "border-black/15 bg-black/[0.06] text-[#09090f]"
                  : "border-black/10 bg-black/[0.03] text-[#09090f] hover:bg-black/[0.06]"
              }`}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <span>{isOpen ? "Close" : "Menu"}</span>
              <div className="w-3.5 h-2.5 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 4.5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-[1.5px] bg-current rounded-full origin-center block"
                />
                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-[1.5px] bg-current rounded-full origin-center block"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden fixed inset-0 z-40 flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto transition-colors duration-300 ${
              isOnDarkTop
                ? "bg-[#03020a] text-white"
                : "bg-white text-[#09090f]"
            }`}
          >
            {/* Subtle Oxaley Horizon Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: isOnDarkTop
                  ? "radial-gradient(110% 55% at 50% 100%, rgba(89, 70, 232, 0.45) 0%, rgba(39, 25, 140, 0.22) 45%, transparent 80%)"
                  : "radial-gradient(110% 55% at 50% 100%, rgba(89, 70, 232, 0.18) 0%, rgba(185, 176, 255, 0.12) 45%, transparent 80%)",
              }}
            />

            {/* Main Editorial Navigation List */}
            <nav className="relative z-10 flex flex-col my-auto">
              <div
                className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-4 ${
                  isOnDarkTop ? "text-white/35" : "text-black/40"
                }`}
              >
                Navigation
              </div>
              <div
                className={`divide-y border-y ${
                  isOnDarkTop
                    ? "divide-white/10 border-white/10"
                    : "divide-black/10 border-black/10"
                }`}
              >
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: 0.04 * idx,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between py-4 active:opacity-70 transition-opacity"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-xs font-mono ${
                          isOnDarkTop
                            ? "text-indigo-400/70"
                            : "text-indigo-600/80"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-3xl font-medium tracking-[-0.03em] group-hover:translate-x-1 transition-transform ${
                          isOnDarkTop ? "text-white" : "text-[#09090f]"
                        }`}
                      >
                        {link.name}
                      </span>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        isOnDarkTop
                          ? "border-white/15 text-white/60 group-hover:text-white group-hover:border-white/40"
                          : "border-black/12 text-black/50 group-hover:text-[#09090f] group-hover:border-black/30"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </nav>

            {/* Bottom Contact CTA + Social Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.25,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 pt-6 flex flex-col gap-5"
            >
              <a
                href={isHome ? "#contact" : "/#contact"}
                onClick={() => setIsOpen(false)}
                className={`w-full py-4 px-5 rounded-2xl font-medium text-xs uppercase tracking-[0.18em] flex items-center justify-between shadow-lg active:scale-[0.99] transition-transform ${
                  isOnDarkTop
                    ? "bg-white text-[#03020a]"
                    : "bg-[#09090f] text-white"
                }`}
              >
                <span>{t("contact")}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <div
                className={`flex items-center justify-between text-xs pt-1 ${
                  isOnDarkTop ? "text-white/50" : "text-black/50"
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    isOnDarkTop ? "text-white/40" : "text-black/45"
                  }`}
                >
                  © {new Date().getFullYear()} Sahand
                </span>
                <div className="flex items-center gap-4">
                  {[
                    {
                      Icon: Github,
                      href: "https://github.com/sahandmohammed",
                      label: "GitHub",
                    },
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/in/sahandmohammed/",
                      label: "LinkedIn",
                    },
                    {
                      Icon: Mail,
                      href: "mailto:sahandmohammed.a@gmail.com",
                      label: "Email",
                    },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`transition-colors ${
                        isOnDarkTop
                          ? "text-white/60 hover:text-white"
                          : "text-black/60 hover:text-[#09090f]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
