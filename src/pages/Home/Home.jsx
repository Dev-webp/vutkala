import Hero from "../../components/Hero/Hero"
import IntroductionAbout from "../../components/IntroductionAbout/IntroductionAbout";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import HelpPaths from "../../components/HelpPaths/HelpPaths";
import IndustryEcosystem from "../../components/IndustryEcosystem/IndustryEcosystem";
import WhyVutkala from "../../components/WhyVutkala/WhyVutkala";
import FinalCTA from "../../components/FinalCTA/FinalCTA";

function Home() {
  return (
    <main>
      <Hero />

      <IntroductionAbout />

      <ServicesSection />

      <HelpPaths />

      <IndustryEcosystem />

      <WhyVutkala />

      <FinalCTA />
    </main>
  );
}

export default Home;