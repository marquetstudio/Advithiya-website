import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, ShieldCheck, Filter, MessageSquare, Compass, ChevronDown, Check, Building2, Trees, Sparkles } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export const ProjectsPage = ({ setActivePage, onSelectProject }) => {
  const { projects } = useCMS();
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [residentialFilter, setResidentialFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getResidentialCount = (subType) => {
    return projects.filter((p) => {
      const isUpcoming =
        p.status === 'Upcoming' ||
        p.status?.toUpperCase().includes('LAUNCHING');
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Ongoing' && p.status === 'Ongoing') ||
        (statusFilter === 'Upcoming' && isUpcoming) ||
        (statusFilter === 'Delivered' && p.status === 'Delivered');
      if (!matchesStatus || p.type !== 'Residential') return false;
      if (subType === 'All') return true;
      if (subType === 'Apartments') return p.residentialType === 'Apartments' || (!p.residentialType && p.type === 'Residential');
      if (subType === 'Plotted Developments') return p.residentialType === 'Plotted Developments' || p.residentialType === 'Plotted' || p.residentialType === 'Plots';
      return false;
    }).length;
  };

  const filteredProjects = projects.filter((p) => {
    const isUpcoming =
      p.status === 'Upcoming' ||
      p.status?.toUpperCase().includes('LAUNCHING');

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Ongoing' && p.status === 'Ongoing') ||
      (statusFilter === 'Upcoming' && isUpcoming) ||
      (statusFilter === 'Delivered' && p.status === 'Delivered');

    const matchesType =
      typeFilter === 'All' ||
      (typeFilter === 'Residential' && p.type === 'Residential') ||
      (typeFilter === 'Commercial' && p.type === 'Commercial');

    const matchesResidentialSubtype =
      typeFilter !== 'Residential' ||
      residentialFilter === 'All' ||
      (residentialFilter === 'Apartments' && (p.residentialType === 'Apartments' || (!p.residentialType && p.type === 'Residential'))) ||
      (residentialFilter === 'Plotted Developments' && (p.residentialType === 'Plotted Developments' || p.residentialType === 'Plotted' || p.residentialType === 'Plots'));

    return matchesStatus && matchesType && matchesResidentialSubtype;
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
            backgroundImage: `url(${assetPath('images/hero_architecture.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag section-tag-glass">Our Projects</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Creating spaces for the way people live.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Explore Advithiya's residential and commercial developments, each shaped by its location, purpose and approach to everyday living.
          </p>
        </div>
      </section>

      {/* 02. PROJECT CATEGORIES */}
      <section style={{ backgroundColor: '#F8F9FA', padding: '2.5rem 0', borderBottom: '1px solid rgba(74, 52, 40, 0.08)' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem', color: '#4A3428', fontWeight: 600, fontSize: '1.1rem', fontFamily: "'Josefin Sans', sans-serif" }}>
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
                    borderColor: statusFilter === status ? '#4A3428' : 'rgba(74, 52, 40, 0.15)',
                    backgroundColor: statusFilter === status ? '#4A3428' : '#FFFFFF',
                    color: statusFilter === status ? '#FFFFFF' : '#4A3428',
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

            {/* Typology Filter: Residential | Commercial & Residential Sub-type Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: '#626E7A', fontWeight: 500 }}>Category:</span>
                {['All', 'Residential', 'Commercial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTypeFilter(type);
                      if (type !== 'Residential') {
                        setResidentialFilter('All');
                        setIsDropdownOpen(false);
                      }
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: typeFilter === type ? '#A6462A' : 'rgba(74, 52, 40, 0.15)',
                      backgroundColor: typeFilter === type ? 'rgba(166, 70, 42, 0.12)' : '#FFFFFF',
                      color: typeFilter === type ? '#A6462A' : '#4A3428',
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

              {/* Sub-Filter Dropdown: Apartments & Plotted Developments */}
              <AnimatePresence>
                {typeFilter === 'Residential' && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, scale: 0.95, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                  >
                    <span style={{ color: 'rgba(74, 52, 40, 0.2)', fontSize: '1rem', fontWeight: 300 }}>|</span>
                    <span style={{ fontSize: '0.85rem', color: '#626E7A', fontWeight: 500 }}>Type:</span>

                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.48rem 0.85rem',
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: residentialFilter !== 'All' ? '#A6462A' : 'rgba(74, 52, 40, 0.2)',
                        backgroundColor: residentialFilter !== 'All' ? '#A6462A' : '#FFFFFF',
                        color: residentialFilter !== 'All' ? '#FFFFFF' : '#4A3428',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: isDropdownOpen ? '0 0 0 3px rgba(166, 70, 42, 0.15)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>
                        {residentialFilter === 'All' ? 'All Residential' : residentialFilter}
                      </span>
                      <ChevronDown
                        size={15}
                        style={{
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: residentialFilter !== 'All' ? '#FFFFFF' : '#8A7563'
                        }}
                      />
                    </button>

                    {/* Dropdown Menu Popover */}
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        role="listbox"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          minWidth: '280px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '8px',
                          boxShadow: '0 16px 40px rgba(74, 52, 40, 0.16), 0 2px 6px rgba(74, 52, 40, 0.06)',
                          border: '1px solid rgba(74, 52, 40, 0.12)',
                          padding: '0.5rem',
                          zIndex: 100
                        }}
                      >
                        <div style={{ padding: '0.4rem 0.6rem 0.5rem', borderBottom: '1px solid rgba(74, 52, 40, 0.08)', marginBottom: '0.35rem' }}>
                          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7563', fontWeight: 600 }}>
                            Filter Residential By
                          </div>
                        </div>

                        {[
                          {
                            id: 'All',
                            label: 'All Residential',
                            subtitle: 'All boutique residences & land enclaves',
                            icon: Sparkles
                          },
                          {
                            id: 'Apartments',
                            label: 'Apartments',
                            subtitle: 'Boutique apartment residences & homes',
                            icon: Building2
                          },
                          {
                            id: 'Plotted Developments',
                            label: 'Plotted Developments',
                            subtitle: 'Master-planned plotted enclaves',
                            icon: Trees
                          }
                        ].map((option) => {
                          const isSelected = residentialFilter === option.id;
                          const count = getResidentialCount(option.id);
                          const Icon = option.icon;

                          return (
                            <button
                              key={option.id}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setResidentialFilter(option.id);
                                setIsDropdownOpen(false);
                              }}
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.65rem 0.75rem',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: isSelected ? 'rgba(166, 70, 42, 0.08)' : 'transparent',
                                color: isSelected ? '#A6462A' : '#4A3428',
                                fontFamily: "'Poppins', sans-serif",
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) e.currentTarget.style.backgroundColor = '#F8F9FA';
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                <div
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: isSelected ? '#A6462A' : 'rgba(74, 52, 40, 0.06)',
                                    color: isSelected ? '#FFFFFF' : '#4A3428',
                                    flexShrink: 0
                                  }}
                                >
                                  <Icon size={16} />
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.86rem', fontWeight: isSelected ? 600 : 500, lineHeight: 1.25 }}>
                                    {option.label}
                                  </div>
                                  <div style={{ fontSize: '0.72rem', color: '#626E7A', marginTop: '0.15rem' }}>
                                    {option.subtitle}
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: '0.5rem', flexShrink: 0 }}>
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    padding: '0.15rem 0.45rem',
                                    borderRadius: '10px',
                                    backgroundColor: isSelected ? 'rgba(166, 70, 42, 0.15)' : 'rgba(74, 52, 40, 0.06)',
                                    color: isSelected ? '#A6462A' : '#626E7A',
                                    fontWeight: 600
                                  }}
                                >
                                  {count}
                                </span>
                                {isSelected && <Check size={14} color="#A6462A" />}
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 03. PROJECTS LIST */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{ textAlign: 'center', padding: '4rem 0', color: '#626E7A' }}
              >
                <h3>No projects match your selected filter.</h3>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    setStatusFilter('All');
                    setTypeFilter('All');
                    setResidentialFilter('All');
                  }}
                  style={{ marginTop: '1rem' }}
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${statusFilter}-${typeFilter}-${residentialFilter}`}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: '3rem' }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    whileHover={{ y: -8, boxShadow: '0 25px 45px rgba(74, 52, 40, 0.12)' }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(74, 52, 40, 0.08)',
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
                          src={project.cardImage || project.heroImage}
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
                        <div style={{ fontSize: '0.85rem', color: '#A6462A', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                          {project.id === 'shreyas'
                            ? `${project.location} | Residential · ${project.residentialType || 'Apartments'} | Launching Soon`
                            : project.id === 'rr-nagar'
                              ? `${project.location} | Residential · ${project.residentialType || 'Apartments'} | Launching Soon`
                              : `${project.location} | ${project.residentialType ? `Residential · ${project.residentialType}` : project.type} | ${project.status}`}
                        </div>

                        <h2 style={{ fontSize: '1.85rem', marginBottom: '0.4rem', color: '#4A3428' }}>
                          {project.name}
                        </h2>

                        <div style={{ fontSize: '1rem', color: '#4A3428', fontWeight: 600, marginBottom: '0.75rem' }}>
                          {project.tagline}
                        </div>

                        <p style={{ fontSize: '0.95rem', color: '#626E7A', marginBottom: '1.75rem', lineHeight: 1.65 }}>
                          {project.id === 'shreyas'
                            ? '16 homes across four levels, with 2 and 3 BHK residences designed around privacy, comfort and everyday functionality.'
                            : project.id === 'rr-nagar'
                              ? (project.description || 'Upcoming boutique residential development in RR Nagar, Bangalore. Details launching soon.')
                              : 'A collection of 3 BHK homes across two towers, created for just 8 Families.'}
                        </p>

                        <div
                          style={{
                            padding: '1rem 1.25rem',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '6px',
                            border: '1px solid rgba(74, 52, 40, 0.08)',
                            fontSize: '0.9rem',
                            color: '#4A3428',
                            fontWeight: 600
                          }}
                        >
                          {project.id === 'shreyas'
                            ? '16 Homes | 4 Floors | 2 & 3 BHK'
                            : project.id === 'rr-nagar'
                              ? (project.specsTag || 'Boutique Residences | Launching Soon')
                              : '2 Towers | 4 Strories | 8 Families | 2 Parking Spaces per Apartment'}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '0 2.25rem 2.25rem 2.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A6462A', fontWeight: 600, fontSize: '0.95rem' }}>
                        <span>Explore Project</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 04. PROJECT PHILOSOPHY */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid rgba(74, 52, 40, 0.08)' }}>
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <span className="section-tag">Project Philosophy</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428', marginBottom: '1rem' }}>
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
      <section style={{ backgroundColor: '#4A3428', color: '#FFFFFF', padding: '5rem 0' }}>
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
