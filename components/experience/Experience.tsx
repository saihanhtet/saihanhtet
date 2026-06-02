'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Experience.css";

interface ExpItem {
  _id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
  order: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const Experience = () => {
  const [items, setItems] = useState<ExpItem[]>([]);

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setItems(data); })
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <motion.section
      className="exp-section"
      id="experience"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={fadeUp}><div className="section-tag">Work history</div></motion.div>
      <motion.h2 variants={fadeUp} className="section-heading">Experience</motion.h2>

      <div className="exp-timeline">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            className="exp-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className="exp-dot" />
            <div className="exp-card">
              <div className="exp-date">{item.start} — {item.end}</div>
              <div className="exp-title">{item.title}</div>
              <div className="exp-company">{item.company}</div>
              {item.description && <p className="exp-desc">{item.description}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
