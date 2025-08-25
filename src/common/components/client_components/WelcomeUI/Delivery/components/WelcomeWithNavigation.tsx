'use client'
import React, { useState } from 'react';
import { WelcomeHeader } from '../index';
import WelcomeNavigation from './WelcomeNavigation';
import WelcomeContent from './WelcomeContent';
import type { ProjectItem, StatisticsPreviewData } from '../interface';

interface WelcomeWithNavigationProps {
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
  projectsPreview?: ProjectItem[];
  statisticsPreview?: StatisticsPreviewData;
  initialProjects?: any[];
  statisticsData?: any;
}

const WelcomeWithNavigation: React.FC<WelcomeWithNavigationProps> = ({
  userPreview,
  projectsPreview,
  statisticsPreview,
  initialProjects = [],
  statisticsData
}) => {
  const [activeTab, setActiveTab] = useState('inicio');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="welcome-page-full">
      <WelcomeHeader />
      <div style={{ padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <WelcomeNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <WelcomeContent
          activeTab={activeTab}
          userPreview={userPreview}
          projectsPreview={projectsPreview}
          statisticsPreview={statisticsPreview}
          initialProjects={initialProjects}
          statisticsData={statisticsData}
        />
      </div>
    </main>
  );
};

export default WelcomeWithNavigation;
