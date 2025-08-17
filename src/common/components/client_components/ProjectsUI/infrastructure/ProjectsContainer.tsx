'use client'
import React, { useState } from 'react'
import ProjectsList from '../Delivery/components/ProjectsList'
import CreateProjectForm from '../Delivery/components/CreateProjectForm'
import { Button, Drawer } from 'antd'
import Service from '@/service/src'
import type { ProjectsContainerProps, ProjectItem } from '../Delivery/interface'

export default function ProjectsContainer({ initialProjects }: ProjectsContainerProps) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects || [])
  const [open, setOpen] = useState(false)

  const handleCreate = async (values: any): Promise<void> => {
    try {
      const { name, description, type, startDate, endDate, status, budget } = values || {}
      const payload = { name, description, type, startDate, endDate, status, budget }
      console.log('[ProjectsContainer] creating project payload:', payload)

      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const text = await response.text()
      let data: any = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (e) {
        data = text
      }

      if (!response.ok) {
        console.error('[ProjectsContainer] create project failed, status:', response.status, 'body:', data)
        throw new Error(`Create project failed: ${response.status} ${JSON.stringify(data)}`)
      }

      // backend returned created project (or a wrapper). Normalize
      const created = data?.backendBody ?? data
      if (created) {
        setProjects((prev) => [created, ...prev])
      }
      setOpen(false)
    } catch (error) {
      console.error('[ProjectsContainer] handleCreate error:', error)
      throw error
    }
  }

  return (
    <div style={{ position: 'relative', paddingTop: 56 }}>
      {/* fixed button top-right */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <Button type="primary" onClick={() => setOpen(true)}>Crear proyecto</Button>
      </div>
      <ProjectsList projects={projects} />

      <Drawer title="Crear proyecto" placement="right" onClose={() => setOpen(false)} open={open} width={480}>
        <CreateProjectForm onCreate={handleCreate} />
      </Drawer>
    </div>
  )
}
