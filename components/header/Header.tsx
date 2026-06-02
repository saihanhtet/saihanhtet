'use client'

import { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [navToggler, setNavToggler] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: "fa-house" },
    { name: "About", href: "#about", icon: "fa-user" },
    { name: "Skills", href: "#skill", icon: "fa-bolt" },
    { name: "Education", href: "#education", icon: "fa-award" },
    { name: "Projects", href: "#projects", icon: "fa-code" },
    { name: "Contact", href: "#contact", icon: "fa-comments" },
  ];

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <nav className="navbar-container">
        <a href="/" className="navbar-brand">S. Han Htet San</a>
        <div className={`navbar-menu${navToggler ? " navbar-show" : ""}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => { setActiveNavItem(item.name); setNavToggler(false); }}
                  className={`nav-link${activeNavItem === item.name ? " active" : ""}`}
                >
                  <i className={`fa-solid ${item.icon}`} />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <i className="fa-solid fa-bars nav-toggler" onClick={() => setNavToggler(!navToggler)} />
      </nav>
    </header>
  );
};

export default Header;
