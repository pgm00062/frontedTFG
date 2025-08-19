'use client'
import React from 'react'
import { Card, List, Tag, Empty } from 'antd'
import { ProjectOutlined } from '@ant-design/icons'

interface ProjectItem {
  id: number
  name: string
  description: string
  status: 'EN_PROGRESO' | 'TERMINADO' | 'CANCELADO'
  type?: string
  startDate?: string
  endDate?: string
}

interface ProjectsMiniPreviewProps {
  projects: ProjectItem[]
}

const statusColors: Record<string, string> = {
  EN_PROGRESO: 'processing',
  TERMINADO: 'success',
  CANCELADO: 'error',
}

const statusLabels: Record<string, string> = {
  EN_PROGRESO: 'En progreso',
  TERMINADO: 'Terminado',
  CANCELADO: 'Cancelado',
}

const ProjectsMiniPreview: React.FC<ProjectsMiniPreviewProps> = ({ projects }) => {
  console.log('🎯 ProjectsMiniPreview recibió:', projects);
  console.log('🔢 Número de proyectos:', projects?.length || 0);
  
  // Mostrar solo los primeros 3 proyectos para la preview
  const previewProjects = projects.slice(0, 3)

  if (!projects || projects.length === 0) {
    console.log('⚠️ Mostrando empty state - No hay proyectos');
    return (
      <div className="projects-preview-outer">
        <Card className="profile-card" bordered={false} bodyStyle={{ padding: 0 }}>
          <div className="projects-preview-inner">
            <div style={{ padding: '12px' }}>
              <Empty 
                image={<ProjectOutlined style={{ fontSize: 32, color: '#d1d5db' }} />}
                description="No hay proyectos aún"
                style={{ margin: 0 }}
              />
            </div>
            <div className="profile-preview-welcome">
              ¡Crea tu primer proyecto!
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="projects-preview-outer">
      <Card className="profile-card" bordered={false} bodyStyle={{ padding: 0 }}>
        <div className="projects-preview-inner">
          <div style={{ padding: '12px' }}>
            <List
              size="small"
              dataSource={previewProjects}
              renderItem={(project) => (
                <List.Item style={{ padding: '8px 0', borderBottom: 'none' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: 4 
                    }}>
                      <span style={{ 
                        fontWeight: 600, 
                        color: '#374151',
                        fontSize: 13,
                        lineHeight: 1.2
                      }}>
                        {project.name}
                      </span>
                      <Tag 
                        color={statusColors[project.status]} 
                        style={{ fontSize: 10, lineHeight: 1, margin: 0 }}
                      >
                        {statusLabels[project.status]}
                      </Tag>
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: 11,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {project.description}
                    </div>
                    {project.type && (
                      <div style={{ 
                        color: '#9ca3af', 
                        fontSize: 10,
                        marginTop: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <ProjectOutlined />
                        {project.type}
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
            
            {projects.length > 3 && (
              <div style={{ 
                textAlign: 'center', 
                color: '#6b7280', 
                fontSize: 11,
                marginTop: 8,
                paddingTop: 8,
                borderTop: '1px solid #f3f4f6'
              }}>
                +{projects.length - 3} proyectos más
              </div>
            )}
          </div>

          <div className="profile-preview-welcome">
            {projects.length === 1 ? '1 proyecto' : `${projects.length} proyectos`}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProjectsMiniPreview
