import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <span className="logo-mark">KMK</span>
        <span className="logo-name">Kaushik Mahindra Kar</span>
      </Link>
      <nav className="main-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/skills">Skills</NavLink>
        <NavLink to="/contact">Contact</NavLink>
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
