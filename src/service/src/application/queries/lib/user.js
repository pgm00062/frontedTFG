import manageRequest from '@/domain/manageRequest';

const userUseCases = {
  login: (signal, values, token) => {
    return manageRequest(
      signal,
      'login',
      values,
      'body',
      'normal',
      'post',
      token,
      undefined,
    );
  },

  register: (signal, values, token) => {
    return manageRequest(
      signal,
      'register',
      values,
      'body',
      'normal',
      'post',
      token,
      undefined,
    );
  },
  
  getUser: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'getUser',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },

  updateUser: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'updateUser',
      values,
      'body',
      'normal',
      'put',
      token,
      undefined,
      headers,
    );
  },

  changePassword: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'changePassword',
      values,
      'body',
      'normal',
      'put',
      token,
      undefined,
      headers,
    );
  },

  logout: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'logout',
      values,
      'normal',
      'normal',
      'post',
      token,
      undefined,
      headers,
    );
  },

  //projects

  createProject: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'createProject',
      values,
      'body',
      'normal',
      'post',
      token,
      undefined,
      headers,
    );
  },
  listProjects: (signal, values, token, headers) => {
    // values can include { page, size }
    return manageRequest(
      signal,
      'listProjects',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
  getProjectById: (signal, values, token, headers) => {
    // values expected to be the id
    return manageRequest(
      signal,
      'getProjectById',
      values,
      'url',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
};
export default userUseCases;