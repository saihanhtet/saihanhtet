import "./Works.css";
import Work1 from "../../assets/work1.jpg";
import Work2 from "../../assets/work2.jpg";
import Work3 from "../../assets/work3.jpg";
import Work4 from "../../assets/work4.jpg";
import InkDrop from "../../assets/inkdrop.jpg";

const Works = () => {
  const data = [
    {
      title: "InkLearn-Hub",
      content:
        "Student management system written in Electron-vite plus Django.",
      image: InkDrop,
      link: "https://github.com/saihanhtet/InkLearn-Hub",
    },
    {
      title: "Dlentron",
      content:
        "Dlentorn is the tutorial project for others to write both django and electron.",
      image: Work1,
      link: "https://github.com/saihanhtet/Dlentron",
    },
    {
      title: "Offline Speech Recognition",
      content: "Speech to text offline package written in python",
      image: Work2,
      link: "https://github.com/saihanhtet/offlineSpeechRecognition",
    },
    {
      title: "MathMasters",
      content: "Math Quiz application for children below 12.",
      image: Work3,
      link: "https://github.com/saihanhtet/MathMasters",
    },
    {
      title: "Deep learning Classifier",
      content:
        "Written in python purely and able to classify gender based on their name.",
      image: Work4,
      link: "https://github.com/saihanhtet/Classifier-with-deep-learning",
    },
  ];
  return (
    <section className="container-xl work-session bg-transparent" id="projects">
      <div className="sheet-container m-0 p-0">
        <div className="sheet-header mt-0">
          <h4 className="sheet-title">My Works</h4>
          <small>2019 - Present</small>
        </div>
        <div className="work-content">
          {data.map((work, index) => (
            <div key={index} className="work-card">
              <img src={work.image} alt={`work${index + 1}`} />
              <div className="info">
                <b>{work.title}</b>
                <p>{work.content}</p>
                <a
                  href={work.link}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
