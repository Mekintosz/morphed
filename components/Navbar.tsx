import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#features' },
    { name: 'Solutions', href: '#capabilities' },
    { name: 'Resources', href: '#' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Cpu className={styles.logoIconSvg} />
          </div>
          <span className={styles.logoText}>
            MORPHED
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={styles.navLink}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className={styles.desktopCta}>
          <button className={`${styles.ctaButton} clip-corner-sm`}>
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className={`${styles.mobileCtaButton} clip-corner-sm`}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;