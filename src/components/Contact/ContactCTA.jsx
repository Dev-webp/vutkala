import { FiUsers, FiCalendar } from "react-icons/fi";
import "./ContactCTA.css";

function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="cta-glow cta-glow-a"></div>
      <div className="cta-glow cta-glow-b"></div>

      <div className="cta-inner">
        <h2>Ready to Transform Your Business?</h2>
        <p>
          Partner with VUTKAL Global Technologies to build high-performing
          teams, modernize your technology stack, and accelerate growth
          across the USA and India.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary-btn">
            <FiUsers /> Hire Talent
          </button>
          <button className="cta-outline-btn">
            <FiCalendar /> Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;