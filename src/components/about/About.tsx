import "./About.css";
const About = () => {
  return (
    <section className="container-xl bg-transparent" id="about">
      <div className="about-container">
        <div className="about-title sheet-header">
          <h4>About Me</h4>
          <small>My Information</small>
        </div>
        <div className="about-content">
          <div className="cards-box">
            <a
              href="https://github.com/saihanhtet?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="color-inherit"
            >
              <div className="about-card">
                <i className="fa-solid fa-box-archive"></i>
                <div className="title">Completed</div>
                <div className="sub-title">+7 Projects</div>
              </div>
            </a>
            <div className="about-card">
              <i className="fa-solid fa-fire"></i>
              <div className="title">Experience</div>
              <div className="sub-title">+3 Years</div>
            </div>
            <div className="about-card">
              <i className="fa-solid fa-headphones"></i>
              <div className="title">Learning</div>
              <div className="sub-title">24/7 </div>
            </div>
          </div>
        </div>
        <div className="about-card info-card">
          <p>
            At 13, my journey in IT began with Python, inspired by Iron Man's
            Jarvis AI. Progressing from Flask projects to web development, I
            excelled in my GCSEs at 16, despite challenges, and pursued a
            Foundation Diploma in IT Management in 2023. Constantly learning new
            languages and technologies like Java, JS, ReactJS, and Python for
            Machine Learning, I thrive on innovation and improvement. Now 18,
            I'm committed to mastering technology and embracing its evolution,
            driven by a passion for lifelong learning.
          </p>
        </div>
        <a
          href="https://github.com/saihanhtet/saihanhtet/raw/main/src/assets/ResumeForm.docx"
          className="btn"
        >
          <span>Download Resume</span>
          <i className="fa-regular fa-file"></i>
        </a>
      </div>
    </section>
  );
};

export default About;
