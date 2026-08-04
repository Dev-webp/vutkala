import "./ServicesSection.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import { services } from "./servicesData";

function ServicesSection() {
  return (
    <section className="services-section">

      <div className="services-container">

        {/* Section Header */}

        <div className="section-header">

          <span className="section-tag">
            OUR SERVICES
          </span>

                  <h2>

          Comprehensive Technology

          <br/>

          <span>

          & Workforce Solutions

          </span>

          </h2>

          <p>
            VUTKAL Global Technologies delivers end-to-end technology,
            workforce, consulting, and digital transformation services
            that help enterprises innovate, scale, and succeed across
            USA and India.
          </p>

        </div>

        {/* Services Grid */}

        <div className="services-grid">

          {services.map((service, index) => (

            <article
              className="service-card"
              key={index}
            >

              {/* Image */}

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />

              </div>

              {/* Badge */}

              <span className="service-badge">
                {service.tag}
              </span>

              {/* Title */}

              <h3>
                {service.title}
              </h3>

              {/* Description */}

              <p className="service-description">
                {service.description}
              </p>

              {/* Features */}

              <div className="service-features">

                {service.features.map((feature, i) => {

                  const Icon = feature.icon;

                  return (

                    <div
                      className="feature-item"
                      key={i}
                    >

                      <div className="feature-icon">

                        <Icon />

                      </div>

                      <span>
                        {feature.text}
                      </span>

                    </div>

                  );

                })}

              </div>

              {/* Button */}

              <Link
                to="/services"
                className="service-button"
              >

                Learn More

                <FaArrowRight />

              </Link>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ServicesSection;