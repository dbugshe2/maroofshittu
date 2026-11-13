import Link from "next/link";
import ProjectCard from "@/components/project-card";
import { PROJECTS } from "@/lib/projects";

/**
 * SelectedWork Component
 *
 * The "Selected work.." section on the homepage. Renders the featured
 * projects from `lib/projects` as alternating overlapping cards, followed by
 * a "See more work" link. Content is static until the Outstatic collection
 * lands — swap `PROJECTS` for a CMS fetch then.
 *
 * @returns {JSX.Element} The work section.
 */
export function SelectedWork() {
  return (
    <section id="work" className="bg-secondary py-32 px-4 rounded-t-[3rem]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground">Selected work..</h2>
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              alignText={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/showcase"
            className="text-foreground font-semibold hover:text-primary transition-colors inline-flex items-center gap-2"
          >
            See more work <span className="text-lg">●</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
