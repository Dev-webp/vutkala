import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Navbar from "../../components/Navbar/Navbar"
import Journey from "../../components/Journey/JourneySection.jsx"
import HomeServices from "../../components/HomeServices/Serivce.jsx"
import GlobalDelivey from "../../components/GlobalFolder/GlobalDelivery.jsx"

function Home() {
  return (


<div>
    <Navbar />
    
  <Hero />
  <Journey />
  <HomeServices />
  <WhyChoose />

<GlobalDelivey />

</div>
  );
}

export default Home;