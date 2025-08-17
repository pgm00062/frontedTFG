export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  status: 'EN_PROGRESO' | 'TERMINADO' | 'CANCELADO';
}

export interface ProjectsListProps {
  projects: ProjectItem[];
}

export interface ProjectsContainerProps {
  initialProjects: ProjectItem[] | null;
}
