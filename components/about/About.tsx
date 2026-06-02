'use client'

import { motion } from "framer-motion";
import { Archive01Icon, HeadphonesIcon, File01Icon } from "hugeicons-react";
import "./About.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const About = () => {
  return (
    <motion.section
      className="about-section"
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp}><div className="section-tag">Who I am</div></motion.div>
      <motion.h2 variants={fadeUp} className="section-heading">About Me</motion.h2>

      <motion.div variants={fadeUp} className="about-grid">
        <a href="https://github.com/saihanhtet?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div className="about-stat-card">
            <div className="about-stat-icon"><Archive01Icon size={20} /></div>
            <div className="about-stat-body">
              <div className="about-stat-value">7+</div>
              <div className="about-stat-label">Projects Completed</div>
            </div>
          </div>
        </a>
        <div className="about-stat-card">
          <div className="about-stat-icon"><HeadphonesIcon size={20} /></div>
          <div className="about-stat-body">
            <div className="about-stat-value">24/7</div>
            <div className="about-stat-label">Always Learning</div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="about-bio-card">
        <p>
          At 13, my journey in IT began with Python, inspired by Iron Man&apos;s Jarvis AI.
          Progressing from Flask projects to web development, I excelled in my GCSEs at 16
          and pursued a Foundation Diploma in IT Management in 2023. Constantly learning new
          languages — Java, JS, ReactJS, Python for ML — I thrive on innovation. Now studying
          Software Engineering at Lithan Academy, committed to mastering technology and
          embracing its evolution.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <a href="/assets/resume.pdf" className="btn" target="_blank" rel="noopener noreferrer">
          <File01Icon size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> Download Resume
        </a>
      </motion.div>
    </motion.section>
  );
};

export default About;
