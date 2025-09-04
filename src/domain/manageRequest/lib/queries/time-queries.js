export const TIME_QUERIES = {
    startTime: () =>
    `http://localhost:8080/times/start`,
    endTime: () =>
    `http://localhost:8080/times/end`,
    getActiveSession: () =>
    `http://localhost:8080/times/active`,
    getProjectTotalTime: (projectId) =>
    `http://localhost:8080/times/project/${projectId}/total`,
    listTimeSessions: () =>
    `http://localhost:8080/times/list`,
    pauseTime: () =>
    `http://localhost:8080/times/pause`,
    resumeTime: () =>
    `http://localhost:8080/times/resume`,
    totalTimeDay: () =>
    `http://localhost:8080/times/total/day`
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