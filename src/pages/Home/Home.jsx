import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Navbar from "../../components/Navbar/Navbar"
function Home() {
  return (


<div>
    <Navbar />
    
  <Hero />
  <ServicesSection />
  <WhyChoose />
</div>
  );
}

export default Home;