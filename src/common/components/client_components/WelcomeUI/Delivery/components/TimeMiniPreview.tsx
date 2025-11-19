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
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
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
          Control de horas trabajadas
        </p>
      </div>
      
      {/* Tiempo total del día destacado - siempre visible */}
      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <ClockCircleOutlined style={{ fontSize: 32, color: '#722ed1', marginBottom: 8 }} />
        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Tiempo de hoy
        </div>
        <div style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          color: '#722ed1', 
          fontFamily: 'monospace',
          lineHeight: 1.2,
          marginBottom: 8
        }}>
          {dailyTotalTime || '0h 0m'}
        </div>
      </div>
      
      {/* Información adicional de sesiones */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '12px'
      }}>
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <PlayCircleOutlined style={{ fontSize: 18, color: '#1890ff', marginBottom: 4 }} />
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Sesiones</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1890ff' }}>
            {timeEntries?.length || 0}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeMiniPreview
