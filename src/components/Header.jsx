import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <span className="logo-mark">KM</span>
        <span className="logo-name">Kaushik Mahindra Kar</span>
      </Link>
      <button
        className={`nav-toggle ${menuOpen ? 'open' : ''}`}
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/experience" onClick={closeMenu}>Experience</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink to="/skills" onClick={closeMenu}>Skills</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </nav>
      <div className="header-cta">
        <button className="theme-toggle" type="button" aria-label="Toggle day and night mode">
          Day
        </button>
        <Link className="header-btn" to="/contact">
          Hire Me
        </Link>
      </div>
    </header>
  );
}
