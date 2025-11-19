import WelcomeWithNavigation from '../../client_components/WelcomeUI/Delivery/components/WelcomeWithNavigation';

import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface'
import type { ProjectItem, StatisticsPreviewData, InvoiceItem, TimeEntry } from '../../client_components/WelcomeUI/Delivery/interface'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function WelcomeServer() {
  // Obtener datos del usuario igual que en ProfileServer
  const abort = new AbortController()
  let userPreview = undefined;
  let projectsPreview: ProjectItem[] = [];
  let statisticsPreview: StatisticsPreviewData | undefined = undefined;
  let invoicesPreview: InvoiceItem[] = [];
  let timePreview: TimeEntry[] = [];
  let dailyTotalTime = '0h 0m';
  
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
    }

    // Obtener los últimos tres proyectos del usuario (optimizado para preview)
    const projectsData = await Service.getCases('getLastThreeProjects', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    }) as any

    if (projectsData && Array.isArray(projectsData)) {
      // getLastThreeProjects devuelve directamente un array, no paginado
      const projectsArray = projectsData;
      
      // Mapear los proyectos al formato necesario para la preview
      projectsPreview = projectsArray.map((project: any) => ({
        id: project.id,
        name: project.name, // Ya viene como 'name' del backend
        title: project.name, // Usar 'name' como título también
        description: project.description || '',
        status: project.status
      }));
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

    // Obtener preview de facturas (últimas 3)
    try {
      const invoicesData = await Service.getCases('listInvoices', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }) as any

      if (invoicesData && Array.isArray(invoicesData)) {
        // Tomar solo las primeras 3 facturas
        const firstThree = invoicesData.slice(0, 3);
        invoicesPreview = firstThree.map((invoice: any) => ({
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber || `INV-${invoice.id}`,
          amount: invoice.amount || 0,
          issueDate: invoice.issueDate || new Date().toISOString(),
          status: invoice.status || 'PENDIENTE',
          projectName: invoice.projectName || invoice.project?.name
        }));
      }
    } catch (e) {
      invoicesPreview = [];
    }

    // Obtener preview de tiempo (últimas 3 sesiones)
    try {
      const timeData = await Service.getCases('listTimeSessions', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }) as any

      if (timeData && Array.isArray(timeData)) {
        // Tomar solo las primeras 3 sesiones
        const firstThree = timeData.slice(0, 3);
        timePreview = firstThree.map((entry: any) => ({
          id: entry.id,
          projectName: entry.projectName || entry.project?.name || 'Sin nombre',
          totalTime: entry.totalTime || '0h',
          status: entry.status || 'FINALIZADO',
          startTime: entry.startTime
        }));
      }
    } catch (e) {
      timePreview = [];
    }

    // Obtener tiempo total del día
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      const dailyTime = await Service.getCases('getTotalTimeDay', {
        signal: abort.signal,
        endPointData: { date: dateString },
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }) as any;

      if (dailyTime && typeof dailyTime === 'object') {
        const hours = Math.floor(dailyTime.totalHours || 0);
        const minutes = (dailyTime.totalMinutes || 0) % 60;
        dailyTotalTime = `${hours}h ${minutes}m`;
      }
    } catch (e) {
      dailyTotalTime = '0h 0m';
    }
  } catch (e) {
    console.error('Error fetching welcome data:', e);
    userPreview = undefined;
    projectsPreview = [];
    statisticsPreview = undefined;
    invoicesPreview = [];
    timePreview = [];
    dailyTotalTime = '0h 0m';
  }
  
  return (
    <WelcomeWithNavigation
      userPreview={userPreview}
      projectsPreview={projectsPreview}
      statisticsPreview={statisticsPreview}
      invoicesPreview={invoicesPreview}
      timePreview={timePreview}
      dailyTotalTime={dailyTotalTime}
    />
  )
}