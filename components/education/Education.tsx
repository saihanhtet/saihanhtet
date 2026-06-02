'use client'

import { useState } from "react";
import "./Education.css";

const Education = () => {
  const tabs = [
    { id: 1, icon: "fa-solid fa-graduation-cap", label: "Education" },
  ];

  const educationData = [
    { id: 1, title: "High School / IGCSE", subtitle: "Light English Class For All", start: "2021", end: "2022" },
    { id: 2, title: "ITPEC Fundamental Information Technology Engineer", subtitle: "ITPEC FE Exam", start: "2022", end: "2023" },
    { id: 3, title: "International Level 3 Foundation Diploma in Information Technology", subtitle: "Pearson BTEC", start: "2023", end: "2024" },
    { id: 4, title: "Software Engineering", subtitle: "Lithan Academy / Educlaas", start: "2024", end: "Present" },
  ].reverse();

  const [toggleState, setToggleState] = useState(1);

  return (
    <section className="container-xl education-session" id="education">
      <div className="sheet-container education-container">
        <div className="sheet-header">
          <h4 className="sheet-title">Education</h4>
          <small>My Journey</small>
        </div>
        <div className="edu-content">
          <div className="tabs">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`education-button button-flex ${toggleState === tab.id ? "education-active" : ""}`}
                onClick={() => setToggleState(tab.id)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </div>
            ))}
          </div>
          <div className={`education-content ${toggleState === 1 ? "education-content-active" : ""}`}>
            {educationData.map((data, index) => (
              <div className="education-data" key={data.id}>
                {index % 2 === 0 ? (
                  <>
                    <div className="text-end">
                      <div className="education-calendar">
                        <i className="uil uil-calendar-alt"></i> {data.start}-{data.end}
                      </div>
                      <h3 className="education-title">{data.title}</h3>
                      <span className="education-subtitle">{data.subtitle}</span>
                    </div>
                    <div>
                      <span className="education-rounder"></span>
                      <div className="education-line"></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div></div>
                    <div>
                      <span className="education-rounder"></span>
                      <div className="education-line"></div>
                    </div>
                    <div>
                      <div className="education-calendar">
                        <i className="uil uil-calendar-alt"></i> {data.start}-{data.end}
                      </div>
                      <h3 className="education-title">{data.title}</h3>
                      <span className="education-subtitle">{data.subtitle}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
