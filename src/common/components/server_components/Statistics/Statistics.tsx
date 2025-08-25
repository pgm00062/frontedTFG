import { cookies } from 'next/headers';
import StatisticsClient from '@/common/components/client_components/StatisticsUI/Delivery/StatisticsClient';

// TODO: Importar los métodos del service cuando estén disponibles
// import { getMonthlyEarnings, getPendingEarnings, getProjectsTimeWorked, getEarningsVsTime } from '@/service/src/statistics';

const Statistics = async () => {
  const cookieStore = await cookies();
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
    // TODO: Implementar cuando tengamos los endpoints
    // const [monthlyEarnings, pendingEarnings, timeWorked, earningsVsTime] = await Promise.all([
    //   getMonthlyEarnings(authToken),
    //   getPendingEarnings(authToken),
    //   getProjectsTimeWorked(authToken),
    //   getEarningsVsTime(authToken)
    // ]);

    // Datos placeholder mientras desarrollamos los endpoints
    const statisticsData = {
      monthlyEarnings: {
        total: 2500.75,
        projects: [
          { id: 1, name: "Proyecto Web E-commerce", earnings: 1500.50, completedDate: "2025-08-15" },
          { id: 2, name: "App Móvil Cliente", earnings: 1000.25, completedDate: "2025-08-20" }
        ]
      },
      pendingEarnings: {
        total: 3200.00,
        projects: [
          { id: 3, name: "Sistema de Gestión", estimatedEarnings: 2000.00, progress: 65 },
          { id: 4, name: "Landing Page", estimatedEarnings: 1200.00, progress: 30 }
        ]
      },
      timeWorked: [
        { projectId: 1, projectName: "Proyecto Web E-commerce", totalHours: 120, totalMinutes: 30 },
        { projectId: 2, projectName: "App Móvil Cliente", totalHours: 85, totalMinutes: 45 },
        { projectId: 3, projectName: "Sistema de Gestión", totalHours: 95, totalMinutes: 15 }
      ],
      earningsVsTime: [
        { projectId: 1, projectName: "Proyecto Web E-commerce", earnings: 1500.50, hoursWorked: 120.5, earningsPerHour: 12.45 },
        { projectId: 2, projectName: "App Móvil Cliente", earnings: 1000.25, hoursWorked: 85.75, earningsPerHour: 11.67 },
        { projectId: 3, projectName: "Sistema de Gestión", earnings: 0, hoursWorked: 95.25, earningsPerHour: 0 }
      ]
    };

    return <StatisticsClient statisticsData={statisticsData} />;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error al cargar las estadísticas</p>
      </div>
    );
  }
};

export default Statistics;