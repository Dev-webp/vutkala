import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { FiUsers, FiGlobe, FiHome, FiTarget } from "react-icons/fi";
import "./JourneyTimeline.css";

function JourneyTimeline() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 });

  const milestones = [
    {
      year: "2026",
      title: "Founded",
      desc: "Started with a vision to connect USA & India talent.",
      icon: <FaRocket />,
    },
    {
      year: "2026",
      title: "First Enterprise Client",
      desc: "Delivered technology solutions for leading US businesses.",
      icon: <FiUsers />,
    },
    {
      year: "2026",
      title: "USA Expansion",
      desc: "Built stronger partnerships with American enterprises.",
      icon: <FiGlobe />,
    },
    {
      year: "2026",
      title: "India Delivery Center",
      desc: "Scaled engineering teams in India.",
      icon: <FiHome />,
    },
    {
      year: "2026",
      title: "Global Technology Partner",
      desc: "Trusted by enterprises across USA and India.",
      icon: <FiTarget />,
    },
  ];

  return (
    <section className="journey-section" aria-label="Our Journey">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        Our Journey So Far
      </motion.h2>

      <div className="journey-timeline" ref={lineRef}>
        <div className="journey-line-track">
          <motion.div
            className="journey-line-fill"
            initial={{ scaleX: 0 }}
            animate={lineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div className="journey-nodes">
          {milestones.map((m, i) => (
            <motion.div
              className="journey-node"
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <motion.div
                className="journey-icon"
                whileHover={{ scale: 1.12 }}
              >
                {m.icon}
              </motion.div>
              <span className="journey-year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JourneyTimeline;