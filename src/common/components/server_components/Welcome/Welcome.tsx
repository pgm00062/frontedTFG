import { WelcomeGrid, WelcomeHeader } from '../../client_components/WelcomeUI/Delivery';

import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface'
import type { ProjectItem } from '../../client_components/WelcomeUI/Delivery/interface'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function WelcomeServer() {
  // Obtener datos del usuario igual que en ProfileServer
  const abort = new AbortController()
  let userPreview = undefined;
  let projectsPreview: ProjectItem[] = [];
  
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
      projectsPreview = projectsArray.map(project => ({
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
  } catch (e) {
    userPreview = undefined;
    projectsPreview = [];
  }
  
  return (
    <main className="welcome-page-full">
      <WelcomeHeader />
      <WelcomeGrid full userPreview={userPreview} projectsPreview={projectsPreview} />
    </main>
  )
}