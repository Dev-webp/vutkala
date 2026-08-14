import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import logo from "../assets/vjcvutkal.jpeg";
import "./Footer.css";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Industries", path: "/industry" },
    ],
  },
  {
    title: "Talent",
    links: [
      { label: "Find Jobs", path: "/jobs" },
      { label: "Career Opportunities", path: "/jobs" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Hire Talent", path: "/hire" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

function Footer() {
  return (
    <footer className="vutkala-footer">
      <div className="footer-gradient-line" />
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link" aria-label="Vutkala Global Technologies home">
              <img src={logo} alt="Vutkala Global Technologies" className="footer-logo" />
            </Link>
            <p className="footer-description">People. Technology. Industry.</p>
          </div>

          {footerColumns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h2 className="footer-column-title">{column.title}</h2>
              <nav aria-label={column.title}>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path}>{link.label}<FiArrowUpRight aria-hidden="true" /></Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        <div className="footer-cta">
          <div className="footer-cta-content">
            <span className="footer-cta-eyebrow">LET&apos;S BUILD WHAT COMES NEXT</span>
            <h2>Ready to move your <span>business forward?</span></h2>
          </div>
          <Link to="/contact" className="footer-cta-button">Contact Us <FiArrowUpRight aria-hidden="true" /></Link>
        </div>

        <div className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Vutkala Global Technologies.</p>
          <div className="footer-legal" aria-label="Legal links">
            <span>Privacy Policy</span><span aria-hidden="true">|</span><span>Terms of Use</span><span aria-hidden="true">|</span><span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
