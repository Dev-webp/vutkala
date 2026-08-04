import "./GoogleMap.css";

function GoogleMap() {
  return (
    <section className="google-map-section">
      <div className="gm-header">
        <span className="gm-badge">FIND US</span>
        <h2>Visit Our Office</h2>
        <p>Located in the heart of Hyderabad's technology corridor.</p>
      </div>

      <div className="gm-container">
        <iframe
          title="VUTKAL Global Technologies Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243187.8!2d78.3872!3d17.4483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0x92ee9f35a67d3946!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default GoogleMap;