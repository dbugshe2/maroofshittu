"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Props for the RotatingWord component.
 */
interface RotatingWordProps {
  /** Words cycled through in order. */
  words: string[];
  /** Milliseconds each word stays on screen. Defaults to 2400. */
  interval?: number;
}

/**
 * RotatingWord Component
 *
 * Cycles through a list of words with a slide-up animation, used in the
 * about page hero ("I love to build ___").
 *
 * @param {RotatingWordProps} props - The words and rotation interval.
 * @returns {JSX.Element} The animated word.
 */
export function RotatingWord({ words, interval = 2400 }: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-block overflow-hidden align-bottom text-brand-orange">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
