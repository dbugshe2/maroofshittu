import HeroTitle from "@/components/hero-title";

/**
 * Home Component
 *
 * The landing page for the application. It acts as an entry point, featuring 
 * the primary hero section and directing users to various other sections.
 *
 * @returns {JSX.Element} The rendered homepage component.
 */
export default function Home() {
  return (
    <>
      <section className="bg-background">
        <HeroTitle />
      </section>

      {/* The background shifts cleanly here */}
      {/* <section className="bg-brand-blue py-32 px-4 rounded-t-[3rem] -mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-24">Selected work...</h2>
          <ProjectCard
            title="Orbiting Time"
            imageSrc="/work1.jpg"
            slug="orbiting-time"
            alignText="right"
          />
          <ProjectCard
            title="Beyond Canvas"
            imageSrc="/work2.jpg"
            slug="beyond-canvas"
            alignText="left"
          />
        </div>
      </section> */}

      <section className="bg-brand-pink py-32 text-center">
        more to come...
      </section>
    </>
  );
}
