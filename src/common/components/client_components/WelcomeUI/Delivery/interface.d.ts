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
}