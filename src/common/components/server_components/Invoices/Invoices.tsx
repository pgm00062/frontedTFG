import { InvoicesClient } from '@/common/components/client_components/InvoicesUI/Delivery'
import { listInvoices } from './infrastructure/invoiceOperations'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function InvoicesServer() {
  const abort = new AbortController()
  let invoices: any[] = []
  let projects: any[] = []

  try {
    // Obtener facturas
    invoices = await listInvoices({ page: 0, size: 50, signal: abort.signal })
    
    // Obtener proyectos para el dropdown
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const projectsData = await Service.getCases('listProjects', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    }) as any

    if (projectsData?.content && Array.isArray(projectsData.content)) {
      projects = projectsData.content.map((project: any) => ({
        id: project.id,
        name: project.name
      }))
    }
  } catch (e) {
    console.error('InvoicesServer error', e)
    invoices = []
    projects = []
  }

  return <InvoicesClient initialInvoices={invoices} projects={projects} />
}
