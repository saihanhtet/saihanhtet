'use client'

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, Home, User, Zap, Award, Code, MessageCircle } from "lucide-react";
import "./Header.css";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Home", href: "#home", Icon: Home },
  { name: "About", href: "#about", Icon: User },
  { name: "Skills", href: "#skill", Icon: Zap },
  { name: "Education", href: "#education", Icon: Award },
  { name: "Projects", href: "#projects", Icon: Code },
  { name: "Contact", href: "#contact", Icon: MessageCircle },
];

const Header = () => {
  const [activeNavItem, setActiveNavItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <nav className="navbar-container">
        <a href="/" className="navbar-brand">S. Han Htet San</a>

        {/* Desktop nav */}
        <div className="navbar-menu">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setActiveNavItem(item.name)}
                  className={`nav-link${activeNavItem === item.name ? " active" : ""}`}
                >
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: theme toggle + mobile trigger */}
        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Sheet trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="nav-toggler" aria-label="Open menu">
                <Menu size={18} />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="mobile-sheet-content">
              <div className="mobile-sheet-handle" />
              <p className="mobile-sheet-label">Navigation</p>
              <div className="mobile-nav-grid">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setActiveNavItem(item.name)}
                      className={`mobile-nav-item${activeNavItem === item.name ? " active" : ""}`}
                    >
                      <item.Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
