import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Users,
  Globe2,
  Target,
  Sparkles
} from "lucide-react";

import StoryImage from "../../../assets/About/hero.png"

import "./OurStory.css";

const storyItems = [
  {
    icon: UserRound,
    title: "WHERE WE STARTED",
    description: "Connection comes first, creating lasting opportunities.",
  },
  {
    icon: Users,
    title: "WHAT WE BELIEVE",
    description: "People and technology create meaningful possibilities.",
  },
  {
    icon: Globe2,
    title: "WHERE WE’RE GOING",
    description: "Building a globally connected future together.",
  },
  {
    icon: Target,
    title: "WHAT DRIVES US",
    description: "Purpose guides every connection we create.",
  },
  {
    icon: Sparkles,
    title: "WHAT COMES NEXT",
    description: "Creating possibilities that shape tomorrow together.",
  },
];
function useReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
}

export default function OurStory() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section
      ref={sectionRef}
      className={`our-story-section ${
        isVisible ? "our-story-section--visible" : ""
      }`}
      id="about-story"
    >
      {/* =========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div
        className="our-story-wave"
        aria-hidden="true"
      />

      {/* =========================================
          CONTAINER
      ========================================== */}

      <div className="our-story-container">

        <div className="our-story-grid">

          {/* =====================================
              LEFT COLUMN
          ====================================== */}

          <div className="our-story-left">

            {/* SECTION NUMBER */}

            <div className="our-story-number-row">

              <span className="our-story-number">
                01
              </span>

              <span
                className="our-story-line"
                aria-hidden="true"
              />

            </div>


            {/* EDITORIAL TITLE */}

            <h2 className="our-story-title">
              OUR <br/>
              <span>STORY</span>
            </h2>


            {/* STORY ITEMS */}

            <div className="our-story-items">

              {storyItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    className="our-story-item"
                    key={item.title}
                    style={{
                      "--item-delay": `${index * 140}ms`,
                    }}
                  >

                    {/* ICON */}

                    <div
                      className="our-story-item-icon"
                      aria-hidden="true"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>


                    {/* CONTENT */}

                    <div className="our-story-item-content">

                      <h3 className="our-story-item-title">
                        {item.title}
                      </h3>

                      <p className="our-story-item-description">
                        {item.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>


          {/* =====================================
              RIGHT COLUMN
          ====================================== */}

          <div className="our-story-right">

            {/* HEADING */}

            <div className="our-story-heading-wrap">

              <h2 className="our-story-heading">

                <span>
                  FROM CONNECTION
                </span>

                <span>
                  TO{" "}
                  <em className="our-story-heading-highlight">
                    POSSIBILITY.
                  </em>
                </span>

              </h2>

            </div>


            {/* DESCRIPTION */}

            <p className="our-story-description">
              Vutkala Global was built around a simple
              belief: better outcomes happen when people,
              technology and opportunity connect.
            </p>


            {/* IMAGE */}

            <div className="our-story-image-wrapper">

              <img
                className="our-story-image"
                src={StoryImage}
                alt="Vutkala Global professionals collaborating together in a modern technology office"
              />

              <div
                className="our-story-image-overlay"
                aria-hidden="true"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}