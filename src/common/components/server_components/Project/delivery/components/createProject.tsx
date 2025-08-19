import ProjectsContainer from '@/common/components/client_components/ProjectsUI/Delivery'
import type { ProjectsCreateProps } from '../interface'
import { createProject } from '@/common/components/server_components/Project/infrastructure/projectOperations'

// ...existing code...
export default function ProjectsContainerServer({ initialProjects = null }: ProjectsCreateProps) {
  async function createAction(values: any) {
    'use server'
    const created = await createProject(values)
    return created
  }

  return <ProjectsContainer initialProjects={initialProjects} onCreate={createAction} />
}