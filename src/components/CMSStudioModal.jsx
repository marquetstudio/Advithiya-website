import React, { useState } from 'react';
import { X, SlidersHorizontal, Plus, RefreshCw, Save, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useCMS } from '../context/CMSContext';

export const CMSStudioModal = ({ isOpen, onClose }) => {
  const {
    company,
    projects,
    articles,
    updateCompany,
    updateProject,
    addConstructionLog,
    addArticle,
    resetToDefault
  } = useCMS();

  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'shreyas');
  const [companyForm, setCompanyForm] = useState({ ...company });

  const [newLog, setNewLog] = useState({
    date: 'September 2026',
    milestone: 'Superstructure 1st Floor Slab Concrete Casting',
    description: 'First floor structural slab poured with self-compacting concrete. Post-tensioning cables tensioned.',
    image: '/assets/images/hero_architecture.jpg'
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Architecture',
    readTime: '4 min read',
    excerpt: '',
    content: ''
  });

  if (!isOpen) return null;

  const handleCompanySave = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    toast.success('Corporate details saved live', { description: 'Updated across website header, footer, and contact cards.' });
  };

  const handleProjectUpdate = (projectId, fields) => {
    updateProject(projectId, fields);
    toast.success(`Project ${projectId} updated`, { description: 'RERA and pricing details updated live in CMS.' });
  };

  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    addConstructionLog(selectedProjectId, newLog);
    toast.success('Construction log published!', { description: `Added new physical progress update to ${selectedProjectId}.` });
    setNewLog({
      date: 'October 2026',
      milestone: '',
      description: '',
      image: '/assets/images/shreyas_interior.jpg'
    });
  };

  const handleAddArticleSubmit = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    addArticle(newArticle);
    toast.success('New Insight published to blog!', { description: `Article "${newArticle.title}" is now live.` });
    setNewArticle({
      title: '',
      category: 'Architecture',
      readTime: '4 min read',
      excerpt: '',
      content: ''
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          backgroundColor: '#092644',
          color: '#FFFFFF',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          border: '1px solid rgba(247, 142, 30, 0.3)'
        }}
      >
        {/* CMS Header */}
        <div
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: '#05172b',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <SlidersHorizontal size={22} style={{ color: '#F78E1E' }} />
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>Advithiya CMS Studio</h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                Live Content Management & Real-time State Updates
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                resetToDefault();
                toast.info('CMS restored to initial defaults');
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.8)',
                padding: '0.4rem 0.85rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <RefreshCw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#092644' }}>
          {[
            { id: 'projects', label: 'Manage Projects' },
            { id: 'logs', label: 'Construction Logs' },
            { id: 'articles', label: 'Publish Insight' },
            { id: 'company', label: 'Corporate Office' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.9rem 1.5rem',
                background: activeTab === tab.id ? '#0e3054' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #F78E1E' : '2px solid transparent',
                color: activeTab === tab.id ? '#F78E1E' : 'rgba(255,255,255,0.7)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.85rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem' }}>Project Portfolio Management</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h4 style={{ color: '#F78E1E' }}>{proj.name} ({proj.type})</h4>
                      <span className={`status-badge ${proj.statusBadgeStyle}`}>{proj.status}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ color: '#FFF' }}>Status Text</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                          value={proj.status}
                          onChange={(e) => handleProjectUpdate(proj.id, { status: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ color: '#FFF' }}>Pricing Info</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                          value={proj.pricing}
                          onChange={(e) => handleProjectUpdate(proj.id, { pricing: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ color: '#FFF' }}>RERA Registration No.</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                          value={proj.reraNo}
                          onChange={(e) => handleProjectUpdate(proj.id, { reraNo: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ color: '#FFF' }}>Location</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                          value={proj.location}
                          onChange={(e) => handleProjectUpdate(proj.id, { location: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CONSTRUCTION PROGRESS LOGS */}
          {activeTab === 'logs' && (
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Post Construction Progress Update</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Add dated physical progress entries for project microsites.
              </p>

              <form onSubmit={handleAddLogSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Target Project</label>
                  <select
                    className="form-select"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Month & Year</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                      value={newLog.date}
                      onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Milestone Title</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                      value={newLog.milestone}
                      onChange={(e) => setNewLog({ ...newLog, milestone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Description of Progress</label>
                  <textarea
                    rows={3}
                    required
                    className="form-textarea"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    value={newLog.description}
                    onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-orange" style={{ marginTop: '0.5rem' }}>
                  <Plus size={16} />
                  <span>Publish Construction Log</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: PUBLISH INSIGHT ARTICLE */}
          {activeTab === 'articles' && (
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Publish New Article to Insights Blog</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Add educational content regarding RERA, legal checks, or architecture.
              </p>

              <form onSubmit={handleAddArticleSubmit}>
                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Article Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    placeholder="e.g. Understanding Soil Testing & Structural Safety in Bangalore"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Category</label>
                    <select
                      className="form-select"
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <option>Transparency</option>
                      <option>Buyers Guide</option>
                      <option>Legal Checkpoints</option>
                      <option>Architectural Insights</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Estimated Read Time</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                      value={newArticle.readTime}
                      onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Short Excerpt (2 lines)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    placeholder="Brief summary for article cards..."
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Full Article Body</label>
                  <textarea
                    rows={5}
                    required
                    className="form-textarea"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    placeholder="Write article markdown or plain text content..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-orange">
                  <Plus size={16} />
                  <span>Publish Article Live</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CORPORATE OFFICE */}
          {activeTab === 'company' && (
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem' }}>Edit Corporate Office Details</h4>
              <form onSubmit={handleCompanySave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Primary Phone</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                      value={companyForm.phone}
                      onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#FFF' }}>Primary Email</label>
                    <input
                      type="email"
                      className="form-input"
                      style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Full Office Address</label>
                  <textarea
                    rows={2}
                    className="form-textarea"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#FFF' }}>Grievance Officer Contact Details</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ backgroundColor: '#05172b', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
                    value={companyForm.grievanceContact}
                    onChange={(e) => setCompanyForm({ ...companyForm, grievanceContact: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-orange">
                  <Save size={16} />
                  <span>Save Corporate Details</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSStudioModal;
