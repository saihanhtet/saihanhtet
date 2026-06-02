'use client'

import { useEffect, useState } from "react";
import "./Works.css";

interface Work {
  _id: string;
  title: string;
  content: string;
  image: string;
  link: string;
}

const Works = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/works")
      .then((res) => res.json())
      .then((data) => { setWorks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="works-section" id="projects">
      <div className="section-tag">What I&apos;ve built</div>
      <h2 className="section-heading">My Projects</h2>
      <p className="works-subtitle">2019 — Present</p>

      <div className="works-grid">
        {loading ? (
          <div className="works-loading">Loading projects...</div>
        ) : (
          works.map((work, index) => (
            <div key={work._id ?? index} className="work-card">
              <img src={work.image} alt={work.title} />
              <div className="work-card-footer">
                <div className="work-card-title">{work.title}</div>
              </div>
              <div className="work-card-overlay">
                <div className="work-card-title">{work.title}</div>
                <div className="work-card-desc">{work.content}</div>
                <a
                  href={work.link}
                  className="work-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "0.65rem" }} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Works;
