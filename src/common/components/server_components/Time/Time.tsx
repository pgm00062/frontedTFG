import { TimeClient } from '../../client_components/TimeUI/delivery';
import type { ProjectTimeInfo } from '../../client_components/TimeUI/delivery/interface';
import { cookies } from 'next/headers';
import Service from '@/service/src';

export default async function TimeServer() {
  const abort = new AbortController();
  let projects: ProjectTimeInfo[] = [];
  
  try {
    const cookieStore = cookies();
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

    if (projectsData && projectsData.content && Array.isArray(projectsData.content)) {
      // Obtener sesión activa del usuario
      let activeSession = null;
      try {
        activeSession = await Service.getCases('getActiveSession', {
          signal: abort.signal,
          endPointData: {},
          token: authHeader || undefined,
          headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
        });
        console.log('✅ Sesión activa obtenida completa:', JSON.stringify(activeSession, null, 2));
      } catch (error) {
        console.log('⚠️ No hay sesión activa o error al obtenerla:', error);
        activeSession = null;
      }

      // Mapear los proyectos al formato necesario para el time tracking
      projects = await Promise.all(
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
            console.log(`⏱️ Tiempo total para proyecto ${project.name}:`, totalTimeData);
          } catch (error) {
            console.log(`⚠️ Error obteniendo tiempo total para proyecto ${project.id}:`, error);
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
                isPaused: (activeSession as any)?.isPaused ?? (activeSession as any)?.paused ?? false, // Mapear tanto isPaused como paused
                description: (activeSession as any)?.description
              }
            : null;

          console.log(`🎯 Proyecto ${project.name} - Sesión activa:`, projectActiveSession ? 'SÍ' : 'NO', projectActiveSession?.isPaused ? '(PAUSADA)' : '');

          return {
            projectId: project.id,
            projectName: project.name,
            activeSession: projectActiveSession,
            totalTime: totalTimeData?.totalMinutes ? totalTimeData.totalMinutes * 60 : 0, // Convertir minutos a segundos (legacy)
            totalTimeData: totalTimeData // Datos completos del tiempo total
          };
        })
      );
    }
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    projects = [];
  }
  
  return <TimeClient projects={projects} />;
}