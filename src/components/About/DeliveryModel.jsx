import { motion } from "framer-motion";
import { FiTarget, FiCpu, FiUsers, FiPackage } from "react-icons/fi";
import "./DeliveryModel.css";

function DeliveryModel() {
  const usaList = ["Google", "Microsoft", "Startups & Enterprises"];
  const indiaList = ["Developers", "QA & Testers", "DevOps Engineers", "AI & Data Engineers"];

  return (
    <section className="delivery-model" aria-label="Global Delivery Model">
      <div className="dm-bg-grid" aria-hidden="true"></div>
      <div className="dm-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`dm-particle dp-${(i % 6) + 1}`}></span>
        ))}
      </div>

      <div className="dm-inner">
        <div className="dm-intro">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Our Global Delivery Model
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            One team.
            <br />
            Two countries.
            <br />
            Endless possibilities.
          </motion.p>
        </div>

        <div className="dm-diagram">
          <motion.div
            className="dm-glass-card dm-usa"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
          >
            <span className="dm-card-label">USA</span>
            <span className="dm-card-sub">Clients &amp; Partners</span>
            <ul>
              {usaList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <div className="dm-connector left">
            <motion.span
              className="dm-connector-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.span>
          </div>

          <motion.div
            className="dm-core"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <motion.div
              className="dm-core-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <div className="dm-core-content">
              <span className="dm-core-title">VUTKAL</span>
              <span className="dm-core-sub">GLOBAL TECHNOLOGIES</span>
              <div className="dm-core-quads">
                <span><FiTarget /> Strategy</span>
                <span><FiCpu /> Technology</span>
                <span><FiUsers /> Talent</span>
                <span><FiPackage /> Delivery</span>
              </div>
              <span className="dm-core-support">Support</span>
            </div>
          </motion.div>

          <div className="dm-connector right">
            <motion.span
              className="dm-connector-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.span>
          </div>

          <motion.div
            className="dm-glass-card dm-india"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
          >
            <span className="dm-card-label">India</span>
            <span className="dm-card-sub">Delivery Excellence</span>
            <ul>
              {indiaList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DeliveryModel;