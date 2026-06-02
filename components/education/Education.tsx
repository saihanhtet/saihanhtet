'use client'

import "./Education.css";

const educationData = [
  { id: 4, title: "Software Engineering", subtitle: "Lithan Academy / Educlaas", start: "2024", end: "Present" },
  { id: 3, title: "International Level 3 Foundation Diploma in Information Technology", subtitle: "Pearson BTEC", start: "2023", end: "2024" },
  { id: 2, title: "ITPEC Fundamental Information Technology Engineer", subtitle: "ITPEC FE Exam", start: "2022", end: "2023" },
  { id: 1, title: "High School / IGCSE", subtitle: "Light English Class For All", start: "2021", end: "2022" },
];

const Education = () => {
  return (
    <section className="edu-section" id="education">
      <div className="section-tag">My journey</div>
      <h2 className="section-heading">Education</h2>

      <div className="edu-timeline">
        {educationData.map((item) => (
          <div key={item.id} className="edu-item">
            <div className="edu-dot" />
            <div className="edu-card">
              <div className="edu-date">{item.start} — {item.end}</div>
              <div className="edu-title">{item.title}</div>
              <div className="edu-subtitle">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
