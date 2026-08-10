import "./ContactHero.css";
import HeroImage from "../../assets/contact/contact.png";

import { PhoneCall, CalendarDays } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="contact-hero">

      <div className="hero-overlay"></div>

      <img
        src={HeroImage}
        alt="Office Building"
        className="hero-image"
      />

      <div className="hero-content">

        <span className="hero-tag">
          CONTACT US
        </span>

        <h1>
          Let's Connect &
          <br />
          Build the
          <span> Future Together</span>
        </h1>

        <p>
          Whether you're looking for technology solutions,
          staffing services, digital transformation, or
          global consulting, our team is ready to help.
        </p>

        <div className="hero-buttons">

          <button className="btn-primary">
            Contact Us
            <PhoneCall size={18}/>
          </button>

          <button className="btn-secondary">
            Schedule a Call
            <CalendarDays size={18}/>
          </button>

        </div>

      </div>

    </section>
  );
}