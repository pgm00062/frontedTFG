'use client'
import { useState, useEffect } from 'react'
import type {  ProjectItem } from '../Delivery/interface'

// Hook para la versión con Server Actions (onCreate prop)
export function useProjectsContainerWithServerAction(
  initialProjects: ProjectItem[] | null | undefined = [],
  onCreate?: (values: Record<string, any>) => Promise<any>
) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || [])
  const [open, setOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const handleCreate = async (values: any): Promise<void> => {
    if (!onCreate) {
      console.warn('onCreate not provided; aborting create')
      return
    }

    // Normaliza payload según tu backend
    const { name, description, type, startDate, endDate, status, budget } = values || {}
    const payload = { name, description, type, startDate, endDate, status, budget }

    setCreating(true)
    try {
      // onCreate puede ser una Server Action
      const created = await onCreate(payload)
      if (created) {
        setProjects(prev => [created, ...prev])
      }
      setOpen(false)
    } catch (err) {
      console.error('[ProjectsContainer] create error:', err)
      throw err
    } finally {
      setCreating(false)
    }
  }

  return {
    projects,
    setProjects,
    open,
    setOpen,
    creating,
    handleCreate,
  }
}

// Hook para la versión con API Routes (fetch directo)
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