export const USER_QUERIES = {
  login: () =>
    `http://localhost:8080/users/login`,
  register: () =>
    `http://localhost:8080/users/register`,
  getUser: () =>
    `http://localhost:8080/users/me`,
  updateUser: () =>
    `http://localhost:8080/users/update`,
};

export const USER_ERROR_MESSAGES = {
  login: 'Error en el login',
  register: 'Error en el registro',
  getUser: 'Error al obtener el usuario',
  updateUser: 'Error al actualizar el usuario',
};