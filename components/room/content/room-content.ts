// Personal content shown in the room. EDIT THIS FILE to update the room.
// Placeholder copy is marked with TODO(maroof) — replace with real content.

export interface RoomContent {
  about: {
    headline: string;
    paragraphs: string[];
    influences: string[];
    reading: { title: string; author: string }[];
  };
  projects: { name: string; blurb: string; href?: string; tags: string[] }[];
  gallery: { src: string; caption: string; alt: string }[];
  hobbies: { intro: string; music: string[]; activities: string[] };
  now: { building: string[]; goals: string[]; stickyNotes: string[] };
  contact: { email: string; socials: { label: string; href: string }[] };
}

export const roomContent: RoomContent = {
  about: {
    headline: "A reclusive sloth who builds cool stuff.",
    paragraphs: [
      "I'm Maroof — a software engineer who likes quiet rooms, warm light, and shipping things that feel good to use.",
      "TODO(maroof): a couple more sentences about your story and how you got here.",
    ],
    influences: ["TODO(maroof): people/ideas that shaped you"],
    reading: [{ title: "TODO(maroof): a book you love", author: "Author" }],
  },
  projects: [
    {
      name: "Playground",
      blurb: "A collection of mini-apps, utilities, and experiments built to eventually live in the wild.",
      href: "/showcase",
      tags: ["next.js", "tools"],
    },
    {
      name: "Drive Link Converter",
      blurb: "Turns Google Drive share links into direct/embeddable URLs.",
      href: "/showcase",
      tags: ["utility"],
    },
    { name: "TODO(maroof): another project", blurb: "Short description.", tags: ["tag"] },
  ],
  gallery: [
    { src: "/avatar.jpg", caption: "TODO(maroof): who/where", alt: "Maroof" },
    { src: "/work1.jpg", caption: "TODO(maroof): a place or project", alt: "Work 1" },
    { src: "/work2.jpg", caption: "TODO(maroof): a place or project", alt: "Work 2" },
  ],
  hobbies: {
    intro: "When I'm away from the keyboard…",
    music: ["TODO(maroof): an artist/genre you love"],
    activities: ["TODO(maroof): skating? gaming? something else"],
  },
  now: {
    building: ["This room", "TODO(maroof): what you're building now"],
    goals: ["TODO(maroof): a current goal"],
    stickyNotes: ["stay curious", "ship small", "TODO(maroof): your note"],
  },
  contact: {
    email: "hi@maroofshittu.com",
    socials: [{ label: "Email", href: "mailto:hi@maroofshittu.com" }],
  },
};
