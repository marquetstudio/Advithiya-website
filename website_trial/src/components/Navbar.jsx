import React, { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const Navbar = ({ 
  activePage, 
  setActivePage, 
  onOpenSpeakModal 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'projects', label: 'Projects' },
    { id: 'standards', label: 'Our Standards' },
    { id: 'insights', label: 'Insights' },
    { id: 'partner', label: 'Partner With Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: scrolled ? 'rgba(9, 38, 68, 0.94)' : 'rgba(9, 38, 68, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.35s ease',
        padding: scrolled ? '0.85rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <BrandLogo variant="inverted" size={80} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === item.id ? '#F78E1E' : 'rgba(255, 255, 255, 0.85)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.9rem',
                fontWeight: activePage === item.id ? '600' : '400',
                cursor: 'pointer',
                padding: '0.4rem 0',
                position: 'relative',
                transition: 'color 0.2s ease'
              }}
            >
              {item.label}
              {activePage === item.id && (
                <span 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#F78E1E',
                    borderRadius: '2px'
                  }} 
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Speak to Our Team CTA Button */}
          <button 
            className="btn btn-orange"
            onClick={onOpenSpeakModal}
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
          >
            <span>Speak to Our Team</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'none'
            }}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#092644',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activePage === item.id ? '#F78E1E' : '#FFFFFF',
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '1.25rem',
                textAlign: 'left',
                padding: '0.5rem 0',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
