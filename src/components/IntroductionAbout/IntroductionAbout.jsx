import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./IntroductionAbout.css";
import hero from "../../assets/home/about.png"
function IntroductionAbout() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const animatedElements =
      section.querySelectorAll("[data-reveal]");

    /*
    |--------------------------------------------------------------------------
    | Scroll Reveal
    |--------------------------------------------------------------------------
    */

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-visible"
            );

            /*
             * Once revealed, stop observing.
             * This prevents the animation from repeatedly
             * triggering while scrolling up and down.
             */
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="intro-about"
    >

      {/* ================================================================
          INTRODUCTION
      ================================================================= */}

      {/* ================================================================
          ABOUT VUTKALA
      ================================================================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-container">

          {/* ============================================================
              IMAGE
          ============================================================= */}

          <div
            className="about-visual reveal-left"
            data-reveal
          >

            <div className="about-image-frame">

              <img
                src={hero}
                alt="Vutkala Global professionals collaborating in a modern business environment"
                className="about-image"
                loading="lazy"
              />

              <div
                className="about-image-overlay"
                aria-hidden="true"
              />

            </div>

            <div
              className="about-accent"
              aria-hidden="true"
            />

            <div
              className="about-image-label"
              aria-hidden="true"
            >
              <span>
                VUTKALA
              </span>

              <span>
                GLOBAL
              </span>
            </div>

          </div>


          {/* ============================================================
              CONTENT
          ============================================================= */}

          <div className="about-content">

            <div
              className="about-label reveal-up"
              data-reveal
            >
              <span className="about-label__line" />

              <span>
                ABOUT VUTKALA
              </span>
            </div>


            <h2
              className="about-title reveal-up reveal-delay-1"
              data-reveal
            >
              Connecting People,
              <br />

              <span>
                Technology
              </span>

              &amp;

              <span>
                Opportunity.
              </span>
            </h2>


            <p
              className="about-description reveal-up reveal-delay-2"
              data-reveal
            >
              Vutkala Global brings together
              exceptional talent, technology,
              and opportunity to help people and
              businesses move forward with
              confidence.
            </p>


            <p
              className="about-description about-description--secondary reveal-up reveal-delay-3"
              data-reveal
            >
              We believe meaningful growth
              happens when the right people,
              technology, and opportunities come
              together. Our approach is built
              around creating connections that
              deliver lasting value.
            </p>


            {/* ==========================================================
                MISSION
            =========================================================== */}

            <div
              className="about-principle reveal-up reveal-delay-3"
              data-reveal
            >

              <div className="principle-number">
                01
              </div>

              <div className="principle-content">

                <h3>
                  Our Mission
                </h3>

                <p>
                  To connect people, technology,
                  and opportunity in ways that
                  create meaningful outcomes for
                  individuals and businesses.
                </p>

              </div>

            </div>


            {/* ==========================================================
                VISION
            =========================================================== */}

            <div
              className="about-principle reveal-up reveal-delay-4"
              data-reveal
            >

              <div className="principle-number">
                02
              </div>

              <div className="principle-content">

                <h3>
                  Our Vision
                </h3>

                <p>
                  To build a globally connected
                  ecosystem where exceptional
                  talent and technology create
                  stronger businesses and better
                  opportunities.
                </p>

              </div>

            </div>


            {/* ==========================================================
                CTA
            =========================================================== */}

            <div
              className="about-actions reveal-up reveal-delay-5"
              data-reveal
            >

              <Link
                to="/hire"
                className="about-button about-button--primary"
              >
                <span>
                  Hire Talent
                </span>

                <span
                  aria-hidden="true"
                  className="about-button__arrow"
                >
                  →
                </span>
              </Link>


              <Link
                to="/jobs"
                className="about-button about-button--secondary"
              >
                Find Jobs
              </Link>


              <Link
                to="/services"
                className="about-button about-button--text"
              >
                Explore Services

                <span aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </section>
  );
}

export default IntroductionAbout;