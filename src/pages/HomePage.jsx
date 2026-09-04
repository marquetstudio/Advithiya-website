import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, ChevronRight, Calendar,
  Sparkles, CheckCircle2, Compass, Layers, FileCheck, HardHat, Eye, BookOpen, MessageSquare
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import AnimatedCounter from '../components/AnimatedCounter';
import TextToImageHero from '../components/TextToImageHero';
import { assetPath } from '../utils/assetPath';

export const HomePage = ({
  setActivePage,
  onOpenSpeakModal,
  onOpenCharterModal,
  onOpenCalculatorModal,
  onSelectProject,
  onSelectArticle
}) => {
  const { projects, articles, standardsPillars } = useCMS();
  const shreyas = projects.find((p) => p.id === 'shreyas') || projects[0];
  const urbanChalet = projects.find((p) => p.id === 'urban-chalet') || projects[1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <div className="home-page animate-fade-in">
      {/* 01. HERO */}
      <TextToImageHero
        shreyas={shreyas}
        setActivePage={setActivePage}
        onOpenCalculatorModal={onOpenCalculatorModal}
        onOpenSpeakModal={onOpenSpeakModal}
      />

      {/* 02. ABOUT ADVITHIYA */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(74, 52, 40,0.06)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#A6462A',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  fontFamily: "'Josefin Sans', sans-serif"
                }}
              >
                <span>ABOUT ADVITHIYA</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                  color: '#4A3428',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  marginBottom: '2rem'
                }}
              >
                Crafting possibilities for better urban living.
              </h2>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#626E7A',
                  marginBottom: '1.5rem',
                  lineHeight: 1.75,
                  fontWeight: 400
                }}
              >
                Advithiya was established with a clear ambition: to create thoughtfully designed residential and commercial developments that respond to how people live today and adapt to how urban communities evolve tomorrow.
              </p>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#626E7A',
                  marginBottom: '2.5rem',
                  lineHeight: 1.75,
                  fontWeight: 400
                }}
              >
                Guided by experienced leadership and a commitment to thoughtful design, responsible development and transparent relationships, we approach every project with a focus on quality, functionality and long-term value.
              </p>

              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1.85rem',
                  border: '1.5px solid #4A3428',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: '#4A3428',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4A3428';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#4A3428';
                }}
              >
                <span>Discover Advithiya</span>
                <ArrowRight size={16} style={{ color: '#A6462A' }} />
              </button>
            </motion.div>

            {/* Right Column: Architectural Photography */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "30px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(74, 52, 40, 0.08)',
                height: '100%',
                minHeight: '460px'
              }}
            >
              <img
                src={assetPath('images/about_advithiya_image.png')}
                alt="Advithiya Architectural Landscape & Living"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '460px',
                  maxHeight: '580px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03. FEATURED PROJECTS */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">Featured Projects</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '0.5rem' }}>
                Spaces designed with purpose.
              </h2>
              <p style={{ color: '#626E7A', fontSize: '1.1rem', maxWidth: '640px', margin: 0 }}>
                Explore Advithiya's residential and commercial developments, each shaped by its location, purpose and the way people live.
              </p>
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                setActivePage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {/* Project 1: Advithiya Shreyas */}
            <motion.div
              variants={itemVariants}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(74, 52, 40, 0.08)',
                cursor: 'pointer'
              }}
              whileHover={{ y: -8, boxShadow: '0 25px 45px rgba(74, 52, 40, 0.12)' }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => {
                onSelectProject(shreyas);
                setActivePage('project-detail');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={shreyas.heroImage}
                  alt={shreyas.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                  <span className={`status-badge ${shreyas.statusBadgeStyle}`}>
                    {shreyas.status}
                  </span>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#A6462A', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  {shreyas.location} | Residential | Launching Soon
                </div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#4A3428' }}>
                  {shreyas.name}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#626E7A', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  A boutique residential community designed around privacy, comfort and everyday functionality.
                </p>

                <div
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: '#F8F9FA',
                    borderRadius: '6px',
                    fontSize: '2 rem',
                    color: '#4A3428',
                    fontWeight: 600,
                    marginBottom: '1.5rem'
                  }}
                >
                  16 Homes | 4 Floors | 2 & 3 BHK
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <button
                    className="btn btn-orange"
                    onClick={() => {
                      onSelectProject(shreyas);
                      setActivePage('project-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span>Explore Project</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Advithiya Urban Chalet */}
            {urbanChalet && (
              <motion.div
                variants={itemVariants}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(74, 52, 40, 0.08)',
                  cursor: 'pointer'
                }}
                whileHover={{ y: -8, boxShadow: '0 25px 45px rgba(74, 52, 40, 0.12)' }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => {
                  onSelectProject(urbanChalet);
                  setActivePage('project-detail');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={urbanChalet.heroImage}
                    alt={urbanChalet.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                    <span className={`status-badge ${urbanChalet.statusBadgeStyle}`}>
                      {urbanChalet.status}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#A6462A', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    {urbanChalet.location} | Residential | Delivered
                  </div>
                  <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: '#4A3428' }}>
                    {urbanChalet.name}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#626E7A', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    A boutique collection of 3 BHK homes across two towers, created for just 10 families.
                  </p>

                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: '#F8F9FA',
                      borderRadius: '6px',
                      fontSize: '2 rem',
                      color: '#4A3428',
                      fontWeight: 600,
                      marginBottom: '1.5rem'
                    }}
                  >
                    10 Homes | 5 Floors | 2 Parking Spaces per Apartment
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                    <button
                      className="btn btn-orange"
                      onClick={() => {
                        onSelectProject(urbanChalet);
                        setActivePage('project-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span>Explore Project</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 04. WHAT DEFINES US (RICH BLUE SECTION) */}
      <section className="section-padding" style={{ backgroundColor: '#4A3428', color: '#FFFFFF', position: 'relative' }}>
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                color: '#A6462A',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontFamily: "'Josefin Sans', sans-serif"
              }}
            >
              <span>WHAT DEFINES US</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.15rem, 3.8vw, 2rem)', color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.2, fontWeight: 700 }}>
              Thoughtful functionality. Responsible development. Transparent relationships.
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: '800px', margin: '0 auto' }}>
              We bring together experienced leadership and a considered approach to development, with standards that guide how we design, build and engage with our customers.
            </p>
          </div>

          <div className="values-grid" style={{ marginBottom: '3.5rem' }}>
            {[
              {
                title: "Thoughtful Design",
                desc: "Spaces considered around how people live.",
                image: assetPath('images/thoughtful_design.png')
              },
              {
                title: "Integrity",
                desc: "Communicate clearly. Act with accountability.",
                image: assetPath('images/integrity.png')
              },
              {
                title: "Quality",
                desc: "Attention to detail from planning through delivery.",
                image: assetPath('images/quality.png')
              },
              {
                title: "Responsible Development",
                desc: "Considered choices around resources, materials and long-term community well-being.",
                image: assetPath('images/responsible_development.png')
              },
              {
                title: "Transparency",
                desc: "Clear information, respectful guidance and accountable delivery.",
                image: assetPath('images/transparency.png')
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)' }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: '100%', height: '240px', overflow: 'hidden', backgroundColor: '#F8F9FA' }}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={pillar.image}
                    alt={pillar.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div style={{ padding: '2rem 1.75rem 2.25rem 1.75rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#4A3428', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.25 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#626E7A', margin: 0, lineHeight: 1.65 }}>
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              className="btn"
              onClick={() => {
                setActivePage('standards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 2rem',
                border: '1.5px solid #A6462A',
                borderRadius: '4px',
                backgroundColor: '#A6462A',
                color: '#FFFFFF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#A6462A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#A6462A';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <span>Explore Our Standards</span>
              <ArrowRight size={16} style={{ color: 'currentColor' }} />
            </button>
          </div>
        </div>
      </section>

      {/* 05. INSIGHTS (CRISP LIGHT SECTION) */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid rgba(74, 52, 40, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#A6462A',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  fontFamily: "'Josefin Sans', sans-serif"
                }}
              >
                <span>INSIGHTS</span>
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '0.5rem', fontWeight: 700 }}>
                Useful thinking for better decisions.
              </h2>
              <p style={{ color: '#626E7A', fontSize: '1.1rem', maxWidth: '640px', margin: 0 }}>
                Perspectives on buying, project verification, locations, design and responsible development.
              </p>
            </div>

            <button
              onClick={() => {
                setActivePage('insights');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.6rem',
                border: '1.5px solid #4A3428',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#4A3428',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4A3428';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#4A3428';
              }}
            >
              <span>Explore Insights</span>
              <ArrowRight size={16} style={{ color: '#A6462A' }} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.slice(0, 3).map((art) => (
              <motion.div
                key={art.id}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(74, 52, 40, 0.08)' }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2.5rem 2.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(74, 52, 40, 0.08)',
                  boxShadow: '0 8px 24px rgba(74, 52, 40, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onSelectArticle(art);
                  setActivePage('insights');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#A6462A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.85rem' }}>
                    {art.category} • {art.readTime}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#4A3428', lineHeight: 1.35, marginBottom: '1rem', fontWeight: 600 }}>
                    {art.title}
                  </h3>
                  <p style={{ fontSize: '0.925rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                    {art.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                  <span>Read Article</span>
                  <ArrowRight size={16} style={{ color: '#A6462A' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. CLOSING CTA */}
      <section style={{ backgroundColor: '#4A3428', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="section-tag">Get in Touch</span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            Tell us what you're looking for.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Whether you're exploring a home, evaluating a project or simply looking for more information, we'll connect you with the right Advithiya team.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <button
              className="btn btn-orange"
              onClick={() => {
                setActivePage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Explore Our Projects</span>
              <ArrowRight size={18} />
            </button>

            <button className="btn btn-outline-light" onClick={onOpenSpeakModal}>
              <MessageSquare size={16} />
              <span>Speak to Our Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
