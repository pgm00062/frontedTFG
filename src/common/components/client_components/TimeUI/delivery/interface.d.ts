export interface TimeSession {
  id: number;
  startTime: string;
  endTime?: string;
  projectId: number;
  userId: number;
  isActive: boolean;
  description?: string;
}

export interface ProjectTimeInfo {
  projectId: number;
  projectName: string;
  activeSession?: TimeSession;
  totalTime: number; // En segundos
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
  onStopTime: (sessionId: number) => void;
  onCompleteTime: (sessionId: number) => void;
}

export interface TimeControlButtonsProps {
  project: ProjectTimeInfo;
  onStartTime: (projectId: number, description?: string) => void;
  onStopTime: (sessionId: number) => void;
  onCompleteTime: (sessionId: number) => void;
}

export interface TimerDisplayProps {
  isActive: boolean;
  startTime?: string;
  totalTime: number; // En segundos
}
