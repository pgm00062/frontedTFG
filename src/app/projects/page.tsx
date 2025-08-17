import ProjectsContainer from '@/common/components/client_components/ProjectsUI/infrastructure/ProjectsContainer'
import Service from '@/service/src'
import { cookies } from 'next/headers'

export default async function ProjectsPage() {
  const abort = new AbortController()
  let projects = []
  try {
    // Leer cookies del request (server-side) para reenviarlas al backend si existe sesión
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const raw = await Service.getCases('listProjects', {
      signal: abort.signal,
      endPointData: { page: 0, size: 10 },
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })
    // El backend devuelve un objeto Page: { content: [...], totalElements, ... }
  projects = Array.isArray(raw) ? raw : (raw as any)?.content || []
  } catch (e) {
    projects = []
  }
  return (
    <main className="page-container">
      {/* ProjectsContainer es un client component que recibirá initialProjects */}
      {/* @ts-ignore */}
      <ProjectsContainer initialProjects={projects} />
    </main>
  )
}
