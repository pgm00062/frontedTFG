import { API_BASE_URL } from '@/config/api';

export const EXAMPLE_QUERIES = {
  updateCommerce: (values) =>
    `${API_BASE_URL}/updateComerce/${values.id}`,
   getComerces: () =>
    `${API_BASE_URL}/getCommerces`,
  
  
};


export const EXAMPLE_ERROR_MESSAGES = {
  exampleQuery:'error',
  getComerces:'No hay comercios'
}