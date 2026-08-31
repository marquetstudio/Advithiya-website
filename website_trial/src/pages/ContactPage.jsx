import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage = ({ setActivePage }) => {
  const { company, projects } = useCMS();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Project Enquiry',
    projectOfInterest: 'Advithiya Shreyas',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast.success(`Enquiry submitted successfully!`, {
      description: 'A project advisor will contact you during business hours.'
    });
  };

  return (
    <div className="contact-page animate-fade-in" style={{ paddingTop: '5rem' }}>
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
            backgroundImage: `url('/assets/images/shreyas_exterior.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: 0
          }}
        />

        <div className="container" style={{ maxWidth: '880px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-tag">Contact Us</span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', marginBottom: '1.25rem' }}>
            Let's start a conversation.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.88)', fontWeight: 300, lineHeight: 1.6 }}>
            Whether you're exploring a project, looking for more information or interested in working with Advithiya, we're here to help.
          </p>
        </div>
      </section>

      {/* 02. GET IN TOUCH & 04. CORPORATE OFFICE */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="editorial-grid" style={{ alignItems: 'start' }}>
            {/* 02. GET IN TOUCH FORM */}
            <div style={{ backgroundColor: '#F8F9FA', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(9,38,68,0.08)' }}>
              <span className="section-tag">Get in Touch</span>
              <h2 style={{ fontSize: '1.85rem', color: '#092644', marginBottom: '0.5rem' }}>
                Tell us a little about what you need.
              </h2>
              <p style={{ color: '#626E7A', fontSize: '0.9rem', marginBottom: '2rem' }}>
                A project advisor will contact you during business hours.
              </p>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <CheckCircle2 size={54} style={{ color: '#F78E1E', margin: '0 auto 1rem auto' }} />
                  <h3 style={{ color: '#092644' }}>Thank You</h3>
                  <p style={{ color: '#626E7A' }}>
                    Your enquiry has been received. A project advisor will contact you during business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(9,38,68,0.15)', backgroundColor: '#FFFFFF' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(9,38,68,0.15)', backgroundColor: '#FFFFFF' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(9,38,68,0.15)', backgroundColor: '#FFFFFF' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                        Enquiry Type
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="form-select"
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', backgroundColor: '#FFFFFF', borderColor: 'rgba(9,38,68,0.15)' }}
                      >
                        <option value="Project Enquiry">Project Enquiry</option>
                        <option value="Schedule a Site Visit">Schedule a Site Visit</option>
                        <option value="Request Project Details">Request Project Details</option>
                        <option value="Land Partnership">Land Partnership</option>
                        <option value="Channel Partnership">Channel Partnership</option>
                        <option value="Vendor / Consultant">Vendor / Consultant</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                        Project of Interest
                      </label>
                      <select
                        value={formData.projectOfInterest}
                        onChange={(e) => setFormData({ ...formData, projectOfInterest: e.target.value })}
                        className="form-select"
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', backgroundColor: '#FFFFFF', borderColor: 'rgba(9,38,68,0.15)' }}
                      >
                        <option value="Advithiya Shreyas">Advithiya Shreyas (Launching Soon)</option>
                        <option value="Advithiya Urban Chalet">Advithiya Urban Chalet (Delivered)</option>
                        <option value="All / General">General</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#092644', fontWeight: 600, fontSize: '0.9rem' }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us more about your query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(9,38,68,0.15)', backgroundColor: '#FFFFFF', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                    <span>Submit Enquiry</span>
                    <Send size={16} />
                  </button>

                  <div style={{ fontSize: '0.8rem', color: '#626E7A', textAlign: 'center' }}>
                    A project advisor will contact you during business hours.
                  </div>
                </form>
              )}
            </div>

            {/* 04. CORPORATE OFFICE */}
            <div>
              <span className="section-tag">Corporate Office</span>
              <h2 style={{ fontSize: '1.85rem', color: '#092644', marginBottom: '1.5rem' }}>
                {company.corporateName || "Advithiya Developers"}
              </h2>

              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: '#092644',
                  color: '#FFFFFF',
                  padding: '2.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 20px 40px rgba(9, 38, 68, 0.15)',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <MapPin size={22} style={{ color: '#F78E1E', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                      {company.address}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Phone size={20} style={{ color: '#F78E1E', flexShrink: 0 }} />
                    <a href={`tel:${company.phone}`} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>
                      Phone: {company.phone}
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Mail size={20} style={{ color: '#F78E1E', flexShrink: 0 }} />
                    <a href={`mailto:${company.email}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                      Email: {company.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* 06. GRIEVANCE & CUSTOMER SUPPORT */}
              <div
                style={{
                  backgroundColor: '#F8F9FA',
                  padding: '2rem',
                  borderRadius: '8px',
                  borderLeft: '4px solid #F78E1E',
                  border: '1px solid rgba(9, 38, 68, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#092644', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={20} style={{ color: '#F78E1E' }} />
                  <span>Grievance & Customer Support</span>
                </div>
                <h4 style={{ fontSize: '1rem', color: '#092644', margin: '0.5rem 0' }}>
                  Need assistance with an existing enquiry or concern?
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#626E7A', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                  For customer questions, complaints or escalation, please contact our team through the appropriate channel.
                </p>
                <div style={{ fontSize: '0.85rem', color: '#092644', fontWeight: 600 }}>
                  Grievance Contact: <span style={{ color: '#626E7A' }}>[To be confirmed] | Reach out to <a href={`mailto:${company.email}`} style={{ color: '#F78E1E' }}>{company.email}</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. FIND US (MAP EMBED) */}
      <section className="section-padding" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-tag">Find Us</span>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', color: '#092644' }}>
              Visit our office.
            </h2>
            <p style={{ color: '#626E7A', fontSize: '1rem' }}>
              RC Heights, No. 5, 3rd Floor, 4th Cross, New BEL Road, RMV 2nd Stage, Bangalore - 560094
            </p>
          </div>

          <div style={{ width: '100%', height: '360px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(9,38,68,0.12)', boxShadow: '0 10px 25px rgba(9,38,68,0.06)' }}>
            <iframe
              title="Advithiya Developers Office Location"
              src="https://maps.google.com/maps?q=New+BEL+Road,+RMV+2nd+Stage,+Bangalore+560094&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 07. CLOSING CTA */}
      <section style={{ backgroundColor: '#092644', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            Looking for a project?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            Explore our current developments and find the one that's right for you.
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
  );
};

export default ContactPage;
