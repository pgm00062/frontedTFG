'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd';
import { WelcomeGrid } from '../index';
import ProjectsContainer from '@/common/components/client_components/ProjectsUI/Delivery';
import { TimeClient } from '@/common/components/client_components/TimeUI/delivery';
import StatisticsClient from '@/common/components/client_components/StatisticsUI/Delivery/StatisticsClient';
import { InvoicesClient } from '@/common/components/client_components/InvoicesUI/Delivery';
import type { ProjectItem, StatisticsPreviewData } from '../interface';
import { listInvoicesAction } from '@/common/components/server_components/Invoices/infrastructure/invoiceActions';
import { 
  getProjectsAction, 
  getStatisticsAction, 
  getTimeDataAction 
} from '@/common/components/server_components/Welcome/welcomeActions';

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
  invoicesPreview?: any[];
  timePreview?: any[];
  // Removemos las props de datos iniciales para lazy loading
}

const WelcomeContent: React.FC<WelcomeContentProps> = ({ 
  activeTab, 
  userPreview, 
  projectsPreview, 
  statisticsPreview,
  invoicesPreview,
  timePreview
}) => {
  // Estados para lazy loading
  const [isLoading, setIsLoading] = useState(false);
  const [loadedTabs, setLoadedTabs] = useState(new Set<string>());
  
  // Estados para datos de cada sección
  const [projects, setProjects] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [timeData, setTimeData] = useState<any[]>([]);
  
  // Estados para búsqueda de proyectos
  const [projectSearchTerm, setProjectSearchTerm] = useState('');

  // Función para cargar datos de una sección específica
  const loadTabData = useCallback(async (tab: string, searchTerm?: string) => {
    setIsLoading(true);
    try {
      switch (tab) {
        case 'proyectos': {
          // Cargar datos de proyectos completos (con búsqueda si se proporciona)
          const projectsData = await getProjectsAction(0, 50, searchTerm);
          setProjects(projectsData);
          if (!searchTerm) {
            // Solo marcar como cargado si no es una búsqueda
            const newLoadedTabs = new Set(loadedTabs);
            newLoadedTabs.add(tab);
            setLoadedTabs(newLoadedTabs);
          }
          break;
        }
          
        case 'estadisticas': {
          // Cargar datos de estadísticas completos
          const statsData = await getStatisticsAction();
          setStatistics(statsData);
          const newLoadedTabs = new Set(loadedTabs);
          newLoadedTabs.add(tab);
          setLoadedTabs(newLoadedTabs);
          break;
        }
          
        case 'facturas': {
          // Cargar facturas
          const invoicesResult = await listInvoicesAction();
          setInvoices(invoicesResult.success ? invoicesResult.data : []);
          const newLoadedTabs = new Set(loadedTabs);
          newLoadedTabs.add(tab);
          setLoadedTabs(newLoadedTabs);
          break;
        }
          
        case 'tiempo': {
          // Cargar datos de tiempo
          const timeResult = await getTimeDataAction();
          setTimeData(timeResult);
          const newLoadedTabs = new Set(loadedTabs);
          newLoadedTabs.add(tab);
          setLoadedTabs(newLoadedTabs);
          break;
        }
          
        default:
          break;
      }
    } catch (error) {
      console.error(`Error loading ${tab} data:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [loadedTabs]);

  // Función para refrescar datos de tiempo
  const refreshTimeData = useCallback(async () => {
    try {
      const timeResult = await getTimeDataAction();
      setTimeData(timeResult);
    } catch (error) {
      console.error('Error refreshing time data:', error);
    }
  }, []);

  // Función para manejar búsqueda de proyectos
  const handleProjectSearch = useCallback(async (searchTerm: string) => {
    setProjectSearchTerm(searchTerm);
    await loadTabData('proyectos', searchTerm);
  }, [loadTabData]);

  // Cargar datos cuando cambia el tab activo
  useEffect(() => {
    if (activeTab !== 'inicio' && !loadedTabs.has(activeTab)) {
      loadTabData(activeTab);
    }
  }, [activeTab, loadedTabs, loadTabData]);

  // Auto-refresh para datos de tiempo cada 30 segundos si está en la pestaña de tiempo
  useEffect(() => {
    if (activeTab === 'tiempo' && loadedTabs.has('tiempo')) {
      const interval = setInterval(refreshTimeData, 30000); // 30 segundos
      return () => clearInterval(interval);
    }
  }, [activeTab, loadedTabs, refreshTimeData]);

  const renderContent = () => {
    // Mostrar loading si estamos cargando datos
    if (isLoading && !loadedTabs.has(activeTab) && activeTab !== 'inicio') {
      return (
        <div className="flex justify-center items-center py-16">
          <Spin size="large" />
          <span className="ml-3 text-gray-500">Cargando {activeTab}...</span>
        </div>
      );
    }

    switch (activeTab) {
      case 'inicio':
        return (
          <WelcomeGrid 
            full 
            userPreview={userPreview} 
            projectsPreview={projectsPreview} 
            statisticsPreview={statisticsPreview}
            invoicesPreview={invoicesPreview}
            timePreview={timePreview}
          />
        );
      
      case 'proyectos':
        return loadedTabs.has('proyectos') || projects.length > 0 ? (
          <ProjectsContainer 
            initialProjects={projects} 
            searchTerm={projectSearchTerm}
            onSearchChange={handleProjectSearch}
          />
        ) : (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
          </div>
        );
      
      case 'tiempo': {
        if (!loadedTabs.has('tiempo')) {
          return (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          );
        }
        return <TimeClient projects={timeData} onTimeUpdate={refreshTimeData} />;
      }
      
      case 'estadisticas':
        return loadedTabs.has('estadisticas') && statistics ? (
          <StatisticsClient statisticsData={statistics} />
        ) : (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
            <span className="ml-3 text-gray-500">Cargando estadísticas...</span>
          </div>
        );
      
      case 'facturas': {
        if (!loadedTabs.has('facturas')) {
          return (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          );
        }
        
        // Formatear proyectos para el componente de facturas
        const formattedProjects = projects.map((project: any) => ({
          id: project.id,
          name: project.name
        }));
        
        return <InvoicesClient initialInvoices={invoices} projects={formattedProjects} />;
      }
      
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
