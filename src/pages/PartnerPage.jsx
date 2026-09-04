import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, HardHat, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { assetPath } from '../utils/assetPath';

export const PartnerPage = () => {
  const [partnerType, setPartnerType] = useState('Land Partnership');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const enquiryFormRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Land Partnership',
    location: '',
    message: ''
  });

  const handleSelectCategory = (type) => {
    setPartnerType(type);
    setFormData(prev => ({ ...prev, category: type }));
    if (enquiryFormRef.current) {
      enquiryFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast.success('Enquiry submitted successfully!', {
      description: 'The relevant Advithiya partnership team will contact you shortly.'
    });
  };

  return (
    <div className="partner-page animate-fade-in" style={{ paddingTop: '5rem' }}>
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
            backgroundImage: `url(${assetPath('images/urban_chalet.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag">Partner With Advithiya</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Let's build what's next, together.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Whether you bring a development opportunity, market expertise or capabilities that strengthen our projects, we welcome the opportunity to explore a partnership.
          </p>
        </div>
      </section>

      {/* 02. LANDOWNERS, 03. CHANNEL PARTNERS, 04. VENDORS & CONSULTANTS */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
            {/* 02. LANDOWNERS */}
            <motion.div
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#F8F9FA',
                padding: '2.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(74, 52, 40, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ width: '52px', height: '52px', borderRadius: '8px', backgroundColor: 'rgba(166, 70, 42, 0.12)', color: '#A6462A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Building2 size={26} />
                </div>

                <span className="section-tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Landowners</span>
                <h2 style={{ fontSize: '1.5rem', color: '#4A3428', marginBottom: '0.5rem' }}>
                  Have a development opportunity?
                </h2>

                <div style={{ color: '#A6462A', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1rem' }}>
                  The right development begins with the right opportunity.
                </div>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1rem' }}>
                  We work with landowners looking to explore the potential of their property through development or joint development.
                </p>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Our team evaluates opportunities across location, planning, development potential, commercial considerations and execution to determine the right way forward.
                </p>
              </div>

              <button
                className="btn btn-outline-dark"
                onClick={() => handleSelectCategory('Land Partnership')}
              >
                <span>Discuss a Land Partnership</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* 03. CHANNEL PARTNERS */}
            <motion.div
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#F8F9FA',
                padding: '2.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(74, 52, 40, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ width: '52px', height: '52px', borderRadius: '8px', backgroundColor: 'rgba(166, 70, 42, 0.12)', color: '#A6462A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Users size={26} />
                </div>

                <span className="section-tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Channel Partners</span>
                <h2 style={{ fontSize: '1.5rem', color: '#4A3428', marginBottom: '1rem' }}>
                  Grow with Advithiya.
                </h2>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1rem' }}>
                  We work with channel partners who understand their markets and value responsible selling.
                </p>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  Our partners have access to relevant project information and sales collateral, supported by clear processes and responsive communication.
                </p>
              </div>

              <button
                className="btn btn-outline-dark"
                onClick={() => handleSelectCategory('Channel Partnership')}
              >
                <span>Register as a Channel Partner</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* 04. VENDORS & CONSULTANTS */}
            <motion.div
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#F8F9FA',
                padding: '2.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(74, 52, 40, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ width: '52px', height: '52px', borderRadius: '8px', backgroundColor: 'rgba(166, 70, 42, 0.12)', color: '#A6462A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <HardHat size={26} />
                </div>

                <span className="section-tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Vendors & Consultants</span>
                <h2 style={{ fontSize: '1.5rem', color: '#4A3428', marginBottom: '1rem' }}>
                  Bring your expertise to our projects.
                </h2>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1rem' }}>
                  We work with suppliers, contractors, consultants and specialists across the disciplines that support real estate development.
                </p>

                <p style={{ fontSize: '0.95rem', color: '#626E7A', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  If your organisation can contribute to the planning, development or delivery of our projects, we'd like to hear from you.
                </p>
              </div>

              <button
                className="btn btn-outline-dark"
                onClick={() => handleSelectCategory('Vendor / Consultant')}
              >
                <span>Register as a Vendor / Consultant</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* 05. CLOSING CTA & ENQUIRY FORM */}
          <div ref={enquiryFormRef} style={{ maxWidth: '720px', margin: '0 auto', backgroundColor: '#F8F9FA', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(74, 52, 40,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">Partnership Enquiry</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#4A3428', marginBottom: '0.75rem' }}>
                Have an opportunity to discuss?
              </h2>
              <p style={{ color: '#626E7A', fontSize: '1.05rem', margin: 0 }}>
                Tell us a little about what you bring to the table, and we'll connect you with the right Advithiya team.
              </p>
            </div>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle2 size={54} style={{ color: '#A6462A', margin: '0 auto 1rem auto' }} />
                <h3 style={{ color: '#4A3428' }}>Enquiry Received</h3>
                <p style={{ color: '#626E7A' }}>
                  Thank you. An Advithiya team member will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                    Partnership Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      setFormData({ ...formData, category: e.target.value });
                      setPartnerType(e.target.value);
                    }}
                    className="form-select"
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', backgroundColor: '#FFFFFF', borderColor: 'rgba(74, 52, 40,0.15)' }}
                  >
                    <option value="Land Partnership">Land Partnership</option>
                    <option value="Channel Partnership">Channel Partnership</option>
                    <option value="Vendor / Consultant">Vendor / Consultant</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                    Full Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name or company"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(74, 52, 40,0.15)', backgroundColor: '#FFFFFF' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(74, 52, 40,0.15)', backgroundColor: '#FFFFFF' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(74, 52, 40,0.15)', backgroundColor: '#FFFFFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4A3428', fontWeight: 600, fontSize: '0.9rem' }}>
                    Tell us what you bring to the table *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your land parcel, network, services, or expertise..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(74, 52, 40,0.15)', backgroundColor: '#FFFFFF', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  <span>Make an Enquiry</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
