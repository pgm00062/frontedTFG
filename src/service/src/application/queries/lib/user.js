import manageRequest from '@/domain/manageRequest';
import { get } from 'http';

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
  searchProjectByName: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'searchProjectsByName',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
  updateStatusProject: async (signal, values, token, headers) => {
    const { id, status } = values;
    
    try {
      const fetchConfig = {
        signal,
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          ...(token
            ? (() => {
                const headerToken = token.startsWith('Bearer ')
                  ? token
                  : `Bearer ${token}`;
                return {
                  Authorization: headerToken,
                };
              })()
            : {}),
          ...headers,
        },
        credentials: 'include',
        body: JSON.stringify({ status }), // Status directo sin mapeo
      };

      const url = `http://localhost:8080/projects/status/${id}`;
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        console.error('[FETCH_ERROR]', response);
        const text = await response.text();
        throw new Error(`Error al actualizar el estado del proyecto: ${response.status} ${text}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[updateStatusProject] error:', error);
      throw error;
    }
  },
  updateProject: async (signal, values, token, headers) => {
    // Custom handler for updateProject because we need ID in URL and project data in body
    const { id, ...projectData } = values;
    
    try {
      const fetchConfig = {
        signal,
        method: 'PUT',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          ...(token
            ? (() => {
                const headerToken = token.startsWith('Bearer ')
                  ? token
                  : `Bearer ${token}`;
                return {
                  Authorization: headerToken,
                };
              })()
            : {}),
          ...headers,
        },
        credentials: 'include',
        body: JSON.stringify(projectData), // Project data without ID
      };

      const url = `http://localhost:8080/projects/update/${id}`;
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        console.error('[FETCH_ERROR]', response);
        const text = await response.text();
        throw new Error(`Error al actualizar el proyecto: ${response.status} ${text}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[updateProject] error:', error);
      throw error;
    }
  },
  deleteProject: async (signal, values, token, headers) => {
    // Custom handler for deleteProject because we need just ID in URL
    const { id } = values;
    
    try {
      const fetchConfig = {
        signal,
        method: 'DELETE',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          ...(token
            ? (() => {
                const headerToken = token.startsWith('Bearer ')
                  ? token
                  : `Bearer ${token}`;
                return {
                  Authorization: headerToken,
                };
              })()
            : {}),
          ...headers,
        },
        credentials: 'include',
      };

      const url = `http://localhost:8080/projects/delete/${id}`;
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        console.error('[FETCH_ERROR]', response);
        const text = await response.text();
        throw new Error(`Error al eliminar el proyecto: ${response.status} ${text}`);
      }

      // Para DELETE, el backend puede retornar vacío o un mensaje de confirmación
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
    } catch (error) {
      console.error('[deleteProject] error:', error);
      throw error;
    }
  },

  getLastThreeProjects: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'getLastThreeProjects',
      values,
      'url',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  }
};
export default userUseCases;