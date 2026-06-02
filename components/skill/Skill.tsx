'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getIconComponent } from "@/components/ui/icon-picker";
import "./Skill.css";

interface SkillItem {
  _id: string;
  name: string;
  percent: number;
  icon: string;
  order: number;
}

const fallbackSkills: SkillItem[] = [
  { _id: "1", name: "Python", percent: 100, icon: "Python", order: 6 },
  { _id: "2", name: "HTML / CSS", percent: 100, icon: "HtmlFive", order: 5 },
  { _id: "3", name: "SQL", percent: 85, icon: "Database", order: 4 },
  { _id: "4", name: "JavaScript", percent: 75, icon: "JavaScript", order: 3 },
  { _id: "5", name: "React", percent: 70, icon: "React", order: 2 },
  { _id: "6", name: "Java", percent: 60, icon: "Java", order: 1 },
];

const fallbackTools = ["Django", "Electron", "Next.js", "Git", "Node.js", "TypeScript", "MongoDB", "Linux"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Skill = () => {
  const [skills, setSkills] = useState<SkillItem[]>(fallbackSkills);
  const [tools, setTools] = useState<string[]>(fallbackTools);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setSkills(data); })
      .catch(() => {});

    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d.tools) && d.tools.length > 0) setTools(d.tools); })
      .catch(() => {});
  }, []);

  return (
    <motion.section
      className="skill-section"
      id="skill"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={fadeUp}><div className="section-tag">What I know</div></motion.div>
      <motion.h2 variants={fadeUp} className="section-heading">My Skills</motion.h2>

      <motion.div variants={fadeUp} className="skill-grid">
        {skills.map((skill, i) => (
          <motion.div
            key={skill._id}
            className="skill-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="skill-card-top">
              <div className="skill-icon-wrap">
                {(() => { const I = getIconComponent(skill.icon); return <I size={22} />; })()}
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
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="tools-section">
        <p className="tools-label">Tools &amp; Technologies</p>
        <div className="tools-tags">
          {tools.map((t) => (
            <span key={t} className="tool-tag">{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Skill;
