export const USER_QUERIES = {
  login: () =>
    `http://localhost:8080/users/login`,
  register: () =>
    `http://localhost:8080/users/register`,
};

export const USER_ERROR_MESSAGES = {
  login: 'Error en el login',
  register: 'Error en el registro',
  invalidCredentials: 'Credenciales inválidas',
  emailExists: 'El email ya existe',
  userNotFound: 'Usuario no encontrado',
};
