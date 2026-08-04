import "./ServiceSection.css";
import { FaArrowRight } from "react-icons/fa";
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

      <div className="service-card">

        <div
          className={`service-container ${
            reverse ? "reverse" : ""
          }`}
        >

          {/* CONTENT */}

          <div className="service-content">

            <span className="service-tag">
              {tag}
            </span>

            <h2>
              {title}
              <span> {highlight}</span>
            </h2>

            <p>{description}</p>

            {/* Statistics */}

            <div className="service-stats">

              <div>
                <h3>500+</h3>
                <span>Clients</span>
              </div>

              <div>
                <h3>15+</h3>
                <span>Years</span>
              </div>

              <div>
                <h3>25+</h3>
                <span>Countries</span>
              </div>

            </div>

            {/* Features */}

            <div className="service-features">

              {features.map((feature, index) => {

                const Icon = feature.icon;

                return (

                  <div
                    className="feature-card"
                    key={index}
                  >

                    <Icon />

                    <span>{feature.text}</span>

                  </div>

                );

              })}

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
              loading="lazy"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default ServiceSection;