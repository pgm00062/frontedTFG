'use client'
import React, { useState, useEffect } from 'react'
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  DatePicker, 
  Button, 
  Row, 
  Col,
  Divider,
  message,
  Typography,
  Space,
  Tag
} from 'antd'
import { 
  EditOutlined, 
  SaveOutlined, 
  FileTextOutlined 
} from '@ant-design/icons'
import type { InvoiceDetailsModalProps } from '../interface'
import { updateInvoiceAction } from '../../../../server_components/Invoices/infrastructure/invoiceActions'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input
const { Text, Title } = Typography

const statusColors: Record<string, string> = {
  PENDIENTE: 'processing',
  PAGADA: 'success',
  VENCIDA: 'error',
  CANCELADA: 'default',
}

const statusLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  PAGADA: 'Pagada',
  VENCIDA: 'Vencida',
  CANCELADA: 'Cancelada',
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  visible,
  invoice,
  onCancel,
  onSuccess
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (invoice && visible) {
      form.setFieldsValue({
        ...invoice,
        issueDate: dayjs(invoice.issueDate),
        dueDate: dayjs(invoice.dueDate),
      })
      setIsEditing(false)
    }
  }, [invoice, visible, form])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    if (invoice) {
      form.setFieldsValue({
        ...invoice,
        issueDate: dayjs(invoice.issueDate),
        dueDate: dayjs(invoice.dueDate),
      })
    }
    setIsEditing(false)
  }

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      const formData = {
        ...values,
        projectId: invoice?.projectId, // Incluir el projectId de la factura actual
        currency: invoice?.currency || 'EUR', // Incluir la moneda
        issueDate: values.issueDate.format('YYYY-MM-DD'),
        dueDate: values.dueDate.format('YYYY-MM-DD'),
      }

      console.log('📝 Datos a actualizar:', formData)

      // Llamada real al servidor para actualizar la factura
      if (!invoice?.id) {
        throw new Error('ID de factura no disponible')
      }
      
      const result = await updateInvoiceAction(invoice.id, formData)
      
      if (result.success) {
        setIsEditing(false)
        onSuccess()
        message.success('Factura actualizada correctamente')
      } else {
        message.error(result.error || 'Error al actualizar la factura')
      }
    } catch (error) {
      console.error('Error al actualizar factura:', error)
      message.error('Error al actualizar la factura')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setIsEditing(false)
    onCancel()
  }

  if (!invoice) return null

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined />
          {isEditing ? 'Editar Factura' : 'Detalles de Factura'}
          <Tag color={statusColors[invoice.status]}>
            {statusLabels[invoice.status]}
          </Tag>
        </Space>
      }
      open={visible}
      onCancel={handleClose}
      width={900}
      footer={
        isEditing ? (
          <Space>
            <Button onClick={handleCancelEdit}>
              Cancelar
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              onClick={handleUpdate}
            >
              Guardar Cambios
            </Button>
          </Space>
        ) : (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
          >
            Editar
          </Button>
        )
      }
    >
      <Form
        form={form}
        layout="vertical"
        disabled={!isEditing}
        requiredMark={false}
      >
        {/* Información de la factura */}
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col span={8}>
            <Text strong>Número de Factura:</Text>
            <br />
            <Text style={{ fontSize: '16px' }}>{invoice.invoiceNumber}</Text>
          </Col>
          <Col span={8}>
            <Text strong>Total:</Text>
            <br />
            <Text style={{ fontSize: '18px', color: '#52c41a', fontWeight: 'bold' }}>
              {invoice.totalAmount.toFixed(2)} {invoice.currency}
            </Text>
          </Col>
          <Col span={8}>
            <Text strong>Usuario:</Text>
            <br />
            <Text>{invoice.userName}</Text>
          </Col>
        </Row>

        <Divider orientation="left">Información del Proyecto</Divider>
        
        <Row gutter={16}>
          <Col span={24}>
            <Text strong>Proyecto:</Text>
            <br />
            <Text style={{ fontSize: '16px' }}>{invoice.projectName}</Text>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={12}>
            <Form.Item
              name="issueDate"
              label="Fecha de Emisión"
              rules={[{ required: true, message: 'Selecciona la fecha de emisión' }]}
            >
              <DatePicker style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dueDate"
              label="Fecha de Vencimiento"
              rules={[{ required: true, message: 'Selecciona la fecha de vencimiento' }]}
            >
              <DatePicker style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Información Económica</Divider>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="hourlyRate" label="Tarifa por Hora (€)">
              <InputNumber min={0} step={0.01} style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="totalHours" label="Total de Horas">
              <InputNumber min={0} step={0.1} style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="taxRate" label="Impuestos (%)">
              <InputNumber min={0} max={100} step={0.1} style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <div>
              <Text strong>Costo por Tiempo:</Text>
              <br />
              <Text style={{ fontSize: '16px', color: '#1890ff' }}>
                {invoice.timeCost.toFixed(2)} {invoice.currency}
              </Text>
            </div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="projectBudget" label="Presupuesto del Proyecto (€)">
              <InputNumber min={0} step={0.01} style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="additionalCosts" label="Costos Adicionales (€)">
              <InputNumber min={0} step={0.01} style={{ width: '100%' }} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div>
              <Text strong>Subtotal:</Text>
              <br />
              <Text style={{ fontSize: '16px' }}>
                {invoice.subtotal.toFixed(2)} {invoice.currency}
              </Text>
              <br />
              <Text strong>Impuestos:</Text>
              <br />
              <Text style={{ fontSize: '14px', color: '#666' }}>
                {invoice.taxAmount.toFixed(2)} {invoice.currency}
              </Text>
            </div>
          </Col>
        </Row>

        <Divider orientation="left">Información del Cliente</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="clientName" label="Nombre del Cliente">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="clientEmail" label="Email del Cliente">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="clientPhone" label="Teléfono del Cliente">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="clientTaxId" label="NIF/CIF del Cliente">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="clientAddress" label="Dirección del Cliente">
          <Input disabled={!isEditing} />
        </Form.Item>

        <Divider orientation="left">Información Adicional</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="paymentTerms" label="Condiciones de Pago">
              <Input disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paymentMethod" label="Método de Pago">
              <Select disabled={!isEditing}>
                <Option value="Transferencia bancaria">Transferencia bancaria</Option>
                <Option value="Tarjeta de crédito">Tarjeta de crédito</Option>
                <Option value="PayPal">PayPal</Option>
                <Option value="Efectivo">Efectivo</Option>
                <Option value="Cheque">Cheque</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Descripción">
          <TextArea rows={3} disabled={!isEditing} />
        </Form.Item>

        <Form.Item name="notes" label="Notas Adicionales">
          <TextArea rows={2} disabled={!isEditing} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InvoiceDetailsModal
