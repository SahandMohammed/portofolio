import type { Variants } from "framer-motion";

/**
 * Subtle, classy, elegant agency motion easing curve:
 * [0.16, 1, 0.3, 1] — smooth ease-out quint curve used by high-end design studios.
 */
export const EASE_ELEGANT = [0.16, 1, 0.3, 1] as const;

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE_ELEGANT,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_ELEGANT,
    },
  },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: EASE_ELEGANT,
    },
  },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: EASE_ELEGANT,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

// Aliases for backwards compatibility
export const fadeInUp: Variants = fadeSlideUp;
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: EASE_ELEGANT,
    },
  },
};
