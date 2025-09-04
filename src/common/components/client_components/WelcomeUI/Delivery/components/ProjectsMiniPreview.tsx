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
  
  const previewProjects = projects.slice(0, 3)

  if (!projects || projects.length === 0) {
    console.log('⚠️ Mostrando empty state - No hay proyectos');
    return (
      <div className="projects-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="projects-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty 
                image={<ProjectOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
                description="No hay proyectos aún"
                style={{ margin: 0 }}
              />
            </div>
            <div className="profile-preview-welcome" style={{ 
              marginTop: '16px',
              padding: '12px',
              textAlign: 'center',
              borderTop: '1px solid #f0f0f0',
              backgroundColor: '#fafafa',
              borderRadius: '6px'
            }}>
              ¡Crea tu primer proyecto!
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="projects-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="projects-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <List
              size="small"
              dataSource={previewProjects}
              renderItem={(project) => (
                <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: 6 
                    }}>
                      <span style={{ 
                        fontWeight: 600, 
                        color: '#374151',
                        fontSize: 14,
                        lineHeight: 1.3
                      }}>
                        {project.name}
                      </span>
                      <Tag 
                        color={statusColors[project.status]} 
                        style={{ fontSize: 11, lineHeight: 1.2, margin: 0 }}
                      >
                        {statusLabels[project.status]}
                      </Tag>
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: 12,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.4,
                      marginBottom: 4
                    }}>
                      {project.description}
                    </div>
                    {project.type && (
                      <div style={{ 
                        color: '#9ca3af', 
                        fontSize: 11,
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
                fontSize: 12,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid #f3f4f6'
              }}>
                +{projects.length - 3} proyectos más
              </div>
            )}
          </div>

          <div className="profile-preview-welcome" style={{ 
            marginTop: '16px',
            padding: '12px',
            textAlign: 'center',
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
            borderRadius: '6px'
          }}>
            {projects.length === 1 ? '1 proyecto' : `${projects.length} proyectos`}
          </div>
        </div>
    </div>
  )
}

export default ProjectsMiniPreview
