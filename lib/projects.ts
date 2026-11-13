/**
 * Featured projects shown in the "Selected work" section on the homepage.
 *
 * Static for now — this list is shaped to be swapped for an Outstatic
 * collection fetch once the CMS setup lands: each entry maps 1:1 to a
 * project document (slug, title, description, cover image, links, tags).
 */
export interface Project {
  /** URL-safe identifier; also used for the future detail route. */
  slug: string;
  /** Project name shown on the card. */
  title: string;
  /** One-line description shown under the title. */
  description: string;
  /** Cover image path under `public/`. */
  imageSrc: string;
  /** Short stack/discipline tags shown on the card. */
  tags: string[];
  /** Where the "Discover" link points. Omit to render the card without a link. */
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "spen",
    title: "Spen",
    description:
      "A personal finance app for tracking budgets, transactions, net worth, and shared household spending.",
    imageSrc: "/work/spen.jpg",
    tags: ["Next.js", "Supabase", "Cloudflare"],
    href: "https://spen.maroof.sh",
  },
  {
    slug: "medbase",
    title: "Medbase",
    description:
      "A think-tank platform and headless CMS powering health policy content and campaign landing pages across Africa.",
    imageSrc: "/work/medbase.jpg",
    tags: ["Astro", "Cloudflare", "CMS"],
  },
  {
    slug: "slothwrk",
    title: "Slothwrk",
    description:
      "Marketing site and Payload-powered CMS for a small digital studio, deployed at the edge.",
    imageSrc: "/work/slothwrk.jpg",
    tags: ["Next.js", "Payload", "Workers"],
  },
  {
    slug: "stack-diagram",
    title: "Stack Diagram",
    description:
      "A little tool for sketching and sharing software architecture diagrams.",
    imageSrc: "/work/stack-diagram.jpg",
    tags: ["React", "TypeScript"],
  },
  {
    slug: "the-room",
    title: "The Room",
    description:
      "A scroll-driven, first-person WebGL walkthrough of my desk, built with React Three Fiber.",
    imageSrc: "/work/room.jpg",
    tags: ["WebGL", "R3F", "GSAP"],
  },
];
