import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

import hero1 from "../../assets/Hero/hero1.png";
import hero2 from "../../assets/Hero/hero2.png";
import hero3 from "../../assets/Hero/hero3.png";
import hero4 from "../../assets/Hero/hero4.png";
import hero5 from "../../assets/Hero/hero5.png";

/*
|--------------------------------------------------------------------------
| VUTKALA GLOBAL — PREMIUM HERO SLIDER
|--------------------------------------------------------------------------
|
| Slide order (final approved story):
|
| 1. Identity            — Cinematic
| 2. Talent               — Workforce
| 3. Technology           — Editorial
| 4. Business Growth      — Corporate
| 5. Global Reach         — Human + Technology
|
| Every slide automatically changes every 3 seconds.
|
*/

const SLIDE_DURATION = 3000;
const TRANSITION_DURATION = 950;

const slides = [
  /*
  |--------------------------------------------------------------------------
  | SLIDE 1 — IDENTITY (CINEMATIC)
  |--------------------------------------------------------------------------
  */

  {
    id: 1,
    type: "cinematic",

    label: "VUTKALA GLOBAL",

    title: (
      <>
        People and Technology.
        <br />
        <span>United for Business.</span>
      </>
    ),

    description:
      "We bring exceptional talent and smart technology together to help organizations move forward.",

    image: hero1,

    alt:
      "Diverse professionals collaborating in a premium global office",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 2 — TALENT (WORKFORCE)
  |--------------------------------------------------------------------------
  */

  {
    id: 2,
    type: "workforce",

    label: "TALENT SOLUTIONS",

    title: (
      <>
        The Right People,
        <br />
        <span>Placed with Purpose.</span>
      </>
    ),

    description:
      "We match exceptional professionals with organizations that need their skills — locally and across borders.",

    image:hero2,

    alt:
      "Professional working closely with a colleague in a modern office",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 3 — TECHNOLOGY (EDITORIAL)
  |--------------------------------------------------------------------------
  */

  {
    id: 3,
    type: "editorial",

    label: "TECHNOLOGY SOLUTIONS",

    title: (
      <>
        Smart Systems.
        <br />
        <span>Real Business Results.</span>
      </>
    ),

    description:
      "We design and deliver technology that solves practical problems — not just ideas on a slide.",

    image: hero3,

    alt:
      "Contemporary glass architecture representing technology and innovation",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 4 — BUSINESS GROWTH (CORPORATE)
  |--------------------------------------------------------------------------
  */

  {
    id: 4,
    type: "corporate",

    label: "BUSINESS GROWTH",

    title: (
      <>
        Complex Challenges.
        <br />
        <span>Clear Solutions.</span>
      </>
    ),

    description:
      "When talent and technology work together, businesses solve problems faster and grow with confidence.",

    image: hero4,

    alt:
      "Modern corporate office overlooking a city at sunset",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 5 — GLOBAL REACH (HUMAN + TECHNOLOGY)
  |--------------------------------------------------------------------------
  */

  {
    id: 5,
    type: "human-tech",

    label: "INTERNATIONAL REACH",

    title: (
      <>
        Opportunity,
        <br />
        <span>Without Borders.</span>
      </>
    ),

    description:
      "From local expertise to international reach, Vutkala connects people and organizations across the world.",

    image: hero5,

    alt:
      "Professional connected within a global digital network",

    objectPosition: "65% center",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const slideCount = slides.length;

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide((index + slideCount) % slideCount);
    },
    [slideCount]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      (previous) => (previous + 1) % slideCount
    );
  }, [slideCount]);

  const previousSlide = useCallback(() => {
    setCurrentSlide(
      (previous) =>
        (previous - 1 + slideCount) % slideCount
    );
  }, [slideCount]);

  /*
  |--------------------------------------------------------------------------
  | AUTOMATIC SLIDER — EVERY 3 SECONDS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (isPaused || isDocumentHidden) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    isPaused,
    isDocumentHidden,
    nextSlide,
  ]);

  /*
  |--------------------------------------------------------------------------
  | BROWSER TAB VISIBILITY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | KEYBOARD NAVIGATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [nextSlide, previousSlide]);

  /*
  |--------------------------------------------------------------------------
  | TOUCH SWIPE
  |--------------------------------------------------------------------------
  */

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX =
      touch.clientX - touchStartX.current;

    const deltaY =
      touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Ignore vertical swipes so normal page
     * scrolling continues to work.
     */

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | PAUSE ON HOVER
  |--------------------------------------------------------------------------
  */

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  /*
  |--------------------------------------------------------------------------
  | PROGRESS RESET
  |--------------------------------------------------------------------------
  */

  const progressKey = useMemo(
    () =>
      `${currentSlide}-${isPaused}-${isDocumentHidden}`,
    [
      currentSlide,
      isPaused,
      isDocumentHidden,
    ]
  );

  const current = slides[currentSlide];

  return (
    <section
      className={`vutkala-hero vutkala-hero--${current.type}`}
      aria-label="Vutkala Global hero section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* ================================================================
          BACKGROUND
      ================================================================= */}

      <div
        className="hero-background"
        aria-hidden="true"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-background__slide ${
              index === currentSlide
                ? "hero-background__slide--active"
                : ""
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="hero-background__image"
              style={{
                objectPosition:
                  slide.objectPosition,
              }}
              loading={
                index === 0
                  ? "eager"
                  : "lazy"
              }
              fetchPriority={
                index === 0
                  ? "high"
                  : "auto"
              }
            />

            <div className="hero-background__overlay" />
          </div>
        ))}
      </div>

      {/* ================================================================
          VISUAL DEPTH
      ================================================================= */}

      <div
        className="hero-noise"
        aria-hidden="true"
      />

      <div
        className="hero-vignette"
        aria-hidden="true"
      />

      {/* ================================================================
          CONTENT
      ================================================================= */}

      <div className="hero-container">

        <div
          key={`${current.id}-${progressKey}`}
          className="hero-content"
        >

          <div
            className="hero-content__accent"
            aria-hidden="true"
          />

          {/* LABEL */}

          <div className="hero-label">

            <span
              className="hero-label__line"
            />

            <span>
              {current.label}
            </span>

          </div>

          {/* HEADING */}

          <h1 className="hero-title">
            {current.title}
          </h1>

          {/* META */}

          {current.meta && (
            <div className="hero-meta">
              {current.meta}
            </div>
          )}

          {/* DESCRIPTION */}

          <p className="hero-description">
            {current.description}
          </p>

          {/* ============================================================
              SAME BUTTON ORDER ON EVERY SLIDE

              1. Hire Talent
              2. Find Jobs
              3. Explore Services
          ============================================================ */}

          <div className="hero-actions">

            <Link
              to="/hire"
              className="hero-button hero-button--primary"
            >
              <span>
                Hire Talent
              </span>

              <span
                className="hero-button__arrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              to="/jobs"
              className="hero-button hero-button--secondary"
            >
              <span>
                Find Jobs
              </span>
            </Link>

            <Link
              to="/services"
              className="hero-button hero-button--text"
            >
              Explore Services

              <span aria-hidden="true">
                →
              </span>
            </Link>

          </div>

        </div>

        {/* SLIDE 2 DIVIDER */}

        {current.type === "workforce" && (
          <div
            className="workforce-divider"
            aria-hidden="true"
          />
        )}

      </div>

      {/* ================================================================
          PREVIOUS / NEXT
      ================================================================= */}

      <div className="hero-controls">

        <button
          type="button"
          className="hero-control hero-control--previous"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          <span aria-hidden="true">
            ←
          </span>
        </button>

        <div className="hero-slide-counter">

          <span className="hero-slide-counter__current">
            {String(
              currentSlide + 1
            ).padStart(2, "0")}
          </span>

          <span className="hero-slide-counter__separator">
            /
          </span>

          <span className="hero-slide-counter__total">
            {String(slideCount).padStart(
              2,
              "0"
            )}
          </span>

        </div>

        <button
          type="button"
          className="hero-control hero-control--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span aria-hidden="true">
            →
          </span>
        </button>

      </div>

      {/* ================================================================
          INDICATORS
      ================================================================= */}

      <div
        className="hero-indicators"
        role="tablist"
        aria-label="Hero slides"
      >

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-indicator ${
              index === currentSlide
                ? "hero-indicator--active"
                : ""
            }`}
            onClick={() =>
              goToSlide(index)
            }
            role="tab"
            aria-selected={
              index === currentSlide
            }
            aria-label={`Go to slide ${
              index + 1
            }`}
          >

            <span className="hero-indicator__number">
              {String(index + 1).padStart(
                2,
                "0"
              )}
            </span>

            <span className="hero-indicator__line">

              {index === currentSlide && (
                <span
                  key={progressKey}
                  className="hero-indicator__progress"
                />
              )}

            </span>

          </button>
        ))}

      </div>

      {/* ================================================================
          SCROLL
      ================================================================= */}

      <div
        className="hero-scroll"
        aria-hidden="true"
      >
        <span>
          Scroll to explore
        </span>

        <span className="hero-scroll__line" />
      </div>

    </section>
  );
}

export default Hero;