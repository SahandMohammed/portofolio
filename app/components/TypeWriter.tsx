"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function TypeWriter({
  text,
  delay = 100,
  className = "",
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, delay, text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative inline-block ${className}`}
    >
      <span className="text-gradient">{displayedText}</span>
      <motion.span
        className="inline-block w-[3px] h-[1em] ms-1 align-middle bg-gradient-to-b from-[#60a5fa] to-[#c084fc] rounded-sm"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          verticalAlign: "baseline",
          marginBottom: "-0.1em",
        }}
      />
    </motion.span>
  );
}
