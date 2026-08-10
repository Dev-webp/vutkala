import "./Footer.css";
import logo from "../../assets/vjcvutkal.jpeg";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}

        <div className="footer-about">

          <img src={logo} alt="Vutkala Global" />

          <p>
            Vutkala Global connects businesses with exceptional talent and
            delivers innovative technology solutions across the USA and India.
          </p>

          <div className="footer-social">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaTwitter /></a>

          </div>

        </div>

        {/* Company */}

        <div className="footer-links">

          <h4>Company</h4>

          <a href="/">Home</a>

          <a href="/about">About</a>

          <a href="/jobs">Jobs</a>

          <a href="/contact">Contact</a>

        </div>

        {/* Services */}

        <div className="footer-links">

          <h4>Services</h4>

          <a href="/">Technology Services</a>

          <a href="/">Workforce Solutions</a>

          <a href="/">Consulting</a>

          <a href="/">Digital Transformation</a>

        </div>

        {/* Resources */}

        <div className="footer-links">

          <h4>Resources</h4>

          <a href="/">Privacy Policy</a>

          <a href="/">Terms & Conditions</a>

          <a href="/">FAQ</a>

          <a href="/">Support</a>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h4>Contact</h4>

          <p>
            <FaMapMarkerAlt />
            Hyderabad, India
          </p>

          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>

          <p>
            <FaEnvelope />
            info@vutkalaglobal.com
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Vutkala Global. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;