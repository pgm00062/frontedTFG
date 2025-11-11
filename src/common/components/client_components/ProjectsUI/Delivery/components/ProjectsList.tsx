'use client'
import React, { useState, useEffect } from 'react'
import { Table, Empty, Modal, Button, message, Card, Tag, Row, Col, Divider } from 'antd'
import { 
  EditOutlined, 
  DeleteOutlined, 
  ProjectOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  FileTextOutlined,
  TagOutlined 
} from '@ant-design/icons'
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

const statusLabels: Record<string, string> = {
  EN_PROGRESO: 'En Progreso',
  TERMINADO: 'Terminado',
  CANCELADO: 'Cancelado',
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
      title: <span style={{ fontWeight: 700, fontSize: 14 }}>Nombre</span>,
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <button 
          style={{ 
            fontWeight: 600, 
            color: '#1890ff', 
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            font: 'inherit',
            textAlign: 'left',
            fontSize: 15,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0050b3';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#1890ff';
            e.currentTarget.style.textDecoration = 'none';
          }}
          onClick={() => openProjectModal(record)}
        >
          {record.name}
        </button>
      ),
    },
    
    {
      title: <span style={{ fontWeight: 700, fontSize: 14 }}>Descripción</span>,
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <div style={{ 
          color: '#475569', 
          maxWidth: 420, 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          fontSize: 14,
          lineHeight: 1.5
        }} title={text}>
          {text || <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>Sin descripción</span>}
        </div>
      ),
    },
    {
      title: <span style={{ fontWeight: 700, fontSize: 14 }}>Estado</span>,
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      width: 160,
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
      <div style={{
        background: '#ffffff',
        borderRadius: 12,
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb'
      }}>
        <Table
          dataSource={projectsList}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => (
              <span style={{ color: '#6b7280', fontSize: 14 }}>
                Total: <strong>{total}</strong> proyectos
              </span>
            ),
            style: { marginTop: 16 }
          }}
          size="middle"
          bordered={false}
          style={{ background: 'transparent' }}
          rowClassName={() => 'project-row'}
          onRow={(record) => ({
            style: {
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          })}
        />
      </div>

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setIsEditing(false)
          setDeleteModalOpen(false)
        }}
        footer={null}
        centered
        width={800}
        title={
          isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EditOutlined style={{ color: '#1890ff' }} />
              <span>Editar Proyecto</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ProjectOutlined style={{ color: '#1890ff' }} />
              <span>Detalles del Proyecto</span>
            </div>
          )
        }
      >
        {selectedProject?.error ? (
          <div style={{ padding: 16, color: '#ef4444' }}>
            Error al cargar el proyecto: {selectedProject.error}
          </div>
        ) : (
          selectedProject && (
            <>
              {!isEditing ? (
                // Vista de solo lectura mejorada
                <div style={{ padding: '8px 0' }}>
                  {/* Encabezado con nombre y estado */}
                  <div style={{ 
                    marginBottom: 24, 
                    paddingBottom: 16, 
                    borderBottom: '2px solid #f0f0f0' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: 12 
                    }}>
                      <h2 style={{ 
                        margin: 0, 
                        fontSize: 24, 
                        fontWeight: 700,
                        color: '#1f2937',
                        flex: 1
                      }}>
                        {selectedProject.name}
                      </h2>
                      <Tag 
                        color={statusColor[selectedProject.status]}
                        style={{ 
                          fontSize: 14,
                          padding: '4px 12px',
                          borderRadius: 6,
                          fontWeight: 600,
                          border: 'none',
                          background: statusBg[selectedProject.status],
                          color: statusColor[selectedProject.status]
                        }}
                      >
                        {statusLabels[selectedProject.status] || selectedProject.status}
                      </Tag>
                    </div>
                    
                    {/* Descripción */}
                    {selectedProject.description && (
                      <p style={{ 
                        color: '#6b7280', 
                        fontSize: 15,
                        lineHeight: 1.6,
                        margin: 0 
                      }}>
                        {selectedProject.description}
                      </p>
                    )}
                  </div>

                  {/* Información en cards */}
                  <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    {/* Tipo de Proyecto */}
                    {selectedProject.type && (
                      <Col span={12}>
                        <Card 
                          size="small" 
                          style={{ 
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: 8
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <TagOutlined style={{ fontSize: 20, color: '#6366f1' }} />
                            <div>
                              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>
                                Tipo
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>
                                {selectedProject.type}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    )}

                    {/* Presupuesto */}
                    {selectedProject.budget && (
                      <Col span={12}>
                        <Card 
                          size="small"
                          style={{ 
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: 8
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <DollarOutlined style={{ fontSize: 20, color: '#16a34a' }} />
                            <div>
                              <div style={{ fontSize: 12, color: '#15803d', marginBottom: 2 }}>
                                Presupuesto
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#14532d' }}>
                                {typeof selectedProject.budget === 'number' 
                                  ? `${selectedProject.budget.toLocaleString('es-ES')} €`
                                  : selectedProject.budget
                                }
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    )}

                    {/* Fecha de Inicio */}
                    {selectedProject.startDate && (
                      <Col span={12}>
                        <Card 
                          size="small"
                          style={{ 
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            borderRadius: 8
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <CalendarOutlined style={{ fontSize: 20, color: '#2563eb' }} />
                            <div>
                              <div style={{ fontSize: 12, color: '#1e40af', marginBottom: 2 }}>
                                Fecha de Inicio
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#1e3a8a' }}>
                                {new Date(selectedProject.startDate).toLocaleDateString('es-ES')}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    )}

                    {/* Fecha de Fin */}
                    {selectedProject.endDate && (
                      <Col span={12}>
                        <Card 
                          size="small"
                          style={{ 
                            background: '#fef3c7',
                            border: '1px solid #fde68a',
                            borderRadius: 8
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <CalendarOutlined style={{ fontSize: 20, color: '#d97706' }} />
                            <div>
                              <div style={{ fontSize: 12, color: '#b45309', marginBottom: 2 }}>
                                Fecha de Fin
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: '#92400e' }}>
                                {new Date(selectedProject.endDate).toLocaleDateString('es-ES')}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    )}
                  </Row>
                  
                  <Divider style={{ margin: '16px 0' }} />

                  {/* Botones en la parte inferior */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
                    {/* Botón eliminar en la esquina inferior izquierda */}
                    <Button 
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => setDeleteModalOpen(true)}
                      size="large"
                    >
                      Eliminar Proyecto
                    </Button>
                    
                    {/* Botón editar en la esquina inferior derecha */}
                    <Button 
                      type="primary" 
                      icon={<EditOutlined />}
                      onClick={() => setIsEditing(true)}
                      size="large"
                    >
                      Actualizar Datos
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

