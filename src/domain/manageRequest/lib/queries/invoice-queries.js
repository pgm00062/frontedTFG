import { API_BASE_URL } from '@/config/api';

export const INVOICE_QUERIES = {
  createInvoice: () =>
    `${API_BASE_URL}/invoices/create`,
  updateInvoice: (id) =>
    `${API_BASE_URL}/invoices/update/${id}`,
  listInvoices: () =>
    `${API_BASE_URL}/invoices/list`,
  getInvoiceById: () =>
    `${API_BASE_URL}/invoices`,
  deleteInvoice: (id) =>
    `${API_BASE_URL}/invoices/delete/${id}`
};

export const INVOICE_ERROR_QUERIES = {
    createInvoice: 'Error al crear una factura',
    updateInvoice: 'Error al actualizar la factura',
    listInvoices: 'Error al listar las facturas',
    getInvoice: 'Error al obtener la factura',
    deleteInvoice: 'Error al eliminar la factura'
};