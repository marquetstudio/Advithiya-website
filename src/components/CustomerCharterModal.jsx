import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const CustomerCharterModal = ({ isOpen, onClose }) => {
  const { charter } = useCMS();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          color: '#092644',
          padding: '3rem 2.5rem',
          position: 'relative',
          borderRadius: '12px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(9, 38, 68, 0.08)',
            border: 'none',
            color: '#092644',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={28} style={{ color: '#F78E1E' }} />
          <span className="section-tag" style={{ margin: 0 }}>Trust By Design</span>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#092644' }}>The Advithiya Customer Charter</h2>
        <p style={{ color: '#626E7A', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Our five non-negotiable promises to every homebuyer and landowner before, during, and after development.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {charter.map((promise, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: 'rgba(9, 38, 68, 0.03)',
                borderRadius: '8px',
                borderLeft: '4px solid #F78E1E'
              }}
            >
              <div
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#F78E1E',
                  lineHeight: 1
                }}
              >
                0{index + 1}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#092644', marginBottom: '0.35rem' }}>{promise.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#626E7A', margin: 0 }}>{promise.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.25rem', textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCharterModal;
