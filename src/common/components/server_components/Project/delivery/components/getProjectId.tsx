import ProjectDetail from '../../../../client_components/ProjectsUI/Delivery/components/getProjectIdUI'
import { getProjectById } from '../../infrastructure/projectOperations'
import { notFound } from 'next/navigation'
import type { getProjectIdProps } from '../interface'

export default async function ProjectByIdServer({ params }: getProjectIdProps) {
  const { id } = params
  if (!id) return notFound()

  const abort = new AbortController()
  try {
    const project = await getProjectById(id, { signal: abort.signal })
    if (!project) return notFound()
    return <ProjectDetail project={project} />
  } catch (err) {
    console.error('ProjectByIdServer error', err)
    throw err
  }
}