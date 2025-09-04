import { useCallback } from 'react'

export function useProjectSearch() {
  const searchProjects = useCallback(async (searchTerm: string): Promise<void> => {
    // En el contexto del menú horizontal, no hacer nada
    // El manejo de la búsqueda se hace a través del onSearchChange
    console.log('Búsqueda básica para:', searchTerm);
  }, [])

  return { searchProjects }
}
