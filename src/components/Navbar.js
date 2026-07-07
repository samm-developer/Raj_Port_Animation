import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo" data-cursor="pointer">
          <span className="logo-bracket">{'{'}</span>
          RK
          <span className="logo-bracket">{'}'}</span>
        </NavLink>

        <div className="navbar-links desktop">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                data-cursor="pointer"
              >
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-line" />
              </NavLink>
            </motion.div>
          ))}
        </div>

        <a
          href="/Rajat_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-resume desktop"
          data-cursor="pointer"
        >
          Resume
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 30px) 30px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 30px) 30px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 30px) 30px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className="mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
