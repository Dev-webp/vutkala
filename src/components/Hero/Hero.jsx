import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

/*
|--------------------------------------------------------------------------
| VUTKALA GLOBAL — PREMIUM HERO SLIDER
|--------------------------------------------------------------------------
|
| Slide order:
|
| 1. Cinematic Enterprise
| 2. Premium Corporate
| 3. Global Workforce
| 4. Editorial
| 5. Human + Technology
|
| Every slide automatically changes every 3 seconds.
|
*/

const SLIDE_DURATION = 3000;
const TRANSITION_DURATION = 950;

const slides = [
  /*
  |--------------------------------------------------------------------------
  | SLIDE 1 — CINEMATIC ENTERPRISE
  |--------------------------------------------------------------------------
  */

  {
    id: 1,
    type: "cinematic",

    label: "VUTKALA GLOBAL",

    title: (
      <>
        Connecting Businesses
        <br />
        with <span>Talent & Technology.</span>
      </>
    ),

    description:
      "Empowering organizations with talent, technology, and innovation to build a stronger future.",

    image: "/assets/hero/hero-5-cinematic.webp",

    alt:
      "Business leaders in a premium city office overlooking a skyline",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 2 — PREMIUM CORPORATE
  |--------------------------------------------------------------------------
  */

  {
    id: 2,
    type: "corporate",

    label: "VUTKALA GLOBAL",

    title: (
      <>
        Build.
        <br />
        Scale.
        <br />
        <span>Transform.</span>
      </>
    ),

    description:
      "Building technology solutions, connecting exceptional talent, and helping businesses transform with confidence.",

    image: "/assets/hero/hero-1-corporate.webp",

    alt:
      "Modern corporate office overlooking a city at sunset",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 3 — GLOBAL WORKFORCE
  |--------------------------------------------------------------------------
  */

  {
    id: 3,
    type: "workforce",

    label: "GLOBAL WORKFORCE SOLUTIONS",

    title: (
      <>
        Connecting Talent.
        <br />
        <span>Creating Opportunities.</span>
      </>
    ),

    description:
      "We connect exceptional people with the opportunities and businesses that help them thrive.",

    image: "/assets/hero/hero-2-workforce.webp",

    alt:
      "Professional team collaborating in a modern office",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 4 — EDITORIAL
  |--------------------------------------------------------------------------
  */

  {
    id: 4,
    type: "editorial",

    label: "VUTKALA GLOBAL",

    title: (
      <>
        THINK.
        <br />
        <span>INNOVATE.</span>
        <br />
        DELIVER.
      </>
    ),

    meta: "Talent • Technology • Growth",

    description:
      "Ideas that inspire. Solutions that create impact.",

    image: "/assets/hero/hero-3-editorial.webp",

    alt:
      "Contemporary glass architecture representing technology and innovation",

    objectPosition: "center center",
  },

  /*
  |--------------------------------------------------------------------------
  | SLIDE 5 — HUMAN + TECHNOLOGY
  |--------------------------------------------------------------------------
  */

  {
    id: 5,
    type: "human-tech",

    label: "PEOPLE + TECHNOLOGY",

    title: (
      <>
        Connecting People.
        <br />
        Powering <span>Technology.</span>
      </>
    ),

    description:
      "Better people. Better technology. Stronger businesses.",

    image: "/assets/hero/hero-4-human-tech.webp",

    alt:
      "Business professional surrounded by a subtle digital technology network",

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