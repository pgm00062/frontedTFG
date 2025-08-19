export interface getProjectIdProps { params: { id: string } }

export interface ProjectsListProps  { 
  page?: number
  size?: number
  searchTerm?: string
}

export interface ListParams  { page?: number; size?: number; signal?: AbortSignal }
export interface SearchParams  { name: string; page?: number; size?: number; signal?: AbortSignal }
export interface FetchOptions  { signal?: AbortSignal }

export interface ProjectsCreateProps {
  initialProjects: ProjectItem[] | null
  onCreate?: (values: unknown) => Promise<any>
}
