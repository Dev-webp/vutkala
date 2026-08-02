import "./DigitalSection.css";
import digitalImg from "../../assets/services/digitall.png";

import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function DigitalSection() {

  return (

    <section
      className="digital-section"
      id="digital"
    >

      <div className="digital-container">

        {/* IMAGE */}

        <div className="digital-image">

          <img
            src={digitalImg}
            alt="Digital Transformation"
          />

        </div>

        {/* CONTENT */}

        <div className="digital-content">

          <span className="digital-tag">
            DIGITAL TRANSFORMATION
          </span>

          <h2>

            Transforming Businesses
            <span> For The Digital Future</span>

          </h2>

          <p>

            We help organizations modernize legacy
            applications, automate business processes,
            migrate to the cloud, and embrace digital
            technologies that improve productivity,
            customer experience, and long-term growth.

          </p>

          <div className="digital-features">

            <div>

              <FaCheckCircle />

              <span>Cloud Transformation</span>

            </div>

            <div>

              <FaCheckCircle />

              <span>Application Modernization</span>

            </div>

            <div>

              <FaCheckCircle />

              <span>Business Automation</span>

            </div>

            <div>

              <FaCheckCircle />

              <span>Enterprise Mobility</span>

            </div>

            <div>

              <FaCheckCircle />

              <span>AI Transformation</span>

            </div>

            <div>

              <FaCheckCircle />

              <span>Legacy System Migration</span>

            </div>

          </div>

          <Link
            to="/contact"
            className="digital-btn"
          >

            Explore More

            <FaArrowRight />

          </Link>

        </div>

      </div>

    </section>

  );

}

export default DigitalSection;