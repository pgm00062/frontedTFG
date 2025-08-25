'use client'
import React from 'react';
import { WelcomeGrid } from '../index';
import ProjectsContainer from '@/common/components/client_components/ProjectsUI/Delivery';
import { TimeClient } from '@/common/components/client_components/TimeUI/delivery';
import StatisticsClient from '@/common/components/client_components/StatisticsUI/Delivery/StatisticsClient';
import { Empty } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import type { ProjectItem, StatisticsPreviewData } from '../interface';

interface WelcomeContentProps {
  activeTab: string;
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

const WelcomeContent: React.FC<WelcomeContentProps> = ({ 
  activeTab, 
  userPreview, 
  projectsPreview, 
  statisticsPreview,
  initialProjects = [],
  statisticsData
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <WelcomeGrid 
            full 
            userPreview={userPreview} 
            projectsPreview={projectsPreview} 
            statisticsPreview={statisticsPreview} 
          />
        );
      
      case 'proyectos':
        return <ProjectsContainer initialProjects={initialProjects} />;
      
      case 'tiempo': {
        // Convertir los proyectos al formato esperado por TimeClient
        const timeProjects = initialProjects.map(project => ({
          projectId: project.id,
          projectName: project.name,
          activeSession: undefined,
          totalTime: 0
        }));
        return <TimeClient projects={timeProjects} />;
      }
      
      case 'estadisticas':
        return statisticsData ? (
          <StatisticsClient statisticsData={statisticsData} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando estadísticas...</p>
          </div>
        );
      
      case 'facturas':
        return (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px' 
          }}>
            <Empty
              image={<FileTextOutlined style={{ fontSize: 64, color: '#d1d5db' }} />}
              description="Funcionalidad de Facturas"
              style={{ margin: 0 }}
            >
              <p style={{ color: '#6b7280', marginTop: 16 }}>
                Esta sección se implementará próximamente
              </p>
            </Empty>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {renderContent()}
    </div>
  );
};

export default WelcomeContent;
