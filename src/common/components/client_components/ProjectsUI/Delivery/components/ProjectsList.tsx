'use client'
import React, { useState, useEffect } from 'react'
import { Table, Empty, Modal, Button, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ProjectsListProps } from '../interface'
import StatusSelector from './StatusSelector'
import EditProjectForm from './EditProjectForm'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { useUpdateProjectStatus } from '../../infrastructure/useUpdateProjectStatus'
import { useUpdateProject } from '../../infrastructure/useUpdateProject'
import { useDeleteProject } from '../../infrastructure/useDeleteProject'

const statusColor: Record<string, string> = {
  EN_PROGRESO: '#2f86eb', // soft blue
  TERMINADO: '#22c55e', // soft green
  CANCELADO: '#ef4444', // soft red
}

const statusBg: Record<string, string> = {
  EN_PROGRESO: 'rgba(47,134,235,0.08)',
  TERMINADO: 'rgba(34,197,94,0.08)',
  CANCELADO: 'rgba(239,68,68,0.08)',
}

export default function ProjectsList({ projects }: Readonly<ProjectsListProps>) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [projectsList, setProjectsList] = useState(projects || [])

  // Sincronizar cuando cambien los props (ej: búsqueda)
  useEffect(() => {
    setProjectsList(projects || [])
  }, [projects])

  const { updateProjectStatus } = useUpdateProjectStatus({
    onStatusUpdated: (projectId, newStatus) => {
      // Actualizar la lista local inmediatamente
      setProjectsList(prev => 
        prev.map(project => 
          project.id === projectId 
            ? { ...project, status: newStatus as 'EN_PROGRESO' | 'TERMINADO' | 'CANCELADO' }
            : project
        )
      )
      
      // Si el modal está abierto y es el mismo proyecto, actualizar también
      if (selectedProject?.id === projectId) {
        setSelectedProject((prev: any) => ({ ...prev, status: newStatus }))
      }
    }
  })

  const { updateProject } = useUpdateProject({
    onProjectUpdated: (projectId, updatedProject) => {
      // Actualizar la lista local inmediatamente
      setProjectsList(prev => 
        prev.map(project => 
          project.id === projectId ? updatedProject : project
        )
      )
      
      // Actualizar el proyecto seleccionado
      setSelectedProject(updatedProject)
      setIsEditing(false)
    }
  })

  const { deleteProject } = useDeleteProject({
    onProjectDeleted: (projectId) => {
      // Eliminar el proyecto de la lista local inmediatamente
      setProjectsList(prev => 
        prev.filter(project => project.id !== projectId)
      )
      
      // Cerrar el modal si está abierto
      setModalOpen(false)
      setDeleteModalOpen(false)
      setIsEditing(false)
      setSelectedProject(null)
      
      message.success('Proyecto eliminado correctamente')
    }
  })

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsEditing(false)
    setModalOpen(true)
  }

  const handleEditProject = async (projectData: any) => {
    if (selectedProject) {
      await updateProject(selectedProject.id, projectData)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleDeleteProject = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id)
    }
  }
  
  if (!projectsList || projectsList.length === 0) {
    return <Empty description="No hay proyectos aún" />
  }

  const columns = [
    
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <button 
          style={{ 
            fontWeight: 600, 
            color: '#0f172a', 
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            font: 'inherit',
            textAlign: 'left'
          }}
          onClick={() => openProjectModal(record)}
        >
          {record.name}
        </button>
      ),
    },
    
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <div style={{ color: '#475569', maxWidth: 420, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={text}>
          {text}
        </div>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      width: 140,
      render: (_: string, record: any) => (
        <StatusSelector 
          project={record} 
          onStatusChange={updateProjectStatus}
        />
      ),
    },
  ]

  return (
    <>
      <Table
        dataSource={projectsList}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="middle"
        bordered={false}
        style={{ background: 'transparent' }}
        rowClassName={() => 'project-row'}
      />

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setIsEditing(false)
          setDeleteModalOpen(false)
        }}
        footer={null}
        centered
        width={720}
        title={isEditing ? "Editar Proyecto" : "Detalles del Proyecto"}
      >
        {selectedProject?.error ? (
          <div style={{ padding: 16, color: '#ef4444' }}>
            Error al cargar el proyecto: {selectedProject.error}
          </div>
        ) : (
          selectedProject && (
            <>
              {!isEditing ? (
                // Vista de solo lectura
                <div style={{ padding: 16 }}>
                  <h3 style={{ marginTop: 0, marginBottom: 16 }}>{selectedProject.name}</h3>
                  <p style={{ color: '#475569', marginBottom: 16 }}>{selectedProject.description}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div><strong>Estado:</strong> {selectedProject.status}</div>
                    {selectedProject.type && <div><strong>Tipo:</strong> {selectedProject.type}</div>}
                    {selectedProject.startDate && <div><strong>Inicio:</strong> {selectedProject.startDate}</div>}
                    {selectedProject.endDate && <div><strong>Fin:</strong> {selectedProject.endDate}</div>}
                    {selectedProject.budget && <div><strong>Presupuesto:</strong> {selectedProject.budget}</div>}
                  </div>
                  
                  {/* Botones en la parte inferior */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                    {/* Botón eliminar en la esquina inferior izquierda */}
                    <Button 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => setDeleteModalOpen(true)}
                    >
                      Eliminar proyecto
                    </Button>
                    
                    {/* Botón editar en la esquina inferior derecha */}
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                      onClick={() => setIsEditing(true)}
                    >
                      Actualizar datos
                    </Button>
                  </div>
                </div>
              ) : (
                // Vista de edición
                <div style={{ padding: 16 }}>
                  <EditProjectForm
                    project={selectedProject}
                    onSave={handleEditProject}
                    onCancel={handleCancelEdit}
                  />
                </div>
              )}
            </>
          )
        )}
      </Modal>

      <DeleteConfirmationModal
        project={selectedProject}
        open={deleteModalOpen}
        onConfirm={handleDeleteProject}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  )
}

