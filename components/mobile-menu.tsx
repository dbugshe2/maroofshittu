"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Props for the MobileMenu component.
 */
interface MobileMenuProps {
  /** Navigation links shown in the dropdown panel. */
  links: { href: string; label: string }[];
}

/**
 * MobileMenu Component
 *
 * A hamburger button visible below the `md` breakpoint that toggles a
 * dropdown panel with the site's navigation links. The panel closes on
 * navigation, on Escape, and when a link is tapped.
 *
 * @param {MobileMenuProps} props - The links to render.
 * @returns {JSX.Element} The rendered mobile menu.
 */
export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-foreground"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-current"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-6 bg-current"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 right-0 left-0 border-foreground/10 border-t bg-background px-6 pt-4 pb-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground text-lg transition-colors hover:text-foreground/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
