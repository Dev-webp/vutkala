import React, { useEffect, useState } from "react";

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
import hyderabad from "../../assets/hyderabad.png"
import { HiOutlineOfficeBuilding } from "react-icons/hi";

import { submitContactForm } from "../../services/contactService";

import "./Contact.css";

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const infoCards = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    lines: ["+91 9705007000", "Mon - Fri 9:00 AM - 6:00 PM"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    lines: ["admin@vutkalaglobal.com", "We reply within 24 hours"],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Our Office",
    lines: ["Hyderabad, India", "St. Petersburg, USA"],
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
    image: hyderabad,
    name: "Hyderabad",
    address: [
      "Ground Floor, Sundari Reddy Bhavan, 62/A, X' Road,",
      "Vengal Rao Nagar, Sanjeeva Reddy Nagar,",
      "Hyderabad, Telangana 500038",
    ],
    phone: "+91 9705007000",
    email: "admin@vutkalaglobal.com",

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ground+Floor+Sundari+Reddy+Bhavan+62%2FA+X+Road+Vengal+Rao+Nagar+Sanjeeva+Reddy+Nagar+Hyderabad+Telangana+500038",
  },

    {
    badge: "USA",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",

    name: "St. Petersburg, USA",

    address: [
      "7901 4th St N #8668,",
      "St. Petersburg, FL 33702",
    ],

    phone: "+1 304-814-3494",
    email: "admin@vutkalaglobal.com",

    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=7901+4th+St+N+%238668+St+Petersburg+FL+33702",
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

useEffect(() => {
  const elements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Animate only once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);



  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document
    .querySelectorAll(".contact-page .fade-up")
    .forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);


  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    subject: "",
    message: "",
  });

const [openFaq, setOpenFaq] = useState({
  side: "left",
  index: 0,
});

const [submissionStatus, setSubmissionStatus] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("========== CONTACT SUBMISSION ==========");
    console.log("FORM:", form);

    const response = await submitContactForm(form);

    console.log(
      "Contact API response:",
      response.data
    );

    if (response.data.success) {
      setSubmissionStatus({
        type: "success",
        title: "MESSAGE SENT",
        heading: "Thank You.",
        message:
          "Your message has been received. Our team will review your inquiry and get back to you shortly.",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        subject: "",
        message: "",
      });
    }
  } catch (error) {
    console.error(
      "Contact submission failed:",
      error.response?.data || error.message
    );

    setSubmissionStatus({
      type: "error",
      title: "MESSAGE NOT SENT",
      heading: "Something Went Wrong.",
      message:
        error.response?.data?.message ||
        "We couldn't send your message right now. Please try again.",
    });
  }
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
     
     {submissionStatus && (
  <div
    className="contact-modal-overlay"
    onClick={() => setSubmissionStatus(null)}
  >
    <div
      className={`contact-modal contact-modal--${submissionStatus.type}`}
      onClick={(e) => e.stopPropagation()}
    >

      <button
        type="button"
        className="contact-modal__close"
        onClick={() => setSubmissionStatus(null)}
        aria-label="Close"
      >
        ×
      </button>

      <div className="contact-modal__number">
        01
      </div>

      <div className="contact-modal__line" />

      <div className="contact-modal__icon">
        {submissionStatus.type === "success" ? "✓" : "!"}
      </div>

      <span className="contact-modal__eyebrow">
        {submissionStatus.title}
      </span>

      <h2>
        {submissionStatus.heading}
      </h2>

      <p>
        {submissionStatus.message}
      </p>

      <div className="contact-modal__meta">
        <span>PEOPLE</span>
        <span>TECHNOLOGY</span>
        <span>OPPORTUNITY</span>
      </div>

      <button
        type="button"
        className="contact-modal__button"
        onClick={() => setSubmissionStatus(null)}
      >
        CONTINUE
        <FaArrowRight />
      </button>

    </div>
  </div>
)}
     
     
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
        <div className="info-cards ">
          {infoCards.map((card) => (
            <div className="info-card scroll-reveal delay" key={card.title}>
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

    {/* =====================================================
        CONTACT FORM
        ===================================================== */}
    <div
      className="contact-form-wrap contact-scroll-reveal contact-reveal-left"
    >
      <h2>
        Send Us <span className="text-accent">a Message</span>
      </h2>

      <div className="heading-underline" />

      <form className="contact-form" onSubmit={handleSubmit}>

        {/* Full Name + Email */}
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


        {/* Phone + Company */}
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


        {/* Service */}
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


        {/* Subject */}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />


        {/* Message */}
        <textarea
          name="message"
          placeholder="Your Message *"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />


        {/* Submit */}
        <button
          type="submit"
          className="btn btn--primary btn--full"
        >
          Send Message <FaPaperPlane />
        </button>

      </form>
    </div>


    {/* =====================================================
        CONTACT IMAGE
        ===================================================== */}
    <div
      className="contact-image-wrap contact-scroll-reveal contact-reveal-right"
    >
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
      <section className="offices-section scroll-reveal fade-up">
        <div className="section-heading">
          <h2 className="sectionheadingh2" id="sectionheadingh2">
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
                <a
  href={office.mapUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="office-card__link"
>
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
   <section className="map-section fade-up" id="map">

  <div className="map-section__header">

    <span className="map-section__eyebrow">
      VUTKALA GLOBAL
    </span>

    <h2>
      Find Us <span>Worldwide.</span>
    </h2>

    <p>
      Visit one of our offices or connect with our team
      wherever your business takes you.
    </p>

  </div>


  <div className="map-section__frame">

    <iframe
      title="Vutkala Global Hyderabad Office"
      src="https://www.google.com/maps?q=Ground+Floor+Sundari+Reddy+Bhavan+62%2FA+X+Road+Vengal+Rao+Nagar+Sanjeeva+Reddy+Nagar+Hyderabad+Telangana+500038&output=embed"
      width="100%"
      height="100%"
      style={{
        border: 0,
        display: "block",
      }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />


    <div className="map-section__overlay">

      <div className="map-section__card">

        <div className="map-section__card-number">
          01
        </div>

        <div className="map-section__card-line" />

        <span className="map-section__card-label">
          INDIA OFFICE
        </span>

        <h3>
          Hyderabad
        </h3>

        <p>
          Ground Floor, Sundari Reddy Bhavan,
          62/A, X' Road, Vengal Rao Nagar,
          Sanjeeva Reddy Nagar,
          Hyderabad, Telangana 500038
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Ground+Floor+Sundari+Reddy+Bhavan+62%2FA+X+Road+Vengal+Rao+Nagar+Sanjeeva+Reddy+Nagar+Hyderabad+Telangana+500038"
          target="_blank"
          rel="noopener noreferrer"
          className="map-section__directions"
        >
          Get Directions
          <FaChevronRight />
        </a>

      </div>

    </div>

  </div>


  <div className="map-section__locations">

    <div className="map-location map-location--active">

      <span className="map-location__number">
        01
      </span>

      <div>
        <span className="map-location__country">
          INDIA
        </span>

        <h4>
          Hyderabad
        </h4>

        <p>
          Telangana, India
        </p>
      </div>

    </div>


    <a
      href="https://www.google.com/maps/search/?api=1&query=7901+4th+St+N+%238668+St+Petersburg+FL+33702"
      target="_blank"
      rel="noopener noreferrer"
      className="map-location"
    >

      <span className="map-location__number">
        02
      </span>

      <div>
        <span className="map-location__country">
          USA
        </span>

        <h4>
          St. Petersburg
        </h4>

        <p>
          Florida, USA
        </p>
      </div>

      <FaChevronRight className="map-location__arrow" />

    </a>

  </div>

</section>
      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="faq-section fade-up">
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
    
    </div>
  );
}