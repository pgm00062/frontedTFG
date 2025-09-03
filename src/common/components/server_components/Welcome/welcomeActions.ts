'use server'

import { cookies } from 'next/headers';
import Service from '@/service/src';
import type { ProjectTimeInfo } from '../../client_components/TimeUI/delivery/interface';

// Server Action para obtener proyectos
export async function getProjectsAction(page = 0, size = 10, searchTerm?: string) {
  const abort = new AbortController();
  
  try {
    const cookieStore = await cookies();
    const jsession = cookieStore.get('JSESSIONID')?.value;
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

    let projects: any[] = [];

    if (searchTerm && searchTerm.trim() !== '') {
      // Buscar proyectos por nombre usando el service correcto
      const searchResults = await Service.getCases('searchProjectByName', {
        signal: abort.signal,
        endPointData: { name: searchTerm.trim(), page, size },
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      });
      
      // Los resultados de búsqueda pueden venir directamente como array
      projects = Array.isArray(searchResults) ? searchResults : [];
    } else {
      // Listar todos los proyectos
      const projectsData = await Service.getCases('listProjects', {
        signal: abort.signal,
        endPointData: { page, size },
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }) as any;
      
      projects = projectsData?.content || [];
    }

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Server Action para obtener estadísticas
export async function getStatisticsAction() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;

    if (!authToken) {
      throw new Error('No authentication token');
    }

    // TODO: Implementar cuando tengamos los endpoints reales
    // Por ahora retornamos datos placeholder
    const statisticsData = {
      monthlyEarnings: {
        total: 2500.75,
        projects: [
          { id: 1, name: "Proyecto Web E-commerce", earnings: 1500.50, completedDate: "2025-08-15" },
          { id: 2, name: "App Móvil Cliente", earnings: 1000.25, completedDate: "2025-08-20" }
        ]
      },
      pendingEarnings: {
        total: 3200.00,
        projects: [
          { id: 3, name: "Sistema de Gestión", estimatedEarnings: 2000.00, progress: 65 },
          { id: 4, name: "Landing Page", estimatedEarnings: 1200.00, progress: 30 }
        ]
      },
      timeWorked: [
        { projectId: 1, projectName: "Proyecto Web E-commerce", totalHours: 120, totalMinutes: 30 },
        { projectId: 2, projectName: "App Móvil Cliente", totalHours: 85, totalMinutes: 45 },
        { projectId: 3, projectName: "Sistema de Gestión", totalHours: 95, totalMinutes: 15 }
      ],
      earningsVsTime: [
        { projectId: 1, projectName: "Proyecto Web E-commerce", earnings: 1500.50, hoursWorked: 120.5, earningsPerHour: 12.45 },
        { projectId: 2, projectName: "App Móvil Cliente", earnings: 1000.25, hoursWorked: 85.75, earningsPerHour: 11.67 },
        { projectId: 3, projectName: "Sistema de Gestión", earnings: 0, hoursWorked: 95.25, earningsPerHour: 0 }
      ]
    };

    return statisticsData;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
}

// Server Action para obtener datos de tiempo
export async function getTimeDataAction(): Promise<ProjectTimeInfo[]> {
  const abort = new AbortController();
  
  try {
    const cookieStore = await cookies();
    const jsession = cookieStore.get('JSESSIONID')?.value;
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

    // Obtener proyectos del usuario
    const projectsData = await Service.getCases('listProjects', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    }) as any;

    if (!projectsData?.content || !Array.isArray(projectsData.content)) {
      return [];
    }

    // Obtener sesión activa del usuario
    let activeSession = null;
    try {
      activeSession = await Service.getCases('getActiveSession', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      });
    } catch (error) {
      console.log('No hay sesión activa o error al obtenerla:', error);
      activeSession = null;
    }

    // Mapear los proyectos al formato necesario para el time tracking
    const projects = await Promise.all(
      projectsData.content.map(async (project: any) => {
        // Obtener tiempo total para este proyecto
        let totalTime = 0;
        try {
          const totalTimeData = await Service.getCases('getProjectTotalTime', {
            signal: abort.signal,
            endPointData: project.id,
            token: authHeader || undefined,
            headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
          });
          totalTime = (totalTimeData as any)?.totalSeconds || (totalTimeData as any)?.totalTime || 0;
        } catch (error) {
          console.log(`Error obteniendo tiempo total para proyecto ${project.id}:`, error);
          totalTime = 0;
        }

        // Verificar si este proyecto tiene la sesión activa
        const projectActiveSession = activeSession && (activeSession as any)?.projectId === project.id 
          ? {
              id: (activeSession as any)?.id,
              startTime: (activeSession as any)?.startTime,
              endTime: (activeSession as any)?.endTime,
              projectId: (activeSession as any)?.projectId,
              userId: (activeSession as any)?.userId,
              isActive: (activeSession as any)?.active || true,
              description: (activeSession as any)?.description
            }
          : null;

        return {
          projectId: project.id,
          projectName: project.name,
          activeSession: projectActiveSession,
          totalTime: totalTime
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error obteniendo datos de tiempo:', error);
    return [];
  }
}
