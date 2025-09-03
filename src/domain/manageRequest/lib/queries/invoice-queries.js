export const INVOICE_QUERIES = {
  createInvoice: () =>
    `http://localhost:8080/invoices/create`,
  updateInvoice: (id) =>
    `http://localhost:8080/invoices/update/${id}`,
  listInvoices: () =>
    `http://localhost:8080/invoices/list`,
  getInvoice: () =>
    `http://localhost:8080/invoices`,
  deleteInvoice: (id) =>
    `http://localhost:8080/invoices/delete/${id}`
};

export const INVOICE_ERROR_QUERIES = {
    createInvoice: 'Error al crear una factura',
    updateInvoice: 'Error al actualizar la factura',
    listInvoices: 'Error al listar las facturas',
    getInvoice: 'Error al obtener la factura',
    deleteInvoice: 'Error al eliminar la factura'
};