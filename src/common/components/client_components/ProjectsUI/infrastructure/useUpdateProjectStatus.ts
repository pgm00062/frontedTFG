'use client'
import { useCallback } from 'react'

interface UseUpdateProjectStatusProps {
  onStatusUpdated?: (projectId: number, newStatus: string) => void
}

export const useUpdateProjectStatus = ({ onStatusUpdated }: UseUpdateProjectStatusProps = {}) => {
  
  const updateProjectStatus = useCallback(async (projectId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/projects/status/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      })

      const text = await response.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        data = text
      }

      if (!response.ok) {
        console.error('[useUpdateProjectStatus] update failed, status:', response.status, 'body:', data)
        throw new Error(`Update project status failed: ${response.status} ${JSON.stringify(data)}`)
      }

      // Notificar al componente padre que el status se actualizó
      onStatusUpdated?.(projectId, newStatus)
      
      return data?.backendBody ?? data
    } catch (error) {
      console.error('[useUpdateProjectStatus] error:', error)
      throw error
    }
  }, [onStatusUpdated])

  return {
    updateProjectStatus
  }
}
