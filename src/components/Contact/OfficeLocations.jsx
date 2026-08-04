import { FiPhone, FiMail, FiNavigation } from "react-icons/fi";
import "./OfficeLocations.css";

function OfficeLocations() {
  const offices = [
    {
      flag: "🇮🇳",
      title: "India Office",
      address: "Level 4, Cyber Towers, Hitech City, Hyderabad, Telangana 500081, India",
      phone: "+91 40 1234 5678",
      email: "info@vutkalglobal.com",
    },
    {
      flag: "🇺🇸",
      title: "USA Office",
      address: "1201 Market Street, Suite 500, Wilmington, DE 19801, United States",
      phone: "+1 (302) 555 0192",
      email: "usa@vutkalglobal.com",
    },
  ];

  return (
    <section className="office-locations">
      <div className="ol-header">
        <span className="ol-badge">OUR OFFICES</span>
        <h2>Office Locations</h2>
        <p>With a presence across two continents, we're always close by.</p>
      </div>

      <div className="ol-grid">
        {offices.map((office, i) => (
          <div className="ol-card" key={i} style={{ animationDelay: `${0.15 * i}s` }}>
            <div className="ol-flag">{office.flag}</div>
            <h3>{office.title}</h3>
            <p className="ol-address">{office.address}</p>

            <div className="ol-detail">
              <FiPhone /> <span>{office.phone}</span>
            </div>
            <div className="ol-detail">
              <FiMail /> <span>{office.email}</span>
            </div>

            <button className="ol-btn">
              Get Directions <FiNavigation />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OfficeLocations;