'use client'
import { useState, useEffect } from 'react'
import type {  ProjectItem } from '../Delivery/interface'

// ...existing code...
export default function useProjectsContainer(initialProjects: ProjectItem[] | null | undefined = []) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || [])
  const [open, setOpen] = useState(false)

  // Actualizar proyectos cuando cambien los initialProjects (ej: búsqueda)
  useEffect(() => {
    setProjects(initialProjects || [])
  }, [initialProjects])

  const handleCreate = async (values: any): Promise<void> => {
    try {
      const { name, description, type, startDate, endDate, status, budget } = values || {}
      const payload = { name, description, type, startDate, endDate, status, budget }
      console.log('[ProjectsContainer] creating project payload:', payload)

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const text = await response.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (e) {
        data = text
      }

      if (!response.ok) {
        console.error('[ProjectsContainer] create project failed, status:', response.status, 'body:', data)
        throw new Error(`Create project failed: ${response.status} ${JSON.stringify(data)}`)
      }

      // backend returned created project (or a wrapper). Normalize
      const created = data?.backendBody ?? data
      if (created) {
        setProjects((prev) => [created, ...prev])
      }
      setOpen(false)
    } catch (error) {
      console.error('[ProjectsContainer] handleCreate error:', error)
      throw error
    }
  }

  return {
    projects,
    setProjects,
    open,
    setOpen,
    handleCreate,
  }
}
// ...existing code...