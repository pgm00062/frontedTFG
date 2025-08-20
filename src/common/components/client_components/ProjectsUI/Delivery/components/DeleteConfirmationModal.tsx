'use client'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Alert, Spin } from 'antd'
import { ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { checkProjectHasTimes } from '@/common/components/server_components/Project/projectValidations'
import type { ProjectItem } from '../interface'

interface DeleteConfirmationModalProps {
  project: ProjectItem | null
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function DeleteConfirmationModal({ 
  project, 
  open, 
  onConfirm, 
  onCancel, 
  loading = false 
}: DeleteConfirmationModalProps) {
  const [hasTimeRecords, setHasTimeRecords] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [checkingTime, setCheckingTime] = useState(false)

  useEffect(() => {
    if (open && project) {
      setCheckingTime(true)
      checkProjectHasTimes(project.id)
        .then(result => {
          setHasTimeRecords(result.hasTimes)
          setTotalTime(result.totalTime)
        })
        .catch(error => {
          console.error('Error checking project times:', error)
          setHasTimeRecords(false)
        })
        .finally(() => {
          setCheckingTime(false)
        })
    }
  }, [open, project])

  if (!project) return null

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 20 }} />
          <span>Confirmar eliminación</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          No, cancelar
        </Button>,
        <Button 
          key="confirm" 
          type="primary" 
          danger 
          onClick={onConfirm}
          loading={loading}
          disabled={checkingTime}
        >
          Sí, eliminar proyecto
        </Button>
      ]}
      centered
      width={520}
    >
      <div style={{ padding: '16px 0' }}>
        {checkingTime ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin /> <span style={{ marginLeft: 8 }}>Verificando registros de tiempo...</span>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: 16, fontSize: 16 }}>
              ¿Estás seguro de que quieres eliminar el proyecto <strong>"{project.name}"</strong>?
            </p>
            
            {hasTimeRecords && (
              <Alert
                message="⚠️ Proyecto con registros de tiempo"
                description={
                  <div>
                    <p style={{ margin: '8px 0' }}>
                      <ClockCircleOutlined style={{ marginRight: 8 }} />
                      Este proyecto tiene <strong>{formatTime(totalTime)}</strong> de tiempo registrado.
                    </p>
                    <p style={{ margin: '8px 0 0 0', color: '#d97706' }}>
                      <strong>ADVERTENCIA:</strong> Eliminar este proyecto también eliminará todos sus registros de tiempo asociados.
                    </p>
                  </div>
                }
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            
            <p style={{ color: '#8b5cf6', marginBottom: 0 }}>
              Esta acción no se puede deshacer. Todos los datos del proyecto se perderán permanentemente.
            </p>
          </>
        )}
      </div>
    </Modal>
  )
}
