'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Education.css";

interface EduItem {
  _id: string;
  title: string;
  subtitle: string;
  start: string;
  end: string;
  order: number;
}

const fallback: EduItem[] = [
  { _id: "4", title: "Software Engineering", subtitle: "Lithan Academy / Educlaas", start: "2024", end: "Present", order: 4 },
  { _id: "3", title: "International Level 3 Foundation Diploma in Information Technology", subtitle: "Pearson BTEC", start: "2023", end: "2024", order: 3 },
  { _id: "2", title: "ITPEC Fundamental Information Technology Engineer", subtitle: "ITPEC FE Exam", start: "2022", end: "2023", order: 2 },
  { _id: "1", title: "High School / IGCSE", subtitle: "Light English Class For All", start: "2021", end: "2022", order: 1 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Education = () => {
  const [items, setItems] = useState<EduItem[]>(fallback);

  useEffect(() => {
    fetch("/api/education")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setItems(data); })
      .catch(() => {});
  }, []);

  return (
    <motion.section
      className="edu-section"
      id="education"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={fadeUp}><div className="section-tag">My journey</div></motion.div>
      <motion.h2 variants={fadeUp} className="section-heading">Education</motion.h2>

      <div className="edu-timeline">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            className="edu-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="edu-dot" />
            <div className="edu-card">
              <div className="edu-date">{item.start} — {item.end}</div>
              <div className="edu-title">{item.title}</div>
              <div className="edu-subtitle">{item.subtitle}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;
