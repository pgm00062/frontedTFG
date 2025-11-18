import { API_BASE_URL } from '@/config/api';

export const STATISTICS_QUERIES = {
  // A) Ganancias del último mes (proyectos TERMINADOS)
  earningsLastMonth: () =>
    `${API_BASE_URL}/projects/earnings-last-month`,
  
  // B) Ganancias del año actual (proyectos TERMINADOS en 2025)
  earningsThisYear: () =>
    `${API_BASE_URL}/projects/earnings-this-year`,
  
  // C) Ganancias pendientes (proyectos EN_PROGRESO)
  pendingEarnings: () =>
    `${API_BASE_URL}/projects/pending-earnings`,

  // D) Tasa de ganancia por hora (€/hora)
  earningsRate: () =>
    `${API_BASE_URL}/projects/earnings-rate`,
};

export const STATISTICS_ERROR_MESSAGES = {
  earningsLastMonth: 'Error al obtener las ganancias del último mes',
  earningsThisYear: 'Error al obtener las ganancias del año',
  pendingEarnings: 'Error al obtener las ganancias pendientes',
  earningsRate: 'Error al obtener la tasa de ganancia por hora',
};
