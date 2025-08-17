'use client'
import React from 'react'
import { Table, Empty, Tag } from 'antd'
import type { ProjectsListProps } from '../interface'

const statusColor: Record<string, string> = {
  EN_PROGRESO: 'blue',
  TERMINADO: 'green',
  CANCELADO: 'red',
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  if (!projects || projects.length === 0) {
    return <Empty description="No hay proyectos aún" />
  }

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={statusColor[s]}>{s}</Tag>,
    },
  ]

  return <Table dataSource={projects} columns={columns} rowKey="id" pagination={false} />
}
