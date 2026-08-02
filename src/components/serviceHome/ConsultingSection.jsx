import "./ConsultingSection.css";
import consultingImg from "../../assets/services/consultingservice.png";

import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function ConsultingSection() {
  return (
    <section className="consulting-section" id="consulting">

      <div className="consulting-container">

        {/* LEFT */}

        <div className="consulting-content">

          <span className="consulting-tag">
            CONSULTING SERVICES
          </span>

          <h2>
            Strategic
            <span> Consulting </span>
            For Sustainable Growth
          </h2>

          <p>
            Our consulting experts partner with organizations to
            solve complex business challenges, optimize operations,
            and implement technology strategies that deliver measurable
            business value and long-term success.
          </p>

          <div className="consulting-features">

            <div>
              <FaCheckCircle />
              <span>Business Consulting</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Technology Consulting</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Cloud Strategy</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Enterprise Architecture</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Digital Advisory</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Process Optimization</span>
            </div>

          </div>

          <Link
            to="/contact"
            className="consulting-btn"
          >
            Explore More
            <FaArrowRight />
          </Link>

        </div>

        {/* RIGHT */}

        <div className="consulting-image">

          <img
            src={consultingImg}
            alt="Consulting Services"
          />

        </div>

      </div>

    </section>
  );
}

export default ConsultingSection;