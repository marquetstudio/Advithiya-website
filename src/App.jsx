import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgressBar from './components/ScrollProgressBar';
import SpeakToTeamModal from './components/SpeakToTeamModal';
import CustomerCharterModal from './components/CustomerCharterModal';
import CostCalculatorModal from './components/CostCalculatorModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import StandardsPage from './pages/StandardsPage';
import InsightsPage from './pages/InsightsPage';
import PartnerPage from './pages/PartnerPage';
import ContactPage from './pages/ContactPage';

export function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [isSpeakModalOpen, setIsSpeakModalOpen] = useState(false);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  const handlePageChange = (page) => {
    if (page !== 'insights') setSelectedArticle(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            setActivePage={handlePageChange}
            onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
            onOpenCharterModal={() => setIsCharterModalOpen(true)}
            onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              toast.info(`Loaded microsite for ${proj.name}`, { duration: 2500 });
            }}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        );
      case 'about':
        return (
          <AboutPage
            setActivePage={handlePageChange}
            onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            setActivePage={handlePageChange}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              toast.info(`Loaded details for ${proj.name}`, { duration: 2500 });
            }}
          />
        );
      case 'project-detail':
        return (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handlePageChange('projects')}
            onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
          />
        );
      case 'standards':
        return (
          <StandardsPage
            setActivePage={handlePageChange}
            onOpenCharterModal={() => setIsCharterModalOpen(true)}
          />
        );
      case 'insights':
        return (
          <InsightsPage
            activeArticle={selectedArticle}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
          />
        );
      case 'partner':
        return <PartnerPage />;
      case 'contact':
        return <ContactPage setActivePage={handlePageChange} />;
      default:
        return (
          <HomePage
            setActivePage={handlePageChange}
            onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
            onOpenCharterModal={() => setIsCharterModalOpen(true)}
            onOpenCalculatorModal={() => setIsCalculatorModalOpen(true)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        );
    }
  };

  return (
    <SmoothScroll>
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Sonner Toast Root */}
        <Toaster
          position="bottom-right"
          richColors
          theme="dark"
          toastOptions={{
            style: {
              fontFamily: "'Poppins', sans-serif",
              borderRadius: '8px',
              border: '1px solid rgba(166, 70, 42, 0.3)',
              backgroundColor: '#312119',
              color: '#FFFFFF'
            }
          }}
        />

        <Navbar
          activePage={activePage}
          setActivePage={handlePageChange}
          onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
        />

        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>

        <Footer
          setActivePage={handlePageChange}
          onOpenCharterModal={() => {
            setIsCharterModalOpen(true);
            toast.info('Opened Advithiya Customer Charter modal');
          }}
        />

        {/* MODALS */}
        <SpeakToTeamModal
          isOpen={isSpeakModalOpen}
          onClose={() => setIsSpeakModalOpen(false)}
          defaultProject={selectedProject?.name}
        />

        <CustomerCharterModal
          isOpen={isCharterModalOpen}
          onClose={() => setIsCharterModalOpen(false)}
        />

        <CostCalculatorModal
          isOpen={isCalculatorModalOpen}
          onClose={() => setIsCalculatorModalOpen(false)}
          onOpenSpeakModal={() => setIsSpeakModalOpen(true)}
        />
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
