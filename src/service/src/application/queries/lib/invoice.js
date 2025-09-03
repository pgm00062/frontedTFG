import manageRequest from '@/domain/manageRequest';

const InvoiceUseCases = {
    createInvoice: (signal, values, token, headers) => {
        return manageRequest(
            signal,
            'createInvoice',
            values,
            'body',
            'normal',
            'post',
            token,
            'no-store',
            headers,
        );
    },

    updateInvoice: async (signal, values, token, headers) => {
        // Custom handler for updateInvoice because we need ID in URL and invoice data in body
        const { id, ...invoiceData } = values;
        
        try {
            const fetchConfig = {
                signal,
                method: 'PUT',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token
                        ? (() => {
                            const headerToken = token.startsWith('Bearer ')
                                ? token
                                : `Bearer ${token}`;
                            return {
                                Authorization: headerToken,
                            };
                        })()
                        : {}),
                    ...headers,
                },
                credentials: 'include',
                body: JSON.stringify(invoiceData), // Invoice data without ID
            };

            const url = `http://localhost:8080/invoices/update/${id}`;
            const response = await fetch(url, fetchConfig);

            if (!response.ok) {
                console.error('[FETCH_ERROR]', response);
                const text = await response.text();
                throw new Error(`Error al actualizar la factura: ${response.status} ${text}`);
            }

            return await response.json();
        } catch (error) {
            console.error('[updateInvoice] error:', error);
            throw error;
        }
    },

    listInvoices: (signal, values, token, headers) => {
        return manageRequest(
            signal,
            'listInvoices',
            values,
            'query',
            'normal',
            'get',
            token,
            'no-store',
            headers,
        );
    },

    getInvoice: (signal, values, token, headers) => {
        return manageRequest(
            signal,
            'getInvoice',
            values,
            'url',
            'normal',
            'get',
            token,
            'no-store',
            headers,
        );
    },

    deleteInvoice: async (signal, values, token, headers) => {
        // Custom handler for deleteInvoice with ID in URL
        const id = values;
        
        try {
            const fetchConfig = {
                signal,
                method: 'DELETE',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token
                        ? (() => {
                            const headerToken = token.startsWith('Bearer ')
                                ? token
                                : `Bearer ${token}`;
                            return {
                                Authorization: headerToken,
                            };
                        })()
                        : {}),
                    ...headers,
                },
                credentials: 'include',
            };

            const url = `http://localhost:8080/invoices/delete/${id}`;
            const response = await fetch(url, fetchConfig);

            if (!response.ok) {
                console.error('[FETCH_ERROR]', response);
                const text = await response.text();
                throw new Error(`Error al eliminar la factura: ${response.status} ${text}`);
            }

            // Para DELETE que retorna 204, no hay contenido
            return { success: true };
        } catch (error) {
            console.error('[deleteInvoice] error:', error);
            throw error;
        }
    },

};

export default InvoiceUseCases;