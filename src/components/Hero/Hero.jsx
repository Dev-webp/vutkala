import "./Hero.css";
import logo from "../../assets/hero-world.png"
function Hero() {
  return (
    <section className="hero">

      <div className="blob blob1"></div>
<div className="blob blob2"></div>
<div className="blob blob3"></div>

    <div className="hero-left">

  <span className="hero-badge">
    🌍 USA ↔ INDIA Workforce Solutions
  </span>

  <h2>
    Connecting <br /><span>USA & India.</span>
    <br />
    Enterprises with <span>
Exceptional Talent.
    </span>
  </h2>

  <p>
    VUTKAL Global Technologies helps USA & India enterprises
    build high-performing teams and accelerate digital
    transformation through staffing, executive search,
    and technology consulting services.
  </p>

  <div className="hero-buttons">

    <button className="primary-btn">
      Hire Talent
    </button>

    <button className="secondary-btn">
      Search Jobs
    </button>

    <button className="outline-btn">
      Explore Services
    </button>

  </div>



</div>


<div className="hero-right">

  <div className="hero-glow glow-one"></div>
  <div className="hero-glow glow-two"></div>

  <img
    src={logo}
    alt="VUTKAL Hero"
    className="hero-image"
  />

  <div className="floating-card top-left">
    <div className="card-icon">☁️</div>

    <div>
      <h4>Cloud Solutions</h4>
      <p>AWS • Azure • GCP</p>
    </div>
  </div>

  <div className="floating-card top-right">
    <div className="card-icon">👨‍💻</div>

    <div>
      <h4>Hire Talent</h4>
      <p>Global Workforce</p>
    </div>
  </div>

  <div className="floating-card bottom-left">
    <div className="card-icon">🚀</div>

    <div>
      <h4>Digital Services</h4>
      <p>Transformation</p>
    </div>
  </div>

  <div className="floating-card bottom-right">
    <div className="card-icon">🌎</div>

    <div>
      <h4>US ↔ India</h4>
      <p>Enterprise Network</p>
    </div>
  </div>

</div>

    </section>
  );
}

export default Hero;