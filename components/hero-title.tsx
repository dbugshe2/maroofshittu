"use client";
import { motion } from "motion/react";

/**
 * HeroTitle Component
 *
 * Displays the main hero section of the landing page, introducing the user
 * with animated text using Framer Motion. It features a responsive layout
 * and a continuously rotating SVG icon.
 *
 * @returns {JSX.Element} The hero section component.
 */
export default function HeroTitle() {
  return (
    <section className="h-screen items-center px-4 flex flex-col flex-1 justify-center">
      {/* intro */}
      <div className="min-w-xs max-w-3xl w-full mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg self-start font-semibold mb-4 tracking-wide"
        >
          Hello, I&apos;m Maroof Shittu
        </motion.p>
      </div>
      {/* what i do */}
      <div className="flex w-full mx-auto min-w-xs max-w-3xl">
        <h1 className="text-3xl md:text-8xl font-bold leading-tight tracking-tighter">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center"
          >
            Reclusive
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center "
          >
            🦥&nbsp;Sl
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              className="text-brand-orange w-12 h-12 md:w-18 md:h-18"
            >
              <path
                d="M12 2L12 22M2 12L22 12M4.9 4.9L19.1 19.1M4.9 19.1L19.1 4.9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
            th
          </motion.span>
        </h1>
      </div>
    </section>
  );
}
