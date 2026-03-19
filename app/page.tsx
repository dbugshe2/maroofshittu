import HeroTitle from "@/components/hero-title";

export default function Home() {
  return (
    <>
      <section className="bg-brand-pink min-h-screen">
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
        {/* Footer CTA */}
      </section>
    </>
  );
}
