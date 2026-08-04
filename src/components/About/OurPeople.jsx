import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import teamMeeting from "../../assets/people/team-meeting.jpg";
import teamCoding from "../../assets/people/team-coding.jpg";
import teamCollab from "../../assets/people/team-collab.jpg";
import teamGroup from "../../assets/people/team-group.jpg";
import "./OurPeople.css";

function OurPeople() {
  const trackRef = useRef(null);

  const images = [
    { src: teamMeeting, alt: "VUTKAL team collaborating in a meeting" },
    { src: teamCoding, alt: "VUTKAL engineers working at their desks" },
    { src: teamCollab, alt: "VUTKAL colleagues discussing a project" },
    { src: teamGroup, alt: "VUTKAL India delivery team group photo" },
  ];

  const scroll = (dir) => {
    if (!trackRef.current) return;
    const amount = trackRef.current.clientWidth * 0.7;
    trackRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="our-people" aria-label="Our People">
      <div className="op-inner">
        <div className="op-left">
          <span className="op-eyebrow">Our People</span>
          <span className="op-underline"></span>

          <h2>
            Our strength is
            <br />
            our people.
          </h2>

          <p>
            We are engineers, innovators, thinkers and doers. United by
            curiosity and driven by impact.
          </p>

          <Link to="/careers" className="op-link">
            Join Our Team <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="op-right">
          <div className="op-gallery-track" ref={trackRef}>
            {images.map((img, i) => (
              <motion.div
                className="op-gallery-card"
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="op-gallery-overlay"></div>
              </motion.div>
            ))}
          </div>

          <button
            className="op-nav op-nav-prev"
            onClick={() => scroll(-1)}
            aria-label="Scroll gallery left"
          >
            <FiChevronLeft />
          </button>
          <button
            className="op-nav op-nav-next"
            onClick={() => scroll(1)}
            aria-label="Scroll gallery right"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OurPeople;