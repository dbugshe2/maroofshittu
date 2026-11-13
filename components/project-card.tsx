"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

/**
 * Props for the ProjectCard component.
 */
interface ProjectCardProps {
  /** The project to display. */
  project: Project;
  /** Position in the list, rendered as a padded index on the card. */
  index: number;
  /**
   * Determines the alignment of the text card relative to the image.
   * "right" overlays the text card on the right side of the image.
   * "left" overlays the text card on the left side.
   * Defaults to "right".
   */
  alignText?: "left" | "right";
}

/**
 * ProjectCard Component
 *
 * Displays a visually appealing project preview card. It consists of an image and
 * an overlapping text card with an index, title, description, and an optional
 * link to the project. Uses Framer Motion for scroll reveal and hover animations.
 *
 * @param {ProjectCardProps} props - The properties for configuring the project card.
 * @returns {JSX.Element} The animated project card component.
 */
export default function ProjectCard({
  project,
  index,
  alignText = "right",
}: ProjectCardProps) {
  const { title, description, imageSrc, tags, href } = project;

  const image = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={800}
        height={600}
        className="w-full h-full object-cover aspect-square md:aspect-[4/3]"
      />
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative w-full max-w-4xl mx-auto my-24 md:my-32 flex flex-col md:flex-row items-center ${
        alignText === "left" ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* The Image Container */}
      {href ? (
        <Link
          href={href}
          className="w-full md:w-2/3 overflow-hidden rounded-[2rem] group block cursor-pointer"
        >
          {image}
        </Link>
      ) : (
        <div className="w-full md:w-2/3 overflow-hidden rounded-[2rem]">
          {image}
        </div>
      )}

      {/* The Overlapping Info Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className={`relative bg-card p-8 shadow-xl w-11/12 md:w-1/2 md:absolute top-1/2 md:-translate-y-1/2 z-10 mt-[-40px] md:mt-0 ${
          alignText === "right" ? "md:-right-12" : "md:-left-12"
        }`}
      >
        <span className="absolute top-6 right-8 text-sm font-semibold text-foreground/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-3xl font-bold mb-4 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {description}
        </p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <li
                key={tag}
                className="text-xs font-medium text-foreground/60 border border-foreground/15 rounded-full px-3 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        {href && (
          <Link
            href={href}
            className="text-foreground font-semibold hover:text-primary transition-colors flex items-center gap-2"
          >
            Discover <span className="text-lg">↗</span>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
