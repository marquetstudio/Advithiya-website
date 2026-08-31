import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [data] = useState(initialData);
  const [activeProject, setActiveProject] = useState(data.projects[0]);

  return (
    <CMSContext.Provider
      value={{
        company: data.company,
        projects: data.projects,
        articles: data.articles,
        leadership: data.leadership,
        charter: data.charter,
        qualityPillars: data.qualityPillars,
        standardsPillars: data.standardsPillars || initialData.standardsPillars,
        values: data.values || initialData.values,
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
