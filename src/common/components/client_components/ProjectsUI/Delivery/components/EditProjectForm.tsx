'use client'
import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Select, message } from 'antd'
import dayjs from 'dayjs'
import type { ProjectItem } from '../interface'

const { TextArea } = Input
const { Option } = Select

interface EditProjectFormProps {
  project: ProjectItem
  onSave: (projectData: any) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export default function EditProjectForm({ project, onSave, onCancel, loading = false }: EditProjectFormProps) {
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helpers para manejar los enums del backend
  const toBackendType = (val: string) => {
    if (!val) return 'DESARROLLO'
    const normalized = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    if (normalized === 'DISEÑO') return 'DISENO'
    if (['DESARROLLO', 'DISENO', 'CONSULTORIA'].includes(normalized)) return normalized
    return 'DESARROLLO'
  }

  const toBackendStatus = (val: string) => {
    const normalized = (val || '').toUpperCase()
    if (['EN_PROGRESO', 'TERMINADO', 'CANCELADO'].includes(normalized)) return normalized
    return 'EN_PROGRESO'
  }

  const handleFinish = async (values: any) => {
    setIsSubmitting(true)
    try {
      const payload = {
        name: values.name,
        description: values.description,
        type: toBackendType(values.type),
        startDate: values.startDate?.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD'),
        status: toBackendStatus(values.status),
        budget: typeof values.budget === 'number' ? Number(values.budget.toFixed(2)) : Number(parseFloat(values.budget || 0).toFixed(2)),
      }
      
      await onSave(payload)
      message.success('Proyecto actualizado correctamente')
    } catch (error: any) {
      message.error(error?.message || 'Error al actualizar proyecto')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form 
      layout="vertical" 
      form={form} 
      onFinish={handleFinish}
      initialValues={{
        name: project.name,
        description: project.description,
        status: project.status,
        type: (project as any).type || 'DESARROLLO',
        startDate: (project as any).startDate ? dayjs((project as any).startDate) : null,
        endDate: (project as any).endDate ? dayjs((project as any).endDate) : null,
        budget: (project as any).budget || 0,
      }}
    >
      <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="status" label="Estado" rules={[{ required: true, message: 'El estado es obligatorio' }]}>
        <Select>
          <Option value="EN_PROGRESO">En progreso</Option>
          <Option value="TERMINADO">Terminado</Option>
          <Option value="CANCELADO">Cancelado</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="description" label="Descripción" rules={[{ required: true, message: 'La descripción es obligatoria' }]}>
        <TextArea rows={3} maxLength={500} />
      </Form.Item>
      
      <Form.Item name="type" label="Tipo" rules={[{ required: true, message: 'El tipo es obligatorio' }]}>
        <Select>
          <Option value="DESARROLLO">Desarrollo</Option>
          <Option value="DISENO">Diseño</Option>
          <Option value="CONSULTORIA">Consultoría</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="startDate" label="Fecha inicio" rules={[{ required: true, message: 'La fecha de inicio es obligatoria' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item name="endDate" label="Fecha fin" rules={[{ required: true, message: 'La fecha de fin es obligatoria' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      
      <Form.Item name="budget" label="Presupuesto" rules={[{ required: true, message: 'El presupuesto es obligatorio' }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
      
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
        <Button onClick={onCancel} disabled={isSubmitting || loading}>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit" loading={isSubmitting || loading}>
          Guardar cambios
        </Button>
      </div>
    </Form>
  )
}
