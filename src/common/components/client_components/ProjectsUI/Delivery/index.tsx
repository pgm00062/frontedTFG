'use client'
import React from 'react'
import ProjectsList from './components/ProjectsList'
import ProjectSearch from './components/ProjectSearch'
import CreateProjectForm from './components/CreateProjectForm'
import { Button, Drawer, Divider } from 'antd'
import type { ProjectsContainerProps } from './interface'
import useProjectsContainer, { useProjectsContainerWithServerAction } from '../infrastructure/ProjectsContainerOperation'
import { useProjectSearch } from '../infrastructure/useProjectSearch'

export default function ProjectsContainer({ initialProjects, searchTerm, onCreate }: ProjectsContainerProps) {
  // Si viene onCreate (Server Action), usar el hook correspondiente
  // Si no, usar el hook con fetch directo
  const serverActionHook = useProjectsContainerWithServerAction(initialProjects, onCreate)
  const apiRouteHook = useProjectsContainer(initialProjects)
  const { searchProjects } = useProjectSearch()
  
  // Seleccionar el hook apropiado
  const { projects, open, setOpen, handleCreate } = onCreate ? serverActionHook : apiRouteHook

  return (
    <div style={{ position: 'relative', paddingTop: 56 }}>
      {/* fixed button top-right */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <Button type="primary" onClick={() => setOpen(true)}>Crear proyecto</Button>
      </div>
      
      {/* Search component */}
      <ProjectSearch onSearch={searchProjects} initialSearchTerm={searchTerm} />
      
      <Divider style={{ margin: '16px 0' }} />
      
      {/* Projects list */}
      <div>
        {searchTerm ? (
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: '#6b7280', fontSize: 14 }}>
              {projects.length > 0 
                ? `Resultados para "${searchTerm}": ${projects.length} proyectos encontrados`
                : `No se encontraron proyectos con el nombre "${searchTerm}"`
              }
            </span>
          </div>
        ) : null}
        <ProjectsList projects={projects} />
      </div>

      <Drawer title="Crear proyecto" placement="right" onClose={() => setOpen(false)} open={open} width={480}>
        <CreateProjectForm onCreate={handleCreate} />
      </Drawer>
    </div>
  )
}