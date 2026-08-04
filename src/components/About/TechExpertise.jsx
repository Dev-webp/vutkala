import { motion } from "framer-motion";
import { FiCloud, FiMonitor, FiCode, FiCpu, FiRefreshCw, FiBarChart2 } from "react-icons/fi";
import "./TechExpertise.css";

function TechExpertise() {
  const techs = [
    { icon: <FiCloud />, title: "Cloud", desc: "AWS · Azure · GCP" },
    { icon: <FiMonitor />, title: "Frontend", desc: "React · Next.js · Angular" },
    { icon: <FiCode />, title: "Backend", desc: "Node.js · Java · Python" },
    { icon: <FiCpu />, title: "AI / ML", desc: "OpenAI · TensorFlow · PyTorch" },
    { icon: <FiRefreshCw />, title: "DevOps", desc: "Docker · Kubernetes · Jenkins" },
    { icon: <FiBarChart2 />, title: "Data", desc: "Engineering · Big Data" },
  ];

  return (
    <section className="tech-expertise" aria-label="Technology and Talent Expertise">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        Technology &amp; Talent Expertise
      </motion.h2>
      <motion.span
        className="te-underline"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      ></motion.span>

      <div className="te-grid">
        {techs.map((t, i) => (
          <motion.div
            className="te-card"
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
          >
            <div className="te-icon">{t.icon}</div>
            <h4>{t.title}</h4>
            <p>{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TechExpertise;