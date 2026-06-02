'use client'

import "./Home.css";

const Home = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-orb orb-1" />
      <div className="hero-bg-orb orb-2" />

      <div className="hero-grid">
        <div className="hero-left">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Available for work
          </span>
          <h1 className="hero-name">
            S. Han<br />
            <span className="hero-name-grad">Htet San</span>
          </h1>
          <p className="hero-role">Junior Software Developer</p>
          <p className="hero-bio">
            Building cool things with code — from desktop apps to web platforms.
            Passionate about learning and creating software that makes a difference.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn">Say Hi →</a>
            <a href="#projects" className="btn-ghost">View Work</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/saihanhtet" target="_blank" rel="noopener noreferrer" className="social-pill">
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.facebook.com/hanhtet.ivan" target="_blank" rel="noopener noreferrer" className="social-pill">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="https://www.instagram.com/hanhtet.ivan/" target="_blank" rel="noopener noreferrer" className="social-pill">
              <i className="fa-brands fa-instagram" />
            </a>
            <a href="https://discordapp.com/users/1019565322681974806" target="_blank" rel="noopener noreferrer" className="social-pill">
              <i className="fa-brands fa-discord" />
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-wrapper">
            <div className="hero-img-glow" />
            <div className="hero-img-frame">
              <img src="/assets/MyProfile.jpg" alt="Sai Han Htet" className="hero-img" />
            </div>
            <div className="hero-img-badge">
              <span className="badge-num">7+</span>
              <span className="badge-label">Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
