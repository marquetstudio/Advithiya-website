import React from 'react';
import BrandLogo from './BrandLogo';
import BrandPattern from './BrandPattern';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, ShieldCheck, ExternalLink, Linkedin, Instagram } from 'lucide-react';

export const Footer = ({ setActivePage, onOpenCharterModal }) => {
  const { company } = useCMS();

  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#05172b',
        color: '#FFFFFF',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Pattern Texture */}
      <BrandPattern opacity={0.04} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand */}
          <div>
            <BrandLogo variant="inverted" size={80} />
            <div style={{ marginTop: '1.25rem', color: '#F78E1E', fontWeight: 600, fontSize: '1rem' }}>
              {company.tagline || "Thoughtfully built. Transparently delivered."}
            </div>
            <p style={{ marginTop: '0.5rem', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
              {company.subtagline || "Creating thoughtfully designed residential and plotted communities in Bangalore."}
            </p>
          </div>

          {/* Navigation: Home | Projects | About Us | Our Standards | Insights | Partner With Us | Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: "'Josefin Sans', sans-serif" }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'projects', label: 'Projects' },
                { id: 'standards', label: 'Our Standards' },
                { id: 'insights', label: 'Insights' },
                { id: 'partner', label: 'Partner With Us' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#F78E1E'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.75)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Office */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: "'Josefin Sans', sans-serif" }}>
              Corporate Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.875rem' }}>
              <div style={{ fontWeight: 600, color: '#FFFFFF' }}>
                {company.corporateName || "Advithiya Developers"}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: '#F78E1E', flexShrink: 0, marginTop: '3px' }} />
                <span>{company.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: '#F78E1E', flexShrink: 0 }} />
                <a href={`tel:${company.phone}`} style={{ color: 'inherit' }}>Phone: {company.phone}</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: '#F78E1E', flexShrink: 0 }} />
                <a href={`mailto:${company.email}`} style={{ color: 'inherit' }}>Email: {company.email}</a>
              </div>
            </div>
          </div>

          {/* Legal, Customer Charter & Social */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: "'Josefin Sans', sans-serif" }}>
              Legal & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <li>
                <button
                  onClick={onOpenCharterModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#F78E1E',
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Read Our Customer Charter →
                </button>
              </li>
              <li>
                <a
                  href="https://rera.karnataka.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'rgba(255, 255, 255, 0.75)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
                >
                  <span>RERA / Legal Information</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>

            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '0.75rem', fontFamily: "'Josefin Sans', sans-serif" }}>
              Social
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', transition: 'all 0.2s ease' }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', transition: 'all 0.2s ease' }}
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255, 255, 255, 0.08)', marginBottom: '2rem' }} />

        {/* Bottom Bar: Legal links & copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.825rem',
            color: 'rgba(255, 255, 255, 0.55)'
          }}
        >
          <p style={{ margin: 0 }}>© Advithiya. All rights reserved.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Cookie Notice</span>
            <span>•</span>
            <span>Terms & Conditions</span>
            <span>•</span>
            <span>Disclaimer</span>
            <span>•</span>
            <span>RERA / Legal Information</span>
            <span>•</span>
            <span>Grievance Redressal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
