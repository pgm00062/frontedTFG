import manageRequest from '@/domain/manageRequest';
import { API_BASE_URL } from '@/config/api';

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

            const url = `${API_BASE_URL}/invoices/update/${id}`;
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

};

export default InvoiceUseCases;