export const USER_QUERIES = {
  login: () =>
    `http://localhost:8080/users/login`,
  register: () =>
    `http://localhost:8080/users/register`,
  getUser: () =>
    `http://localhost:8080/users/me`,
  updateUser: () =>
    `http://localhost:8080/users/update`,
  changePassword: () =>
    `http://localhost:8080/users/me/password`,
  logout: () =>
    `http://localhost:8080/users/logout`,

  //projects

  createProject: () =>
    `http://localhost:8080/projects/create`,
  listProjects: () =>
    `http://localhost:8080/projects/list`,
  getProjectById: () =>
    `http://localhost:8080/projects`,
};

export const USER_ERROR_MESSAGES = {
  login: 'Error en el login',
  register: 'Error en el registro',
  getUser: 'Error al obtener el usuario',
  updateUser: 'Error al actualizar el usuario',
  changePassword: 'Error al cambiar la contraseña del usuario',
  logout: 'Error al cerrar sesión',
  createProject: 'Error al crear el proyecto',
};