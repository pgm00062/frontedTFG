import { cookies } from 'next/headers';
import StatisticsClient from '@/common/components/client_components/StatisticsUI/Delivery/StatisticsClient';
import Service from '@/service/src';
import type { StatisticsData, EarningsRateResponse } from '@/common/components/client_components/StatisticsUI/Delivery/interface';

const Statistics = async () => {
  const cookieStore = cookies();
  const jsession = cookieStore.get('JSESSIONID')?.value;
  const authToken = cookieStore.get('AUTH_TOKEN')?.value;
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

  if (!authToken) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Necesitas iniciar sesión para ver las estadísticas</p>
      </div>
    );
  }

  try {
    const abort = new AbortController();

    // Realizar todas las llamadas en paralelo
    const results = await Promise.allSettled([
      // A) Ganancias del último mes
      Service.getCases('getEarningsLastMonth', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // B) Ganancias del año actual
      Service.getCases('getEarningsThisYear', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // C) Ganancias pendientes
      Service.getCases('getPendingEarnings', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),

      // D) Tasa de ganancia por hora
      Service.getCases('getEarningsRate', {
        signal: abort.signal,
        endPointData: {},
        token: authHeader || undefined,
        headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
      }),
    ]);

    // Extraer valores o usar defaults
    const earningsLastMonth = results[0].status === 'fulfilled' ? (results[0].value as number) : 0;
    const earningsThisYear = results[1].status === 'fulfilled' ? (results[1].value as number) : 0;
    const pendingEarnings = results[2].status === 'fulfilled' ? (results[2].value as number) : 0;
    const earningsRate = results[3].status === 'fulfilled' ? (results[3].value as EarningsRateResponse) : undefined;

    // Log de cada resultado individual
    console.log('💰 Ganancias último mes:', earningsLastMonth);
    console.log('💰 Ganancias año actual:', earningsThisYear);
    console.log('⏳ Ganancias pendientes:', pendingEarnings);
    console.log('📈 Tasa de ganancia:', earningsRate);

    // Log de errores si los hay
    const names = ['earningsLastMonth', 'earningsThisYear', 'pendingEarnings', 'earningsRate'];
    for (let index = 0; index < results.length; index++) {
      const result = results[index];
      if (result.status === 'rejected') {
        console.error(`❌ Error en ${names[index]}:`, result.reason);
      }
    }

    const statisticsData: StatisticsData = {
      earningsLastMonth,
      earningsThisYear,
      pendingEarnings,
      earningsRate,
    };

    console.log('📊 Statistics data obtenida:', statisticsData);

    return <StatisticsClient statisticsData={statisticsData} />;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error al cargar las estadísticas</p>
        <p className="text-sm text-gray-500 mt-2">{error instanceof Error ? error.message : 'Error desconocido'}</p>
      </div>
    );
  }
};

export default Statistics;