'use server'

import { cookies } from 'next/headers';
import Service from '@/service/src';
import type { ProjectTimeInfo } from '../../client_components/TimeUI/delivery/interface';

// Server Action para obtener proyectos
export async function getProjectsAction(page = 0, size = 10, searchTerm?: string) {
  const abort = new AbortController();
  
  try {
    const cookieStore = cookies();
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
    const cookieStore = cookies();
    const jsession = cookieStore.get('JSESSIONID')?.value;
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

    if (!authToken) {
      throw new Error('No authentication token');
    }

    const abort = new AbortController();

    // Realizar todas las llamadas en paralelo
    const results = await Promise.allSettled([
      // A) Ganancias del último mes
      Service.getCases('getEarningsLastMonth', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // B) Ganancias del año actual
      Service.getCases('getEarningsThisYear', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // C) Ganancias pendientes
      Service.getCases('getPendingEarnings', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // D) Tasa de ganancia por hora
      Service.getCases('getEarningsRate', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),
    ]);

    // Extraer valores o usar defaults (accediendo a .data de cada respuesta)
    const earningsLastMonth = results[0].status === 'fulfilled' ? ((results[0].value as any)?.data ?? 0) : 0;
    const earningsThisYear = results[1].status === 'fulfilled' ? ((results[1].value as any)?.data ?? 0) : 0;
    const pendingEarnings = results[2].status === 'fulfilled' ? ((results[2].value as any)?.data ?? 0) : 0;
    const earningsRate = results[3].status === 'fulfilled' ? (results[3].value as any)?.data : undefined;

    // Log de cada resultado individual
    console.log('💰 [getStatisticsAction] Ganancias último mes:', earningsLastMonth);
    console.log('💰 [getStatisticsAction] Ganancias año actual:', earningsThisYear);
    console.log('⏳ [getStatisticsAction] Ganancias pendientes:', pendingEarnings);
    console.log('📈 [getStatisticsAction] Tasa de ganancia:', earningsRate);

    // Log de errores si los hay
    const names = ['earningsLastMonth', 'earningsThisYear', 'pendingEarnings', 'earningsRate'];
    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      if (result.status === 'rejected') {
        console.error(`❌ [getStatisticsAction] Error en ${names[index]}:`, result.reason);
      }
    }

    const statisticsData = {
      earningsLastMonth,
      earningsThisYear,
      pendingEarnings,
      earningsRate,
    };

    console.log('📊 [getStatisticsAction] Statistics data obtenida:', statisticsData);

    return statisticsData;
  } catch (error) {
    console.error('❌ [getStatisticsAction] Error fetching statistics:', error);
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
        // Obtener tiempo total para este proyecto con todos los datos
        let totalTimeData = null;
        try {
          const timeData = await Service.getCases('getProjectTotalTime', {
            signal: abort.signal,
            endPointData: project.id,
            token: authHeader || undefined,
            headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
          });
          totalTimeData = timeData as any;
        } catch (error) {
          console.log(`Error obteniendo tiempo total para proyecto ${project.id}:`, error);
          totalTimeData = null;
        }

        // Verificar si este proyecto tiene la sesión activa
        const projectActiveSession = activeSession && (activeSession as any)?.projectId === project.id 
          ? {
              id: (activeSession as any)?.id,
              startTime: (activeSession as any)?.startTime,
              endTime: (activeSession as any)?.endTime,
              projectId: (activeSession as any)?.projectId,
              userId: (activeSession as any)?.userId,
              isActive: (activeSession as any)?.isActive ?? (activeSession as any)?.active ?? true,
              isPaused: (activeSession as any)?.isPaused ?? (activeSession as any)?.paused ?? false,
              description: (activeSession as any)?.description
            }
          : null;

        return {
          projectId: project.id,
          projectName: project.name,
          activeSession: projectActiveSession,
          totalTime: totalTimeData?.totalMinutes ? totalTimeData.totalMinutes * 60 : 0,
          totalTimeData: totalTimeData
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error obteniendo datos de tiempo:', error);
    return [];
  }
}

// Server Action para obtener el tiempo total trabajado en el día
export async function getDailyTotalTimeAction() {
  try {
    const cookieStore = cookies();
    const jsession = cookieStore.get('JSESSIONID')?.value;
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Formato: 2025-11-06

    const dailyTime = await Service.getCases('getTotalTimeDay', {
      signal: new AbortController().signal,
      endPointData: { date: dateString },
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    }) as any;

    // El DTO devuelve: { totalHours: number, totalMinutes: number }
    if (dailyTime && typeof dailyTime === 'object') {
      const hours = Math.floor(dailyTime.totalHours || 0);
      const minutes = (dailyTime.totalMinutes || 0) % 60;
      
      return {
        success: true,
        data: `${hours}h ${minutes}m`
      };
    }

    return {
      success: true,
      data: '0h 0m'
    };
  } catch (error) {
    console.error('Error obteniendo tiempo total del día:', error);
    return {
      success: false,
      data: '0h 0m'
    };
  }
}
