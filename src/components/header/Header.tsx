import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [navToggler, setNavToggler] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const navItems = [
    { name: "Home", href: "index.html", icon: "fa-house" },
    { name: "About", href: "#about", icon: "fa-user" },
    { name: "Skills", href: "#skill", icon: "fa-bolt" },
    { name: "Education", href: "#education", icon: "fa-award" },
    { name: "Projects", href: "#projects", icon: "fa-code" },
    { name: "Contact", href: "#contact", icon: "fa-comments" },
  ];

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
    setNavToggler(false);
  };

  return (
    <header className="header">
      <nav className="navbar-container">
        <a href="index.html" className="navbar-brand">
          <span className="text-secondary">S. </span>
          <span>Han Htet San</span>
        </a>
        <div className={navToggler ? "navbar-menu navbar-show" : "navbar-menu"}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <a
                  href={item.href}
                  onClick={() => handleNavItemClick(item.name)}
                  className={`
                  nav-link icon-box ${
                    activeNavItem === item.name ? "active" : ""
                  }`}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <i
          className={`fa-solid fa-list nav-toggler`}
          onClick={() => setNavToggler(!navToggler)}
        ></i>
      </nav>
    </header>
  );
};

export default Header;
