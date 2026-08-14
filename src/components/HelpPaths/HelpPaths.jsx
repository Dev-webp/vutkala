import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HelpPaths.css";

const helpPaths = [
  {
    id: "01",
    eyebrow: "FOR RECRUITER",
    title: (
      <>
        Hire
        <br />
        Talent.
      </>
    ),
    description:
      "Connect with exceptional technology and business talent that helps your organization build stronger teams.",
    cta: "Hire Talent",
    link: "/hire",
    accent: "orange",
  },
  {
    id: "02",
    eyebrow: "FOR JOB SEEKERS",
    title: (
      <>
        Find
        <br />
        Jobs.
      </>
    ),
    description:
      "Discover opportunities that match your skills, experience and career ambitions.",
    cta: "Find Jobs",
    link: "/jobs",
    accent: "pink",
  },
  {
    id: "03",
    eyebrow: "FOR BUSINESSES",
    title: (
      <>
        Transform
        <br />
        Your Business.
      </>
    ),
    description:
      "Explore technology solutions, digital transformation and consulting designed around your business needs.",
    cta: "Explore Services",
    link: "/services",
    accent: "gradient",
  },
];

const HelpPaths = () => {
  const sectionRef = useRef(null);
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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`help-paths ${
        isVisible ? "help-paths--visible" : ""
      }`}
      aria-labelledby="help-paths-title"
    >
      <div className="help-paths__container">

        {/* =========================================
            HEADER
        ========================================== */}

        <header className="help-paths__header">
          <span className="help-paths__eyebrow">
            How Can We Help?
          </span>

          <h2
            id="help-paths-title"
            className="help-paths__title"
          >
            Three ways to move forward with Vutkala.
          </h2>
        </header>

        {/* =========================================
            CARDS
        ========================================== */}

        <div
          className="help-paths__grid"
          role="list"
          aria-label="Ways Vutkala can help"
        >
          {helpPaths.map((path, index) => (
            <article
              key={path.id}
              className={`help-path ${
                isVisible ? "help-path--visible" : ""
              }`}
              style={{
                "--help-path-delay": `${180 + index * 100}ms`,
              }}
              role="listitem"
            >
              {/* Top row */}

              <div className="help-path__top">
                <span className="help-path__number">
                  {path.id}
                </span>

                <span
                  className={`help-path__accent help-path__accent--${path.accent}`}
                  aria-hidden="true"
                />
              </div>

              {/* Eyebrow */}

              <p className="help-path__eyebrow">
                {path.eyebrow}
              </p>

              {/* Heading */}

              <h3 className="help-path__title">
                {path.title}
              </h3>

              {/* Description */}

              <p className="help-path__description">
                {path.description}
              </p>

              {/* CTA */}

              <Link
                to={path.link}
                className="help-path__cta"
                aria-label={`${path.cta} - ${path.eyebrow}`}
              >
                <span>{path.cta}</span>

                <span
                  className="help-path__cta-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpPaths;