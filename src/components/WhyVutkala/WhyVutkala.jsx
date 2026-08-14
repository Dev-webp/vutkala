import React, { useEffect, useRef, useState } from "react";
import "./WhyVutkala.css";

const principles = [
  {
    number: "01",
    title: "PEOPLE",
    headline: "Talent that fits.",
    description:
      "Skills, experience and people aligned to the work.",
    position: "people",
    icon: "people",
  },
  {
    number: "02",
    title: "TECHNOLOGY",
    headline: "Solutions that work.",
    description:
      "Practical technology built around real needs.",
    position: "technology",
    icon: "technology",
  },
  {
    number: "03",
    title: "EXPERTISE",
    headline: "Knowledge that matters.",
    description:
      "Industry context that makes solutions relevant.",
    position: "expertise",
    icon: "expertise",
  },
  {
    number: "04",
    title: "PARTNERSHIP",
    headline: "Built around you.",
    description:
      "A collaborative approach shaped by your priorities.",
    position: "partnership",
    icon: "partnership",
  },
];

/* =========================================================
   ANIMATED ICONS
========================================================= */

const PrincipleIcon = ({ type }) => {
  switch (type) {
    case "people":
      return (
        <svg viewBox="0 0 64 64" className="why-icon" fill="none">
          <circle className="icon-draw" cx="32" cy="18" r="7" />

          <path
            className="icon-draw"
            d="M18 48C18 38.6 24.3 32 32 32C39.7 32 46 38.6 46 48"
          />

          <circle className="icon-draw icon-small" cx="14" cy="27" r="5" />

          <path
            className="icon-draw icon-small"
            d="M5 48C5 41.5 9 37 14 37C17.5 37 20.5 39 22 42"
          />

          <circle className="icon-draw icon-small" cx="50" cy="27" r="5" />

          <path
            className="icon-draw icon-small"
            d="M42 42C43.5 39 46.5 37 50 37C55 37 59 41.5 59 48"
          />
        </svg>
      );

    case "technology":
      return (
        <svg viewBox="0 0 64 64" className="why-icon" fill="none">
          <rect
            className="icon-draw"
            x="18"
            y="18"
            width="28"
            height="28"
            rx="4"
          />

          <rect
            className="icon-core"
            x="27"
            y="27"
            width="10"
            height="10"
            rx="2"
          />

          <path className="icon-draw" d="M24 10V18" />
          <path className="icon-draw" d="M32 10V18" />
          <path className="icon-draw" d="M40 10V18" />

          <path className="icon-draw" d="M24 46V54" />
          <path className="icon-draw" d="M32 46V54" />
          <path className="icon-draw" d="M40 46V54" />

          <path className="icon-draw" d="M10 24H18" />
          <path className="icon-draw" d="M10 32H18" />
          <path className="icon-draw" d="M10 40H18" />

          <path className="icon-draw" d="M46 24H54" />
          <path className="icon-draw" d="M46 32H54" />
          <path className="icon-draw" d="M46 40H54" />
        </svg>
      );

    case "expertise":
      return (
        <svg viewBox="0 0 64 64" className="why-icon" fill="none">
          <circle
            className="icon-draw"
            cx="32"
            cy="32"
            r="21"
          />

          <circle
            className="icon-core"
            cx="32"
            cy="32"
            r="4"
          />

          <path
            className="icon-draw"
            d="M32 11V28"
          />

          <path
            className="icon-draw"
            d="M32 36V53"
          />

          <path
            className="icon-draw"
            d="M11 32H28"
          />

          <path
            className="icon-draw"
            d="M36 32H53"
          />

          <path
            className="icon-draw"
            d="M32 32L44 20"
          />
        </svg>
      );

    case "partnership":
      return (
        <svg viewBox="0 0 64 64" className="why-icon" fill="none">
          <path
            className="icon-draw"
            d="M8 32L17 23C19 21 22 21 24 23L32 31"
          />

          <path
            className="icon-draw"
            d="M56 32L47 23C45 21 42 21 40 23L32 31"
          />

          <path
            className="icon-draw"
            d="M24 23L32 31L40 23"
          />

          <path
            className="icon-draw"
            d="M8 32L16 40L24 48"
          />

          <path
            className="icon-draw"
            d="M56 32L48 40L40 48"
          />

          <path
            className="icon-draw"
            d="M24 48L32 56L40 48"
          />

          <circle
            className="icon-node"
            cx="32"
            cy="31"
            r="3"
          />
        </svg>
      );

    default:
      return null;
  }
};

/* =========================================================
   COMPONENT
========================================================= */

const WhyVutkala = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

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

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`why-vutkala ${
        visible ? "why-vutkala--visible" : ""
      }`}
    >
      <div className="why-vutkala__inner">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="why-vutkala__header">

          <div className="why-vutkala__eyebrow">
            <span className="why-vutkala__eyebrow-line" />
            <span>WHY VUTKALA?</span>
          </div>

          <h1 className="why-vutkala__heading">
            <span>THE DIFFERENCE IS</span>

            <span className="why-vutkala__gradient">
              IN THE CONNECTION.
            </span>
          </h1>

          <p className="why-vutkala__intro">
            We bring together capabilities that are often treated
            separately — creating a more connected way forward.
          </p>

        </div>

        {/* ==================================================
            DIAGRAM
        ================================================== */}

        <div className="why-vutkala__diagram">

          <svg
            className="why-vutkala__lines"
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>

              <linearGradient
                id="vutkalaConnection"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#FF7A21"
                />

                <stop
                  offset="50%"
                  stopColor="#FF5A42"
                />

                <stop
                  offset="100%"
                  stopColor="#F72568"
                />
              </linearGradient>

              <radialGradient
                id="vutkalaGlow"
              >
                <stop
                  offset="0%"
                  stopColor="#FF7A21"
                  stopOpacity="0.15"
                />

                <stop
                  offset="100%"
                  stopColor="#F72568"
                  stopOpacity="0"
                />
              </radialGradient>

            </defs>

            {/* Top left */}

            <path
              className="connection-line"
              d="M 180 105 C 320 110 410 160 510 245"
              pathLength="1"
            />

            {/* Top right */}

            <path
              className="connection-line"
              d="M 1020 105 C 880 110 790 160 690 245"
              pathLength="1"
            />

            {/* Bottom left */}

            <path
              className="connection-line"
              d="M 180 340 C 320 340 410 320 510 275"
              pathLength="1"
            />

            {/* Bottom right */}

            <path
              className="connection-line"
              d="M 1020 340 C 880 340 790 320 690 275"
              pathLength="1"
            />

            {/* Subtle orbit */}

            <ellipse
              className="orbit-line"
              cx="600"
              cy="260"
              rx="430"
              ry="150"
            />

            <ellipse
              className="orbit-line orbit-line--second"
              cx="600"
              cy="260"
              rx="350"
              ry="120"
            />

            <circle
              className="center-glow"
              cx="600"
              cy="260"
              r="150"
              fill="url(#vutkalaGlow)"
            />

          </svg>

          {/* ==================================================
              CENTER
          ================================================== */}

          <div className="why-vutkala__hub">

            <div className="hub-ring hub-ring--outer" />
            <div className="hub-ring hub-ring--inner" />

            <span className="hub-dot" />

            <div className="hub-content">

              <span>VUTKALA</span>

              <strong>
                CONNECTED
              </strong>

              <small>
                APPROACH
              </small>

            </div>

          </div>

          {/* ==================================================
              FOUR PRINCIPLES
          ================================================== */}

          {principles.map((item) => (
            <article
              key={item.number}
              className={`why-point why-point--${item.position}`}
            >

              <div className="why-point__top">

                <span className="why-point__number">
                  {item.number}
                </span>

                <div className="why-point__icon">
                  <PrincipleIcon type={item.icon} />
                </div>

              </div>

              <h3>
                {item.title}
              </h3>

              <h4>
                {item.headline}
              </h4>

              <p>
                {item.description}
              </p>

            </article>
          ))}

        </div>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="why-vutkala__footer">

          <span />

          CONNECTED CAPABILITIES. MEANINGFUL IMPACT.

        </div>

      </div>
    </section>
  );
};

export default WhyVutkala;