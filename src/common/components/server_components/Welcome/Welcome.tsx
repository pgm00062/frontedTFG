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

    if (projectsData?.content && Array.isArray(projectsData.content)) {
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
    if (projectsPreview.length > 0) {
      const completedProjects = projectsPreview.filter(p => p.status === 'TERMINADO');
      const inProgressProjects = projectsPreview.filter(p => p.status === 'EN_PROGRESO');
      
      statisticsPreview = {
        monthlyEarnings: completedProjects.length * 1200, // Ejemplo: 1200€ por proyecto completado
        pendingEarnings: inProgressProjects.length * 1500, // Ejemplo: 1500€ por proyecto en progreso
        totalTimeWorked: `${projectsPreview.length * 80}h`, // Ejemplo: 80h por proyecto
        avgEarningsPerHour: 15.5 // Ejemplo: 15.5€/hora
      };
    } else {
      statisticsPreview = {
        monthlyEarnings: 0,
        pendingEarnings: 0,
        totalTimeWorked: '0h',
        avgEarningsPerHour: 0
      };
    }
  } catch (e) {
    console.error('Error fetching welcome data:', e);
    userPreview = undefined;
    projectsPreview = [];
    statisticsPreview = undefined;
  }
  
  return (
    <WelcomeWithNavigation
      userPreview={userPreview}
      projectsPreview={projectsPreview}
      statisticsPreview={statisticsPreview}
    />
  )
}