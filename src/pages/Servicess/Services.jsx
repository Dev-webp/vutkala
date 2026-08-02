import ServiceHome from "../../components/ServiceHome/ServiceHome";
import TechnologySection from "../../components/ServiceHome/TechnologySection";
import WorkforceSection from "../../components/ServiceHome/WorkforceSection";
import ConsultingSection from "../../components/ServiceHome/ConsultingSection";
import DigitalSection from "../../components/ServiceHome/DigitalSection";

function Services() {
  return (
    <main className="services-page">
      <ServiceHome />
      <TechnologySection />
      <WorkforceSection />
      <ConsultingSection />
      <DigitalSection />
    </main>
  );
}

export default Services;