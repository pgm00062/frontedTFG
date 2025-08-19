'use client'
import { useCallback } from 'react'

interface UseUpdateProjectProps {
  onProjectUpdated?: (projectId: number, updatedProject: any) => void
}

export const useUpdateProject = ({ onProjectUpdated }: UseUpdateProjectProps = {}) => {
  
  const updateProject = useCallback(async (projectId: number, projectData: any) => {
    try {
      const response = await fetch(`/api/projects/update/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projectData),
      })

      const text = await response.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = text
      }

      if (!response.ok) {
        console.error('[useUpdateProject] update failed, status:', response.status, 'body:', data)
        throw new Error(`Update project failed: ${response.status} ${JSON.stringify(data)}`)
      }

      // Notificar al componente padre que el proyecto se actualizó
      onProjectUpdated?.(projectId, data?.backendBody ?? data)
      
      return data?.backendBody ?? data
    } catch (error) {
      console.error('[useUpdateProject] error:', error)
      throw error
    }
  }, [onProjectUpdated])

  return {
    updateProject
  }
}
