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
  onCreate?: (values: Record<string, any>) => Promise<any>
  onSearchChange?: (searchTerm: string) => Promise<void>
}

export interface getProjectIdProps {
  project: ProjectItem;
}

export interface ProjectSearchProps {
  onSearch: (searchTerm: string) => Promise<void>
  initialSearchTerm?: string
}

