import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ServicesSection.css";


import image1 from "../../assets/homeservice/image1.png";
import image2 from "../../assets/homeservice/image2.png"
import image3 from "../../assets/homeservice/image3.png"
import image4 from "../../assets/homeservice/image4.png"
import image5 from "../../assets/homeservice/image5.png"


const services = [
  {
    id: "01",
    title: "IT Staffing",
    description:
      "Rapid access to vetted technology and business talent, matched to your team, skills and timeline.",
    image: image1,
    link: "/services",
  },
  {
    id: "02",
    title: "Workforce Solutions",
    description:
      "Flexible workforce strategies designed around your organization's needs, goals and growth.",
    image: image2,
    link: "/services",
  },
  {
    id: "03",
    title: "Technology Solutions",
    description:
      "Scalable technology solutions that help organizations improve operations, efficiency and digital capability.",
    image: image3,
    link: "/services",
  },
  {
    id: "04",
    title: "Digital Transformation",
    description:
      "Helping organizations modernize processes, adopt new technologies and create better digital experiences.",
    image:image4,
    link: "/services",
  },
  {
    id: "05",
    title: "Consulting",
    description:
      "Strategic expertise that helps businesses make informed decisions and move forward with confidence.",
    image: image5,
    link: "/services",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleServiceActivate = (index) => {
    setActiveService(index);
  };

  return (
    <section
      ref={sectionRef}
      className={`vutkala-services ${
        isVisible ? "vutkala-services--visible" : ""
      }`}
      aria-labelledby="vutkala-services-title"
    >
      <div className="vutkala-services__container">

        {/* HEADER */}
        <header className="vutkala-services__header">
          <span className="vutkala-services__eyebrow">
            Services
          </span>

          <h2
            id="vutkala-services-title"
            className="vutkala-services__title"
          >
            Workforce.
            <br />
            Technology. Growth.
          </h2>

          <p className="vutkala-services__intro">
            Connecting organizations with the people, technology and
            expertise they need to move forward.
          </p>
        </header>

        {/* SERVICES LIST */}
        <div
          className="vutkala-services__list"
          role="list"
          aria-label="Vutkala Global services"
        >
          {services.map((service, index) => {
            const isActive = activeService === index;

            return (
              <article
                key={service.id}
                className={`vutkala-service ${
                  isActive ? "vutkala-service--active" : ""
                }`}
                role="listitem"
                onMouseEnter={() => handleServiceActivate(index)}
              >
                <button
                  type="button"
                  className="vutkala-service__trigger"
                  aria-expanded={isActive}
                  aria-controls={`service-content-${service.id}`}
                  onClick={() => handleServiceActivate(index)}
                  onFocus={() => handleServiceActivate(index)}
                >
                  {/* NUMBER */}
                  <span
                    className="vutkala-service__number"
                    aria-hidden="true"
                  >
                    {service.id}
                  </span>

                  {/* TITLE */}
                  <span className="vutkala-service__title">
                    {service.title}
                  </span>

                  {/* ARROW */}
                  <span
                    className="vutkala-service__arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>

                {/* EXPANDED CONTENT */}
                <div
                  id={`service-content-${service.id}`}
                  className="vutkala-service__content"
                  aria-hidden={!isActive}
                >
                  <div className="vutkala-service__details">
                    <p className="vutkala-service__description">
                      {service.description}
                    </p>

                    <Link
                      to={service.link}
                      className="vutkala-service__link"
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>Explore Service</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* IMAGE */}
                  <div className="vutkala-service__media">
                    <img
                      src={service.image}
                      alt={`${service.title} services`}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
