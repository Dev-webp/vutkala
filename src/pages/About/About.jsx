import AboutHero from "../../components/About/AboutHero";
import AboutValues from "../../components/About/AboutValues";
import JourneyTimeline from "../../components/About/JourneyTimeline";
import TechExpertise from "../../components/About/TechExpertise";
import DeliveryModel from "../../components/About/DeliveryModel";
import OurPeople from "../../components/About/OurPeople";
import AboutCTA from "../../components/About/AboutCTA";

import "./About.css";

function About() {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutValues />
      <JourneyTimeline />
      <TechExpertise />
      <DeliveryModel />
      <OurPeople />
      <AboutCTA />
   
    </main>
  );
}

export default About;