'use client'

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-brand">S. Han Htet San</span>
      <span className="footer-copy">&copy; {new Date().getFullYear()} — All rights reserved</span>
      <a href="/admin" className="footer-admin-link" aria-label="Admin">·</a>
    </footer>
  );
};

export default Footer;
