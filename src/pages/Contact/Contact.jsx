import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaPaperPlane,
  FaPlus,
  FaMinus,
  FaChevronRight,
} from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./Contact.css";

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const infoCards = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    lines: ["+91 91000 12345", "Mon - Fri 9:00 AM - 6:00 PM"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    lines: ["info@vutkalaglobal.com", "We reply within 24 hours"],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Our Office",
    lines: ["Hyderabad, India", "Texas, USA"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday - Sunday: Closed"],
  },
];

const offices = [
  {
    badge: "INDIA",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80",
    name: "Hyderabad",
    address: ["Level 8, Mindspace, HITEC City,", "Hyderabad, Telangana 500081"],
    phone: "+91 91000 12345",
    email: "hyderabad@vutkalaglobal.com",
  },
  {
    badge: "USA",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
    name: "Texas, USA",
    address: ["2025 Guadalupe St, Suite 260,", "Austin, TX 78705, USA"],
    phone: "+1 (512) 123-4567",
    email: "usa@vutkalaglobal.com",
  },
];

const faqLeft = [
  {
    q: "How soon do you respond?",
    a: "Our team typically responds to all inquiries within 24 hours on business days. For urgent requests, we recommend calling our office directly.",
  },
  {
    q: "Do you provide staffing?",
    a: "Yes, we provide end-to-end staffing solutions across the USA and India, including contract, contract-to-hire, and permanent placements.",
  },
  {
    q: "Do you provide software development?",
    a: "Absolutely. We build custom web, mobile, and enterprise applications, and offer full-cycle software development from discovery to deployment.",
  },
];

const faqRight = [
  {
    q: "Can I schedule a consultation?",
    a: "Yes, you can schedule a free consultation call with our team using the 'Schedule a Call' button above or through the contact form.",
  },
  {
    q: "Is support available after project delivery?",
    a: "We offer ongoing maintenance and support packages after go-live, so your systems keep running smoothly long after launch.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes, we support clients globally with delivery teams across the USA and India, covering multiple time zones and engagement models.",
  },
];

const services = [
  "Software Development",
  "IT Staffing",
  "Digital Transformation",
  "Cloud & DevOps",
  "Global Consulting",
  "Other",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    subject: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState({ side: "left", index: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your API / email service.
    console.log("Contact form submitted:", form);
  };

  const toggleFaq = (side, index) => {
    setOpenFaq((prev) =>
      prev.side === side && prev.index === index
        ? { side: null, index: null }
        : { side, index }
    );
  };

  return (
    <div className="contact-page">
      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="badge">CONTACT US</span>
          <h1 className="hero__heading">
            Let&rsquo;s Connect &amp;
            <br />
            Build the <span className="gradient-text">Future Together</span>
          </h1>
          <p className="hero__description">
            Whether you&rsquo;re looking for technology solutions, staffing
            services, digital transformation, or global consulting, our team
            is ready to help.
          </p>
          <div className="hero__cta">
            <a href="#contact-form" className="btn btn--primary">
              Contact Us <FaArrowRight />
            </a>
            <a href="#schedule" className="btn btn--outline">
              Schedule a Call <FaPhoneAlt />
            </a>
          </div>
        </div>

        {/* Floating info cards */}
        <div className="info-cards">
          {infoCards.map((card) => (
            <div className="info-card" key={card.title}>
              <div className="info-card__icon">{card.icon}</div>
              <div className="info-card__text">
                <h4>{card.title}</h4>
                {card.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Contact form + image                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="contact-section" id="contact-form">
        <div className="contact-section__inner">
          <div className="contact-form-wrap">
            <h2>
              Send Us a <span className="text-accent">Message</span>
            </h2>
            <div className="heading-underline" />

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Service Required</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your Message *"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn btn--primary btn--full">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </div>

          <div className="contact-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern corporate office interior"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Global Offices                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="offices-section">
        <div className="section-heading">
          <h2>
            Our <span className="text-accent">Global</span> Offices
          </h2>
          <div className="heading-underline heading-underline--center" />
        </div>

        <div className="offices-grid">
          {offices.map((office) => (
            <div className="office-card" key={office.name}>
              <div className="office-card__image">
                <img src={office.image} alt={office.name} />
                <span className="office-card__badge">{office.badge}</span>
              </div>
              <div className="office-card__body">
                <h3>
                  <HiOutlineOfficeBuilding className="office-card__icon" />
                  {office.name}
                </h3>
                <p className="office-card__address">
                  {office.address.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <p className="office-card__contact">
                  <FaPhoneAlt /> {office.phone}
                </p>
                <p className="office-card__contact">
                  <FaEnvelope /> {office.email}
                </p>
                <a href="#map" className="office-card__link">
                  Directions <FaChevronRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Map                                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="map-section" id="map">
        <div className="map-section__frame">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80"
            alt="Map showing Hyderabad and USA office locations"
            className="map-section__image"
          />
          <span className="map-pin map-pin--hyderabad" title="Hyderabad, India">
            <FaMapMarkerAlt />
          </span>
          <span className="map-pin map-pin--usa" title="Texas, USA">
            <FaMapMarkerAlt />
          </span>

          <div className="map-card">
            <h4>Find Us on Map</h4>
            <p>
              Visit our offices or schedule a meeting with our experts.
            </p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary btn--sm"
            >
              View Larger Map
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="faq-section">
        <div className="section-heading">
          <h2>
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <div className="heading-underline heading-underline--center" />
        </div>

        <div className="faq-grid">
          <div className="faq-column">
            {faqLeft.map((item, index) => {
              const isOpen = openFaq.side === "left" && openFaq.index === index;
              return (
                <div
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                  key={item.q}
                >
                  <button
                    className="faq-item__question"
                    onClick={() => toggleFaq("left", index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </button>
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-column">
            {faqRight.map((item, index) => {
              const isOpen = openFaq.side === "right" && openFaq.index === index;
              return (
                <div
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                  key={item.q}
                >
                  <button
                    className="faq-item__question"
                    onClick={() => toggleFaq("right", index)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <FaMinus /> : <FaPlus />}
                  </button>
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Final CTA                                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="final-cta">
        <div className="final-cta__inner">
          <div className="final-cta__icon">
            <FaPaperPlane />
          </div>
          <div className="final-cta__text">
            <h2>
              Ready to Start Your <span className="text-accent">Next Project?</span>
            </h2>
            <p>Let&rsquo;s discuss your goals and build something great together.</p>
          </div>
          <a href="#contact-form" className="btn btn--primary btn--lg">
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
}