import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export const TextToImageHero = ({
  shreyas,
  setActivePage,
  onOpenCalculatorModal,
  onOpenSpeakModal
}) => {
  const { scrollY } = useScroll();

  // Scroll-linked vanishing physics for text & image scale
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const textScale = useTransform(scrollY, [0, 300], [1, 0.94]);
  const textBlur = useTransform(scrollY, [0, 300], ['blur(0px)', 'blur(8px)']);
  const bgScale = useTransform(scrollY, [0, 500], [1.1, 1.0]);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F6EFE4',
        color: '#4A3428',
        overflow: 'hidden',
        paddingTop: '6rem'
      }}
    >
      {/* 1. CINEMATIC BACKGROUND IMAGE WITH SCROLL PARALLAX */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${shreyas?.heroImage || assetPath('images/hero_architecture.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          scale: bgScale,
          filter: 'contrast(1.0) brightness(0.95)',
          zIndex: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 2. GRADIENT OVERLAY (SAND THEME) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(246, 239, 228, 0.95) 0%, rgba(246, 239, 228, 0.20) 50%, rgba(246, 239, 228, 1) 100%)',
          zIndex: 1
        }}
      />

      {/* 3. HERO CONTENT WITH VANISHING TEXT EFFECT */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          style={{
            maxWidth: '880px',
            opacity: textOpacity,
            scale: textScale,
            filter: textBlur
          }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* GIANT ARCHITECTURAL IMAGE-MASKED BRAND WORDMARK */}
          <div style={{ position: 'relative', margin: '0.5rem 0 1.5rem 0' }}>
            <h1
              style={{
                color: 'transparent',
                backgroundImage: `url(${shreyas?.heroImage || assetPath('images/hero_architecture.jpg')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                margin: 0,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            >
              ADVITHIYA
            </h1>
            <h2
              style={{
                color: '#4A3428',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.85rem)',
                lineHeight: 1.1,
                marginTop: '0.25rem',
                fontWeight: 600
              }}
            >
              Thoughtfully built. <br />
              <span style={{ color: '#A6462A' }}>Transparently delivered.</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: '#7A6355',
              marginBottom: '2.5rem',
              maxWidth: '720px',
              fontWeight: 400,
              lineHeight: 1.65
            }}
          >
            Advithiya creates future-ready homes and plotted communities in Bangalore, combining practical design, responsible development and experienced leadership.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn"
              style={{
                backgroundColor: '#A6462A',
                color: '#FFFFFF',
                border: '1px solid #A6462A'
              }}
              onClick={() => {
                setActivePage('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Explore Our Projects</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: '#4A3428',
                border: '1px solid #4A3428'
              }}
              onClick={onOpenSpeakModal}
            >
              <span>Speak to Our Team</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TextToImageHero;
