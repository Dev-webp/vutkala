 import "./GlobalDelivery.css";
import globalBridge from "../../assets/homeservices/globalBridge.png";

import {
  FaUsers,
  FaHandshake,
  FaClipboardList,
  FaChartLine,
  FaStar,
  FaCode,
  FaCloud,
  FaShieldAlt,
  FaHeadset,
  FaRobot,
  FaRocket,
  FaUserFriends,
} from "react-icons/fa";

import { FiClock } from "react-icons/fi";

import usaFlag from "../../assets/home/usa.png";
import indiaFlag from "../../assets/home/india.png";

const usaServices = [
  {
    icon: <FaUsers />,
    title: "Recruitment",
    text: "Finding and attracting top talent",
  },
  {
    icon: <FaHandshake />,
    title: "Consulting",
    text: "Business & technology consulting",
  },
  {
    icon: <FaStar />,
    title: "Client Success",
    text: "Ensuring customer satisfaction",
  },
  {
    icon: <FaClipboardList />,
    title: "Project Planning",
    text: "Strategy, roadmap and planning",
  },
  {
    icon: <FaChartLine />,
    title: "Business Growth",
    text: "Driving growth and long-term value",
  },
];

const indiaServices = [
  {
    icon: <FaCode />,
    title: "Engineering",
    text: "Robust and scalable development",
  },
  {
    icon: <FaRobot />,
    title: "AI & Innovation",
    text: "AI solutions and intelligent automation",
  },
  {
    icon: <FaCloud />,
    title: "Cloud Services",
    text: "Cloud engineering and DevOps",
  },
  {
    icon: <FaShieldAlt />,
    title: "Quality Assurance",
    text: "Testing, security and quality excellence",
  },
  {
    icon: <FaHeadset />,
    title: "Technical Support",
    text: "24/7 support and maintenance",
  },
];

const features = [
  {
    icon: <FaUserFriends />,
    title: "Seamless",
    sub: "Collaboration",
  },
  {
    icon: <FiClock />,
    title: "24/7",
    sub: "Productivity",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure &",
    sub: "Compliant",
  },
  {
    icon: <FaRocket />,
    title: "Faster",
    sub: "Delivery",
  },
  {
    icon: <FaChartLine />,
    title: "Scalable",
    sub: "Solutions",
  },
];

function GlobalDelivery() {
  return (
    <section className="global-network">
      <div className="network-bg"></div>

      {/* Header */}

      <div className="network-header">
        <span className="network-badge">
          🌐 GLOBAL DELIVERY NETWORK
        </span>

        <h2>
          Bridging USA & India
          <br />
          Delivering<span>Excellence Together </span>
        </h2>

        <p>
          Our integrated delivery model combines client engagement and
          business expertise in the USA with world-class technology,
          talent and execution in India to deliver innovative
          solutions and measurable business outcomes.
        </p>
      </div>

      {/* Main */}

      <div className="network-main">

        {/* Image */}

        <div className="network-image">
          <img
            src={globalBridge}
            alt="USA India Global Delivery"
            className="global-bridge-image"
          />
        </div>

        {/* Bottom Cards */}

        <div className="network-bottom">

          {/* USA */}

          <div className="country-card">

            <div className="country-label usa">
              <img src={usaFlag} alt="USA" />
              <span>USA</span>
            </div>

            <div className="service-list">

              {usaServices.map((item, index) => (
                <div className="service-item" key={index}>

                  <div className="service-icon">
                    {item.icon}
                  </div>

                  <div className="service-content">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* INDIA */}

          <div className="country-card">

            <div className="country-label india">
              <img src={indiaFlag} alt="India" />
              <span>INDIA</span>
            </div>

            <div className="service-list">

              {indiaServices.map((item, index) => (
                <div className="service-item" key={index}>

                  <div className="service-icon orange">
                    {item.icon}
                  </div>

                  <div className="service-content">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="network-footer">

        <div className="footer-heading">

          <span></span>

          <h3>
            CONNECTED BY
            <br />
            <strong>VUTKALA GLOBAL</strong>
          </h3>

          <span></span>

        </div>

        <div className="feature-grid">

          {features.map((item, index) => (
            <div className="feature-card" key={index}>

              <div className="feature-icon">
                {item.icon}
              </div>

              <h4>{item.title}</h4>

              <p>{item.sub}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default GlobalDelivery; 

