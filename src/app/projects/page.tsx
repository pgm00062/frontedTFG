import { ProjectsListServer } from '@/common/components/server_components/Project/delivery'

type Props = {
  searchParams: { search?: string }
}

export default function ProjectsPage({ searchParams }: Props) {
  const searchTerm = searchParams.search

  return (
    <main className="page-container">
      <ProjectsListServer searchTerm={searchTerm} />
    </main>
  )
}