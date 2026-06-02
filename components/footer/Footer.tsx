'use client'

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-brand">S. Han Htet San</span>
      <span className="footer-copy">&copy; {new Date().getFullYear()} — All rights reserved</span>
    </footer>
  );
};

export default Footer;
