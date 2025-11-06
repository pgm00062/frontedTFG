export interface TimeSession {
  id: number;
  startTime: string;
  endTime?: string;
  projectId: number;
  userId: number;
  isActive: boolean;
  isPaused?: boolean;
  description?: string;
}

export interface ProjectTotalTimeData {
  projectId: number;
  projectName: string;
  userId: number;
  userName: string;
  totalDuration: string;
  totalMinutes: number;
  totalHours: number;
  formattedTotalTime: string;
  totalSessions: number;
  averageSessionTime: number;
  lastSessionDate?: string;
}

export interface ProjectTimeInfo {
  projectId: number;
  projectName: string;
  activeSession?: TimeSession;
  totalTime: number; // En segundos (deprecado, usar totalTimeData)
  totalTimeData?: ProjectTotalTimeData; // Datos completos del tiempo total
}

export interface TimeStartRequest {
  projectId: number;
  description?: string;
}

export interface TimeClientProps {
  projects: ProjectTimeInfo[];
}

export interface ProjectTimeControlProps {
  project: ProjectTimeInfo;
  loading?: boolean;
  onStartTime: (projectId: number, description?: string) => void;
  onStopTime: () => void;
  onResumeTime: () => void;
  onCompleteTime: (sessionId: number) => void;
}

export interface TimeControlButtonsProps {
  project: ProjectTimeInfo;
  onStartTime: (projectId: number, description?: string) => void;
  onStopTime: () => void;
  onResumeTime: () => void;
  onCompleteTime: (sessionId: number) => void;
}

export interface TimerDisplayProps {
  isActive: boolean;
  startTime?: string;
  totalTime: number; // En segundos
}
