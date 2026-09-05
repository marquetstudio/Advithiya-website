import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, MapPin, Layers, CheckCircle2,
  Send, Eye, ArrowLeft, ExternalLink, Phone, Calendar,
  Download, FileText, X
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ProjectDetailPage = ({ project, onBack, onOpenSpeakModal }) => {
  const { company } = useCMS();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFloorPlanFormOpen, setIsFloorPlanFormOpen] = useState(false);
  const [floorPlanForm, setFloorPlanForm] = useState({ name: '', phone: '', email: '' });
  const floorPlanNameRef = useRef(null);

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Schedule Site Visit',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!isFloorPlanFormOpen && !selectedImage) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (isFloorPlanFormOpen) {
      window.setTimeout(() => floorPlanNameRef.current?.focus(), 50);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
        setIsFloorPlanFormOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFloorPlanFormOpen, selectedImage]);

  if (!project) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const fallbackImages = [
    { title: 'Exterior Facade & Teak Louvers', src: project.heroImage },
    { title: 'Double Height Living & Garden', src: project.interiorImage },
    { title: 'Tactile Material Texture', src: project.textureImage }
  ];
  const imagesList = project.galleryImages?.length ? project.galleryImages : fallbackImages;

  const handleFloorPlanSubmit = (event) => {
    event.preventDefault();
    if (!project.floorPlanPdf) return;

    const downloadLink = document.createElement('a');
    downloadLink.href = project.floorPlanPdf;
    downloadLink.download = project.floorPlanDownloadName || `${project.name}-Floor-Plans.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    setIsFloorPlanFormOpen(false);
    setFloorPlanForm({ name: '', phone: '', email: '' });
  };

  return (
    <div className="project-detail-page animate-fade-in" style={{ paddingTop: '4.5rem' }}>
      {/* 1. PROJECT HERO WITH CINEMATIC ZOOM EFFECT */}
      <section
        style={{
          position: 'relative',
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: '#312119',
          color: '#FFFFFF',
          paddingBottom: '4rem',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${project.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(49, 33, 25, 0.4) 0%, rgba(74, 52, 40, 0.85) 75%, rgba(49, 33, 25, 0.98) 100%)',
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#FFFFFF',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.5rem'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </button>

          <div>
            <span className={`status-badge ${project.statusBadgeStyle}`} style={{ marginBottom: '0.75rem' }}>
              {project.status}
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '0.5rem' }}>
              {project.name}
            </h1>
            <div style={{ fontSize: '1.2rem', color: '#A6462A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY QUICK FACTS BAR */}
      <section
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 800,
          backgroundColor: '#4A3428',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          padding: '1rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: '0.75rem' }}>RERA REGISTRATION</span>
              <strong style={{ color: '#FFFFFF' }}>{project.reraNo}</strong>
            </div>
            <div>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: '0.75rem' }}>LAND EXTENT</span>
              <strong style={{ color: '#FFFFFF' }}>{project.landExtent}</strong>
            </div>
            <div>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: '0.75rem' }}>UNITS / FLOORS</span>
              <strong style={{ color: '#FFFFFF' }}>{project.units}</strong>
            </div>
            <div>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontSize: '0.75rem' }}>TYPOLOGY</span>
              <strong style={{ color: '#FFFFFF' }}>{project.typology}</strong>
            </div>
          </div>

          {project.id !== 'urban-chalet' && (
            <button className="btn btn-orange" onClick={onOpenSpeakModal} style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              <Calendar size={14} />
              <span>Schedule Site Visit</span>
            </button>
          )}
        </div>
      </section>

      {/* 3. EDITORIAL VISION SECTION */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="section-tag">Architectural Vision</span>
          <h2 style={{ fontSize: '2.25rem', color: '#4A3428', marginBottom: '1.5rem' }}>
            "Designed as an antidote to hyper-dense urban living."
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#626E7A', lineHeight: 1.8, marginBottom: '2rem' }}>
            {project.vision}
          </p>

          {project.id !== 'urban-chalet' && (
            <div
              style={{
                padding: '1.75rem',
                backgroundColor: '#F8F9FA',
                borderRadius: '8px',
                borderLeft: '4px solid #A6462A',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <h4 style={{ color: '#4A3428', marginBottom: '0.25rem' }}>Pricing Structure</h4>
                <p style={{ color: '#626E7A', fontSize: '0.95rem', margin: 0 }}>{project.pricingNote}</p>
              </div>
              <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.65rem', fontWeight: 700, color: '#A6462A' }}>
                {project.pricing}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. LIGHTBOX GALLERY WITH IMAGE ZOOM HOVER */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container">
          <span className="section-tag">Architectural Gallery</span>
          <h2 style={{ marginBottom: '2.5rem' }}>Space, Texture & Daylight</h2>

          <div className={`architectural-gallery-grid${project.galleryImages?.length ? ' architectural-gallery-grid--featured' : ''}`}>
            {imagesList.map((img, idx) => (
              <motion.div
                key={idx}
                className="architectural-gallery-card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(74, 52, 40,0.1)'
                }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedImage(img.src)}
              >
                <motion.img
                  src={img.src}
                  alt={img.title}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'linear-gradient(0deg, rgba(49, 33, 25,0.9) 0%, transparent 100%)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{img.title}</span>
                  <Eye size={16} style={{ color: '#A6462A' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL WITH ZOOM PHYSICS */}
      {selectedImage && createPortal(
        <div
          className="modal-overlay project-gallery-lightbox"
          role="presentation"
          onMouseDown={() => setSelectedImage(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Expanded architectural gallery image"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="project-gallery-lightbox__content"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Expanded architectural view" />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="project-gallery-lightbox__close"
              aria-label="Close expanded image"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>,
        document.body
      )}

      {/* 5. GATED FLOOR PLAN DOWNLOAD */}
      {project.floorPlanPdf && (
        <section className="section-padding floor-plans-section">
          <div className="container">
            <span className="section-tag">Floor Plans</span>
            <div className="floor-plans-heading-row">
              <h2>Explore the plans in detail</h2>
              <p>Six detailed architectural drawings covering parking, residences, terrace and area schedules.</p>
            </div>

            <button
              type="button"
              className="floor-plan-card"
              onClick={() => setIsFloorPlanFormOpen(true)}
              aria-haspopup="dialog"
            >
              <span className="floor-plan-card__preview" aria-hidden="true">
                <FileText size={52} strokeWidth={1.4} />
                <span>PDF</span>
              </span>
              <span className="floor-plan-card__content">
                <span className="floor-plan-card__eyebrow">Urban Chalet</span>
                <strong>Complete Floor Plans</strong>
                <span>Ground, typical, terrace and area-table drawings · 6 pages</span>
                <span className="floor-plan-card__cta">
                  Download floor plans <Download size={17} />
                </span>
              </span>
            </button>
          </div>
        </section>
      )}

      {isFloorPlanFormOpen && createPortal(
        <div className="floor-plan-modal" role="presentation" onMouseDown={() => setIsFloorPlanFormOpen(false)}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="floor-plan-dialog-title"
            className="floor-plan-modal__panel"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="floor-plan-modal__close"
              onClick={() => setIsFloorPlanFormOpen(false)}
              aria-label="Close floor plan download form"
            >
              <X size={20} />
            </button>

            <span className="section-tag">Floor Plans</span>
            <h2 id="floor-plan-dialog-title">Enter your details to download</h2>
            <p>Complete the short form to unlock the Urban Chalet floor-plan PDF.</p>

            <form onSubmit={handleFloorPlanSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="floor-plan-name">Name *</label>
                <input
                  ref={floorPlanNameRef}
                  id="floor-plan-name"
                  type="text"
                  required
                  autoComplete="name"
                  className="form-input"
                  value={floorPlanForm.name}
                  onChange={(event) => setFloorPlanForm({ ...floorPlanForm, name: event.target.value })}
                />
              </div>
              <div className="floor-plan-modal__fields">
                <div className="form-group">
                  <label className="form-label" htmlFor="floor-plan-phone">Phone *</label>
                  <input
                    id="floor-plan-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    className="form-input"
                    value={floorPlanForm.phone}
                    onChange={(event) => setFloorPlanForm({ ...floorPlanForm, phone: event.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="floor-plan-email">Email *</label>
                  <input
                    id="floor-plan-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="form-input"
                    value={floorPlanForm.email}
                    onChange={(event) => setFloorPlanForm({ ...floorPlanForm, email: event.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-orange floor-plan-modal__submit">
                <span>Submit &amp; Download PDF</span>
                <Download size={17} />
              </button>
              <small>Demo mode: your details are validated in the browser and are not yet sent or stored.</small>
            </form>
          </motion.div>
        </div>,
        document.body
      )}

      {/* 6. SPECIFICATIONS & AMENITIES */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="editorial-grid">
            <div>
              <span className="section-tag">Key Amenities</span>
              <h2 style={{ marginBottom: '1.5rem' }}>Thoughtful Features</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.amenities?.map((item, i) => (
                  <div key={i} style={{ borderBottom: '1px solid rgba(74, 52, 40, 0.08)', paddingBottom: '1.25rem' }}>
                    <h4 style={{ color: '#4A3428', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#626E7A', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="section-tag">Build Quality</span>
              <h2 style={{ marginBottom: '1.5rem' }}>Material Specifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.specifications?.map((spec, i) => (
                  <div key={i} style={{ borderBottom: '1px solid rgba(74, 52, 40, 0.08)', paddingBottom: '1.25rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#A6462A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {spec.category}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#4A3428', fontWeight: 500, margin: '0.25rem 0 0 0' }}>
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DATED CONSTRUCTION LOGS WITH IMAGE HOVER ZOOM */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag">Transparent Progress</span>
              <h2>Dated Construction Logs</h2>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#626E7A', fontWeight: 500 }}>
              Last updated: {project.lastUpdated || "September 2026"}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2rem' }}>
            {project.constructionLogs?.map((log, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(74, 52, 40,0.08)'
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <motion.img
                    src={log.image}
                    alt={log.milestone}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#A6462A', fontWeight: 600, marginBottom: '0.35rem' }}>
                    {log.date}
                  </div>
                  <h4 style={{ color: '#4A3428', marginBottom: '0.5rem', fontSize: '1.15rem' }}>{log.milestone}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#626E7A', margin: 0 }}>{log.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCATION MAP SECTION */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>Know your neighborhood</h2>

          <div
            style={{
              backgroundColor: '#4A3428',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>{project.location}</h3>
              {project.fullAddress && (
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {project.fullAddress}
                </p>
              )}
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {project.neighborhoodDescription}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#A6462A' }}>
                {project.neighborhoodHighlights?.map((highlight) => (
                  <li key={highlight}>✓ {highlight}</li>
                ))}
              </ul>
            </div>

            <div
              style={{
                height: '240px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.75rem',
                textAlign: 'center',
                padding: '1.5rem'
              }}
            >
              {project.mapEmbedUrl ? (
                <>
                  <iframe
                    title={`${project.name} location on Google Maps`}
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', inset: 0, border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                </>
              ) : (
                <>
                  <MapPin size={36} style={{ color: '#A6462A' }} />
                  <div style={{ fontWeight: 600 }}>Location details available on request</div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                    Contact our team for the exact site location and visit details.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENQUIRY FORM */}
      <section className="section-padding dark-section">
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Direct Inquiry</span>
            <h2 style={{ color: '#FFFFFF' }}>Enquire About {project.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              All details routed directly to {company.email}. No spam.
            </p>
          </div>

          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <CheckCircle2 size={48} style={{ color: '#A6462A', margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: '#FFFFFF' }}>Inquiry Received</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                Thank you for your interest in {project.name}. Our project team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ background: 'none' }}>
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message / Specific Requirements</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-orange" style={{ width: '100%', marginTop: '1rem' }}>
                <span>Submit Inquiry for {project.name}</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .project-detail-page div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
