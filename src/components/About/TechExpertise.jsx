import "./TechExpertise.css";

function TechExpertise() {

  const technologies = [
    { name: "AWS", icon: "devicon-amazonwebservices-original colored" },
  
    { name: "Google Cloud", icon: "devicon-googlecloud-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
   
    { name: "Angular", icon: "devicon-angularjs-plain colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
    { name: "Spring", icon: "devicon-spring-plain colored" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "Kubernetes", icon: "devicon-kubernetes-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
    { name: "Redis", icon: "devicon-redis-plain colored" },
    { name: "TensorFlow", icon: "devicon-tensorflow-original colored" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "Figma", icon: "devicon-figma-plain colored" },
    { name: "Flutter", icon: "devicon-flutter-plain colored" }
  ];

  const logos = [...technologies, ...technologies];

  return (
    <section className="tech-stack">

      <div className="tech-header">

        <span>TECHNOLOGY EXPERTISE</span>

        <h2>
          Modern Technologies
          <br />
          <span>Driving Innovation</span>
        </h2>

        <p>
          We build enterprise-grade applications using globally trusted
          technologies across Cloud, AI, Data, DevOps and Software Engineering.
        </p>

      </div>

      <div className="logo-slider">

        <div className="logo-track">

          {logos.map((tech, index) => (

            <div className="logo-item" key={index}>

              <div className="logo-icon">

                <i className={tech.icon}></i>

              </div>

              <span>{tech.name}</span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default TechExpertise;