import "./TechnologySection.css";
import tech from "../../assets/services/tec.png";

import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function TechnologySection() {
  return (
    <section className="technology-section" id="technology">
      <div className="technology-container">

        {/* Left Content */}
        <div className="technology-content">

          <span className="technology-tag">
            TECHNOLOGY SERVICES
          </span>

          <h2>
            Technology Solutions
            <br />
            <span>That Drive Innovation.</span>
          </h2>

          <p>
            VUTKAL Global Technologies empowers organizations with
            AI, Cloud Engineering, Software Development,
            Cybersecurity, DevOps, and Data Engineering solutions
            that accelerate innovation, improve operational
            efficiency, and enable long-term digital transformation.
          </p>

          <div className="technology-features">

            <div>
              <FaCheckCircle />
              <span>Artificial Intelligence</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Software Development</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Cloud Engineering</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Data Engineering</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Cyber Security</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>DevOps & Infrastructure</span>
            </div>

          </div>

          <Link to="/contact" className="technology-btn">
            Explore Technology
            <FaArrowRight />
          </Link>

        </div>

        {/* Right Image */}

        <div className="technology-image">

          <img
            src={tech}
            alt="Technology Services"
          />

        </div>

      </div>
    </section>
  );
}

export default TechnologySection;