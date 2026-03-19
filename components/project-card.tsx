"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  slug: string;
  alignText?: "left" | "right";
}

export default function ProjectCard({
  title,
  imageSrc,
  slug,
  alignText = "right",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl mx-auto my-32 flex flex-col md:flex-row items-center"
    >
      {/* The Image Container */}
      <Link
        href={`/portfolio/${slug}`}
        className="w-full md:w-2/3 overflow-hidden rounded-[2rem] group block cursor-pointer"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
          <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={600}
            className="w-full h-auto object-cover aspect-square md:aspect-[4/3]"
          />
        </motion.div>
      </Link>

      {/* The Overlapping Info Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white rounded-3xl p-8 shadow-xl w-11/12 md:w-1/2 md:absolute top-1/2 md:-translate-y-1/2 z-10 mt-[-40px] md:mt-0 ${
          alignText === "right" ? "md:-right-12" : "md:-left-12"
        }`}
      >
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          A brief description of the project goes here. Showcasing beautiful
          interactions and smooth layouts.
        </p>
        <Link
          href={`/portfolio/${slug}`}
          className="text-brand-navy font-semibold hover:text-brand-orange transition-colors flex items-center gap-2"
        >
          View Project <span className="text-lg">↗</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
