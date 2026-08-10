import { useEffect, useRef, useState } from "react";
import {
  Ear,
  Link2,
  PenTool,
  ArrowUpRight,
} from "lucide-react";
import "./OurApproach.css";

const processItems = [
  {
    number: "01",
    icon: Ear,
    title: "UNDERSTAND",
    description:
      "We listen first and understand your needs, goals and context.",
  },
  {
    number: "02",
    icon: Link2,
    title: "CONNECT",
    description:
      "We bring the right people, capabilities and perspectives together.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "CREATE",
    description:
      "We develop practical solutions focused on what matters most.",
  },
  {
    number: "04",
    icon: ArrowUpRight,
    title: "MOVE FORWARD",
    description:
      "We stay connected to help create lasting progress.",
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
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function OurApproach() {
  const [sectionRef, isVisible] = useReveal();

  return (
    <section
      ref={sectionRef}
      className={`our-way-section ${
        isVisible ? "our-way-section--visible" : ""
      }`}
      id="about-way-of-working"
    >
      <div className="our-way-container">

        {/* =====================================================
            TOP META
        ===================================================== */}

        <div className="our-way-top">

          <div className="our-way-top-left">

            <span className="our-way-number">
              03
            </span>

            <span className="our-way-line" />

            <span className="our-way-label">
              OUR WAY OF WORKING
            </span>

          </div>

          <span className="our-way-top-right">
            HOW WE WORK
          </span>

        </div>


        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="our-way-intro">

          <div className="our-way-heading-wrap">

            <span className="our-way-kicker">
              FROM CONNECTION
            </span>

            <h2 className="our-way-heading">
              HOW WE TURN
              <br />
              <span>CONNECTION</span>
              <br />
              INTO POSSIBILITY.
            </h2>

          </div>


          <div className="our-way-intro-copy">

            <p>
              We work through a simple, connected process —
              understanding the challenge, finding the right
              path and moving forward together.
            </p>

          </div>

        </div>


        {/* =====================================================
            PROCESS
        ===================================================== */}

        <div className="our-way-process">

          {processItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                className="our-way-item"
                key={item.title}
                style={{
                  "--item-delay": `${500 + index * 150}ms`,
                }}
              >

                <div className="our-way-item-top">

                  <span className="our-way-item-number">
                    {item.number}
                  </span>

                  <div className="our-way-item-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                </div>


                <div className="our-way-item-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>


                <span className="our-way-item-arrow">
                  ↗
                </span>

              </article>
            );
          })}

        </div>


        {/* =====================================================
            PROCESS LINE
        ===================================================== */}

        <div className="our-way-flow">

          <span>UNDERSTAND</span>

          <span className="our-way-flow-arrow">
            →
          </span>

          <span>CONNECT</span>

          <span className="our-way-flow-arrow">
            →
          </span>

          <span>CREATE</span>

          <span className="our-way-flow-arrow">
            →
          </span>

          <span>MOVE FORWARD</span>

        </div>


        {/* =====================================================
            BOTTOM META
        ===================================================== */}

        <div className="our-way-bottom">

          <span>
            03 / OUR WAY OF WORKING
          </span>

          <span>
            VUTKALA GLOBAL
          </span>

        </div>

      </div>
    </section>
  );
}