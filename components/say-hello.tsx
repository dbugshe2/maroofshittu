"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * SayHello Component
 *
 * The closing call-to-action band used at the bottom of pages, matching the
 * template's "Say Hello." footer: floating avatar, big headline, and a link
 * to the contact page.
 *
 * @returns {JSX.Element} The CTA section.
 */
export function SayHello() {
  return (
    <section className="bg-background py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Image
          src="/avatar.jpg"
          alt="Maroof Shittu"
          width={96}
          height={96}
          className="rounded-full border-4 border-primary object-cover w-24 h-24 mx-auto mb-8"
        />
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Say Hello.
        </h2>
        <Link
          href="/contact"
          className="text-foreground font-semibold hover:text-primary transition-colors inline-flex items-center gap-2"
        >
          hi@maroofshittu.com <span className="text-lg">↗</span>
        </Link>
      </motion.div>
    </section>
  );
}
