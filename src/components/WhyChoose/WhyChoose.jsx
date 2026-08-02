import "./WhyChoose.css";
import Counter from "./Counter";
// Feature Images
import globalImg from "../../assets/whychoose/global.png";
import talentImg from "../../assets/whychoose/talent.png";
import executionImg from "../../assets/whychoose/execution.png";
import securityImg from "../../assets/whychoose/security.png";
import partnershipImg from "../../assets/whychoose/partnership.png";
import scalableImg from "../../assets/whychoose/scalable.png";

const features = [
  {
    image: globalImg,
    title: "Global Delivery",
    desc: "Serving enterprises across the US and India with seamless technology and workforce solutions.",
  },
  {
    image: talentImg,
    title: "Expert Talent",
    desc: "Access experienced software engineers, AI specialists, cloud architects and recruiters.",
  },
  {
    image: executionImg,
    title: "Fast Execution",
    desc: "Agile delivery methodologies help reduce timelines and accelerate business outcomes.",
  },
  {
    image: securityImg,
    title: "Enterprise Security",
    desc: "Security-first approach with reliable, scalable and compliant technology solutions.",
  },
  {
    image: partnershipImg,
    title: "End-to-End Partnership",
    desc: "From strategy to deployment and ongoing support, we partner throughout your journey.",
  },
  {
    image: scalableImg,
    title: "Scalable Solutions",
    desc: "Flexible solutions designed to grow alongside your business requirements.",
  },
];

const stats = [
  {
    number: 250,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    number: 500,
    suffix: "+",
    label: "Professionals Placed",
  },
  {
    number: 50,
    suffix: "+",
    label: "Enterprise Clients",
  },
  {
    number: 2,
    suffix: "",
    label: "Countries Connected",
  },
];
function WhyChoose() {
  return (
    <section className="why-section">

      <div className="why-header">

        <span className="section-tag">
          WHY CHOOSE VUTKAL
        </span>

        <h2>
          Your Trusted Partner for
          <br />
         <span className="blue-text" >  Global Technology &
          Workforce Solutions</span>
        </h2>

        <p>
          We combine innovation, expert professionals and modern delivery
          methodologies to help enterprises accelerate growth and digital
          transformation.
        </p>

      </div>

      <div className="why-grid">

        {features.map((item) => (

          <div
            className="why-card"
            key={item.title}
          >

            <div className="why-image">

              <img
                src={item.image}
                alt={item.title}
              />

            </div>

            <div className="why-content">

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

          </div>

        ))}

      </div>


<div className="stats-row">

  {stats.map((item) => (

    <div
      className="stat-box"
      key={item.label}
    >

      <Counter
        end={item.number}
        suffix={item.suffix}
      />

      <p>{item.label}</p>

    </div>

  ))}

</div>
    </section>
  );
}

export default WhyChoose;