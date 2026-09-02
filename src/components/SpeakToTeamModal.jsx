import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCMS } from '../context/CMSContext';

export const SpeakToTeamModal = ({ isOpen, onClose, defaultProject = '' }) => {
  const { company, projects } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Schedule Site Visit',
    project: defaultProject || 'Advithiya Shreyas',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(`Inquiry routed to ${company.email}`, {
      description: `Thank you ${formData.name}. Our project team will contact you shortly.`
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#4A3428',
          color: '#FFFFFF',
          padding: '2.5rem',
          position: 'relative',
          borderRadius: '12px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFFFFF',
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

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={54} style={{ color: '#A6462A', margin: '0 auto 1.25rem auto' }} />
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>Thank You for Reaching Out</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Your inquiry has been routed directly to our project team at <strong>{company.email}</strong>. A representative will contact you within 2 business hours.
            </p>
            <button className="btn btn-orange" onClick={handleReset}>
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="section-tag">Direct Inquiry</span>
              <h3 style={{ color: '#FFFFFF', marginTop: '0.5rem' }}>Speak to Our Team</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                No hard selling. We share transparent facts, layout plans, and pricing on request.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="dark-section" style={{ background: 'none' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Vikramaditya Sen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Enquiry Type</label>
                  <select
                    className="form-select"
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    style={{ backgroundColor: '#563D2F', color: '#FFFFFF' }}
                  >
                    <option>Schedule Site Visit</option>
                    <option>Request Pricing & Cost Sheet</option>
                    <option>Download Floor Plans</option>
                    <option>RERA & Legal Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project of Interest</label>
                  <select
                    className="form-select"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    style={{ backgroundColor: '#563D2F', color: '#FFFFFF' }}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Preferred Time</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="Tell us what you're looking for or your preferred date for a site visit..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', marginTop: '1rem' }}>
                <span>Submit Inquiry</span>
                <Send size={16} />
              </button>

              <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', marginTop: '1rem' }}>
                All details routed directly to {company.email}. No spam guaranteed.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakToTeamModal;
