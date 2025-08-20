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
        console.log('✅ Sesión activa obtenida:', activeSession);
      } catch (error) {
        console.log('⚠️ No hay sesión activa o error al obtenerla:', error);
        activeSession = null;
      }

      // Mapear los proyectos al formato necesario para el time tracking
      projects = await Promise.all(
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
            // Basándome en el DTO ProjectTotalTimeOutputDto, debería tener totalSeconds o similar
            totalTime = (totalTimeData as any)?.totalSeconds || (totalTimeData as any)?.totalTime || 0;
            console.log(`⏱️ Tiempo total para proyecto ${project.name}:`, totalTime);
          } catch (error) {
            console.log(`⚠️ Error obteniendo tiempo total para proyecto ${project.id}:`, error);
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
                isActive: (activeSession as any)?.active || true, // Usar 'active' del DTO, no 'isActive'
                description: (activeSession as any)?.description
              }
            : null;

          console.log(`🎯 Proyecto ${project.name} - Sesión activa:`, projectActiveSession ? 'SÍ' : 'NO');

          return {
            projectId: project.id,
            projectName: project.name,
            activeSession: projectActiveSession,
            totalTime: totalTime
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