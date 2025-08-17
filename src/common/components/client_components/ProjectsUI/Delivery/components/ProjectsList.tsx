 'use client'
import React, { useState } from 'react'
import { Table, Empty, Tag, Drawer, Button } from 'antd'
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
  const [open, setOpen] = useState(false)
  const [project, setProject] = useState<any>(null)

  const openProject = async (id: any) => {
    try {
      // fetch via local BFF to avoid CORS / direct backend calls from browser
      const res = await fetch(`/api/projects/${encodeURIComponent(id)}`)
      const json = await res.json()
      // BFF returns debug structure on error; handle both shapes
      if (!res.ok) {
        console.error('BFF error', json)
        setProject({ error: json })
      } else {
        setProject(json)
      }
      setOpen(true)
    } catch (e) {
      console.error('openProject error', e)
      setProject({ error: e })
      setOpen(true)
    }
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
        <div style={{ fontWeight: 600, color: '#0f172a', cursor: 'pointer' }} onClick={() => openProject(record.id)}>{record.name}</div>
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

      <Drawer open={open} onClose={() => setOpen(false)} placement="right" width={560} bodyStyle={{ padding: 24 }}>
        <div style={{ position: 'relative' }}>
          <Button onClick={() => setOpen(false)} style={{ position: 'absolute', left: 0, top: 0 }}>Cerrar</Button>
          {project?.error ? (
            <div>Error al cargar: {JSON.stringify(project.error)}</div>
          ) : project ? (
            <div>
              <h2 style={{ marginTop: 16 }}>{project.name}</h2>
              <p style={{ color: '#475569' }}>{project.description}</p>
              <div style={{ marginTop: 12 }}>
                <div><strong>Tipo:</strong> {project.type}</div>
                <div><strong>Estado:</strong> {project.status}</div>
                <div><strong>Inicio:</strong> {project.startDate}</div>
                <div><strong>Fin:</strong> {project.endDate}</div>
                <div><strong>Presupuesto:</strong> {project.budget}</div>
              </div>
            </div>
          ) : (
            <div>Cargando...</div>
          )}
        </div>
      </Drawer>
    </>
  )
}

