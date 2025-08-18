'use client'
import React, { useState } from 'react'
import { Table, Empty, Modal } from 'antd'
import type { ProjectsListProps } from '../interface'

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

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setModalOpen(true)
  }
  if (!projects || projects.length === 0) {
    return <Empty description="No hay proyectos aún" />
  }

  const columns = [
    
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <span 
          style={{ fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}
          onClick={() => openProjectModal(record)}
        >
          {record.name}
        </span>
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
      render: (s: string) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 9999, background: statusBg[s] || 'transparent' }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: statusColor[s] }} />
          <span style={{ color: statusColor[s], fontWeight: 600, fontSize: 13 }}>{s.replace('_', ' ')}</span>
        </div>
      ),
    },
  ]

  return (
    <>
      <Table
        dataSource={projects}
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
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={720}
        title="Detalles del Proyecto"
      >
        {selectedProject?.error ? (
          <div style={{ padding: 16, color: '#ef4444' }}>
            Error al cargar el proyecto: {selectedProject.error}
          </div>
        ) : selectedProject ? (
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
          </div>
        ) : null}
      </Modal>
    </>
  )
}

