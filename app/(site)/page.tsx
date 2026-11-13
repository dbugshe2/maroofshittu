import HeroTitle from "@/components/hero-title";
import { SayHello } from "@/components/say-hello";
import { SelectedWork } from "@/components/selected-work";

/**
 * Home Component
 *
 * The landing page for the application. It acts as an entry point, featuring
 * the primary hero section, the selected work showcase, and a closing
 * call-to-action.
 *
 * @returns {JSX.Element} The rendered homepage component.
 */
export default function Home() {
  return (
    <>
      <section className="bg-background">
        <HeroTitle />
      </section>

      <SelectedWork />

      <SayHello />
    </>
  );
}
