/**
 * Content for the /about page.
 *
 * Static for now — shaped to be swapped for an Outstatic collection/page
 * fetch once the CMS setup lands.
 */

/** One entry in the experience timeline. */
export interface Experience {
  /** Human-readable date range, e.g. "2023 — Present". */
  period: string;
  /** Role title. */
  role: string;
  /** Company, studio, or context. */
  place: string;
}

/** One step in the "My Process" section. */
export interface ProcessStep {
  title: string;
  body: string;
}

/** Words cycled through in the hero headline. */
export const ABOUT_ROTATING_WORDS = [
  "Websites",
  "Interfaces",
  "Experiences",
  "Tools",
];

export const ABOUT_BIO = [
  "I'm Maroof Shittu, a software engineer who likes building for the web — products, tools, and the occasional experiment. I care about fast pages, honest interfaces, and code that stays readable after the deadline passes.",
  "Most of my work lives between a Next.js app and the edge: finance trackers, CMS-driven sites, WebGL toys, and the small utilities I can't help but build. When I'm not shipping, I'm probably refactoring something that already worked.",
];

export const ABOUT_EXPERIENCE: Experience[] = [
  {
    period: "2024 — Present",
    role: "Founder",
    place: "Slothwrk",
  },
  {
    period: "2021 — Present",
    role: "Software Engineer",
    place: "Independent",
  },
  {
    period: "2020 — Present",
    role: "Open Source",
    place: "Various",
  },
];

export const ABOUT_SKILLS = [
  "TypeScript",
  "React & Next.js",
  "Cloudflare Workers",
  "Node.js",
  "Postgres & Supabase",
  "Tailwind CSS",
  "Motion & GSAP",
  "Headless CMS",
  "WebGL & R3F",
  "CI/CD & Tooling",
];

export const ABOUT_PROCESS: ProcessStep[] = [
  {
    title: "Understand",
    body: "Every project starts with the problem, not the stack. Who it's for, what it needs to do, and what \"done\" actually looks like before any code is written.",
  },
  {
    title: "Design",
    body: "Architecture and interface together — data models, routes, and component shapes sketched before the first commit, so the code has somewhere to go.",
  },
  {
    title: "Build & Ship",
    body: "Small, working increments over big-bang releases. Ship early, watch how it behaves in the real world, then iterate on what actually matters.",
  },
];
