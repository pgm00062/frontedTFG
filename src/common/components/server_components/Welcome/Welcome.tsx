import WelcomeWithNavigation from '../../client_components/WelcomeUI/Delivery/components/WelcomeWithNavigation';

import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface'
import type { ProjectItem, StatisticsPreviewData } from '../../client_components/WelcomeUI/Delivery/interface'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function WelcomeServer() {
  // Obtener datos del usuario igual que en ProfileServer
  const abort = new AbortController()
  let userPreview = undefined;
  let projectsPreview: ProjectItem[] = [];
  let statisticsPreview: StatisticsPreviewData | undefined = undefined;
  let fullStatisticsData = undefined;
  
  try {
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    // Obtener datos del usuario
    const userData = (await Service.getCases('getUser', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })) as ProfileClientProps['initialData']
    
    if (userData) {
      // Pasamos una previsualización con campos mínimos necesarios para la tarjeta
      userPreview = { id: userData.id, name: userData.name, surname: userData.surname, email: userData.email, dni: userData.dni }
      console.log('✅ userPreview creado:', userPreview);
    } else {
      console.log('❌ No se obtuvo userData');
    }

    // Obtener proyectos del usuario
    const projectsData = await Service.getCases('listProjects', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    }) as any

    console.log('📊 Datos de proyectos recibidos:', projectsData);

    if (projectsData && projectsData.content && Array.isArray(projectsData.content)) {
      // Los proyectos están en projectsData.content debido a la paginación
      const projectsArray = projectsData.content;
      
      // Mapear los proyectos al formato necesario para la preview
      projectsPreview = projectsArray.map((project: any) => ({
        id: project.id,
        name: project.name, // Ya viene como 'name' del backend
        title: project.name, // Usar 'name' como título también
        description: project.description || '',
        status: project.status
      }));
      console.log('✅ projectsPreview creado:', projectsPreview);
    } else {
      console.log('❌ No se obtuvieron proyectos o el formato no es el esperado');
    }

    // Crear datos de estadísticas de ejemplo basados en los proyectos
    let fullStatisticsData = undefined;
    if (projectsPreview.length > 0) {
      const completedProjects = projectsPreview.filter(p => p.status === 'TERMINADO');
      const inProgressProjects = projectsPreview.filter(p => p.status === 'EN_PROGRESO');
      
      statisticsPreview = {
        monthlyEarnings: completedProjects.length * 1200, // Ejemplo: 1200€ por proyecto completado
        pendingEarnings: inProgressProjects.length * 1500, // Ejemplo: 1500€ por proyecto en progreso
        totalTimeWorked: `${projectsPreview.length * 80}h`, // Ejemplo: 80h por proyecto
        avgEarningsPerHour: 15.5 // Ejemplo: 15.5€/hora
      };

      // Datos completos para la vista de estadísticas
      fullStatisticsData = {
        monthlyEarnings: {
          total: completedProjects.length * 1200,
          projects: completedProjects.map(p => ({
            id: p.id,
            name: p.name,
            earnings: 1200,
            completedDate: "2025-08-15"
          }))
        },
        pendingEarnings: {
          total: inProgressProjects.length * 1500,
          projects: inProgressProjects.map(p => ({
            id: p.id,
            name: p.name,
            estimatedEarnings: 1500,
            progress: 65
          }))
        },
        timeWorked: projectsPreview.map(p => ({
          projectId: p.id,
          projectName: p.name,
          totalHours: 80,
          totalMinutes: 30
        })),
        earningsVsTime: projectsPreview.map(p => ({
          projectId: p.id,
          projectName: p.name,
          earnings: p.status === 'TERMINADO' ? 1200 : 0,
          hoursWorked: 80.5,
          earningsPerHour: p.status === 'TERMINADO' ? 14.9 : 0
        }))
      };
    } else {
      statisticsPreview = {
        monthlyEarnings: 0,
        pendingEarnings: 0,
        totalTimeWorked: '0h',
        avgEarningsPerHour: 0
      };

      fullStatisticsData = {
        monthlyEarnings: { total: 0, projects: [] },
        pendingEarnings: { total: 0, projects: [] },
        timeWorked: [],
        earningsVsTime: []
      };
    }
  } catch (e) {
    console.error('Error fetching welcome data:', e);
    userPreview = undefined;
    projectsPreview = [];
    statisticsPreview = undefined;
    fullStatisticsData = { monthlyEarnings: { total: 0, projects: [] }, pendingEarnings: { total: 0, projects: [] }, timeWorked: [], earningsVsTime: [] };
  }
  
  return (
    <WelcomeWithNavigation
      userPreview={userPreview}
      projectsPreview={projectsPreview}
      statisticsPreview={statisticsPreview}
      initialProjects={projectsPreview}
      statisticsData={fullStatisticsData}
    />
  )
}