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
  searchTerm?: string;
}

export interface getProjectIdProps {
  project: ProjectItem;
}

export interface ProjectSearchProps {
  onSearch: (searchTerm: string) => Promise<any[]>
  initialSearchTerm?: string
}
