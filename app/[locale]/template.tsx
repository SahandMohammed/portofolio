"use client";

import { motion } from "framer-motion";
import { EASE_ELEGANT } from "../lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transitionEnd: { transform: "none" } }}
      transition={{ duration: 0.6, ease: EASE_ELEGANT }}
    >
      {children}
    </motion.div>
  );
}
