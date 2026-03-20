import Image from "next/image";

const navLinks = [
  { href: "#", label: "Work" },
  { href: "#", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl flex gap-2 items-center font-bold text-brand-navy">
            <Image src="/vercel.svg" alt="Logo" width={32} height={32} />
            MS
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, idx) => (
              <a
                key={`${link.href}-${idx}`}
                href={link.href}
                className="text-foreground hover:text-foreground/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
