'use client'

import "./About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-tag">Who I am</div>
      <h2 className="section-heading">About Me</h2>

      <div className="about-grid">
        <a href="https://github.com/saihanhtet?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <div className="about-stat-card">
            <div className="about-stat-icon">
              <i className="fa-solid fa-box-archive" />
            </div>
            <div className="about-stat-body">
              <div className="about-stat-value">7+</div>
              <div className="about-stat-label">Projects Completed</div>
            </div>
          </div>
        </a>
        <div className="about-stat-card">
          <div className="about-stat-icon">
            <i className="fa-solid fa-headphones" />
          </div>
          <div className="about-stat-body">
            <div className="about-stat-value">24/7</div>
            <div className="about-stat-label">Always Learning</div>
          </div>
        </div>
      </div>

      <div className="about-bio-card">
        <p>
          At 13, my journey in IT began with Python, inspired by Iron Man&apos;s Jarvis AI.
          Progressing from Flask projects to web development, I excelled in my GCSEs at 16
          and pursued a Foundation Diploma in IT Management in 2023. Constantly learning new
          languages — Java, JS, ReactJS, Python for ML — I thrive on innovation. Now studying
          Software Engineering at Lithan Academy, committed to mastering technology and
          embracing its evolution.
        </p>
      </div>

      <a href="/assets/resume.pdf" className="btn" target="_blank" rel="noopener noreferrer">
        <i className="fa-regular fa-file" />
        Download Resume
      </a>
    </section>
  );
};

export default About;
