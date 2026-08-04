import "./Hero.css";
import "../../styles/globalbuttonbtn.css";

import {
  FiSearch,
  FiUsers,
  FiShield,
} from "react-icons/fi";

import {
  FaBrain,
  FaGlobeAmericas,
} from "react-icons/fa";

function Hero() {
  return (
    <>
      <section className="hero">

        {/* Background Overlay */}
        <div className="hero-overlay"></div>

        {/* Background Glow */}
        <div className="glow glow-orange"></div>
        <div className="glow glow-pink"></div>

        {/* SVG Connection Animation */}
        <svg
          className="connection-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >

     

        

          <circle className="travel-dot" r="1.3">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
            >
              <mpath href="#flightPath" />
            </animateMotion>
          </circle>

        </svg>

        <div className="hero-container">

          <div className="hero-left">

            <div className="hero-badge">
              🌍 USA ↔ INDIA WORKFORCE SOLUTIONS
            </div>

            <h1>
              Connecting
              <br />

              <span className="orange">
                USA & India
              </span>

              <br />

              Enterprises
              <br />

              with

              <span className="pink">
                {" "}Talent &
                <br />
                Technology
              </span>

            </h1>

            <p>
              Helping businesses hire exceptional talent,
              build digital products,
              and scale confidently across
              the USA and India.
            </p>

            <div className="hero-buttons">

              <button className="globalbuttonbtn">
                <FiUsers />
                Hire Talent
              </button>

              <button className="secondary-btn">
                <FiSearch />
                Search Jobs
              </button>

            </div>
<div className="scroll-indicator">
    Scroll
</div>
      

          </div>

        </div>

      </section>
    </>
  );
}

export default Hero;