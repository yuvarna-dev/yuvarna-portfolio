import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        <Code2 size={27} />
        <span>Yuvarna<span className="logo-dot">.</span></span>
      </a>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>

      <a href="#contact" className="resume-btn">
        Let's Connect ↗
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}