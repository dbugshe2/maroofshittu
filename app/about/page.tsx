import type { Metadata } from "next";
import Image from "next/image";
import { RotatingWord } from "@/components/rotating-word";
import { SayHello } from "@/components/say-hello";
import {
  ABOUT_BIO,
  ABOUT_EXPERIENCE,
  ABOUT_PROCESS,
  ABOUT_ROTATING_WORDS,
  ABOUT_SKILLS,
} from "@/lib/about";

export const metadata: Metadata = {
  title: "About | Maroof Shittu",
  description:
    "About Maroof Shittu — a software engineer building websites, interfaces, and tools.",
};

/**
 * AboutPage Component
 *
 * The standalone about page: hero with a rotating verb object, a bio, an
 * experience timeline, a skills list, a process section, and the shared
 * "Say Hello." call-to-action. Content lives in `lib/about` until the
 * Outstatic setup takes over.
 *
 * @returns {JSX.Element} The about page.
 */
export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background px-4 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg font-semibold mb-4 tracking-wide text-foreground">
              Hello, I&apos;m Maroof Shittu
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-foreground">
              I love to build
              <br />
              <RotatingWord words={ABOUT_ROTATING_WORDS} />
            </h1>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] bg-secondary -rotate-3" />
            <Image
              src="/avatar.jpg"
              alt="Maroof Shittu"
              width={480}
              height={600}
              className="relative rounded-[2rem] object-cover w-full aspect-[4/5]"
              priority
            />
          </div>
        </div>
      </section>

      {/* About me + Experience */}
      <section className="bg-card px-4 py-24 rounded-t-[3rem] -mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              About me
            </h2>
            {ABOUT_BIO.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Experience
            </h3>
            <ul className="divide-y divide-foreground/10">
              {ABOUT_EXPERIENCE.map((job) => (
                <li
                  key={`${job.period}-${job.role}`}
                  className="py-5 flex items-baseline justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-foreground">{job.role}</p>
                    <p className="text-sm text-muted-foreground">{job.place}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {job.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-card px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            I can help you with..
          </h3>
          <ul className="flex flex-wrap gap-3">
            {ABOUT_SKILLS.map((skill) => (
              <li
                key={skill}
                className="border border-foreground/15 text-foreground/80 rounded-full px-5 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary px-4 py-24 rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground/60 mb-2">
            Anyway, why work with me?
          </p>
          <h2 className="text-4xl font-bold text-foreground mb-12">
            My Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_PROCESS.map((step, i) => (
              <div key={step.title} className="bg-card p-8 shadow-xl">
                <span className="text-sm font-semibold text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2 mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SayHello />
    </>
  );
}
