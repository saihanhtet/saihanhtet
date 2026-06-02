'use client'

import "./Skill.css";

const skills = [
  { id: 1, name: "Python", percent: 100, icon: "fa-python" },
  { id: 2, name: "HTML / CSS", percent: 100, icon: "fa-html5" },
  { id: 3, name: "JavaScript", percent: 75, icon: "fa-js" },
  { id: 4, name: "SQL", percent: 85, icon: "fa-database" },
  { id: 5, name: "Java", percent: 60, icon: "fa-java" },
  { id: 6, name: "React", percent: 70, icon: "fa-react" },
];

const tools = ["Django", "Electron", "Next.js", "Git", "Node.js", "TypeScript", "MongoDB", "Linux"];

const Skill = () => {
  return (
    <section className="skill-section" id="skill">
      <div className="section-tag">What I know</div>
      <h2 className="section-heading">My Skills</h2>

      <div className="skill-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-card-top">
              <div className="skill-icon-wrap">
                <i className={`fa-brands ${skill.icon}`} />
              </div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-pct">{skill.percent}%</span>
              </div>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{ "--pct": `${skill.percent}%` } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="tools-section">
        <p className="tools-label">Tools & Technologies</p>
        <div className="tools-tags">
          {tools.map((t) => (
            <span key={t} className="tool-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
