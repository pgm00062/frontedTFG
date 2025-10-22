'use client'
import React from 'react'
import { List, Tag, Empty } from 'antd'
import { ClockCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'

interface TimeEntry {
  id: number
  projectName: string
  totalTime: string
  status: 'ACTIVO' | 'PAUSADO' | 'FINALIZADO'
  startTime?: string
}

interface TimeMiniPreviewProps {
  timeEntries: TimeEntry[]
}

const statusColors: Record<string, string> = {
  ACTIVO: 'processing',
  PAUSADO: 'warning',
  FINALIZADO: 'success',
}

const statusLabels: Record<string, string> = {
  ACTIVO: 'Activo',
  PAUSADO: 'Pausado',
  FINALIZADO: 'Finalizado',
}

const TimeMiniPreview: React.FC<TimeMiniPreviewProps> = ({ timeEntries }) => {
  console.log('⏱️ TimeMiniPreview recibió:', timeEntries);
  console.log('🔢 Número de registros:', timeEntries?.length || 0);
  
  const previewEntries = timeEntries.slice(0, 3)

  if (!timeEntries || timeEntries.length === 0) {
    console.log('⚠️ Mostrando empty state - No hay registros de tiempo');
    return (
      <div className="time-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="time-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty 
                image={<ClockCircleOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
                description="No hay registros de tiempo"
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
              ¡Comienza a registrar tiempo!
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="time-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="time-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <List
              size="small"
              dataSource={previewEntries}
              renderItem={(entry) => (
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
                        {entry.projectName}
                      </span>
                      <Tag 
                        color={statusColors[entry.status]} 
                        style={{ fontSize: 11, lineHeight: 1.2, margin: 0 }}
                      >
                        {statusLabels[entry.status]}
                      </Tag>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: 12,
                        lineHeight: 1.4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <ClockCircleOutlined />
                        {entry.totalTime}
                      </div>
                      {entry.status === 'ACTIVO' && (
                        <PlayCircleOutlined style={{ color: '#1890ff', fontSize: 14 }} />
                      )}
                    </div>
                  </div>
                </List.Item>
              )}
            />
            
            {timeEntries.length > 3 && (
              <div style={{ 
                textAlign: 'center', 
                color: '#6b7280', 
                fontSize: 12,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid #f3f4f6'
              }}>
                +{timeEntries.length - 3} registros más
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
            {timeEntries.length === 1 ? '1 registro' : `${timeEntries.length} registros`}
          </div>
        </div>
    </div>
  )
}

export default TimeMiniPreview
