'use client'

import "./Contact.css";
import { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import type { FC, SVGProps } from "react";
import {
  SentIcon, Mail01Icon, CallOutgoing01Icon,
  Github01Icon, InstagramIcon, Facebook01Icon, DiscordIcon,
} from "hugeicons-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type IconComp = FC<SVGProps<SVGSVGElement> & { size?: number }>;

interface Settings {
  email: string;
  phone: string;
  github: string;
  instagram: string;
  facebook: string;
  discord: string;
}

const defaultSettings: Settings = {
  email: "sai.hanhtetsan@gmail.com",
  phone: "+66 84 205 4515",
  github: "https://github.com/saihanhtet",
  instagram: "https://www.instagram.com/hanhtet.ivan/",
  facebook: "https://www.facebook.com/hanhtet.ivan",
  discord: "https://discordapp.com/users/1019565322681974806",
};

const FORM_FIELDS: { id: string; label: string; type: string; name: string; placeholder: string }[] = [
  { id: "contact-name",  label: "Name",    type: "text",  name: "name",    placeholder: "Your name" },
  { id: "contact-email", label: "Email",   type: "email", name: "email",   placeholder: "your@email.com" },
];

const SOCIALS: { key: keyof Settings; Icon: IconComp; label: string }[] = [
  { key: "github",    Icon: Github01Icon as IconComp,   label: "GitHub" },
  { key: "instagram", Icon: InstagramIcon as IconComp,  label: "Instagram" },
  { key: "facebook",  Icon: Facebook01Icon as IconComp, label: "Facebook" },
  { key: "discord",   Icon: DiscordIcon as IconComp,    label: "Discord" },
];

const CONTACT_INFO: { Icon: IconComp; key: keyof Settings }[] = [
  { Icon: Mail01Icon as IconComp,          key: "email" },
  { Icon: CallOutgoing01Icon as IconComp,  key: "phone" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setSettings({ ...defaultSettings, ...d }))
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("sending");
    emailjs
      .sendForm("service_dq5l9at", "template_m8jdwp7", form.current, "PCBhIP4lY0EsFBR7A")
      .then(
        () => { setStatus("sent"); form.current?.reset(); },
        () => { setStatus("error"); }
      );
  };

  return (
    <motion.section
      className="contact-section"
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div variants={fadeUp}><div className="section-tag">Get in touch</div></motion.div>
      <motion.h2 variants={fadeUp} className="section-heading">Stay in Touch</motion.h2>
      <motion.p variants={fadeUp} className="contact-subtitle">Have a project in mind? Let&apos;s talk.</motion.p>

      <div className="contact-grid">
        <motion.div variants={fadeUp} className="contact-form-card">
          <form ref={form} onSubmit={handleSubmit} autoComplete="off" className="contact-form">
            <input type="hidden" name="to_name" value="Saihanhtet" />

            {FORM_FIELDS.map(({ id, label, type, name, placeholder }) => (
              <div key={name} className="form-group">
                <Label htmlFor={id} className="contact-label">{label}</Label>
                <Input id={id} type={type} name={name} placeholder={placeholder} className="contact-input" required />
              </div>
            ))}

            <div className="form-group">
              <Label htmlFor="contact-msg" className="contact-label">Message</Label>
              <Textarea id="contact-msg" name="message" placeholder="What's on your mind?" className="contact-input contact-textarea" required />
            </div>

            <Button type="submit" className="contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : (
                <><SentIcon size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} /> Send Message</>
              )}
            </Button>
            {status === "error" && <p className="contact-error">Failed to send. Try again.</p>}
          </form>
        </motion.div>

        <motion.div variants={fadeUp} className="contact-sidebar">
          <div className="contact-info-card">
            <div className="contact-info-title">Contact Info</div>
            {CONTACT_INFO.map(({ Icon, key }) => (
              <div key={key} className="contact-info-row">
                <div className="contact-info-icon"><Icon size={18} /></div>
                {settings[key]}
              </div>
            ))}
          </div>

          <div className="social-links-card">
            <div className="social-links-title">Find me on</div>
            <div className="social-links-grid">
              {SOCIALS.map(({ key, Icon, label }) => settings[key] && (
                <a key={key} href={settings[key] as string} target="_blank" rel="noopener noreferrer" className="social-link-item">
                  <Icon size={16} style={{ display: "inline", verticalAlign: "middle" }} /> {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
