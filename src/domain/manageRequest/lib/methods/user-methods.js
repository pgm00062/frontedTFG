export const USER_METHODS = {
  login: (response) => {
    // Guardar el token en localStorage o cookies
    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },
  
  register: (response) => {
    // Guardar el token en localStorage o cookies si viene en la respuesta
    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },
};
