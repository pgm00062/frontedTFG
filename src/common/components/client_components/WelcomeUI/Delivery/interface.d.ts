export interface ProfileMiniPreviewProps {
  user?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
}

export interface ProjectItem {
  id: number;
  name: string;
  title?: string; // Opcional, derivado de name
  description: string;
  status: 'EN_PROGRESO' | 'TERMINADO' | 'CANCELADO';
  type?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
}

export interface ProjectsMiniPreviewProps {
  projects: ProjectItem[];
}

export interface StatisticsPreviewData {
  monthlyEarnings: number;
  pendingEarnings: number;
  totalTimeWorked: string;
  avgEarningsPerHour: number;
}

export interface InvoiceItem {
  id: number;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  status: 'PENDIENTE' | 'PAGADA' | 'VENCIDA';
  projectName?: string;
}

export interface TimeEntry {
  id: number;
  projectName: string;
  totalTime: string;
  status: 'ACTIVO' | 'PAUSADO' | 'FINALIZADO';
  startTime?: string;
}

export interface GridProps {
  full?: boolean;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
  projectsPreview?: ProjectItem[];
  statisticsPreview?: StatisticsPreviewData;
  invoicesPreview?: InvoiceItem[];
  timePreview?: TimeEntry[];
  dailyTotalTime?: string;
}

export interface Props {
  index: number;
  className?: string;
  title: string;
  icon: string;
  onToggle: () => void;
  expanded: boolean;
  href?: string;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
  projectsPreview?: ProjectItem[];
  statisticsPreview?: StatisticsPreviewData;
  invoicesPreview?: InvoiceItem[];
  timePreview?: TimeEntry[];
  dailyTotalTime?: string;
}

export interface PropsGridFull {
  expanded: number | null;
  onToggle: (i: number) => void;
  userPreview?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    dni?: string;
  };
  projectsPreview?: ProjectItem[];
  statisticsPreview?: StatisticsPreviewData;
  invoicesPreview?: InvoiceItem[];
  timePreview?: TimeEntry[];
  dailyTotalTime?: string;
}