import "./JourneySection.css";
import { useEffect, useRef } from "react";


import {
  FiArrowRight,
  FiBriefcase,
  FiSearch,
  FiUsers,
  FiCode,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

import {
  FaRobot,
  FaGlobeAmericas,
} from "react-icons/fa";

function JourneySection() {

    const sectionRef = useRef(null);
  const cards = [
    {
      icon: <FiBriefcase />,
      color: "blue",
      title: "Hire Top Talent",
      description:
        "Hire skilled professionals faster with our AI-powered recruitment platform.",
      points: [
        "Pre-screened Candidates",
        "Permanent & Contract Hiring",
        "Executive Search",
        "Fast Recruitment",
      ],
      button: "Hire Talent",
    },
    {
      icon: <FiSearch />,
      color: "green",
      title: "Find Your Dream Job",
      description:
        "Discover verified opportunities across India and the USA.",
      points: [
        "Search Jobs",
        "Upload Resume",
        "Track Applications",
        "Career Guidance",
      ],
      button: "Search Jobs",
    },
    {
      icon: <FiUsers />,
      color: "purple",
      title: "Recruiter Workspace",
      description:
        "Manage hiring efficiently with powerful recruitment tools.",
      points: [
        "Candidate Pipeline",
        "Interview Management",
        "Employer Dashboard",
        "AI Candidate Matching",
      ],
      button: "Open Dashboard",
    },
    {
      icon: <FiCode />,
      color: "gradient",
      title: "Business Solutions",
      description:
        "Accelerate your business with modern technology services.",
      points: [
        "AI Solutions",
        "HRMS",
        "CRM",
        "Custom Software",
        "Web & Mobile Apps",
      ],
      button: "Explore Services",
    },
  ];

useEffect(() => {
  const cards = document.querySelectorAll(".journey-card");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, []);
  return (
   <section
    className="journey-section" ref={sectionRef}>
      {/* Background Glow */}
      <div className="journey-glow glow-left"></div>
      <div className="journey-glow glow-right"></div>

      <div className="journey-container">

        {/* Badge */}
        <div className="journey-badge">
          ONE PLATFORM. ENDLESS POSSIBILITIES
        </div>

        {/* Heading */}
        <h1 className="journey-title">
          One Platform.
          <br />
          <span>Four Powerful Solutions.</span>
        </h1>

        <p className="journey-description">
          Whether you're hiring, job searching, recruiting, or building
          technology, <strong>Vutkala Global</strong> has a dedicated
          solution designed for you.
        </p>

        {/* Cards */}
        <div className="journey-grid">

          {cards.map((card, index) => (
          <div
    key={index}
    className={`journey-card ${card.color}`}
    style={{
        transitionDelay: `${index * 150}ms`,
    }}
>
              <div className="card-icon">
                {card.icon}
              </div>

              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <ul>
                {card.points.map((point, i) => (
                  <li key={i}>
                    <FiCheckCircle />
                    {point}
                  </li>
                ))}
              </ul>

              <button className="journey-btn">
                {card.button}
                <FiArrowRight />
              </button>
            </div>
          ))}

        </div>

        {/* Trust Bar */}


      </div>
    </section>
  );
}

export default JourneySection;