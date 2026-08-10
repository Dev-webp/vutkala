import "./WhoWeAre.css";
import { useEffect } from "react";
import teamImage from "../../assets/WHoWeAre/image.png";
import missionImage from "../../assets/WHoWeAre/misson.png";
import visionImage from "../../assets/WHoWeAre/vission.png";


import {
  FiTarget,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";

function WhoWeAre() {



    useEffect(() => {

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        { threshold:0.2 }

    );

    document
        .querySelectorAll(".fade-up")
        .forEach(el=>observer.observe(el));

    return ()=>observer.disconnect();

},[]);

  return (
    <section className="who-section">

      <div className="who-container">

        {/* ===========================
            TOP SECTION
        =========================== */}

        <div className="who-top ">

          {/* LEFT IMAGE */}

          <div className="who-image fade-up">

            <img
              src={teamImage}
              alt="Vutkala Team"
            />

          </div>

          {/* RIGHT CONTENT */}

          <div className="who-content fade-up">

            <span className="section-tag">
              WHO WE ARE
            </span>

            <h2>

              Who <span>We Are</span>

            </h2>

            <p>

              Vutkala Global is a technology,
              consulting and workforce solutions
              company helping businesses accelerate
              growth through skilled talent and
              innovative digital solutions.

            </p>

            <p>

              From recruitment and staffing
              to enterprise technology services,
              we bridge global opportunities
              between the USA and India.

            </p>


          </div>

        </div>

        {/* ===========================
            BOTTOM
        =========================== */}

        <div className="who-bottom">

          {/* Mission */}

          <div className="mission-card fade-up">

            <div className="card-overlay"></div>

            <div className="card-content">

              <div className="icon-circle">

                <FiTarget />

              </div>

              <div>

                <span>
                  OUR MISSION
                </span>

                <h3>
                  Mission
                </h3>

                <p>

                  Deliver innovative technology,
                  workforce and consulting
                  solutions that help
                  organizations grow,
                  thrive and make
                  a lasting impact.

                </p>

                <div className="keywords">

                  <span>People</span>

                  <span>Technology</span>

                  <span>Progress</span>

                </div>

              </div>

            </div>

            <img
              src={missionImage}
              alt="Mission"
            />

          </div>

          {/* Vision */}

          <div className="vision-card fade-up">

            <div className="card-overlay"></div>

            <div className="card-content">

              <div className="icon-circle orange">

                <FiEye />

              </div>

              <div>

                <span>
                  OUR VISION
                </span>

                <h3>
                  Vision
                </h3>

                <p>

                  Become a globally trusted
                  partner connecting talent,
                  technology and business
                  worldwide.

                </p>

                <div className="keywords">

                  <span>Stronger</span>

                  <span>Smarter</span>

                  <span>Connected World</span>

                </div>

              </div>

            </div>

            <img
              src={visionImage}
              alt="Vision"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhoWeAre;