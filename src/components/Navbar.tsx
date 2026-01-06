import Link from 'next/link';
import { useState } from 'react';
import { FaGraduationCap, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className={`edu-navbar ${className}`}>
      {/* Logo */}
      <Link href="/" className="edu-navbar__logo">
        <FaGraduationCap className="inline-block mr-2 text-2xl" />
        EduEquity AI
      </Link>

      {/* Desktop Navigation Links */}
      <div className="edu-navbar__links">
        <Link href="/dashboard" className="edu-navbar__link">
          Dashboard
        </Link>
        <Link href="/chatbot" className="edu-navbar__link">
          AI Assistant
        </Link>
        <Link href="/internships" className="edu-navbar__link">
          Internships
        </Link>
        <Link href="/scholarships" className="edu-navbar__link">
          Scholarships
        </Link>
        <div className="relative">
          <Link href="/auth/login" className="edu-navbar__link">
            Login
          </Link>
        </div>
        
        {/* Search */}
        <div className="edu-navbar__search">
          <FaSearch 
            className="edu-navbar__search-icon" 
            onClick={toggleSearch}
            tabIndex={0}
          />
          <input
            type="text"
            placeholder="Search..."
            className="edu-navbar__search-input"
            style={{ width: isSearchOpen ? '180px' : '0', opacity: isSearchOpen ? 1 : 0 }}
          />
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <button 
        className={`edu-navbar__hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="edu-navbar__hamburger-bar"></div>
        <div className="edu-navbar__hamburger-bar"></div>
        <div className="edu-navbar__hamburger-bar"></div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`edu-navbar__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/dashboard" className="edu-navbar__mobile-link" onClick={toggleMenu}>
          Dashboard
        </Link>
        <Link href="/chatbot" className="edu-navbar__mobile-link" onClick={toggleMenu}>
          AI Assistant
        </Link>
        <Link href="/internships" className="edu-navbar__mobile-link" onClick={toggleMenu}>
          Internships
        </Link>
        <Link href="/scholarships" className="edu-navbar__mobile-link" onClick={toggleMenu}>
          Scholarships
        </Link>
        <Link href="/auth/login" className="edu-navbar__mobile-link" onClick={toggleMenu}>
          Login
        </Link>
      </div>
    </nav>
  );
}