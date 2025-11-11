'use client'
import React from 'react'
import ProjectsList from './components/ProjectsList'
import ProjectSearch from './components/ProjectSearch'
import CreateProjectForm from './components/CreateProjectForm'
import { Button, Modal, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { ProjectsContainerProps } from './interface'
import useProjectsContainer, { useProjectsContainerWithServerAction } from '../infrastructure/ProjectsContainerOperation'
import { useProjectSearch } from '../infrastructure/useProjectSearch'

export default function ProjectsContainer({ initialProjects, searchTerm, onCreate, onSearchChange }: ProjectsContainerProps) {
  // Si viene onCreate (Server Action), usar el hook correspondiente
  // Si no, usar el hook con fetch directo
  const serverActionHook = useProjectsContainerWithServerAction(initialProjects, onCreate)
  const apiRouteHook = useProjectsContainer(initialProjects)
  const { searchProjects } = useProjectSearch()
  
  // Seleccionar el hook apropiado
  const { projects, open, setOpen, handleCreate } = onCreate ? serverActionHook : apiRouteHook

  // Función de búsqueda que usa onSearchChange si está disponible
  const handleSearch = onSearchChange || searchProjects;

  return (
    <div style={{ position: 'relative' }}>
      {/* Botón de Crear Proyecto centrado arriba */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          style={{
            borderRadius: 8,
            height: 44,
            padding: '0 32px',
            fontSize: 16,
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
          }}
        >
          Crear Nuevo Proyecto
        </Button>
      </div>
      
      {/* Search component */}
      <ProjectSearch onSearch={handleSearch} initialSearchTerm={searchTerm} />
      
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

      {/* Modal centrado en lugar de Drawer lateral */}
      <Modal 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PlusOutlined style={{ color: '#1890ff' }} />
            <span>Crear Nuevo Proyecto</span>
          </div>
        }
        open={open} 
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={600}
        destroyOnClose
      >
        <CreateProjectForm onCreate={handleCreate} />
      </Modal>
    </div>
  )
}