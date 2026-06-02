'use client'

import { useEffect, useState } from "react";
import { ArrowUpRight01Icon } from "hugeicons-react";
import "./Works.css";

interface Work {
  _id: string;
  title: string;
  content: string;
  image: string;
  link: string;
}

const WorkCard = ({ work }: { work: Work }) => (
  <div className="work-card">
    <div className="work-card-img">
      {work.image
        ? <img src={work.image} alt={work.title} loading="lazy" />
        : <div className="work-card-img-placeholder" />}
    </div>
    <div className="work-card-body">
      <div className="work-card-title">{work.title}</div>
      <div className="work-card-desc">{work.content}</div>
      {work.link && (
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="work-card-link"
          onClick={(e) => e.stopPropagation()}
        >
          View Project <ArrowUpRight01Icon size={12} style={{ display: "inline", verticalAlign: "middle" }} />
        </a>
      )}
    </div>
  </div>
);

const Works = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/works")
      .then((res) => res.json())
      .then((data) => { setWorks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="works-section" id="projects">
        <div className="section-tag">What I&apos;ve built</div>
        <h2 className="section-heading">My Projects</h2>
        <p className="works-subtitle">2019 — Present</p>
        <div className="works-loading">Loading projects…</div>
      </section>
    );
  }

  // Need enough cards to fill viewport — repeat until we have at least 8
  const fill = (arr: Work[]) => {
    if (arr.length === 0) return arr;
    let out = [...arr];
    while (out.length < 8) out = [...out, ...arr];
    return [...out, ...out]; // double for seamless loop
  };

  const row1 = fill(works);
  const row2 = fill([...works].reverse());

  return (
    <section className="works-section" id="projects">
      <div className="section-tag">What I&apos;ve built</div>
      <h2 className="section-heading">My Projects</h2>
      <p className="works-subtitle">2019 — Present</p>

      {works.length === 0 ? (
        <div className="works-empty">No projects yet.</div>
      ) : (
        <div className="works-marquee-outer">
          {/* Row 1 — left */}
          <div className="works-track-wrap">
            <div className="works-track works-track--left">
              {row1.map((w, i) => <WorkCard key={`r1-${i}`} work={w} />)}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="works-track-wrap">
            <div className="works-track works-track--right">
              {row2.map((w, i) => <WorkCard key={`r2-${i}`} work={w} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;
