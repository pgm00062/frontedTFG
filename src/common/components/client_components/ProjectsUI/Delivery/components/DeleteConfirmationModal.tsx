'use client'
import React from 'react'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
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
  if (!project) return null

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
        >
          Sí, eliminar proyecto
        </Button>
      ]}
      centered
      width={480}
    >
      <div style={{ padding: '16px 0' }}>
        <p style={{ marginBottom: 16, fontSize: 16 }}>
          ¿Estás seguro de que quieres eliminar el proyecto <strong>"{project.name}"</strong>?
        </p>
        <p style={{ color: '#8b5cf6', marginBottom: 0 }}>
          Esta acción no se puede deshacer. Todos los datos del proyecto se perderán permanentemente.
        </p>
      </div>
    </Modal>
  )
}
