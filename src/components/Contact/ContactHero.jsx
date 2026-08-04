import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FaCloud, FaBrain, FaGlobeAmericas, FaCode } from "react-icons/fa";
import "./ContactHero.css";

function ContactHero() {
  const checklist = [
    "Technology Consulting",
    "Workforce Solutions",
    "Digital Transformation",
    "Global Talent Acquisition",
  ];

  return (
    <section className="contact-hero">
      <div className="contact-hero-glow glow-a"></div>
      <div className="contact-hero-glow glow-b"></div>

      <div className="contact-hero-inner">
        <div className="contact-hero-left">
          <span className="ch-badge">CONTACT US</span>

          <h1 className="ch-title">
            Let's Build Something <span>Great Together</span>
          </h1>

          <p className="ch-desc">
            Partner with VUTKAL Global Technologies to accelerate your
            digital transformation, build high-performing teams, and scale
            your enterprise with confidence across the USA and India.
          </p>

          <ul className="ch-checklist">
            {checklist.map((item, i) => (
              <li key={i} style={{ animationDelay: `${0.15 * i}s` }}>
                <span className="ch-check-icon">
                  <FiCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="ch-buttons">
            <button className="ch-primary-btn">
              Talk to an Expert <FiArrowRight />
            </button>
            <button className="ch-outline-btn">Explore Services</button>
          </div>
        </div>

        <div className="contact-hero-right">
          <div className="ch-illustration">
            <div className="ch-orbit-ring ring-1"></div>
            <div className="ch-orbit-ring ring-2"></div>

            <div className="ch-globe">
              <span className="ch-globe-label usa">USA</span>
              <span className="ch-globe-arrow">↔</span>
              <span className="ch-globe-label india">India</span>
            </div>

            <div className="ch-float-card fc-1">
              <span className="fc-icon">
                <FaCloud />
              </span>
              <span>Cloud</span>
            </div>

            <div className="ch-float-card fc-2">
              <span className="fc-icon">
                <FaBrain />
              </span>
              <span>AI</span>
            </div>

            <div className="ch-float-card fc-3">
              <span className="fc-icon">
                <FaCode />
              </span>
              <span>Technology</span>
            </div>

            <div className="ch-float-card fc-4">
              <span className="fc-icon">
                <FaGlobeAmericas />
              </span>
              <span>Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;