import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import "./Services.css";

/*
|--------------------------------------------------------------------------
| VUTKALA GLOBAL TECHNOLOGIES
| SERVICES PAGE
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Reuse your existing Navbar / Final CTA / Footer.
|
| The exact import paths for those components were not available in the
| supplied project material, so they are intentionally kept as slots below.
|
| Example if your project uses these paths:
|
| import Navbar from "../components/Navbar/Navbar";
| import FinalCTA from "../components/FinalCTA/FinalCTA";
| import Footer from "../components/Footer/Footer";
|
|--------------------------------------------------------------------------
*/


/* =========================================================
   SERVICE DATA
========================================================= */

const services = [
  {
    number: "01",

    title: "IT Staffing",

    shortTitle: "Staffing",

    description:
      "Rapid access to vetted technology and business talent, matched to your team and timeline.",

    detail:
      "Build stronger teams with skilled professionals aligned to your technical requirements, business goals and delivery timelines.",

    image:
      "/assets/services/it-staffing.jpg",

    alt:
      "Technology professionals working together",

    path:
      "/services/it-staffing",

    capabilities: [
      "Technology Talent",
      "Contract Staffing",
      "Permanent Hiring",
      "Specialized Skills",
    ],
  },

  {
    number: "02",

    title: "Workforce Solutions",

    shortTitle: "Workforce",

    description:
      "Flexible workforce strategies designed around changing business requirements.",

    detail:
      "Create workforce models that adapt to changing priorities, talent requirements and organizational growth.",

    image:
      "/assets/services/workforce-solutions.jpg",

    alt:
      "Professionals collaborating on workforce strategy",

    path:
      "/services/workforce-solutions",

    capabilities: [
      "Workforce Planning",
      "Talent Strategy",
      "Flexible Staffing",
      "Workforce Optimization",
    ],
  },

  {
    number: "03",

    title: "Technology Solutions",

    shortTitle: "Technology",

    description:
      "Practical technology solutions built to solve real business challenges.",

    detail:
      "Use practical, scalable technology to improve operations, solve complex challenges and create new opportunities.",

    image:
      "/assets/services/technology-solutions.jpg",

    alt:
      "Technology and software development environment",

    path:
      "/services/technology-solutions",

    capabilities: [
      "Software Solutions",
      "Cloud Technology",
      "Data & Analytics",
      "AI & Automation",
    ],
  },

  {
    number: "04",

    title: "Digital Transformation",

    shortTitle: "Transformation",

    description:
      "Modernize operations and create digital-first experiences.",

    detail:
      "Transform processes, systems and experiences to help organizations operate more efficiently and compete in a changing digital environment.",

    image:
      "/assets/services/digital-transformation.jpg",

    alt:
      "Digital transformation and modern technology",

    path:
      "/services/digital-transformation",

    capabilities: [
      "Process Modernization",
      "Digital Strategy",
      "Automation",
      "Experience Transformation",
    ],
  },

  {
    number: "05",

    title: "Consulting",

    shortTitle: "Consulting",

    description:
      "Expert guidance to help organizations make better decisions and achieve results.",

    detail:
      "Bring together industry knowledge, technology expertise and strategic thinking to address important business challenges.",

    image:
      "/assets/services/consulting.jpg",

    alt:
      "Business consulting and strategic collaboration",

    path:
      "/services/consulting",

    capabilities: [
      "Technology Consulting",
      "Business Strategy",
      "Digital Advisory",
      "Transformation Consulting",
    ],
  },
];


/* =========================================================
   APPROACH DATA
========================================================= */

const helpPrinciples = [
  {
    number: "01",
    title: "RIGHT TALENT",
    text:
      "Connect the right people to the right opportunities.",
  },

  {
    number: "02",
    title: "RIGHT TECHNOLOGY",
    text:
      "Build practical solutions around real challenges.",
  },

  {
    number: "03",
    title: "RIGHT EXPERTISE",
    text:
      "Bring context and experience to every engagement.",
  },

  {
    number: "04",
    title: "RIGHT OUTCOME",
    text:
      "Focus on measurable business impact.",
  },
];


/* =========================================================
   SCROLL REVEAL HOOK
========================================================= */

function useReveal(options = {}) {
  const ref = useRef(null);

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    /*
     * Respect reduced motion.
     * The CSS also handles this, but setting the state here prevents
     * unnecessary observer work for users who request reduced motion.
     */

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) {
      setVisible(true);

      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return;
          }

          setVisible(true);

          /*
           * Reveal once only.
           */
          observer.unobserve(element);
        },
        {
          threshold:
            options.threshold ?? 0.15,

          rootMargin:
            options.rootMargin ??
            "0px 0px -50px 0px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    options.rootMargin,
    options.threshold,
  ]);

  return [
    ref,
    visible,
  ];
}


/* =========================================================
   IMAGE WITH FALLBACK
========================================================= */

function ServiceImage({
  src,
  alt,
  number,
  title,
}) {
  const [imageFailed, setImageFailed] =
    useState(false);

  return (
    <div className="services-image-frame">

      {!imageFailed ? (
        <img
          src={src}
          alt={alt}
          className="services-image"
          loading="lazy"
          onError={() => {
            setImageFailed(true);
          }}
        />
      ) : (
        <div
          className="services-image-fallback"
          aria-label={`${title} visual`}
        >
          <span>
            {number}
          </span>

          <strong>
            {title}
          </strong>

          <small>
            VUTKALA GLOBAL
          </small>
        </div>
      )}

      <div className="services-image-overlay" />

      <div className="services-image-label">
        <span>
          {number}
        </span>

        <span>
          VUTKALA GLOBAL
        </span>
      </div>

    </div>
  );
}


/* =========================================================
   HERO VISUAL
========================================================= */
function HeroImage() {
  return (
    <div className="services-hero-image">
      <img
        src="/assets/services/services-hero.jpg"
        alt="Vutkala Global Technologies workforce and technology"
      />

      <div className="services-hero-image-overlay" />

      <div className="services-hero-image-label">
        <span>PEOPLE</span>
        <span>TECHNOLOGY</span>
        <span>GROWTH</span>
      </div>
    </div>
  );
}

/* =========================================================
   SERVICES HERO
========================================================= */

function ServicesHero() {
  const handleExplore = (
    event
  ) => {
    event.preventDefault();

    const target =
      document.getElementById(
        "services-index"
      );

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="services-hero">

      <div className="services-container">

        <div className="services-hero-grid">

          <div className="services-hero-content">

            <div className="services-eyebrow services-hero-eyebrow">

              <span className="services-eyebrow-line" />

              <span>
                SERVICES
              </span>

            </div>


            <h1 className="services-hero-title">

              <span>
                Workforce.
              </span>

              <span>
                Technology.
              </span>

              <span className="services-gradient-text">
                Growth.
              </span>

            </h1>


            <p className="services-hero-description">
              Solutions designed to help organizations
              build stronger teams, solve complex challenges
              and move forward.
            </p>


            <a
              href="#services-index"
              className="services-primary-button"
              onClick={handleExplore}
            >
              <span>
                Explore Services
              </span>

              <span className="services-button-arrow">
                →
              </span>
            </a>

          </div>


          <div className="services-hero-visual">
            <HeroImage  />
          </div>

        </div>


        <div className="services-hero-bottom">

          <span>
            PEOPLE
          </span>

          <span className="services-hero-bottom-line" />

          <span>
            TECHNOLOGY
          </span>

          <span className="services-hero-bottom-line" />

          <span>
            GROWTH
          </span>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   INTRODUCTION
========================================================= */

function ServicesIntroduction() {
  const [ref, visible] =
    useReveal();

  return (
    <section
      ref={ref}
      className={[
        "services-introduction",
        visible
          ? "services-reveal-visible"
          : "",
      ].join(" ")}
    >

      <div className="services-container">

        <div className="services-introduction-grid">

          <div className="services-introduction-label">

            <div className="services-eyebrow">

              <span className="services-eyebrow-line" />

              <span>
                OUR SERVICES
              </span>

            </div>

          </div>


          <div className="services-introduction-content">

            <h2 className="services-introduction-title">

              Solutions built around
              <br />

              <span>
                what your business needs next.
              </span>

            </h2>


            <div className="services-gradient-rule" />


            <p className="services-introduction-text">
              We combine people, technology and expertise
              to help organizations solve challenges, scale
              capabilities and create meaningful growth.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SERVICE INDEX
========================================================= */

function ServicesIndex() {
  const [ref, visible] =
    useReveal({
      threshold: 0.08,
    });

  return (
    <section
      id="services-index"
      ref={ref}
      className={[
        "services-index",
        visible
          ? "services-reveal-visible"
          : "",
      ].join(" ")}
    >

      <div className="services-container">

        <div className="services-index-header">

          <div className="services-eyebrow services-eyebrow--light">

            <span className="services-eyebrow-line" />

            <span>
              WHAT WE DO
            </span>

          </div>


          <p>
            Five connected capabilities.
          </p>

        </div>


        <div className="services-index-list">

          {services.map(
            (service, index) => (
              <Link
                key={service.number}
                to={service.path}
                className="service-index-row"
                style={{
                  "--service-delay":
                    `${index * 70}ms`,
                }}
              >

                <span className="service-index-number">
                  {service.number}
                </span>


                <div className="service-index-main">

                  <h2>
                    {service.title}
                  </h2>

                  <p>
                    {service.description}
                  </p>

                </div>


                <div className="service-index-preview">

                  <ServiceImage
                    src={service.image}
                    alt={service.alt}
                    number={service.number}
                    title={service.title}
                  />

                </div>


                <span className="service-index-arrow">
                  →
                </span>

              </Link>
            )
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SERVICE DETAIL
========================================================= */

function ServiceDetail({
  service,
  index,
}) {
  const [ref, visible] =
    useReveal({
      threshold: 0.15,
    });

  const imageLeft =
    index % 2 === 0;

  return (
    <section
      ref={ref}
      id={`service-${service.number}`}
      className={[
        "service-detail",
        imageLeft
          ? "service-detail--image-left"
          : "service-detail--image-right",
        index % 2 === 0
          ? "service-detail--light"
          : "service-detail--off-white",
        visible
          ? "services-reveal-visible"
          : "",
      ].join(" ")}
    >

      <div className="services-container">

        <div className="service-detail-grid">

          <div className="service-detail-visual">

            <ServiceImage
              src={service.image}
              alt={service.alt}
              number={service.number}
              title={service.title}
            />

          </div>


          <div className="service-detail-content">

            <div className="service-detail-meta">

              <span className="service-detail-number">
                {service.number}
              </span>

              <span className="service-detail-line" />

              <span className="service-detail-label">
                {service.shortTitle}
              </span>

            </div>


            <h2 className="service-detail-title">
              {service.title}
            </h2>


            <h3 className="service-detail-lead">

              {index === 0 &&
                "Build stronger teams with the right talent."}

              {index === 1 &&
                "Build a workforce that can adapt."}

              {index === 2 &&
                "Technology designed around real business needs."}

              {index === 3 &&
                "Turn complexity into progress."}

              {index === 4 &&
                "Expertise that helps you move forward."}

            </h3>


            <p className="service-detail-description">
              {service.detail}
            </p>


            <div className="service-capabilities">

              <div className="service-capabilities-heading">
                CAPABILITIES
              </div>


              <div className="service-capabilities-list">

                {service.capabilities.map(
                  (
                    capability,
                    capabilityIndex
                  ) => (
                    <div
                      key={capability}
                      className="service-capability"
                      style={{
                        "--capability-delay":
                          `${capabilityIndex * 55}ms`,
                      }}
                    >

                      <span className="service-capability-number">
                        {String(
                          capabilityIndex + 1
                        ).padStart(2, "0")}
                      </span>

                      <span>
                        {capability}
                      </span>

                      <span className="service-capability-arrow">
                        →
                      </span>

                    </div>
                  )
                )}

              </div>

            </div>


            <Link
              to={service.path}
              className="service-detail-button"
            >
              <span>
                Explore {service.shortTitle}
              </span>

              <span>
                →
              </span>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   HOW WE HELP
========================================================= */

function ServicesHelp() {
  const [ref, visible] =
    useReveal({
      threshold: 0.15,
    });

  return (
    <section
      ref={ref}
      className={[
        "services-help",
        visible
          ? "services-reveal-visible"
          : "",
      ].join(" ")}
    >

      <div className="services-container">

        <div className="services-help-header">

          <div className="services-eyebrow">

            <span className="services-eyebrow-line" />

            <span>
              HOW WE HELP
            </span>

          </div>


          <h2 className="services-help-title">

            From people to technology,

            <span>
              we help businesses move forward.
            </span>

          </h2>

        </div>


        <div className="services-help-grid">

          {helpPrinciples.map(
            (principle, index) => (
              <article
                key={principle.number}
                className="services-help-item"
                style={{
                  "--help-delay":
                    `${index * 80}ms`,
                }}
              >

                <span className="services-help-number">
                  {principle.number}
                </span>

                <h3>
                  {principle.title}
                </h3>

                <p>
                  {principle.text}
                </p>

                <span className="services-help-arrow">
                  ↗
                </span>

              </article>
            )
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   FINAL CTA
========================================================= */

function ServicesCTA() {
  const [ref, visible] =
    useReveal({
      threshold: 0.15,
    });

  return (
    <section
      ref={ref}
      className={[
        "services-cta",
        visible
          ? "services-reveal-visible"
          : "",
      ].join(" ")}
    >

      <div className="services-container">

        <div className="services-cta-inner">

          <div className="services-cta-content">

            <div className="services-eyebrow services-eyebrow--light">

              <span className="services-eyebrow-line" />

              <span>
                LET'S TALK
              </span>

            </div>


            <h2>
              Have a business challenge?
              <span>
                Let's find the right solution.
              </span>
            </h2>


            <p>
              Whether you need talent, technology or
              strategic expertise, we're ready to help.
            </p>

          </div>


          <Link
            to="/contact"
            className="services-cta-button"
          >
            <span>
              Talk to Vutkala
            </span>

            <span>
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   PAGE
========================================================= */

function Services() {
  return (
    <main className="services-page">

      {/*
        EXISTING NAVBAR

        Put your existing Navbar component here.

        Example:
        <Navbar />
      */}


      <ServicesHero />


      <ServicesIntroduction />


      <ServicesIndex />


      <section
        className="services-details"
        aria-label="Vutkala services"
      >

        {services.map(
          (service, index) => (
            <ServiceDetail
              key={service.number}
              service={service}
              index={index}
            />
          )
        )}

      </section>


      <ServicesHelp />


      <ServicesCTA />


      {/*
        EXISTING FOOTER

        Put your existing Footer component here.

        Example:
        <Footer />
      */}

    </main>
  );
}

export default Services;