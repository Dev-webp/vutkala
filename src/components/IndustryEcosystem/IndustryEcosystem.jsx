import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./IndustryEcosystem.css";

const industries = [
  {
    number: "01",
    title: "Technology & IT",
    subtitle: "AI · Cloud · Data",
    description:
      "Building digital capabilities for a rapidly evolving technology landscape.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#technology",
  },
  {
    number: "02",
    title: "Banking & Finance",
    subtitle: "Digital · FinTech · Scale",
    description:
      "Connecting technology, talent and expertise across modern financial services.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#finance",
  },
  {
    number: "03",
    title: "Healthcare",
    subtitle: "HealthTech · Data · Innovation",
    description:
      "Supporting smarter, more connected healthcare organizations through people and technology.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#healthcare",
  },
  {
    number: "04",
    title: "Manufacturing",
    subtitle: "Engineering · Automation",
    description:
      "Helping modern manufacturing organizations strengthen technology and workforce capabilities.",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#manufacturing",
  },
  {
    number: "05",
    title: "Retail & Consumer",
    subtitle: "Digital · E-commerce · Experience",
    description:
      "Enabling consumer businesses with digital capabilities, talent and technology.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#retail",
  },
  {
    number: "06",
    title: "Education & EdTech",
    subtitle: "Learning · Technology · Growth",
    description:
      "Connecting education organizations with people and technology for a changing world.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
    link: "/industry#education",
  },
];

function IndustryEcosystem() {
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
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`industries-section ${
        visible ? "industries-visible" : ""
      }`}
      id="industries"
    >
      <div className="industries-container">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="industries-header">

          <div className="industries-eyebrow">
            <span />
            INDUSTRIES
          </div>

          <div className="industries-heading-row">

            <h2>
              Expertise across the
              <span> sectors shaping tomorrow.</span>
            </h2>

            <p>
              We connect people, technology and expertise
              across industries where transformation and
              growth matter most.
            </p>

          </div>

        </div>


        {/* ==================================================
            INDUSTRY GRID
        ================================================== */}

        <div className="industries-grid">

          {industries.map((industry, index) => (
            <Link
              to={industry.link}
              className="industry-card"
              key={industry.number}
              style={{
                "--card-delay": `${index * 90}ms`,
              }}
            >

              {/* Image */}

              <div className="industry-card-image">

                <img
                  src={industry.image}
                  alt={industry.title}
                  loading="lazy"
                />

                <div className="industry-card-overlay" />

              </div>


              {/* Content */}

              <div className="industry-card-content">

                <div className="industry-card-top">

                  <span className="industry-number">
                    {industry.number}
                  </span>

                  <span className="industry-arrow">
                    ↗
                  </span>

                </div>

                <div className="industry-card-bottom">

                  <span className="industry-subtitle">
                    {industry.subtitle}
                  </span>

                  <h3>
                    {industry.title}
                  </h3>

                  <p>
                    {industry.description}
                  </p>

                  <span className="industry-explore">
                    Explore Industry
                    <span>→</span>
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>


        {/* ==================================================
            VIEW ALL
        ================================================== */}

        <div className="industries-footer">

          <Link
            to="/industry"
            className="view-all-industries"
          >
            <span>View All Industries</span>

            <span className="view-all-arrow">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default IndustryEcosystem;
