import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Industries.css";

/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
| Keep using your existing Navbar, Final CTA and Footer.
|
| I have intentionally NOT created duplicate components here because your
| current project already has them.
|
| If your current Industries page already imports them, keep those imports.
|--------------------------------------------------------------------------
*/


/* =========================================================
   INDUSTRY IMAGES
   =========================================================
   Keep your existing image paths here.
========================================================= */

const industryImages = {
  technology: "",
  finance: "",
  healthcare: "",
  manufacturing: "",
  retail: "",
  education: "",
  telecommunications: "",
  logistics: "",
};


/* =========================================================
   INDUSTRY DATA
========================================================= */

const industries = [
  {
    id: "technology",
    number: "01",
    title: "TECHNOLOGY & IT",
    eyebrow: "AI · CLOUD · DATA · ENGINEERING",

    description:
      "Building digital capabilities for a rapidly evolving technology landscape.",

    capabilities: [
      "AI & Machine Learning",
      "Cloud & Infrastructure",
      "Software Engineering",
      "Data & Analytics",
      "Cybersecurity",
      "Technology Staffing",
    ],

    image: industryImages.technology,

    alt:
      "Technology, artificial intelligence and software engineering",

    theme: "dark",
    imageSide: "right",
  },

  {
    id: "finance",
    number: "02",
    title: "BANKING & FINANCE",
    eyebrow: "DIGITAL · FINTECH · SCALE",

    description:
      "Connecting technology, talent and expertise across modern financial services.",

    capabilities: [
      "Digital Banking",
      "FinTech",
      "Risk & Compliance",
      "Data & Analytics",
      "Financial Technology",
      "Technology Staffing",
    ],

    image: industryImages.finance,

    alt:
      "Digital banking and financial technology",

    theme: "light",
    imageSide: "left",
  },

  {
    id: "healthcare",
    number: "03",
    title: "HEALTHCARE & LIFE SCIENCES",
    eyebrow: "HEALTHTECH · DATA · INNOVATION",

    description:
      "Supporting more connected, technology-enabled healthcare organizations.",

    capabilities: [
      "HealthTech",
      "Healthcare IT",
      "Digital Health",
      "Data & Analytics",
      "Technology Staffing",
      "Transformation",
    ],

    image: industryImages.healthcare,

    alt:
      "Healthcare technology and digital health",

    theme: "dark",
    imageSide: "right",
  },

  {
    id: "manufacturing",
    number: "04",
    title: "MANUFACTURING & ENGINEERING",
    eyebrow: "ENGINEERING · AUTOMATION · INDUSTRY 4.0",

    description:
      "Strengthening workforce and technology capabilities across modern industry.",

    capabilities: [
      "Industrial Automation",
      "Engineering",
      "Industry 4.0",
      "Digital Manufacturing",
      "Supply Chain Technology",
      "Technical Staffing",
    ],

    image: industryImages.manufacturing,

    alt:
      "Manufacturing, engineering and industrial automation",

    theme: "light",
    imageSide: "left",
  },

  {
    id: "retail",
    number: "05",
    title: "RETAIL & CONSUMER",
    eyebrow: "DIGITAL · E-COMMERCE · EXPERIENCE",

    description:
      "Helping consumer businesses create stronger digital experiences through people and technology.",

    capabilities: [
      "E-Commerce",
      "Digital Experience",
      "Customer Analytics",
      "Retail Technology",
      "Supply Chain",
      "Digital Transformation",
    ],

    image: industryImages.retail,

    alt:
      "Digital retail and ecommerce technology",

    theme: "dark",
    imageSide: "right",
  },

  {
    id: "education",
    number: "06",
    title: "EDUCATION & EDTECH",
    eyebrow: "LEARNING · TECHNOLOGY · GROWTH",

    description:
      "Connecting education organizations with people and technology for a changing world.",

    capabilities: [
      "EdTech",
      "Learning Platforms",
      "Digital Learning",
      "Education Technology",
      "Data & Analytics",
      "Technology Staffing",
    ],

    image: industryImages.education,

    alt:
      "Digital learning and education technology",

    theme: "light",
    imageSide: "left",
  },

  {
    id: "telecommunications",
    number: "07",
    title: "TELECOMMUNICATIONS & MEDIA",
    eyebrow: "CONNECTIVITY · DIGITAL · COMMUNICATION",

    description:
      "Supporting the technology and talent behind connected businesses.",

    capabilities: [
      "Telecom Technology",
      "Network Engineering",
      "Cloud Infrastructure",
      "Digital Platforms",
      "Data & Analytics",
      "Technical Staffing",
    ],

    image: industryImages.telecommunications,

    alt:
      "Telecommunications network and connectivity",

    theme: "dark",
    imageSide: "right",
  },

  {
    id: "logistics",
    number: "08",
    title: "LOGISTICS & SUPPLY CHAIN",
    eyebrow: "LOGISTICS · AUTOMATION · VISIBILITY",

    description:
      "Building smarter, more connected supply chain capabilities.",

    capabilities: [
      "Supply Chain Technology",
      "Logistics Technology",
      "Warehouse Automation",
      "Data & Analytics",
      "Digital Operations",
      "Workforce Solutions",
    ],

    image: industryImages.logistics,

    alt:
      "Warehouse automation and supply chain technology",

    theme: "light",
    imageSide: "left",
  },
];


/* =========================================================
   ARROW
========================================================= */

const Arrow = ({ direction = "right" }) => {
  return (
    <svg
      className={`industry-arrow industry-arrow--${direction}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {direction === "down" ? (
        <>
          <path
            d="M12 4V19"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            d="M6 13L12 19L18 13"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M4 12H19"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            d="M13 6L19 12L13 18"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};


/* =========================================================
   REUSABLE SCROLL REVEAL
========================================================= */

const useScrollReveal = ({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
} = {}) => {
  const ref = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);

        observer.unobserve(element);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
};


/* =========================================================
   HERO
========================================================= */

const IndustriesHero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 80);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const scrollToIndex = (event) => {
    event.preventDefault();

    const target = document.getElementById(
      "industry-index"
    );

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className={`industries-hero ${
        visible
          ? "industries-hero--visible"
          : ""
      }`}
    >
      <div className="industries-container">

        <div className="industries-hero__grid">

          {/* LEFT */}

          <div className="industries-hero__content">

            <div className="industries-hero__eyebrow">
              <span className="industries-eyebrow__line" />

              <span>INDUSTRIES</span>
            </div>


            <h1 className="industries-hero__title">

              <span className="industries-hero__title-line industries-hero__title-line--navy">
                EXPERTISE THAT
              </span>

              <span className="industries-hero__title-line industries-hero__title-line--orange">
                UNDERSTANDS
              </span>

              <span className="industries-hero__title-line industries-hero__title-line--gradient">
                YOUR WORLD.
              </span>

            </h1>


            <p className="industries-hero__description">
              Different industries face different challenges.
              We bring people, technology and industry expertise
              together to help organizations move forward.
            </p>


            <a
              href="#industry-index"
              className="industries-hero__explore"
              onClick={scrollToIndex}
            >
              <span>EXPLORE INDUSTRIES</span>

              <Arrow direction="down" />
            </a>

          </div>


          {/* RIGHT IMAGE */}

          <div className="industries-hero__visual">

            <div className="industries-hero__image-wrap">

              {industryImages.technology ? (
                <img
                  src={industryImages.technology}
                  alt="Technology and industry"
                  className="industries-hero__image"
                />
              ) : (
                <div
                  className="industries-hero__image-placeholder"
                  aria-hidden="true"
                >
                  <span>VUTKALA GLOBAL</span>

                  <strong>
                    PEOPLE · TECHNOLOGY · INDUSTRY
                  </strong>
                </div>
              )}

              <div className="industries-hero__image-overlay" />

              <div className="industries-hero__image-meta">
                <span>VUTKALA GLOBAL</span>

                <span>08 SECTORS</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


/* =========================================================
   INDUSTRY INDEX
========================================================= */

const IndustryIndex = () => {
  return (
    <section
      id="industry-index"
      className="industry-index"
    >
      <div className="industries-container">

        <div className="industry-index__header">

          <div className="industries-eyebrow">
            <span className="industries-eyebrow__line" />

            <span>INDUSTRIES WE SERVE</span>
          </div>

          <p>
            Eight sectors. One connected approach.
          </p>

        </div>


        <nav
          className="industry-index__grid"
          aria-label="Industries we serve"
        >

          {industries.map((industry) => (
            <a
              key={industry.id}
              href={`#industry-${industry.id}`}
              className="industry-index__item"
            >
              <span className="industry-index__number">
                {industry.number}
              </span>

              <span className="industry-index__name">
                {industry.title
                  .replace(" & ", " / ")}
              </span>

              <span className="industry-index__arrow">
                →
              </span>

              <span className="industry-index__line" />
            </a>
          ))}

        </nav>

      </div>
    </section>
  );
};


/* =========================================================
   INDUSTRY SECTION
========================================================= */

const IndustrySection = ({
  industry,
  index,
}) => {
  const [sectionRef, visible] =
    useScrollReveal({
      threshold: 0.15,
      rootMargin:
        "0px 0px -60px 0px",
    });

  const isDark =
    industry.theme === "dark";

  const imageRight =
    industry.imageSide === "right";

  return (
    <article
      id={`industry-${industry.id}`}
      ref={sectionRef}
      className={[
        "industry-section",

        isDark
          ? "industry-section--dark"
          : "industry-section--light",

        imageRight
          ? "industry-section--image-right"
          : "industry-section--image-left",

        visible
          ? "industry-section--visible"
          : "",
      ].join(" ")}
    >

      <div className="industries-container">

        <div className="industry-section__grid">

          {/* CONTENT */}

          <div className="industry-section__content">

            <div className="industry-section__meta">

              <span className="industry-section__number reveal-number">
                {industry.number}
              </span>

              <span className="industry-section__meta-line reveal-eyebrow-line" />

              <span className="industry-section__eyebrow reveal-eyebrow">
                {industry.eyebrow}
              </span>

            </div>


            <h2 className="industry-section__title reveal-title">
              {industry.title}
            </h2>


            <p className="industry-section__description reveal-description">
              {industry.description}
            </p>


            <div className="industry-section__capabilities">

              <div className="industry-section__capabilities-label reveal-capabilities">
                CAPABILITIES
              </div>

              <div className="industry-section__capability-grid">

                {industry.capabilities.map(
                  (
                    capability,
                    capabilityIndex
                  ) => (
                    <div
                      key={capability}
                      className="industry-capability reveal-capability"
                      style={{
                        "--capability-delay": `${
                          capabilityIndex * 50
                        }ms`,
                      }}
                    >
                      <span className="industry-capability__dot" />

                      <span>
                        {capability}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>


            <Link
              to="/contact"
              className="industry-contact-button reveal-button"
            >
              <span>CONTACT US</span>

              <span className="industry-contact-button__arrow">
                →
              </span>
            </Link>

          </div>


          {/* IMAGE */}

          <div className="industry-section__visual">

            <div className="industry-section__image-wrap">

              {industry.image ? (
                <img
                  src={industry.image}
                  alt={industry.alt}
                  className="industry-section__image"
                  loading={
                    index < 2
                      ? "eager"
                      : "lazy"
                  }
                />
              ) : (
                <div
                  className="industry-section__image-placeholder"
                  aria-hidden="true"
                >
                  <span>
                    {industry.number}
                  </span>

                  <strong>
                    {industry.title}
                  </strong>
                </div>
              )}

              <div className="industry-section__image-overlay" />

              <span className="industry-section__image-index">
                {industry.number}
              </span>

            </div>

          </div>

        </div>

      </div>

    </article>
  );
};


/* =========================================================
   OUR APPROACH
========================================================= */

const ApproachSection = () => {
  const [sectionRef, visible] =
    useScrollReveal({
      threshold: 0.15,
    });

  const approachItems = [
    {
      number: "01",
      title: "WORKFORCE",
      text:
        "Specialized talent aligned to industry needs.",
    },
    {
      number: "02",
      title: "TECHNOLOGY",
      text:
        "Capabilities designed around real challenges.",
    },
    {
      number: "03",
      title: "EXPERTISE",
      text:
        "Industry understanding that makes solutions relevant.",
    },
    {
      number: "04",
      title: "TRANSFORMATION",
      text:
        "Support for organizations navigating change.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={[
        "industries-approach",
        visible
          ? "industries-approach--visible"
          : "",
      ].join(" ")}
    >

      <div className="industries-container">

        <header className="industries-approach__header">

          <div className="industries-eyebrow industries-eyebrow--light">
            <span className="industries-eyebrow__line" />

            <span>OUR APPROACH</span>
          </div>

          <h2 className="industries-approach__title">

            <span>
              DIFFERENT INDUSTRIES.
            </span>

            <span className="industries-approach__gradient">
              ONE CONNECTED APPROACH.
            </span>

          </h2>

          <p className="industries-approach__description">
            Every industry has different pressures,
            priorities and opportunities. We bring
            workforce, technology and industry expertise
            together to create solutions that fit the context.
          </p>

        </header>


        <div className="industries-approach__rows">

          {approachItems.map(
            (item, index) => (
              <article
                key={item.number}
                className="approach-row"
                style={{
                  "--approach-delay": `${
                    index * 90
                  }ms`,
                }}
              >

                <span className="approach-row__number">
                  {item.number}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <span className="approach-row__arrow">
                  ↗
                </span>

              </article>
            )
          )}

        </div>

      </div>

    </section>
  );
};


/* =========================================================
   GLOBAL REACH
========================================================= */

const GlobalReachSection = () => {
  const [sectionRef, visible] =
    useScrollReveal({
      threshold: 0.15,
    });

  const regions = [
    "Technology",
    "Finance",
    "Healthcare",
    "Manufacturing",
    "Retail",
    "Education",
    "Telecommunications",
    "Logistics",
  ];

  return (
    <section
      ref={sectionRef}
      className={[
        "global-reach",
        visible
          ? "global-reach--visible"
          : "",
      ].join(" ")}
    >

      <div className="industries-container">

        <div className="global-reach__grid">

          <div className="global-reach__content">

            <div className="industries-eyebrow">
              <span className="industries-eyebrow__line" />

              <span>GLOBAL REACH</span>
            </div>

            <h2 className="global-reach__title">

              <span>
                Industry expertise
              </span>

              <span className="global-reach__gradient">
                without borders.
              </span>

            </h2>

            <p className="global-reach__description">
              Connecting organizations with the people,
              technology and capabilities they need across markets.
            </p>

          </div>


          <div className="global-reach__visual">

            <div className="global-map">

              <div className="global-map__grid" />

              <svg
                className="global-map__svg"
                viewBox="0 0 900 450"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >

                <path
                  className="global-map__line"
                  d="M120 205 C250 125 340 150 450 225"
                />

                <path
                  className="global-map__line"
                  d="M450 225 C560 150 660 125 780 205"
                />

                <path
                  className="global-map__line"
                  d="M150 315 C280 270 360 270 450 225"
                />

                <path
                  className="global-map__line"
                  d="M450 225 C540 270 630 270 750 315"
                />

                <path
                  className="global-map__line"
                  d="M260 130 C320 190 380 205 450 225"
                />

                <path
                  className="global-map__line"
                  d="M450 225 C520 205 580 190 650 130"
                />


                <circle
                  className="global-map__node"
                  cx="120"
                  cy="205"
                  r="4"
                />

                <circle
                  className="global-map__node"
                  cx="260"
                  cy="130"
                  r="4"
                />

                <circle
                  className="global-map__node global-map__node--center"
                  cx="450"
                  cy="225"
                  r="6"
                />

                <circle
                  className="global-map__node"
                  cx="650"
                  cy="130"
                  r="4"
                />

                <circle
                  className="global-map__node"
                  cx="780"
                  cy="205"
                  r="4"
                />

                <circle
                  className="global-map__node"
                  cx="150"
                  cy="315"
                  r="4"
                />

                <circle
                  className="global-map__node"
                  cx="750"
                  cy="315"
                  r="4"
                />

              </svg>


              <div className="global-map__center">
                <span>VUTKALA</span>
                <strong>GLOBAL</strong>
              </div>

            </div>

          </div>

        </div>


        <div className="global-reach__list">

          {regions.map(
            (region, index) => (
              <div
                key={region}
                className="global-reach__item"
                style={{
                  "--region-delay": `${
                    index * 45
                  }ms`,
                }}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <strong>
                  {region}
                </strong>
              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};


/* =========================================================
   PAGE
========================================================= */

const Industries = () => {
  return (
    <div className="industries-page">

      {/*
        KEEP YOUR EXISTING NAVBAR HERE.

        Example:

        <Navbar />
      */}

      <main>

        <IndustriesHero />

        <IndustryIndex />

        <section
          className="industries-list"
          aria-label="Industries"
        >
          {industries.map(
            (industry, index) => (
              <IndustrySection
                key={industry.id}
                industry={industry}
                index={index}
              />
            )
          )}
        </section>

        <ApproachSection />

        <GlobalReachSection />

        {/*
          KEEP YOUR EXISTING FINAL CTA HERE.

          Example:

          <FinalCTA />
        */}

      </main>


      {/*
        KEEP YOUR EXISTING FOOTER HERE.

        Example:

        <Footer />
      */}

    </div>
  );
};

export default Industries;