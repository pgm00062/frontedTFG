export const EXAMPLE_QUERIES = {
  updateCommerce: (values) =>
    `http://localhost:8080/updateComerce/${values.id}`,
   getComerces: () =>
    `http://localhost:8080/getCommerces`,
  
  
};


export const EXAMPLE_ERROR_MESSAGES = {
  exampleQuery:'error',
  getComerces:'No hay comercios'
}