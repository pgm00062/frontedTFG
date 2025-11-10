// Interfaces para los DTOs del backend

export interface ProjectEarningsRate {
  projectId: number;
  projectName: string;
  budget: number;
  totalHours: number;
  earningsPerHour: number;
  status: 'TERMINADO' | 'EN_PROGRESO' | 'CANCELADO';
}

export interface EarningsRateResponse {
  averageEarningsPerHour: number;
  totalHours: number;
  totalBudget: number;
  totalProjects: number;
  projectRates: ProjectEarningsRate[];
}

// Interfaces para el frontend (adaptadas)

export interface StatisticsData {
  earningsLastMonth: number;
  earningsThisYear: number;
  pendingEarnings: number;
  earningsRate?: EarningsRateResponse;
}

export interface StatisticsClientProps {
  statisticsData: StatisticsData;
}
