import manageRequest from '@/domain/manageRequest';

const statisticsUseCases = {
  // A) Ganancias del último mes (proyectos TERMINADOS)
  getEarningsLastMonth: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'earningsLastMonth',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },

  // B) Ganancias del año actual (proyectos TERMINADOS en 2025)
  getEarningsThisYear: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'earningsThisYear',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },

  // C) Ganancias pendientes (proyectos EN_PROGRESO)
  getPendingEarnings: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'pendingEarnings',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },

  // D) Tasa de ganancia por hora (€/hora)
  getEarningsRate: (signal, values, token, headers) => {
    return manageRequest(
      signal,
      'earningsRate',
      values,
      'normal',
      'normal',
      'get',
      token,
      undefined,
      headers,
    );
  },
};

export default statisticsUseCases;
