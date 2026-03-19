export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-pink/95 backdrop-blur-sm border-b border-brand-navy/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-navy">
            Maroof Shittu
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#about"
              className="text-brand-navy hover:text-brand-navy/70 transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-brand-navy hover:text-brand-navy/70 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-brand-navy hover:text-brand-navy/70 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
