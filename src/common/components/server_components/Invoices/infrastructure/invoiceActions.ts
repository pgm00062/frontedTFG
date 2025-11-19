'use server'

import Service from '@/service/src'
import { cookies } from 'next/headers'

/**
 * Server Action para crear una nueva factura
 */
export async function createInvoiceAction(formData: any) {
  try {
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const result = await Service.getCases('createInvoice', {
      endPointData: formData,
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Error creating invoice:', error)
    return {
      success: false,
      error: 'Error al crear la factura'
    }
  }
}

/**
 * Server Action para actualizar una factura
 */
export async function updateInvoiceAction(invoiceId: number, formData: any) {
  try {
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const result = await Service.getCases('updateInvoice', {
      endPointData: { id: invoiceId, ...formData },
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Error updating invoice:', error)
    return {
      success: false,
      error: 'Error al actualizar la factura'
    }
  }
}

/**
 * Server Action para obtener una factura por ID
 */
export async function getInvoiceAction(invoiceId: number) {
  try {
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const result = await Service.getCases('getInvoice', {
      endPointData: { id: invoiceId },
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Error getting invoice:', error)
    return {
      success: false,
      error: 'Error al obtener la factura'
    }
  }
}

/**
 * Server Action para listar facturas
 */
export async function listInvoicesAction() {
  try {
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const result = await Service.getCases('listInvoices', {
      endPointData: { page: 0, size: 50 },
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })

    return {
      success: true,
      data: Array.isArray(result) ? result : (result as any)?.content || []
    }
  } catch (error) {
    console.error('Error listing invoices:', error)
    return {
      success: false,
      error: 'Error al obtener las facturas',
      data: []
    }
  }
}
