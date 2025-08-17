'use client'
import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, InputNumber, Select, message } from 'antd'
import type { ProjectItem } from '../interface'

const { TextArea } = Input
const { RangePicker } = DatePicker
const { Option } = Select

export default function CreateProjectForm({ onCreate }: { onCreate: (values: any) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // Helpers to enforce backend enums
  const toBackendType = (val: string) => {
    if (!val) return 'DESARROLLO'
    // remove diacritics and uppercase
    const normalized = val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    if (normalized === 'DISEÑO') return 'DISENO' // safety, in case normalize fails on some browsers
    if (['DESARROLLO', 'DISENO', 'CONSULTORIA'].includes(normalized)) return normalized
    return 'DESARROLLO'
  }
  const toBackendStatus = (val: string) => {
    const normalized = (val || '').toUpperCase()
    if (['EN_PROGRESO', 'TERMINADO', 'CANCELADO'].includes(normalized)) return normalized
    return 'EN_PROGRESO'
  }

  const handleFinish = async (values: any) => {
    setLoading(true)
    try {
      // Mapear valores a DTO esperado por backend
      const payload = {
        name: values.name,
        description: values.description,
        type: toBackendType(values.type),
        startDate: values.startDate?.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD'),
        status: toBackendStatus(values.status),
        // Ensure budget is a number with two decimals (backend accepts JSON number)
        budget: typeof values.budget === 'number' ? Number(values.budget.toFixed(2)) : Number(parseFloat(values.budget || 0).toFixed(2)),
      }
  console.log('[CreateProjectForm] payload to send:', payload)
  await onCreate(payload)
      message.success('Proyecto creado correctamente')
      form.resetFields()
    } catch (e: any) {
      message.error(e?.message || 'Error al crear proyecto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish} initialValues={{ status: 'EN_PROGRESO', type: 'DESARROLLO' }}>
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
  <Form.Item name="type" label="Tipo" rules={[{ required: true, message: 'El tipo es obligatorio' }]} hasFeedback>
        <Select>
          {/* use backend enum values as Option value to avoid deserialization errors */}
          <Option value="DESARROLLO">Desarrollo</Option>
          <Option value="DISENO">Diseño</Option>
          <Option value="CONSULTORIA">Consultoría</Option>
        </Select>
      </Form.Item>
      <Form.Item name="startDate" label="Fecha inicio" rules={[{ required: true, message: 'La fecha de inicio es obligatoria' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="endDate" label="Fecha fin" rules={[{ required: true, message: 'La fecha de fin es obligatoria' }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="budget" label="Presupuesto" rules={[{ required: true, message: 'El presupuesto es obligatorio' }]}>
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Crear proyecto
        </Button>
      </Form.Item>
    </Form>
  )
}
