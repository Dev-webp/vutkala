import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./AboutCTA.css";

function AboutCTA() {
  return (
    <section className="about-cta-final" aria-label="Call to action">
      <div className="acf-wave acf-wave-a" aria-hidden="true"></div>
      <div className="acf-wave acf-wave-b" aria-hidden="true"></div>
      <div className="acf-glow" aria-hidden="true"></div>

      <div className="acf-inner">
        <motion.div
          className="acf-text"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Ready to Transform Your Business?</h2>
          <p>
            Let's build innovative solutions, modernize your technology, and
            accelerate your growth together.
          </p>
        </motion.div>

        <motion.div
          className="acf-buttons"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Link to="/contact" className="acf-primary-btn">
            <motion.span
              className="acf-btn-inner"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Contact Us <FiArrowRight aria-hidden="true" />
            </motion.span>
          </Link>
          <Link to="/hire-talent" className="acf-outline-btn">
            <motion.span
              className="acf-btn-inner"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Hire Talent
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutCTA;