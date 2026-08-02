import technologyImg from "../../assets/services/technology.png";
import workforceImg from "../../assets/services/workforce.png";
import consultingImg from "../../assets/services/consulting.png";
import transformationImg from "../../assets/services/transformation.png";

import {
  FaRobot,
  FaCode,
  FaCloud,
  FaDatabase,
  FaShieldAlt,
  FaServer,

  FaUsers,
  FaUserTie,
  FaHandshake,
  FaMoneyCheckAlt,

  FaBriefcase,
  FaLaptopCode,
  FaChartLine,
  FaSitemap,

  FaBolt,
  FaMobileAlt,
  FaSyncAlt,
} from "react-icons/fa";

export const services = [
  {
    tag: "Technology",

    title: "Technology Services",

    description:
      "Accelerate innovation with enterprise-grade AI, cloud, software engineering and data solutions built for modern businesses.",

    image: technologyImg,

    features: [
      {
        icon: FaRobot,
        text: "AI Solutions",
      },
      {
        icon: FaCloud,
        text: "Cloud Engineering",
      },
      {
        icon: FaCode,
        text: "Software Development",
      },
      {
        icon: FaDatabase,
        text: "Data Engineering",
      },
      {
        icon: FaShieldAlt,
        text: "Cyber Security",
      },
      {
        icon: FaServer,
        text: "DevOps",
      },
    ],
  },

  {
    tag: "Workforce",

    title: "Workforce Solutions",

    description:
      "Helping enterprises hire exceptional talent through staffing, executive search, recruitment and payroll solutions.",

    image: workforceImg,

    features: [
      {
        icon: FaUsers,
        text: "Permanent Hiring",
      },
      {
        icon: FaUserTie,
        text: "Executive Search",
      },
      {
        icon: FaHandshake,
        text: "Contract Staffing",
      },
      {
        icon: FaMoneyCheckAlt,
        text: "Payroll Services",
      },
      {
        icon: FaUsers,
        text: "Talent Acquisition",
      },
      {
        icon: FaUserTie,
        text: "Global Recruitment",
      },
    ],
  },

  {
    tag: "Consulting",

    title: "Consulting Services",

    description:
      "Driving enterprise growth through strategic consulting, digital advisory and technology modernization.",

    image: consultingImg,

    features: [
      {
        icon: FaBriefcase,
        text: "Business Consulting",
      },
      {
        icon: FaLaptopCode,
        text: "Technology Consulting",
      },
      {
        icon: FaCloud,
        text: "Cloud Strategy",
      },
      {
        icon: FaSitemap,
        text: "Enterprise Architecture",
      },
      {
        icon: FaChartLine,
        text: "Digital Advisory",
      },
      {
        icon: FaBriefcase,
        text: "Process Optimization",
      },
    ],
  },

  {
    tag: "Digital",

    title: "Digital Transformation",

    description:
      "Modernize your enterprise through AI, automation, cloud migration and intelligent business transformation.",

    image: transformationImg,

    features: [
      {
        icon: FaBolt,
        text: "Automation",
      },
      {
        icon: FaCloud,
        text: "Cloud Migration",
      },
      {
        icon: FaMobileAlt,
        text: "Enterprise Mobility",
      },
      {
        icon: FaSyncAlt,
        text: "Legacy Modernization",
      },
      {
        icon: FaRobot,
        text: "AI Transformation",
      },
      {
        icon: FaCode,
        text: "Application Modernization",
      },
    ],
  },
];