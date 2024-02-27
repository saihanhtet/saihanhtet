import "./Skill.css";

const Skill = () => {
  const data = [
    {
      id: 1,
      title: "Python",
      percent: 100,
      stopColor1: "#e91e63",
      stopColor2: "#673ab7",
    },
    {
      id: 2,
      title: "Java",
      percent: 60,
      stopColor1: "#e91e63",
      stopColor2: "#673ab7",
    },
    {
      id: 3,
      title: "JavaScript",
      percent: 75,
      stopColor1: "#e91e63",
      stopColor2: "#673ab7",
    },
    {
      id: 4,
      title: "HTML/CSS",
      percent: 100,
      stopColor1: "#e91e63",
      stopColor2: "#673ab7",
    },
    {
      id: 5,
      title: "SQL",
      percent: 85,
      stopColor1: "#e91e63",
      stopColor2: "#673ab7",
    },
  ];
  return (
    <section className="container-xl skill-session" id="skill">
      <div className="sheet-container skill-container">
        <div className="skill-header sheet-header">
          <h4>My Skills</h4>
          <small>Skills</small>
        </div>

        <div className="skill-content">
          {data.map((item) => {
            return (
              <div className="skills" key={item.id}>
                <div className="outer">
                  <div className="inner">
                    <div id="title">{item.title}</div>
                    <div id="number">{item.percent}%</div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="160px"
                  height="160px"
                  className="skill-svg"
                >
                  <defs>
                    <linearGradient id={`GradientColor`}>
                      <stop offset="0%" stopColor={`${item.stopColor1}`} />
                      <stop offset="100%" stopColor={`${item.stopColor2}`} />
                    </linearGradient>
                  </defs>
                  <circle
                    id={`circle`}
                    cx="80"
                    cy="80"
                    r="70"
                    className={`circle-${item.id}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skill;
