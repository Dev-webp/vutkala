import ContactHero from "../../components/Contact/ContactHero";
import ContactInfo from "../../components/Contact/ContactInfo";
import ContactForm from "../../components/Contact/ContactForm";
import OfficeLocations from "../../components/Contact/OfficeLocations";
import WhyContact from "../../components/Contact/WhyContact";
import FAQ from "../../components/Contact/FAQ";
import GoogleMap from "../../components/Contact/GoogleMap";
import ContactCTA from "../../components/Contact/ContactCTA";
import Footer from "../../components/Contact/Footer";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <OfficeLocations />
      <WhyContact />
      <FAQ />
      <GoogleMap />
      <ContactCTA />
      <Footer />
    </div>
  );
}

export default Contact;