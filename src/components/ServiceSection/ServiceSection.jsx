import "./ServiceSection.css";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function ServiceSection({
  tag,
  title,
  highlight,
  description,
  image,
  features,
  button,
  reverse = false,
}) {
  return (
    <section className="service-section">

      <div
        className={`service-container ${
          reverse ? "reverse" : ""
        }`}
      >

        {/* LEFT CONTENT */}

        <div className="service-content">

          <span className="service-tag">
            {tag}
          </span>

          <h2>
            {title}
            <br />
            <span>{highlight}</span>
          </h2>

          <p>{description}</p>

          <div className="service-features">

            {features.map((feature, index) => (

              <div key={index}>

                <FaCheckCircle />

                <span>{feature}</span>

              </div>

            ))}

          </div>

          <Link
            to="/contact"
            className="service-btn"
          >
            {button}

            <FaArrowRight />
          </Link>

        </div>

        {/* IMAGE */}

        <div className="service-image">

          <img
            src={image}
            alt={title}
          />

        </div>

      </div>

    </section>
  );
}

export default ServiceSection;