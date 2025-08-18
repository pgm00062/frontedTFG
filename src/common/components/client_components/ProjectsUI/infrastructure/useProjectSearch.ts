import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function useProjectSearch() {
  const router = useRouter()

  const searchProjects = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === '') {
      // Limpiar search params si no hay término
      router.push('/projects')
      return []
    }

    // Actualizar URL con término de búsqueda
    router.push(`/projects?search=${encodeURIComponent(searchTerm.trim())}`)
    
    // Retornar empty array - la búsqueda real se hace en el server component
    return []
  }, [router])

  return { searchProjects }
}
