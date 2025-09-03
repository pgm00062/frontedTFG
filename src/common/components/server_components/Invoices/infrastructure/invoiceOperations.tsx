import Service from '@/service/src'
import { cookies } from 'next/headers'

/**
 * Lista las facturas del usuario autenticado desde el backend
 */
export async function listInvoices({ page = 0, size = 10, signal }: { page?: number; size?: number; signal?: AbortSignal } = {}): Promise<any[]> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('listInvoices', {
    signal,
    endPointData: { page, size },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return Array.isArray(raw) ? raw : (raw as any)?.content || []
}

/**
 * Obtiene una factura por ID
 */
export async function getInvoiceById(id: string | number, { signal }: { signal?: AbortSignal } = {}): Promise<any | null> {
  if (!id) return null

  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('getInvoice', {
    signal,
    endPointData: { id },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw ?? null
}

/**
 * Crea una nueva factura
 */
export async function createInvoice(invoiceData: Record<string, any>): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('createInvoice', {
    endPointData: invoiceData,
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}

/**
 * Actualiza una factura existente
 */
export async function updateInvoice(invoiceId: number, invoiceData: Record<string, any>): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('updateInvoice', {
    endPointData: { id: invoiceId, ...invoiceData },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}

/**
 * Elimina una factura
 */
export async function deleteInvoice(invoiceId: number): Promise<any> {
  const cookieStore = cookies()
  const jsession = cookieStore.get('JSESSIONID')?.value
  const authToken = cookieStore.get('AUTH_TOKEN')?.value
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

  const raw = await Service.getCases('deleteInvoice', {
    endPointData: { id: invoiceId },
    token: authHeader || undefined,
    headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
  })

  return (raw as any)?.backendBody ?? raw
}
