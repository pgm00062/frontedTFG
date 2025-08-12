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
  
};
export default userUseCases;