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
      .then((data) => {
        setWorks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="container-xl work-session bg-transparent" id="projects">
      <div className="sheet-container m-0 p-0">
        <div className="sheet-header mt-0">
          <h4 className="sheet-title">My Works</h4>
          <small>2019 - Present</small>
        </div>
        <div className="work-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            works.map((work, index) => (
              <div key={work._id ?? index} className="work-card">
                <img src={work.image} alt={work.title} />
                <div className="info">
                  <b>{work.title}</b>
                  <p>{work.content}</p>
                  <a href={work.link} className="btn" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
