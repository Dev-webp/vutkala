import React from "react";
import "./FinalCTA.css";

import teamCollaboration from "../../assets/people/team-collab.jpg";

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="final-cta-container">

        {/* ============================================================
            LEFT — CONTENT
        ============================================================ */}

        <div className="final-cta-content">

          <div className="final-cta-label">
            READY FOR WHAT'S NEXT?
          </div>

          <h2 className="final-cta-title">
            The right people.
            <br />
            The right technology.
            <br />
            The right expertise.
          </h2>

          <p className="final-cta-subtitle">
            Together, creating what's next.
          </p>

          {/* ACTIONS */}

          <div className="final-cta-actions">

            <a
              href="/hire"
              className="final-cta-primary"
            >
              <span>Hire Talent</span>

              <span className="final-cta-arrow">
                →
              </span>
            </a>

            <a
              href="/jobs"
              className="final-cta-link"
            >
              <span>Find Jobs</span>
              <span>→</span>
            </a>

            <a
              href="/services"
              className="final-cta-link"
            >
              <span>Explore Services</span>
              <span>→</span>
            </a>

            <a
              href="/contact"
              className="final-cta-link"
            >
              <span>Contact Us</span>
              <span>→</span>
            </a>

          </div>

        </div>


        {/* ============================================================
            RIGHT — IMAGE
        ============================================================ */}

        <div className="final-cta-image-wrapper">

          <img
            src={teamCollaboration}
            alt="Vutkala Global team collaborating"
            className="final-cta-image"
          />

          <div className="final-cta-image-overlay" />

          <div className="final-cta-image-tag">
            VUTKALA GLOBAL
          </div>

          <div className="final-cta-image-corner">
            <span>PEOPLE</span>
            <span>TECHNOLOGY</span>
            <span>GROWTH</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTA;