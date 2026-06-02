'use client'

import "./Contact.css";
import { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm("service_dq5l9at", "template_m8jdwp7", form.current, "PCBhIP4lY0EsFBR7A")
        .then(
          () => { if (form.current) form.current.reset(); },
          (error) => { console.error("Error sending email:", error.text); }
        );
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-tag">Get in touch</div>
      <h2 className="section-heading">Stay in Touch</h2>
      <p className="contact-subtitle">Have a project in mind? Let&apos;s talk.</p>

      <div className="contact-grid">
        <div className="contact-form-card">
          <form ref={form} onSubmit={handleSubmit} className="custom-form" autoComplete="off">
            <input type="hidden" name="to_name" value="Saihanhtet" />
            <div className="form-group">
              <label className="custom-tag">Name</label>
              <input type="text" name="name" placeholder="Your name" className="custom-input" />
            </div>
            <div className="form-group">
              <label className="custom-tag">Email</label>
              <input type="email" name="email" placeholder="your@email.com" className="custom-input" />
            </div>
            <div className="form-group">
              <label className="custom-tag">Message</label>
              <textarea name="message" className="custom-input" placeholder="What's on your mind?" />
            </div>
            <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
              Send Message <i className="fa-solid fa-paper-plane" />
            </button>
          </form>
        </div>

        <div className="contact-sidebar">
          <div className="contact-info-card">
            <div className="contact-info-title">Contact Info</div>
            <div className="contact-info-row">
              <div className="contact-info-icon"><i className="fa-solid fa-envelope" /></div>
              sai.hanhtetsan@gmail.com
            </div>
            <div className="contact-info-row">
              <div className="contact-info-icon"><i className="fa-solid fa-phone" /></div>
              +66 84 205 4515
            </div>
          </div>

          <div className="social-links-card">
            <div className="social-links-title">Find me on</div>
            <div className="social-links-grid">
              <a href="https://github.com/saihanhtet" target="_blank" rel="noopener noreferrer" className="social-link-item">
                <i className="fa-brands fa-github" /> GitHub
              </a>
              <a href="https://www.instagram.com/hanhtet.ivan/" target="_blank" rel="noopener noreferrer" className="social-link-item">
                <i className="fa-brands fa-instagram" /> Instagram
              </a>
              <a href="https://www.facebook.com/hanhtet.ivan" target="_blank" rel="noopener noreferrer" className="social-link-item">
                <i className="fa-brands fa-facebook" /> Facebook
              </a>
              <a href="https://discordapp.com/users/1019565322681974806" target="_blank" rel="noopener noreferrer" className="social-link-item">
                <i className="fa-brands fa-discord" /> Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
