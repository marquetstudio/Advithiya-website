import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Compass, CheckCircle2, Eye, Award, X } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export const AboutPage = ({ setActivePage, onOpenSpeakModal }) => {
  const { leadership, values } = useCMS();
  const [selectedMember, setSelectedMember] = useState(null);
  const profileTriggerRef = useRef(null);

  const teamMembers = [
    {
      name: 'Construction & Project Delivery',
      title: 'Director | Construction Strategy & CEO | Bespoke',
      image: assetPath('images/team_member.png'),
      details: ['Project planning', 'Construction controls', 'Quality handover'],
      bio: leadership[1]?.bio || 'Guides project execution from early planning through construction and handover, with a focus on dependable delivery and quality control.'
    },
    {
      name: 'Commercial & Development',
      title: 'Vice President | Commercial & Development Strategy',
      image: assetPath('images/team_member.png'),
      details: ['Development strategy', 'Commercial planning', 'Procurement'],
      bio: leadership[2]?.bio || 'Shapes development and commercial strategy by connecting design intent, responsible material choices and long-term project value.'
    },
    {
      name: 'Business & Customer Experience',
      title: 'Vice President & Business Head | Advithiya',
      image: assetPath('images/team_member.png'),
      details: ['Business operations', 'Customer relationships', 'Transparent communication'],
      bio: leadership[3]?.bio || 'Leads business operations and customer experience, ensuring clear communication and accountable support throughout the customer journey.'
    }
  ];

  useEffect(() => {
    if (!selectedMember) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setSelectedMember(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
      window.requestAnimationFrame(() => profileTriggerRef.current?.focus());
    };
  }, [selectedMember]);

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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const profileModal = selectedMember ? createPortal(
    <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-profile-title"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="team-profile-modal"
      >
        <button
          type="button"
          autoFocus
          onClick={() => setSelectedMember(null)}
          aria-label="Close team profile"
          className="team-profile-close"
        >
          <X size={20} />
        </button>

        <div className="team-profile-layout">
          <img
            src={selectedMember.image}
            alt={selectedMember.name}
            className="team-profile-headshot"
          />

          <div>
            <span className="section-tag">Leadership Profile</span>
            <h2 id="team-profile-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.65rem' }}>
              {selectedMember.name}
            </h2>
            <p style={{ color: '#A6462A', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.55, marginBottom: '1.35rem' }}>
              {selectedMember.title}
            </p>

            <div className="team-profile-details" aria-label="Areas of focus">
              {selectedMember.details.map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>

            <h3 style={{ fontSize: '1rem', margin: '1.6rem 0 0.6rem' }}>Profile</h3>
            <p style={{ color: '#626E7A', fontSize: '0.98rem', lineHeight: 1.75, margin: 0 }}>
              {selectedMember.bio}
            </p>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div className="about-page animate-fade-in" style={{ paddingTop: '5rem' }}>
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
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${assetPath('images/shreyas_interior.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag">About Advithiya</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Building with purpose. <br />
            <span style={{ color: '#A6462A' }}>Thinking ahead.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Advithiya creates residential and commercial developments with a focus on practical design, responsible development and lasting customer relationships.
          </p>
        </div>
      </section>

      {/* 02. WHO WE ARE */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 20px 45px rgba(74, 52, 40, 0.08)',
                height: '100%',
                minHeight: '480px'
              }}
            >
              <img
                src={assetPath('images/who_we_are.png')}
                alt="Who We Are"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '480px',
                  maxHeight: '600px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </motion.div>

            {/* Right Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
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
                <span>WHO WE ARE</span>
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
                Established with a clear ambition.
              </h2>

              <div style={{ fontSize: '1.1rem', color: '#626E7A', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.75 }}>
                <p>
                  Advithiya was established with a clear ambition: to create residential and commercial developments that bring together design, functionality, responsible development and dependable execution.
                </p>

                <p>
                  Our multidisciplinary leadership brings experience across project management, construction, procurement, land, legal, marketing and operations.
                </p>

                <p>
                  We believe good development starts with understanding how people live. Design, functionality, quality and long-term value all have a role to play in creating places that people can genuinely call home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03. LEADERSHIP */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
            <span className="section-tag">Leadership</span>
            <h2 style={{ fontSize: 'clamp(1rem, 3.5vw, 2.5rem)', color: '#4A3428', marginBottom: '0.75rem' }}>
              Experience that shapes every decision.
            </h2>
            <p style={{ color: '#626E7A', fontSize: '1.1rem' }}>
              More than 30 years of collective experience across the disciplines that bring a development to life.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '2rem' }}>
            {teamMembers.map((member) => (
              <motion.button
                key={member.name}
                type="button"
                onClick={(event) => {
                  profileTriggerRef.current = event.currentTarget;
                  setSelectedMember(member);
                }}
                aria-label={`View profile for ${member.name}`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(74, 52, 40, 0.07)',
                  border: '1px solid rgba(74, 52, 40, 0.06)',
                  padding: 0,
                  textAlign: 'left',
                  cursor: 'pointer',
                  font: 'inherit'
                }}
              >
                {/* Headshot Image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 4',
                    backgroundColor: '#D8E3EE',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Name & Role */}
                <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#4A3428', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#626E7A', lineHeight: 1.5, margin: '0 0 0.9rem' }}>
                    {member.title}
                  </p>
                  <span style={{ color: '#A6462A', fontSize: '0.82rem', fontWeight: 600 }}>
                    View profile →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* 04. OUR VALUES */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Our Values</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#4A3428' }}>
              The principles behind our work.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                title: "Thoughtfulness",
                desc: "Consider the way spaces are experienced and used."
              },
              {
                title: "Integrity",
                desc: "Communicate clearly. Act with accountability."
              },
              {
                title: "Quality",
                desc: "Pay attention to the details that matter."
              },
              {
                title: "Transparency",
                desc: "Make relevant information clear and accessible."
              },
              {
                title: "Responsibility",
                desc: "Consider the long-term impact of development decisions."
              }
            ].map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 6 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.75rem 2rem',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                  borderLeft: '4px solid #A6462A',
                  border: '1px solid rgba(74, 52, 40, 0.08)'
                }}
              >
                <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#4A3428', minWidth: '40px' }}>
                  0{idx + 1}.
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#4A3428', marginBottom: '0.25rem' }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#626E7A', margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. OUR COMMITMENT */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid rgba(74, 52, 40, 0.08)' }}>
        <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
          <span className="section-tag">Our Commitment</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: '#4A3428', marginBottom: '1rem' }}>
            Designed with care. Developed responsibly.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#626E7A', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            We aim to bring responsible practices and clear communication into the way we develop and engage with our customers.
          </p>

          <button
            className="btn btn-outline-dark"
            onClick={() => {
              if (setActivePage) setActivePage('standards');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Explore Our Standards</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 06. CLOSING */}
      <section style={{ backgroundColor: '#4A3428', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="section-tag">Explore Advithiya</span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Crafting possibilities for better urban living.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            Explore the developments taking shape with Advithiya.
          </p>

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
      {profileModal}
    </>
  );
};

export default AboutPage;
