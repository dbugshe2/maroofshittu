"use client";
import { motion } from "motion/react";

export default function HeroTitle() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-semibold mb-4 tracking-wide"
      >
        Hello, I&apos;m Maroof Shittu — I love to design
      </motion.p>

      <h1 className="text-7xl md:text-[120px] font-bold leading-tight tracking-tighter">
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-2"
        >
          B{/* Rotating Asterisk SVG */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="text-brand-orange w-12 h-12 md:w-24 md:h-24"
          >
            <path
              d="M12 2L12 22M2 12L22 12M4.9 4.9L19.1 19.1M4.9 19.1L19.1 4.9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.svg>
          autiful
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Interactions
        </motion.span>
      </h1>
    </section>
  );
}
