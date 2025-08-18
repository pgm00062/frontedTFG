'use client'
import React from 'react'
import { Card, Descriptions } from 'antd'
import type { getProjectIdProps } from '../interface'

export default function ProjectDetail({ project }: getProjectIdProps) {
  if (!project) return null

  return (
    <Card title={project.name}>
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Descripción">{project.description}</Descriptions.Item>
        <Descriptions.Item label="Estado">{project.status}</Descriptions.Item>
        {/*
        <Descriptions.Item label="Tipo">{project.type}</Descriptions.Item>
        <Descriptions.Item label="Inicio">{project.startDate}</Descriptions.Item>
        <Descriptions.Item label="Fin">{project.endDate}</Descriptions.Item>
        <Descriptions.Item label="Presupuesto">{project.budget}</Descriptions.Item>
        */}
      </Descriptions>
    </Card>
  )
}