export interface StatisticsData {
  monthlyEarnings: {
    total: number;
    projects: Array<{
      id: number;
      name: string;
      earnings: number;
      completedDate: string;
    }>;
  };
  pendingEarnings: {
    total: number;
    projects: Array<{
      id: number;
      name: string;
      estimatedEarnings: number;
      progress: number;
    }>;
  };
  timeWorked: Array<{
    projectId: number;
    projectName: string;
    totalHours: number;
    totalMinutes: number;
  }>;
  earningsVsTime: Array<{
    projectId: number;
    projectName: string;
    earnings: number;
    hoursWorked: number;
    earningsPerHour: number;
  }>;
}

export interface StatisticsClientProps {
  statisticsData: StatisticsData;
}
