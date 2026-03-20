import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#", label: "Work" },
  { href: "#", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl flex gap-2 items-center font-bold text-brand-navy"
            >
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              MS
            </Link>
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, idx) => (
                <Link
                  key={`${link.href}-${idx}`}
                  href={link.href}
                  className="text-foreground hover:text-foreground/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16 mt-4" />
    </>
  );
}
