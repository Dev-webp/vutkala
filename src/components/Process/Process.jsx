import React from "react";
import "./Process.css";
import { motion } from "framer-motion";

import {
  FiClipboard,
  FiUsers,
  FiCpu,
  FiRocket,
  FiBarChart2,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

import {
  FaArrowRight,
} from "react-icons/fa";

import processData from "./processData";

// Images
import requirement from "../../assets/process/requirement.jpg";
import consultation from "../../assets/process/consultation.jpg";
import matching from "../../assets/process/matching.jpg";
import delivery from "../../assets/process/delivery.jpg";
import support from "../../assets/process/support.jpg";

const images = [
  requirement,
  consultation,
  matching,
  delivery,
  support,
];

const iconMap = {
  clipboard: <FiClipboard />,
  users: <FiUsers />,
  cpu: <FiCpu />,
  rocket: <FiRocket />,
  chart: <FiBarChart2 />,
};

const Process = () => {
  return (
    <section className="process-section">
<div className="floating-circle circle-1"></div>
<div className="floating-circle circle-2"></div>
<div className="floating-circle circle-3"></div>
      {/* Background Glow */}
      <div className="process-bg-glow"></div>

      <div className="container">

        {/* Top Badge */}

        <motion.div
          className="process-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
        >
          <span></span>

          <div className="badge-content">
            ⚙ HOW WE WORK
          </div>

          <span></span>
        </motion.div>

        {/* Heading */}

      <motion.h2
    className="process-title"

    initial={{
        opacity:0,
        y:80
    }}

    whileInView={{
        opacity:1,
        y:0
    }}

    transition={{
        duration:.9,
        type:"spring",
        stiffness:70
    }}

    viewport={{
        once:true
    }}
>

          A Simple Process.
          <span> Powerful Results.</span>
        </motion.h2>

        <motion.p
          className="process-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: .2 }}
          viewport={{ once: true }}
        >
          From your first interaction to successful delivery,
          we make every step seamless.
        </motion.p>

        {/* Timeline */}

        <div className="timeline-wrapper">

          {/* SVG Animated Line */}

     <svg
    className="timeline-line"
    viewBox="0 0 1200 180"
    preserveAspectRatio="none"
>

    <defs>

        <linearGradient
            id="timelineGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
        >

            <stop offset="0%" stopColor="#FF8C00"/>

            <stop offset="100%" stopColor="#E91E63"/>

        </linearGradient>

    </defs>

    <path
        d="
        M60 90
        C160 20 220 160 320 90
        S480 20 600 90
        S760 160 880 90
        S1040 20 1140 90
        "
        stroke="url(#timelineGradient)"
    />

</svg>
          {/* Cards */}
<motion.div
  className="process-grid"
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>

      </motion.div>
        {/* CTA */}

        <motion.div
          className="process-cta"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >

          {/* Left */}

          <div className="cta-left">

            <div className="cta-heading">

              <h3>
                Ready to Start
                <br />
                Your
                <span> Journey?</span>
              </h3>

            </div>

            <p>
              Let's build your workforce,
              technology, or digital transformation
              journey together.
            </p>

          </div>

          {/* Center */}

          <div className="cta-features">

            <div className="feature">

              <FiShield />

              <span>
                Trusted by
                <br />
                Global Clients
              </span>

            </div>

            <div className="feature">

              <FiUsers />

              <span>
                Expert
                <br />
                Teams
              </span>

            </div>

            <div className="feature">

              <FiGlobe />

              <span>
                USA & India
                <br />
                Delivery
              </span>

            </div>

          </div>

          {/* Right */}

          <motion.a
            href="/contact"
            className="cta-button"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
          >
            Get Started
            <FaArrowRight />
          </motion.a>

        </motion.div>

      </div>

    </section>
  );
};

export default Process;