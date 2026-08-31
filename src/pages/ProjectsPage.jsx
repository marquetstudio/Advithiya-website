import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, ShieldCheck, Filter, MessageSquare, Compass } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export const ProjectsPage = ({ setActivePage, onSelectProject }) => {
  const { projects } = useCMS();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredProjects = projects.filter((p) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Ongoing' && (p.status.includes('Launching') || p.status.includes('Ongoing'))) ||
      (statusFilter === 'Upcoming' && (p.status.includes('Upcoming') || p.status.includes('Launching'))) ||
      (statusFilter === 'Delivered' && p.status.includes('Delivered'));

    const matchesType =
      typeFilter === 'All' ||
      (typeFilter === 'Residential' && p.type === 'Residential') ||
      (typeFilter === 'Plotted Developments' && p.type === 'Plotted');

    return matchesStatus && matchesType;
  });

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
    <div className="projects-page animate-fade-in" style={{ paddingTop: '5rem' }}>
      {/* 01. HERO */}
      <section
        style={{
          position: 'relative',
          paddingTop: '6rem',
          paddingBottom: '6rem',
          backgroundColor: '#092644',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.28 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${assetPath('images/hero_architecture.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag">Advithiya Projects</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Creating spaces for the way people live.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Explore Advithiya's residential and plotted developments across Bangalore, each shaped by its location, purpose and approach to everyday living.
          </p>
        </div>
      </section>

      {/* 02. PROJECT CATEGORIES */}
      <section style={{ backgroundColor: '#F8F9FA', padding: '2.5rem 0', borderBottom: '1px solid rgba(9, 38, 68, 0.08)' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem', color: '#092644', fontWeight: 600, fontSize: '1.1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
            Explore our developments
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            {/* Status Tabs: All | Ongoing | Upcoming | Delivered */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['All', 'Ongoing', 'Upcoming', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    padding: '0.6rem 1.35rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: statusFilter === status ? '#092644' : 'rgba(9, 38, 68, 0.15)',
                    backgroundColor: statusFilter === status ? '#092644' : '#FFFFFF',
                    color: statusFilter === status ? '#FFFFFF' : '#092644',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: statusFilter === status ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Typology Filter: Residential | Plotted Developments */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: '#626E7A', fontWeight: 500 }}>Category:</span>
              {['All', 'Residential', 'Plotted Developments'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: typeFilter === type ? '#F78E1E' : 'rgba(9, 38, 68, 0.15)',
                    backgroundColor: typeFilter === type ? 'rgba(247, 142, 30, 0.12)' : '#FFFFFF',
                    color: typeFilter === type ? '#F78E1E' : '#092644',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: typeFilter === type ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03. PROJECTS LIST */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#626E7A' }}>
              <h3>No projects match your selected filter.</h3>
              <button
                className="btn btn-outline-dark"
                onClick={() => { setStatusFilter('All'); setTypeFilter('All'); }}
                style={{ marginTop: '1rem' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '3rem' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: '0 25px 45px rgba(9, 38, 68, 0.12)' }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid rgba(9, 38, 68, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    onSelectProject(project);
                    setActivePage('project-detail');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div>
                    <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={project.heroImage}
                        alt={project.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                        <span className={`status-badge ${project.statusBadgeStyle}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '2.25rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#F78E1E', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                        {project.id === 'shreyas' ? '[Verified Location] | Residential | Launching Soon' : `${project.location} | Residential | Delivered`}
                      </div>

                      <h2 style={{ fontSize: '1.85rem', marginBottom: '0.4rem', color: '#092644' }}>
                        {project.name}
                      </h2>

                      <div style={{ fontSize: '1rem', color: '#092644', fontWeight: 600, marginBottom: '0.75rem' }}>
                        {project.tagline}
                      </div>

                      <p style={{ fontSize: '0.95rem', color: '#626E7A', marginBottom: '1.75rem', lineHeight: 1.65 }}>
                        {project.id === 'shreyas'
                          ? '16 homes across four levels, with 2 and 3 BHK residences designed around privacy, comfort and everyday functionality.'
                          : 'A collection of 3 BHK homes across two towers, created for just 10 families.'}
                      </p>

                      <div
                        style={{
                          padding: '1rem 1.25rem',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '6px',
                          border: '1px solid rgba(9, 38, 68, 0.08)',
                          fontSize: '0.9rem',
                          color: '#092644',
                          fontWeight: 600
                        }}
                      >
                        {project.id === 'shreyas'
                          ? '16 Homes | 4 Floors | 2 & 3 BHK'
                          : '2 Towers | 5 Stories | 10 Families | 2 Parking Spaces per Apartment'}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '0 2.25rem 2.25rem 2.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F78E1E', fontWeight: 600, fontSize: '0.95rem' }}>
                      <span>Explore Project</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 04. PROJECT PHILOSOPHY */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid rgba(9, 38, 68, 0.08)' }}>
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <span className="section-tag">Project Philosophy</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#092644', marginBottom: '1rem' }}>
            Every project starts with its context.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#626E7A', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            From the location and planning to the way spaces are used, each Advithiya development is approached with an understanding of its surroundings and the people who will live there.
          </p>

          <button
            className="btn btn-outline-dark"
            onClick={() => {
              setActivePage('standards');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Our Approach</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 05. CLOSING CTA */}
      <section style={{ backgroundColor: '#092644', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="section-tag">Direct Guidance</span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            Looking for something specific?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            Tell us what you're looking for and our team can help you find the right project.
          </p>

          <button
            className="btn btn-orange"
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Get in Touch</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
