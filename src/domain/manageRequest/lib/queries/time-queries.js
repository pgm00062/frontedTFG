import { API_BASE_URL } from '@/config/api';

export const TIME_QUERIES = {
  startTime: () =>
    `${API_BASE_URL}/times/start`,
  endTime: () =>
    `${API_BASE_URL}/times/end`,
  getActiveSession: () =>
    `${API_BASE_URL}/times/active`,
  getProjectTotalTime: (projectId) =>
    `${API_BASE_URL}/times/project/${projectId}/total`,
  listTimeSessions: () =>
    `${API_BASE_URL}/times/list`,
  pauseTime: () =>
    `${API_BASE_URL}/times/pause`,
  resumeTime: () =>
    `${API_BASE_URL}/times/resume`,
  getTotalTimeDay: () =>
    `${API_BASE_URL}/times/total/day`
};

export const TIME_ERROR_MESSAGES = {
  startTime: 'Error al iniciar el tiempo',
  endTime: 'Error al finalizar el tiempo',
  getActiveSession: 'Error al obtener la sesión activa',
  getProjectTotalTime: 'Error al obtener el tiempo total del proyecto',
  listTimeSessions: 'Error al obtener las sesiones de tiempo',
  pauseTime: 'Error al pausar el tiempo',
  resumeTime: 'Error al reanudar el tiempo',
  totalTimeDay: 'Error al obtener el tiempo total del día'
};