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
  dailyTotalTime?: string
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

const TimeMiniPreview: React.FC<TimeMiniPreviewProps> = ({ timeEntries, dailyTotalTime }) => {
  console.log('⏱️ TimeMiniPreview recibió:', timeEntries);
  console.log('🔢 Número de registros:', timeEntries?.length || 0);
  console.log('📊 Tiempo total del día:', dailyTotalTime);
  
  const previewEntries = timeEntries.slice(0, 3)

  if (!timeEntries || timeEntries.length === 0) {
    console.log('⚠️ Mostrando empty state - No hay registros de tiempo');
    return (
      <div className="time-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="time-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <div style={{ 
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 700, 
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Registra tu tiempo de trabajo
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                margin: 0
              }}>
                Aún no tienes registros de tiempo activos
              </p>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty 
                image={<ClockCircleOutlined style={{ fontSize: 48, color: '#bfdbfe' }} />}
                description={
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                    ¡Comienza a registrar tu tiempo!
                  </span>
                }
                style={{ margin: 0 }}
              />
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="time-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="time-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <div style={{ 
            marginBottom: '16px',
            textAlign: 'center',
            paddingBottom: '12px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 700, 
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Registra tu tiempo de trabajo
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              margin: 0,
              marginBottom: '8px'
            }}>
              {timeEntries.length === 1 
                ? 'Tienes 1 registro de tiempo activo' 
                : `Tienes ${timeEntries.length} registros de tiempo activos`
              }
            </p>
            {dailyTotalTime && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                marginTop: '8px'
              }}>
                <ClockCircleOutlined style={{ color: '#fff', fontSize: '16px' }} />
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>
                  {dailyTotalTime} trabajadas hoy
                </span>
              </div>
            )}
          </div>
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
        </div>
    </div>
  )
}

export default TimeMiniPreview
