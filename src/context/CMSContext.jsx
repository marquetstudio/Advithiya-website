import React, { createContext, useContext, useState } from 'react';
import { initialData } from '../data/initialData';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(initialData.projects[0]);

  return (
    <CMSContext.Provider
      value={{
        company: initialData.company,
        projects: initialData.projects,
        articles: initialData.articles,
        leadership: initialData.leadership,
        charter: initialData.charter,
        qualityPillars: initialData.qualityPillars,
        standardsPillars: initialData.standardsPillars,
        values: initialData.values,
        activeProject,
        setActiveProject
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
