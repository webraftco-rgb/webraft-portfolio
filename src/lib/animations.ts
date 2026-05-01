import { Variants } from "motion/react";

export const fadeIn: Variants = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" }
} as any; // Using any because of the viewport shorthand used in some components, will fix in components

export const staggerContainer: Variants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const hoverPop = {
  whileHover: { y: -8, scale: 1.02, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 }
};

export const slideIn: Variants = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
} as any;
