'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github01Icon, Facebook01Icon, InstagramIcon, DiscordIcon } from "hugeicons-react";
import type { FC, SVGProps } from "react";
import "./Home.css";

interface Settings {
  name: string;
  role: string;
  bio: string;
  profilePic: string;
  github: string;
  instagram: string;
  facebook: string;
  discord: string;
}

const defaultSettings: Settings = {
  name: "S. Han Htet San",
  role: "Junior Software Developer",
  bio: "Building cool things with code — from desktop apps to web platforms. Passionate about learning and creating software that makes a difference.",
  profilePic: "/assets/MyProfile.jpg",
  github: "https://github.com/saihanhtet",
  instagram: "https://www.instagram.com/hanhtet.ivan/",
  facebook: "https://www.facebook.com/hanhtet.ivan",
  discord: "https://discordapp.com/users/1019565322681974806",
};

type IconComp = FC<SVGProps<SVGSVGElement> & { size?: number }>;

const SOCIALS: { key: keyof Settings; Icon: IconComp; label: string }[] = [
  { key: "github",    Icon: Github01Icon as IconComp,   label: "GitHub" },
  { key: "facebook",  Icon: Facebook01Icon as IconComp, label: "Facebook" },
  { key: "instagram", Icon: InstagramIcon as IconComp,  label: "Instagram" },
  { key: "discord",   Icon: DiscordIcon as IconComp,    label: "Discord" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Home = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setSettings({ ...defaultSettings, ...d }))
      .catch(() => {});
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-bg-orb orb-1" />
      <div className="hero-bg-orb orb-2" />

      <div className="hero-grid">
        {/* Left */}
        <div className="hero-left">
          <motion.span className="hero-badge" custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span className="hero-badge-dot" />
            Available for work
          </motion.span>

          <motion.h1 className="hero-name" custom={1} variants={fadeUp} initial="hidden" animate="show">
            {settings.name.split(" ").slice(0, -1).join(" ")}<br />
            <span className="hero-name-grad">{settings.name.split(" ").slice(-1)[0]}</span>
          </motion.h1>

          <motion.p className="hero-role" custom={2} variants={fadeUp} initial="hidden" animate="show">
            {settings.role}
          </motion.p>

          <motion.p className="hero-bio" custom={3} variants={fadeUp} initial="hidden" animate="show">
            {settings.bio}
          </motion.p>

          <motion.div className="hero-actions" custom={4} variants={fadeUp} initial="hidden" animate="show">
            <a href="#contact" className="btn">Say Hi →</a>
            <a href="#projects" className="btn-ghost">View Work</a>
          </motion.div>

          <motion.div className="hero-socials" custom={5} variants={fadeUp} initial="hidden" animate="show">
            {SOCIALS.map(({ key, Icon, label }) => settings[key] && (
              <a key={key} href={settings[key] as string} target="_blank" rel="noopener noreferrer" className="social-pill" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Profile pic with morphing border */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="hero-img-wrapper">
            <div className="hero-img-glow" />
            <motion.div
              className="hero-img-frame"
              animate={{
                borderRadius: [
                  "25% 75% 44% 56% / 29% 20% 80% 71%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "25% 75% 44% 56% / 29% 20% 80% 71%",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img
                src={settings.profilePic}
                alt={settings.name}
                className="hero-img"
                animate={{
                  borderRadius: [
                    "23% 77% 42% 58% / 27% 18% 82% 73%",
                    "28% 62% 68% 42% / 48% 58% 32% 62%",
                    "58% 42% 28% 72% / 58% 28% 72% 42%",
                    "28% 62% 68% 42% / 48% 58% 32% 62%",
                    "23% 77% 42% 58% / 27% 18% 82% 73%",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <div className="hero-img-badge">
              <span className="badge-num">7+</span>
              <span className="badge-label">Projects Done</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
