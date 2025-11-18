import { API_BASE_URL } from '@/config/api';

export const USER_QUERIES = {
  login: () =>
    `${API_BASE_URL}/users/login`,
  register: () =>
    `${API_BASE_URL}/users/register`,
  getUser: () =>
    `${API_BASE_URL}/users/me`,
  updateUser: () =>
    `${API_BASE_URL}/users/update`,
  changePassword: () =>
    `${API_BASE_URL}/users/me/password`,
  logout: () =>
    `${API_BASE_URL}/users/logout`,

  //projects

  createProject: () =>
    `${API_BASE_URL}/projects/create`,
  listProjects: () =>
    `${API_BASE_URL}/projects/list`,
  getProjectById: () =>
    `${API_BASE_URL}/projects`,
  searchProjectsByName: () =>
    `${API_BASE_URL}/projects/searchName`,
  updateProjectStatus: (id) =>
    `${API_BASE_URL}/projects/status/${id}`,
  updateProject: (id) =>
    `${API_BASE_URL}/projects/update/${id}`,
  deleteProject: (id) =>
    `${API_BASE_URL}/projects/delete/${id}`,
  getLastThreeProjects: () =>
    `${API_BASE_URL}/projects/getLastThree`,

};

export const USER_ERROR_MESSAGES = {
  login: 'Error en el login',
  register: 'Error en el registro',
  getUser: 'Error al obtener el usuario',
  updateUser: 'Error al actualizar el usuario',
  changePassword: 'Error al cambiar la contraseña del usuario',
  logout: 'Error al cerrar sesión',
  createProject: 'Error al crear el proyecto',
  searchProjectsByName: 'Error al buscar proyectos por nombre',
  updateProjectStatus: 'Error al actualizar el estado del proyecto',
  updateProject: 'Error al actualizar el proyecto',
  deleteProject: 'Error al eliminar el proyecto',
  getLastThreeProjects: 'Error al obtener los últimos tres proyectos',
};