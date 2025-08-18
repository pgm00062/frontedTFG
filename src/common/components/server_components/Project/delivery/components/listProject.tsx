import ProjectsContainer from '@/common/components/client_components/ProjectsUI/Delivery'
import { listProjects, searchProjectsByName } from '../../infrastructure/projectOperations'
import type { ProjectsListProps } from '../interface'

export default async function ProjectsListServer({ page = 0, size = 10, searchTerm }: ProjectsListProps = {}) {
  const abort = new AbortController()
  let projects: any[] = []

  try {
    if (searchTerm && searchTerm.trim() !== '') {
      // Buscar proyectos por nombre
      projects = await searchProjectsByName({ 
        name: searchTerm.trim(), 
        page, 
        size, 
        signal: abort.signal 
      })
    } else {
      // Listar todos los proyectos
      projects = await listProjects({ page, size, signal: abort.signal })
    }
  } catch (e) {
    console.error('ProjectsListServer error', e)
    projects = []
  }

  return <ProjectsContainer initialProjects={projects} searchTerm={searchTerm} />
}