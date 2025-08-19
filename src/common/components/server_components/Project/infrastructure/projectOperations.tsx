import Service from '@/service/src'
import { cookies } from 'next/headers'
import type { ListParams, SearchParams, FetchOptions } from '../delivery/interface'

/**
 * Crea un nuevo proyecto en el backend.
 * @param payload - Los datos del proyecto a crear.
 * @returns La respuesta del backend o un error.
 */
export async function createProject(payload: Record<string, any>): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  // Ajusta el case name si tu Service usa otro identificador para la acción de creación
  const raw = await Service.getCases('createProject', {
    endPointData: payload,
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  // Si tu backend devuelve un wrapper, extrae backendBody o devuelve raw directamente
  return (raw as any)?.backendBody ?? raw
}

/**
 * Lista proyectos desde el backend y normaliza la respuesta.
 */
export async function listProjects({ page = 0, size = 10, signal }: ListParams = {}): Promise<any[]> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('listProjects', {
    signal,
    endPointData: { page, size },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return Array.isArray(raw) ? raw : (raw as any)?.content || []
}

/**
 * Busca proyectos por nombre desde el backend y normaliza la respuesta.
 */
export async function searchProjectsByName({ name, page = 0, size = 10, signal }: SearchParams): Promise<any[]> {
  if (!name || name.trim() === '') return []

  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('searchProjectByName', {
    signal,
    endPointData: { name: name.trim(), page, size },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  // El backend retorna un Page<ProjectOutputDto>, así que extraemos el content
  let result: any[] = []
  
  if (Array.isArray(raw)) {
    result = raw
  } else if (raw && typeof raw === 'object') {
    // Si es un objeto Page, extraer content
    result = (raw as any).content || []
  } else {
    result = []
  }
  
  return result
}

/**
 * Obtiene un proyecto por id y normaliza la respuesta.
 */
export async function getProjectById(id: string, { signal }: FetchOptions = {}): Promise<any | null> {
  if (!id) return null

  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('getProjectById', {
    signal,
    endPointData: { id },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw ?? null
}

/**
 * Actualiza el estado de un proyecto en el backend.
 * @param projectId - El ID del proyecto a actualizar.
 * @param status - El nuevo estado del proyecto.
 * @returns La respuesta del backend o un error.
 */
export async function updateProjectStatus(projectId: number, status: string): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  // Necesitamos hacer una llamada especial porque necesitamos el ID en la URL y el status en el body
  const raw = await Service.getCases('updateStatusProject', {
    endPointData: { id: projectId, status },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}

/**
 * Actualiza un proyecto completo en el backend.
 * @param projectId - El ID del proyecto a actualizar.
 * @param projectData - Los datos del proyecto a actualizar.
 * @returns La respuesta del backend o un error.
 */
export async function updateProject(projectId: number, projectData: Record<string, any>): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('updateProject', {
    endPointData: { id: projectId, ...projectData },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}

/**
 * Elimina un proyecto en el backend.
 * @param projectId - El ID del proyecto a eliminar.
 * @returns La respuesta del backend o un error.
 */
export async function deleteProject(projectId: number): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('deleteProject', {
    endPointData: { id: projectId },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}
