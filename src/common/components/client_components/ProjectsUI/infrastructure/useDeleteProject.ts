'use client'
import { useCallback } from 'react'

interface UseDeleteProjectProps {
  onProjectDeleted?: (projectId: number) => void
}

export const useDeleteProject = ({ onProjectDeleted }: UseDeleteProjectProps = {}) => {
  
  const deleteProject = useCallback(async (projectId: number) => {
    try {
      const response = await fetch(`/api/projects/delete/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const text = await response.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = text
      }

      if (!response.ok) {
        console.error('[useDeleteProject] delete failed, status:', response.status, 'body:', data)
        throw new Error(`Delete project failed: ${response.status} ${JSON.stringify(data)}`)
      }

      // Notificar al componente padre que el proyecto se eliminó
      onProjectDeleted?.(projectId)
      
      return data?.backendBody ?? data
    } catch (error) {
      console.error('[useDeleteProject] error:', error)
      throw error
    }
  }, [onProjectDeleted])

  return {
    deleteProject
  }
}
