import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, ChevronDown, CheckCircle2, FileText, Lock, Eye, ArrowRight, Award, Compass, HardHat, Layers } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export const StandardsPage = ({ setActivePage, onOpenCharterModal }) => {
  const { qualityPillars, charter } = useCMS();
  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <div className="standards-page animate-fade-in" style={{ paddingTop: '5rem' }}>
      {/* 01. HERO */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '6rem',
          backgroundColor: '#4A3428',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.34 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${assetPath('images/material_texture.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag">Our Standards</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Trust is designed into every step.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 300, lineHeight: 1.6, marginBottom: '0.75rem' }}>
            The way a development is planned, built and delivered matters as much as the finished space.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: 300 }}>
            Our standards are built around quality, responsible development and transparent customer relationships.
          </p>
        </div>
      </section>

      {/* 02. QUALITY */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', paddingTop: '5.5rem', paddingBottom: '5.5rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="section-tag">Quality</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '1.5rem' }}>
            Quality begins long before handover.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#626E7A', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            From design reviews and material selection to construction controls and handover, we focus on the details that influence the quality of a development.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#626E7A', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Project-specific specifications, quality processes and relevant checkpoints are documented and reviewed through the development process.
          </p>

          {/* Quality Pillars Badges */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#F8F9FA',
              borderRadius: '8px',
              borderLeft: '4px solid #A6462A',
              marginBottom: '3rem',
              fontSize: '1rem',
              color: '#4A3428',
              fontWeight: 600
            }}
          >
            Design Reviews | Construction Controls | Material Selection | Safety | Handover Quality
          </div>

          {/* Detailed Accordions for Quality */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {qualityPillars.map((pillar, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid rgba(74, 52, 40, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 2rem',
                      backgroundColor: isOpen ? '#F8F9FA' : '#FFFFFF',
                      border: 'none',
                      textAlign: 'left',
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#4A3428',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: '#A6462A', fontSize: '1.1rem' }}>0{idx + 1}.</span>
                      <span>{pillar.title}</span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={22} style={{ color: '#A6462A' }} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 2rem 1.75rem 2rem', backgroundColor: '#F8F9FA', color: '#626E7A', fontSize: '1.05rem', lineHeight: 1.7 }}>
                          <p style={{ marginBottom: '1rem', fontWeight: 500, color: '#4A3428' }}>{pillar.summary}</p>
                          <p style={{ margin: 0 }}>{pillar.detail}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. RESPONSIBLE DEVELOPMENT */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="section-tag">Responsible Development</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '1.5rem' }}>
            Building with the future in mind.
          </h2>

          <div style={{ fontSize: '1.15rem', color: '#626E7A', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8 }}>
            <p>
              We consider responsible choices across site planning, water, energy, materials, waste, landscape and resident well-being.
            </p>
            <p>
              The approach is project-specific, based on what is technically and commercially viable. Where a project makes a specific environmental or sustainability commitment, it will be clearly communicated and supported by relevant evidence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {['Site Planning & Sunlight', 'Water Conservation & Recycling', 'Responsible Material Choices', 'Resident Well-being'].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(74, 52, 40, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <CheckCircle2 size={20} style={{ color: '#A6462A', flexShrink: 0 }} />
                <span style={{ color: '#4A3428', fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. TRANSPARENCY */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className="section-tag">Transparency</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '1.5rem' }}>
            Clear information. No unnecessary complexity.
          </h2>

          <div style={{ fontSize: '1.15rem', color: '#626E7A', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            <p>
              We believe customers should be able to understand what they are considering before making a decision.
            </p>
            <p>
              Project information, approvals, pricing basis, availability and construction progress should be presented clearly, with relevant dates and supporting documentation wherever applicable.
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#F8F9FA',
              borderRadius: '8px',
              borderLeft: '4px solid #A6462A',
              fontSize: '1rem',
              color: '#4A3428',
              fontWeight: 600
            }}
          >
            Project Facts | Approvals | Progress | Pricing
          </div>
        </div>
      </section>

      {/* 05. CUSTOMER CHARTER */}
      <section className="section-padding" style={{ backgroundColor: '#4A3428', color: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Customer Charter</span>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.75rem' }}>
              Clear information. Respectful guidance. Accountable delivery.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {charter.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem'
                }}
              >
                <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: '#A6462A', minWidth: '40px' }}>
                  0{i + 1}
                </div>
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', marginBottom: '0.35rem' }}>
                    {c.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem', margin: 0, lineHeight: 1.6 }}>
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. HOW WE KEEP THESE STANDARDS VISIBLE */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Visibility</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428' }}>
              What you can expect to find on our project pages.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: "Verified Project Facts",
                desc: "Key information with relevant dates and revisions.",
                icon: FileText
              },
              {
                title: "Approvals & Documentation",
                desc: "Applicable RERA registration and approval information.",
                icon: ShieldCheck
              },
              {
                title: "Construction Updates",
                desc: "Dated photographs, videos and milestone updates.",
                icon: HardHat
              },
              {
                title: "Current Pricing Information",
                desc: "Price basis, applicable charges and validity information where published.",
                icon: CheckCircle2
              },
              {
                title: "Customer Support",
                desc: "Clear contact routes and escalation channels.",
                icon: Lock
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#F8F9FA',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(74, 52, 40, 0.08)'
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'rgba(166, 70, 42, 0.12)', color: '#A6462A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#4A3428', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.925rem', color: '#626E7A', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07. CLOSING */}
      <section style={{ backgroundColor: '#312119', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '2rem' }}>
            See the plan. Know the progress. Choose with confidence.
          </h2>

          <button
            className="btn btn-orange"
            onClick={() => {
              if (setActivePage) setActivePage('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Explore Our Projects</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default StandardsPage;
