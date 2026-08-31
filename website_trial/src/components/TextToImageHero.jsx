import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';

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
        backgroundColor: '#05172b',
        color: '#FFFFFF',
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
          backgroundImage: `url(${shreyas.heroImage || '/assets/images/hero_architecture.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          scale: bgScale,
          filter: 'contrast(1.08) brightness(0.85)',
          zIndex: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 2. GRADIENT OVERLAY */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(5, 23, 43, 0.88) 0%, rgba(9, 38, 68, 0.65) 50%, rgba(5, 23, 43, 0.98) 100%)',
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
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
          </motion.span>

          {/* GIANT ARCHITECTURAL IMAGE-MASKED BRAND WORDMARK */}
          <div style={{ position: 'relative', margin: '0.5rem 0 1.5rem 0' }}>
            <h1
              style={{
                color: 'transparent',
                backgroundImage: `url(${shreyas.heroImage || '/assets/images/hero_architecture.jpg'})`,
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
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
              }}
            >
              ADVITHIYA
            </h1>
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.85rem)',
                lineHeight: 1.1,
                marginTop: '0.25rem',
                fontWeight: 600
              }}
            >
              Thoughtfully built. <br />
              <span style={{ color: '#F78E1E' }}>Transparently delivered.</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2.5rem',
              maxWidth: '720px',
              fontWeight: 300,
              lineHeight: 1.65
            }}
          >
            Advithiya creates future-ready homes and plotted communities in Bangalore, combining practical design, responsible development and experienced leadership.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-orange"
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
              className="btn btn-outline-light"
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
