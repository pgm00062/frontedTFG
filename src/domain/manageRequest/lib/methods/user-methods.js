export const USER_METHODS = {
  login: (response) => {
    // Exponer headers para que una API Route pueda leer Set-Cookie si fuera necesario
    return { data: response.data, headers: response.headers };
  },
  
  register: (response) => {
    return response.data;
  },

  getUser: (response) => {
    return response.data;
  },

  updateUser: (response) => {
    return response.data;
  },

  changePassword: (response) => {
    return response.data;
  },

  logout: (response) => {
    return response.data;
  },

  //projects

  createProject: (response) => {
    return response.data;
  },
  listProjects: (response) => {
    return response.data;
  },
  getProjectById: (response) => {
    return response.data;
  },
  searchProjectsByName: (response) => {
    return response.data;
  },
  updateProjectStatus: (response) => {
    return response.data;
  },
  updateProject: (response) => {
    return response.data;
  },
  deleteProject: (response) => {
    return response.data;
  },

  //TIME
  startTime: (response) => {
    return response.data;
  },

};