import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiSun, FiShield, FiUsers, FiHeart, FiTrendingUp, FiTarget, FiGlobe } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import "./AboutValues.css";

function useCountUp(target, shouldStart, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    let raf;

    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, target, duration]);

  return count;
}

function StatCard({ icon, value, suffix, label, note, shouldStart, delay, isText }) {
  const count = useCountUp(isText ? 0 : value, shouldStart && !isText);

  return (
    <motion.div
      className="av-stat-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="av-stat-icon">{icon}</div>
      <h3 className="av-stat-number">
        {isText ? value : count}
        {suffix}
      </h3>
      <span className="av-stat-label">{label}</span>
      <p className="av-stat-note">{note}</p>
    </motion.div>
  );
}

function AboutValues() {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, amount: 0.4 });

  const values = [
    {
      icon: <FiSun />,
      title: "Innovation",
      desc: "We embrace emerging technologies and continuous improvement.",
    },
    {
      icon: <FiShield />,
      title: "Integrity",
      desc: "We build trust through transparency and accountability.",
    },
    {
      icon: <FiUsers />,
      title: "Collaboration",
      desc: "We work closely with clients and teams to achieve shared goals.",
    },
    {
      icon: <FiHeart />,
      title: "Customer First",
      desc: "Every solution is designed around client success.",
    },
  ];

  return (
    <section className="about-values" aria-label="Our Values">
      <div className="av-inner">
        <div className="av-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h2>
          <span className="av-underline"></span>

          <div className="av-values-grid">
            {values.map((v, i) => (
              <motion.div
                className="av-value-item"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div className="av-value-icon">{v.icon}</div>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="av-divider" aria-hidden="true"></div>

        <div className="av-right" ref={statsRef}>
          <StatCard
            icon={<FaRocket />}
            value="2019"
            label="Founded"
            note="A small team with a big vision."
            shouldStart={inView}
            delay={0}
            isText
          />
          <StatCard
            icon={<FiUsers />}
            value={150}
            suffix="+"
            label="Clients"
            note="Across startups to enterprises."
            shouldStart={inView}
            delay={0.1}
          />
          <StatCard
            icon={<FiTarget />}
            value={500}
            suffix="+"
            label="Projects"
            note="Delivered successfully across industries."
            shouldStart={inView}
            delay={0.2}
          />
          <StatCard
            icon={<FiGlobe />}
            value={2}
            suffix=""
            label="Countries"
            note="USA & India working as one team."
            shouldStart={inView}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutValues;