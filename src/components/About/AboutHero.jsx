import { useEffect, useRef, useState } from "react";
import "./AboutHero.css";

import heroImage from "../../assets/About/about-hero.png";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToStory = () => {
    document
      .getElementById("about-story")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      ref={sectionRef}
      className={`about-hero ${
        visible ? "about-hero--visible" : ""
      }`}
    >
      {/* ONE BACKGROUND IMAGE */}

      <div className="about-hero__background">
        <img
          src={heroImage}
          alt="Vutkala Global professionals collaborating in a modern technology office"
        />
      </div>

      {/* OVERLAY */}

      <div className="about-hero__overlay" />

      {/* CONTENT */}

      <div className="about-hero__container">
        <div className="about-hero__content">

          <div className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" />
            ABOUT VUTKALA
          </div>

          <h1 className="about-hero__title">
            <span className="about-hero__title-line">
              PEOPLE.
            </span>

            <br />

            <span className="about-hero__title-line">
              TECHNOLOGY.
            </span>

            <br />

            <span className="about-hero__title-line about-hero__title-line--accent">
              POSSIBILITY.
            </span>
          </h1>

          <p className="about-hero__description">
            We bring together exceptional people,
            technology and expertise to help
            organizations move forward.
          </p>

          <button
            type="button"
            className="about-hero__action"
            onClick={scrollToStory}
          >
            <span>DISCOVER VUTKALA</span>

            <span className="about-hero__arrow">
              ↓
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}