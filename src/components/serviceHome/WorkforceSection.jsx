import "./WorkforceSection.css";
import workforceImg from "../../assets/services/Workforcee.png";

import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function WorkforceSection() {

  return (

    <section
      className="workforce-section"
      id="workforce"
    >

      <div className="workforce-container">

        {/* IMAGE */}

        <div className="workforce-image">

          <img
            src={workforceImg}
            alt="Workforce Solutions"
          />

        </div>

        {/* CONTENT */}

        <div className="workforce-content">

          <span className="workforce-tag">
            WORKFORCE SOLUTIONS
          </span>

          <h2>

            Building
            <span> High-Performing Teams </span>
            Across Industries

          </h2>

          <p>

            We help organizations identify, recruit,
            and retain exceptional professionals through
            flexible staffing models, executive hiring,
            and global workforce solutions tailored to
            business needs.

          </p>

          <div className="workforce-features">

            <div>
              <FaCheckCircle />
              <span>Contract Staffing</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Permanent Staffing</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Executive Search</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Global Hiring</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Remote Teams</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Payroll Outsourcing</span>
            </div>

          </div>

          <Link
            to="/contact"
            className="workforce-btn"
          >

            Explore More

            <FaArrowRight />

          </Link>

        </div>

      </div>

    </section>

  );

}

export default WorkforceSection;