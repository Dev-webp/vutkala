import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import "./ContactInfo.css";

function ContactInfo() {
  const cards = [
    {
      icon: <FiMapPin />,
      title: "Office",
      lines: ["Hyderabad, Telangana", "India"],
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      lines: ["+91 40 1234 5678", "Mon - Fri, 9AM - 6PM"],
    },
    {
      icon: <FiMail />,
      title: "Email",
      lines: ["info@vutkalglobal.com", "careers@vutkalglobal.com"],
    },
    {
      icon: <FiClock />,
      title: "Working Hours",
      lines: ["Monday - Friday", "9:00 AM - 6:00 PM"],
    },
  ];

  return (
    <section className="contact-info">
      <div className="ci-grid">
        {cards.map((card, i) => (
          <div
            className="ci-card"
            key={i}
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            <div className="ci-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            {card.lines.map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactInfo;