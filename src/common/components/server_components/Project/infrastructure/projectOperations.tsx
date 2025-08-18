import Service from '@/service/src'
import { cookies } from 'next/headers'
import type { ListParams, SearchParams, FetchOptions } from '../delivery/interface'

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