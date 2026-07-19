"use client";
import Link from "next/link";
import { roomContent } from "@/components/room/content/room-content";

/** No-WebGL / accessible representation: the same content as flat sections. */
export function Fallback2D() {
  const c = roomContent;
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="mb-2 text-4xl font-bold">My Room</h1>
      <p className="mb-12 text-muted-foreground">
        A 3D room lives here, but your device can&apos;t render it — so here&apos;s the tour in text.
      </p>

      <Section title="About">
        <p className="mb-2 font-semibold">{c.about.headline}</p>
        {c.about.paragraphs.map((p, i) => (
          <p key={i} className="mb-2 text-sm">{p}</p>
        ))}
      </Section>

      <Section title="Projects">
        <ul className="space-y-2">
          {c.projects.map((p) => (
            <li key={p.name} className="text-sm">
              <span className="font-semibold">{p.name}</span> — {p.blurb}{" "}
              {p.href && <Link href={p.href} className="underline">open</Link>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Now">
        <ul className="list-disc pl-5 text-sm">
          {c.now.building.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </Section>

      <Section title="Hobbies">
        <p className="text-sm">{c.hobbies.intro}</p>
        <p className="text-sm">{[...c.hobbies.music, ...c.hobbies.activities].join(" · ")}</p>
      </Section>

      <Section title="Contact">
        <a href={`mailto:${c.contact.email}`} className="underline">{c.contact.email}</a>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 border-2 border-border bg-card p-6 shadow-[4px_4px_0px_0px_var(--border)]">
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
