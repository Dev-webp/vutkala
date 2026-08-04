import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>
            VUTKAL <span>GLOBAL</span>
          </h3>
          <p>
            Connecting USA & India enterprises with exceptional talent
            through staffing, executive search, and technology consulting.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="#" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" aria-label="Facebook">
              <FiFacebook />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/service">Services</Link>
          <Link to="/hire-talent">Hire Talent</Link>
          <Link to="/jobs">Jobs</Link>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <Link to="/service">Staffing Solutions</Link>
          <Link to="/service">Executive Search</Link>
          <Link to="/service">Digital Transformation</Link>
          <Link to="/service">Cloud Consulting</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>
            <FiMapPin /> Hyderabad, Telangana, India
          </p>
          <p>
            <FiPhone /> +91 40 1234 5678
          </p>
          <p>
            <FiMail /> info@vutkalglobal.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} VUTKAL Global Technologies. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;