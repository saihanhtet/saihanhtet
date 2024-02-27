import { useState } from "react";
import "./Education.css";

const Education = () => {
  const data = [
    {
      title: "Software Engineering",
      subtitle: "Lithan Academy / Educlaas",
      calendar: "2023-Present",
    },
    {
      title: "ITPEC Fundamental Information Technology Engineer",
      subtitle: "ITPEC FE Exam",
      calendar: "2022-2023",
    },
    {
      title: "High School / IGCSE",
      subtitle: "Light English Class For All",
      calendar: "2022-2021",
    },
  ];
  const tabs = [
    { id: 1, icon: "fa-solid fa-graduation-cap", label: "Education" },
    { id: 2, icon: "fa-solid fa-briefcase", label: "Experience" },
  ];

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  return (
    <section className="container-xl education-session" id="education">
      <div className="sheet-container education-container">
        <div className="sheet-header">
          <h4>Education</h4>
          <small>My Journey</small>
        </div>

        <div className="edu-content">
          <div className="tabs">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`education-button button-flex ${
                  toggleState === tab.id ? "education-active" : ""
                }`}
                onClick={() => toggleTab(tab.id)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label.replace("__", "-")}</span>
              </div>
            ))}
          </div>

          <div
            className={`education-content ${
              toggleState === 1 ? "education-content-active" : ""
            }`}
          >
            <div className="education-data">
              <div>
                <h3 className="education-title">Software Engineering</h3>
                <span className="education-subtitle">
                  Lithan Academy / Educlaas
                </span>
                <div className="education-calendar">
                  <i className="uil uil-calendar-alt"></i> 2023-Present
                </div>
              </div>
              <div>
                <span className="education-rounder"></span>
                <div className="education-line"></div>
              </div>
            </div>
            <div className="education-data">
              <div></div>
              <div>
                <span className="education-rounder"></span>
                <div className="education-line"></div>
              </div>
              <div>
                <h3 className="education-title">
                  ITPEC Fundamental Information Technology Engineer
                </h3>
                <span className="education-subtitle">ITPEC FE Exam</span>
                <div className="education-calendar">
                  <i className="uil uil-calendar-alt"></i> 2022-2023
                </div>
              </div>
            </div>
            <div className="education-data">
              <div>
                <h3 className="education-title">High School / IGCSE</h3>
                <span className="education-subtitle">
                  Light English Class For All
                </span>
                <div className="education-calendar">
                  <i className="uil uil-calendar-alt"></i> 2022-2021
                </div>
              </div>
              <div>
                <span className="education-rounder"></span>
                <div className="education-line"></div>
              </div>
            </div>
          </div>

          <div
            className={`education-content ${
              toggleState === 2 ? "education-content-active" : ""
            }`}
          >
            <div className="education-data">
              <div>
                <h3 className="education-title">Coming Soon</h3>
                <span className="education-subtitle">Your company</span>
                <div className="education-calendar">
                  <i className="uil uil-calendar-alt"></i> Present - Undefined
                </div>
              </div>
              <div>
                <span className="education-rounder"></span>
                <div className="education-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
