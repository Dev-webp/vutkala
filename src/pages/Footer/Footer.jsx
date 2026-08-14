
import React from "react";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", path: "/about" },
    { label: "Why Vutkala", path: "/why-vutkala" },
    { label: "Leadership", path: "/leadership" },
    { label: "Careers", path: "/careers" },
    { label: "News & Insights", path: "/news" },
  ];

  const serviceLinks = [
    { label: "IT Staffing", path: "/services/it-staffing" },
    {
      label: "Workforce Solutions",
      path: "/services/workforce-solutions",
    },
    {
      label: "Technology Solutions",
      path: "/services/technology-solutions",
    },
    {
      label: "Digital Transformation",
      path: "/services/digital-transformation",
    },
    {
      label: "Consulting",
      path: "/services/consulting",
    },
  ];

  const industryLinks = [
    {
      label: "IT & Technology",
      path: "/industries/it-technology",
    },
    {
      label: "Manufacturing",
      path: "/industries/manufacturing",
    },
    {
      label: "Healthcare",
      path: "/industries/healthcare",
    },
    {
      label: "BFSI",
      path: "/industries/bfsi",
    },
    {
      label: "Education",
      path: "/industries/education",
    },
  ];

  const resourceLinks = [
    { label: "Blog", path: "/blog" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Whitepapers", path: "/whitepapers" },
    { label: "FAQs", path: "/faqs" },
    { label: "Events", path: "/events" },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: FaLinkedinIn,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: FaInstagram,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: FaYoutube,
    },
  ];

  return (
    <footer className="vutkala-footer">

      {/* TOP BRAND LINE */}
      <div className="footer-gradient-line" />

      {/* DECORATIVE BACKGROUND */}
      <div
        className="footer-decoration footer-decoration-one"
        aria-hidden="true"
      />

      <div
        className="footer-decoration footer-decoration-two"
        aria-hidden="true"
      />

      <div className="footer-container">

        {/* =================================================
            MAIN FOOTER
        ================================================== */}

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">

            <a
              href="/"
              className="footer-logo-link"
              aria-label="Vutkala Global Technologies"
            >
              <img
                src="/assets/logo.png"
                alt="Vutkala Global Technologies"
                className="footer-logo"
              />
            </a>

            <p className="footer-description">
              We connect people, technology and opportunity to help
              organizations build future-ready teams, solve real
              challenges and achieve meaningful business outcomes.
            </p>

            {/* SOCIAL MEDIA */}

            <div className="footer-socials">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}

            </div>
          </div>


          {/* COMPANY */}

          <FooterColumn
            title="Company"
            links={companyLinks}
          />


          {/* SERVICES */}

          <FooterColumn
            title="Our Services"
            links={serviceLinks}
          />


          {/* INDUSTRIES */}

          <FooterColumn
            title="Industries"
            links={industryLinks}
          />


          {/* RESOURCES */}

          <FooterColumn
            title="Resources"
            links={resourceLinks}
          />


          {/* CONTACT */}

          <div className="footer-contact">

            <h3 className="footer-column-title">
              Get In Touch
            </h3>


            {/* LOCATION */}

            <div className="footer-contact-item">

              <div
                className="footer-contact-icon"
                aria-hidden="true"
              >
                <FaMapMarkerAlt size={15} />
              </div>

              <div>

                <span className="footer-contact-label">
                  Location
                </span>

                <p>
                  Your Vutkala office address
                </p>

              </div>

            </div>


            {/* EMAIL */}

            <div className="footer-contact-item">

              <div
                className="footer-contact-icon"
                aria-hidden="true"
              >
                <FaEnvelope size={15} />
              </div>

              <div>

                <span className="footer-contact-label">
                  Email
                </span>

                <a href="mailto:info@vutkalaglobal.com">
                  info@vutkalaglobal.com
                </a>

              </div>

            </div>


            {/* PHONE */}

            <div className="footer-contact-item">

              <div
                className="footer-contact-icon"
                aria-hidden="true"
              >
                <FaPhoneAlt size={14} />
              </div>

              <div>

                <span className="footer-contact-label">
                  Phone
                </span>

                <a href="tel:+910000000000">
                  +91 00000 00000
                </a>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            CTA
        ================================================== */}

        <div className="footer-cta">

          <div className="footer-cta-content">

            <span className="footer-cta-eyebrow">
              LET&apos;S BUILD WHAT COMES NEXT
            </span>

            <h2>
              Ready to move your
              <span> business forward?</span>
            </h2>

          </div>


          <a
            href="/contact"
            className="footer-cta-button"
          >
            Contact Us

            <FiArrowUpRight
              size={18}
              strokeWidth={1.8}
            />
          </a>

        </div>


        {/* DIVIDER */}

        <div className="footer-divider" />


        {/* =================================================
            BOTTOM
        ================================================== */}

        <div className="footer-bottom">

          <p className="footer-copyright">
            © {currentYear} Vutkala Global Technologies.
            All rights reserved.
          </p>


          <div className="footer-legal">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <span
              className="footer-legal-separator"
              aria-hidden="true"
            >
              |
            </span>

            <a href="/terms-of-use">
              Terms of Use
            </a>

            <span
              className="footer-legal-separator"
              aria-hidden="true"
            >
              |
            </span>

            <a href="/sitemap">
              Sitemap
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};


/* =========================================================
   FOOTER COLUMN
========================================================= */

const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">

      <h3 className="footer-column-title">
        {title}
      </h3>

      <nav aria-label={title}>

        <ul className="footer-links">

          {links.map((link) => (
            <li key={link.label}>

              <a href={link.path}>

                <span>
                  {link.label}
                </span>

                <FiArrowUpRight
                  className="footer-link-arrow"
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

              </a>

            </li>
          ))}

        </ul>

      </nav>

    </div>
  );
};

export default Footer;
