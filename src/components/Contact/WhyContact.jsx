import { FiZap, FiGlobe, FiLayers, FiHeadphones } from "react-icons/fi";
import "./WhyContact.css";

function WhyContact() {
  const features = [
    {
      icon: <FiZap />,
      title: "Fast Response",
      desc: "Our team responds to every inquiry within 24 business hours, so your projects never lose momentum.",
    },
    {
      icon: <FiGlobe />,
      title: "Global Team",
      desc: "A dedicated workforce spanning the USA and India, giving you round-the-clock coverage and delivery.",
    },
    {
      icon: <FiLayers />,
      title: "Enterprise Solutions",
      desc: "Proven frameworks for staffing, cloud, and digital transformation built for enterprise-scale needs.",
    },
    {
      icon: <FiHeadphones />,
      title: "Dedicated Support",
      desc: "A named account manager and technical lead assigned to every engagement from day one.",
    },
  ];

  return (
    <section className="why-contact">
      <div className="wc-header">
        <span className="wc-badge">WHY VUTKAL</span>
        <h2>Why Contact VUTKAL Global</h2>
        <p>Enterprise-grade reliability, backed by a global delivery team.</p>
      </div>

      <div className="wc-grid">
        {features.map((f, i) => (
          <div className="wc-card" key={i} style={{ animationDelay: `${0.12 * i}s` }}>
            <div className="wc-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyContact;