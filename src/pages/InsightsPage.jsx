import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, ArrowRight, Share2, BookOpen, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { assetPath } from '../utils/assetPath';

const renderInlineFormatting = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} style={{ color: '#4A3428', fontWeight: 600 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );

const ArticleBody = ({ content }) => {
  const blocks = content.trim().split(/\n\s*\n/);

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n');
    const isOrderedList = lines.every((line) => /^\d+\.\s/.test(line));
    const isUnorderedList = lines.every((line) => /^-\s/.test(line));

    if (isOrderedList || isUnorderedList) {
      const ListTag = isOrderedList ? 'ol' : 'ul';
      return (
        <ListTag key={blockIndex} style={{ margin: '0 0 1.75rem 1.4rem', display: 'grid', gap: '0.85rem' }}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>
              {renderInlineFormatting(line.replace(isOrderedList ? /^\d+\.\s/ : /^-\s/, ''))}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={blockIndex} style={{ marginBottom: blockIndex === blocks.length - 1 ? 0 : '1.75rem' }}>
        {renderInlineFormatting(block)}
      </p>
    );
  });
};

export const InsightsPage = ({ activeArticle, onSelectArticle, onOpenSpeakModal }) => {
  const { articles } = useCMS();

  const handleShare = (art) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Article link copied to clipboard!');
    } else {
      toast.info(`Sharing "${art.title}"`);
    }
  };

  // FULL ARTICLE READER VIEW
  if (activeArticle) {
    return (
      <div className="insights-detail-page animate-fade-in" style={{ paddingTop: '5.5rem' }}>
        <section style={{ backgroundColor: '#4A3428', color: '#FFFFFF', padding: '4.5rem 0 3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <button
              onClick={() => onSelectArticle(null)}
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
                marginBottom: '2rem'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to All Insights</span>
            </button>

            <div style={{ fontSize: '0.85rem', color: '#A6462A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              {activeArticle.category} • {activeArticle.readTime}
            </div>

            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              {activeArticle.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div>Published: {activeArticle.date} • Advithiya Editorial</div>
              <button
                onClick={() => handleShare(activeArticle)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#A6462A',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Share2 size={16} />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div
              style={{
                fontSize: '1.15rem',
                color: '#626E7A',
                lineHeight: 1.85,
                whiteSpace: 'normal'
              }}
            >
              <ArticleBody content={activeArticle.content} />
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(74, 52, 40, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                className="btn btn-outline-dark"
                onClick={() => onSelectArticle(null)}
              >
                ← Back to Insights Overview
              </button>

              <button
                className="btn btn-orange"
                onClick={onOpenSpeakModal}
              >
                <span>Speak to Our Team</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ARTICLES GRID VIEW
  return (
    <div className="insights-page animate-fade-in" style={{ paddingTop: '5rem' }}>
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
          animate={{ scale: 1, opacity: 0.28 }}
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
          <span className="section-tag">Advithiya Insights</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Ideas for better decisions.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Perspectives on real estate, homebuying, design, locations and responsible development.
          </p>
        </div>
      </section>

      {/* 02. FEATURED ARTICLES */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '2.5rem' }}>
            {articles.map((art) => (
              <motion.div
                key={art.id}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(74, 52, 40, 0.1)' }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                  padding: '2.5rem',
                  border: '1px solid rgba(74, 52, 40, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onSelectArticle(art);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#A6462A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                    {art.category} • {art.readTime}
                  </div>

                  <h2 style={{ fontSize: '1.45rem', color: '#4A3428', lineHeight: 1.35, marginBottom: '1rem' }}>
                    {art.title}
                  </h2>

                  <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '2rem' }}>
                    {art.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4A3428', fontWeight: 600, fontSize: '0.95rem' }}>
                  <span>Read Article</span>
                  <ArrowRight size={16} style={{ color: '#A6462A' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. CLOSING CTA */}
      <section style={{ backgroundColor: '#4A3428', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="section-tag">Direct Dialogue</span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            Have a question we haven't answered?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Speak with the Advithiya team for information about our projects, plans and documentation.
          </p>

          <button
            className="btn btn-orange"
            onClick={onOpenSpeakModal}
          >
            <span>Speak to Our Team</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
