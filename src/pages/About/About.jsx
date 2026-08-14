import AboutHero from "../../components/About/AboutHero";
import AboutValues from "../../components/About/AboutValues";
import JourneyTimeline from "../../components/About/JourneyTimeline";
import TechExpertise from "../../components/About/TechExpertise";

import OurPeople from "../../components/About/OurPeople";
import AboutCTA from "../../components/About/AboutCTA";
import OurStory from "../../components/About/OurStory/OurStory";
import OurApproach from "../../components/About/OurApproach";

import "./About.css";

function About() {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutValues />
      <JourneyTimeline />
      <OurStory />
      <OurApproach />
      <TechExpertise />
      <OurPeople />
      <AboutCTA />
    </main>
  );
}

export default About;