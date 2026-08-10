import "./ServiceHome.css";
import heroImage from "../../assets/servicehome.png";

function ServiceHome() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if(section){
      section.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  };

  return (

    <section
      className="services-hero"
      style={{ backgroundImage:`url(${heroImage})` }}
    >

      <div className="services-hero-overlay"></div>

      <div className="services-hero-container">

        <span className="services-hero-badge">
          WHAT WE DELIVER
        </span>

        <h1>
          End-to-End Business
          <br />
          Solutions for Modern Enterprises
        </h1>

        <p>
          We combine industry expertise,
          skilled professionals,
          and innovative technologies
          to help businesses overcome
          challenges,
          improve performance,
          and achieve sustainable growth.
        </p>


        <div className="services-hero-buttons">

  <button
    className="primary-btn"
    onClick={() => scrollToSection("technology")}
  >
    Technology Services
  </button>

  <button
    className="secondary-btn"
    onClick={() => scrollToSection("workforce")}
  >
    Workforce Solutions
  </button>

  <button
    className="secondary-btn"
    onClick={() => scrollToSection("consulting")}
  >
    Consulting Services
  </button>

  <button
    className="secondary-btn"
    onClick={() => scrollToSection("digital")}
  >
    Digital Transformation
  </button>

</div>




      </div>

    </section>

  );
}

export default ServiceHome;