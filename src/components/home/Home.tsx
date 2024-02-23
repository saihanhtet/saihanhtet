import "./Home.css";
const Home = () => {
  return (
    <section className="container-xl home-session" id="home">
      <div className="home-container">
        <div className="content">
          <div className="pic-content"></div>
          <div className="intro-content">
            <h4>S. Han Htet San</h4>
            <b className="subtitle">Software developer</b>
            <p>
              Good morning Everyone!🥰 <br />
              <br />
              I'm Sai Han Htet (Ivan) , a junior software developer excited
              about coding adventures and creating cool stuff.
            </p>
            <a href="#contact" className="btn">
              <span>Say Hi</span>
              <i className="fa-solid fa-paper-plane"></i>
            </a>
          </div>
          <ul className="social-content d-flex flex-column justify-content-between align-items-center">
            <li className="social-icon">
              <a
                href="https://www.facebook.com/hanhtet.ivan"
                target="_blank"
                rel="noopener noreferrer"
                className="color-inherit"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li className="social-icon">
              <a
                href="https://github.com/saihanhtet"
                target="_blank"
                rel="noopener noreferrer"
                className="color-inherit"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="social-icon">
              <a
                href="https://www.instagram.com/hanhtet.ivan/"
                target="_blank"
                rel="noopener noreferrer"
                className="color-inherit"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
