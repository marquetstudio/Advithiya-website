import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, ArrowRight, Share2, BookOpen, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { assetPath } from '../utils/assetPath';

const InsightsFaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(74, 52, 40, 0.1)', padding: '1.25rem 0' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', cursor: 'pointer',
          color: '#4A3428', fontSize: '1.05rem', fontWeight: 600,
          fontFamily: "'Josefin Sans', sans-serif", userSelect: 'none'
        }}
      >
        <span style={{ paddingRight: '1rem', flex: 1 }}>{q}</span>
        <span style={{ fontSize: '1.5rem', color: '#A6462A', lineHeight: 1, width: '24px', textAlign: 'center' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ margin: '1rem 0 0 0', color: '#626E7A', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

      {/* 03. FAQ */}
      <section className="section-padding" style={{ backgroundColor: '#F6EFE4' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {[
              {
                category: 'Homebuying',
                items: [
                  { q: 'What should I check before buying an apartment?', a: "Buyers should review the project's approvals and RERA registration, title and legal documentation, sanctioned plans, specifications, area measurements, pricing and applicable charges. It is also important to understand the developer's track record, construction status, possession timeline and the terms of the agreement before making a decision." },
                  { q: 'What should I check before paying a booking amount?', a: "Before paying a booking amount, confirm the project's RERA registration and approvals, the specific unit being offered, the applicable price and charges, payment schedule, cancellation terms and what is included in the quoted price. Ask for the relevant documents and ensure the terms are clearly recorded." },
                  { q: 'What costs should I consider when buying a home?', a: 'The purchase price is only one part of the overall cost. Buyers should also understand applicable taxes, registration and stamp duty, maintenance or other project-specific charges, parking charges where applicable, and any additional costs mentioned in the agreement or price sheet.' },
                  { q: 'What questions should I ask a real estate developer before buying a home?', a: 'Ask about approvals, RERA registration, construction status, specifications, area basis, possession timeline, pricing and additional charges. It is also useful to understand the process for site visits, documentation, customer support and how project updates are communicated.' },
                ]
              },
              {
                category: 'RERA & Documentation',
                items: [
                  { q: "How can I verify a residential project's RERA registration in Karnataka?", a: "A buyer can verify the project's registration details through the official Karnataka RERA records. The project name, promoter details, registration number, approved information and project status should be checked against the information provided by the developer." },
                  { q: 'Why is RERA registration important when buying a home?', a: "RERA registration provides buyers with access to important project and promoter information and establishes a regulatory framework for applicable residential projects. Buyers should still review the project's specific approvals, disclosures and contractual documents before making a purchase." },
                  { q: 'What documents should I review before buying an apartment?', a: "Depending on the project and stage of development, buyers should review documents such as RERA registration details, sanctioned plans, relevant approvals, title and legal documents, specifications, the agreement for sale and the applicable price and payment information." },
                ]
              },
              {
                category: 'Understanding Property Areas',
                items: [
                  { q: 'What is the difference between carpet area, built-up area and saleable area?', a: "Carpet area generally refers to the usable floor area within the apartment, subject to the applicable regulatory definition. Built-up area typically includes the carpet area along with certain areas such as internal and external walls. Saleable or super built-up area may include a proportionate share of common areas. Buyers should always check the exact area basis stated in the project's documents." },
                  { q: 'Why does the area basis matter when comparing apartments?', a: 'Two homes with the same quoted size may offer different usable spaces depending on how the area has been calculated. Comparing apartments on a consistent area basis helps buyers understand what they are actually purchasing and make a more meaningful price comparison.' },
                ]
              },
              {
                category: 'Evaluating a Project',
                items: [
                  { q: 'What makes a low-density or boutique apartment community different?', a: "A low-density development typically has fewer homes sharing the project's common spaces and facilities. This can influence factors such as the number of residents, circulation, shared-space usage and the overall character of the community. Buyers should evaluate the actual plans and resident-to-space relationship rather than relying only on the term 'boutique.'" },
                  { q: 'How should I evaluate the quality of a residential project?', a: "Look beyond finishes and visual presentation. Review the structural system, materials and specifications, construction controls, quality checks, common areas, documentation and the developer's approach to handover and after-sales support." },
                ]
              }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 style={{ marginBottom: '1.5rem', color: '#A6462A', fontSize: '1.5rem', borderBottom: '2px solid rgba(166, 70, 42, 0.2)', paddingBottom: '0.5rem' }}>
                  {section.category}
                </h3>
                <div>
                  {section.items.map((item, i) => (
                    <InsightsFaqItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


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
