export const STATISTICS_QUERIES = {
  // Dinero ganado en el último mes (proyectos completados)
  monthlyEarnings: () =>
    `http://localhost:8080/projects/earnings-last-month`,
  
  // Dinero pendiente de proyectos en progreso
  pendingEarnings: () =>
    `http://localhost:8080/projects/pending-earnings`,

  // Tiempo trabajado por proyecto
  projectsTimeWorked: () =>
    `http://localhost:8080/statistics/projects-time-worked`,
  
  // Relación dinero ganado vs tiempo trabajado
  earningsVsTime: () =>
    `http://localhost:8080/statistics/earnings-vs-time`,
};

export const STATISTICS_ERROR_MESSAGES = {
  monthlyEarnings: 'Error al obtener las ganancias mensuales',
  pendingEarnings: 'Error al obtener las ganancias pendientes',
  projectsTimeWorked: 'Error al obtener el tiempo trabajado por proyecto',
  earningsVsTime: 'Error al obtener la relación dinero vs tiempo',
};
