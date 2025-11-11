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
  invoicesPreview?: any[];
  timePreview?: any[];
  dailyTotalTime?: string;
  // Props removidas para lazy loading: initialProjects, statisticsData, initialInvoices
}

const WelcomeWithNavigation: React.FC<WelcomeWithNavigationProps> = ({
  userPreview,
  projectsPreview,
  statisticsPreview,
  invoicesPreview,
  timePreview,
  dailyTotalTime
}) => {
  const [activeTab, setActiveTab] = useState('inicio');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="welcome-page-full">
      <WelcomeHeader userName={userPreview?.name} />
      <div style={{ padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <WelcomeNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        <WelcomeContent
          activeTab={activeTab}
          userPreview={userPreview}
          projectsPreview={projectsPreview}
          statisticsPreview={statisticsPreview}
          invoicesPreview={invoicesPreview}
          timePreview={timePreview}
          dailyTotalTime={dailyTotalTime}
        />
      </div>
    </main>
  );
};

export default WelcomeWithNavigation;
