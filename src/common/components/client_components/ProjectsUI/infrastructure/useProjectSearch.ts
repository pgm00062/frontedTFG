import { useCallback } from 'react'

export function useProjectSearch() {
  const searchProjects = useCallback(async (searchTerm: string, onSearchResults?: (results: any[]) => void) => {
    if (!searchTerm || searchTerm.trim() === '') {
      // Si no hay término, retornar array vacío para mostrar todos los proyectos
      if (onSearchResults) {
        onSearchResults([]);
      }
      return []
    }

    // En lugar de redirigir, devolvemos el término para que sea manejado localmente
    // El componente padre se encargará de hacer la búsqueda usando getProjectsAction
    return searchTerm.trim();
  }, [])

  return { searchProjects }
}
