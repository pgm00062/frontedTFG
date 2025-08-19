'use client'
import React, { useState } from 'react'
import { Select, message } from 'antd'
import type { ProjectItem } from '../interface'

const { Option } = Select

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
  EN_PROGRESO: 'En progreso',
  TERMINADO: 'Terminado',
  CANCELADO: 'Cancelado',
}

interface StatusSelectorProps {
  project: ProjectItem
  onStatusChange: (projectId: number, newStatus: string) => Promise<void>
}

type ProjectStatus = 'EN_PROGRESO' | 'TERMINADO' | 'CANCELADO'

export default function StatusSelector({ project, onStatusChange }: StatusSelectorProps) {
  const [isChanging, setIsChanging] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<ProjectStatus>(project.status)

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return

    setIsChanging(true)
    try {
      await onStatusChange(project.id, newStatus)
      setCurrentStatus(newStatus as ProjectStatus)
      message.success('Estado actualizado correctamente')
    } catch (error) {
      console.error('Error updating status:', error)
      message.error('Error al actualizar el estado')
    } finally {
      setIsChanging(false)
    }
  }

  return (
    <Select
      value={currentStatus}
      onChange={handleStatusChange}
      loading={isChanging}
      size="small"
      bordered={false}
      style={{ 
        width: '100%',
        minWidth: 120
      }}
      dropdownStyle={{
        padding: 4
      }}
    >
      <Option value="EN_PROGRESO">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ 
            width: 8, 
            height: 8, 
            borderRadius: 8, 
            background: statusColor.EN_PROGRESO 
          }} />
          <span style={{ color: statusColor.EN_PROGRESO, fontWeight: 600 }}>
            {statusLabels.EN_PROGRESO}
          </span>
        </div>
      </Option>
      <Option value="TERMINADO">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ 
            width: 8, 
            height: 8, 
            borderRadius: 8, 
            background: statusColor.TERMINADO 
          }} />
          <span style={{ color: statusColor.TERMINADO, fontWeight: 600 }}>
            {statusLabels.TERMINADO}
          </span>
        </div>
      </Option>
      <Option value="CANCELADO">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ 
            width: 8, 
            height: 8, 
            borderRadius: 8, 
            background: statusColor.CANCELADO 
          }} />
          <span style={{ color: statusColor.CANCELADO, fontWeight: 600 }}>
            {statusLabels.CANCELADO}
          </span>
        </div>
      </Option>
    </Select>
  )
}
