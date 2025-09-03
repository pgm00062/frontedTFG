'use client'
import React, { useState } from 'react'
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
  message 
} from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import type { CreateInvoiceModalProps, InvoiceCreateData } from '../interface'
import { createInvoiceAction } from '../../../../server_components/Invoices/infrastructure/invoiceActions'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  projects
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      // Formatear las fechas
      const formData: InvoiceCreateData = {
        ...values,
        issueDate: values.issueDate.format('YYYY-MM-DD'),
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        currency: values.currency || 'EUR'
      }

      console.log('📋 Datos a enviar:', formData)

      // Llamada real al servidor para crear la factura
      const result = await createInvoiceAction(formData)
      
      if (result.success) {
        message.success('Factura creada correctamente')
        form.resetFields()
        onSuccess()
      } else {
        message.error(result.error || 'Error al crear la factura')
      }
    } catch (error) {
      console.error('Error al crear factura:', error)
      message.error('Error al crear la factura')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  // Valores por defecto
  const defaultValues = {
    issueDate: dayjs(),
    dueDate: dayjs().add(30, 'days'),
    taxRate: 21,
    currency: 'EUR',
    hourlyRate: 25,
    paymentTerms: '30 días',
    paymentMethod: 'Transferencia bancaria'
  }

  return (
    <Modal
      title="Crear Nueva Factura"
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveOutlined />}
          loading={loading}
          onClick={handleSubmit}
        >
          Guardar Factura
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        requiredMark={false}
      >
        <Divider orientation="left">Información del Proyecto</Divider>
        
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="projectId"
              label="Proyecto"
              rules={[{ required: true, message: 'Selecciona un proyecto' }]}
            >
              <Select placeholder="Selecciona el proyecto">
                {projects.map(project => (
                  <Option key={project.id} value={project.id}>
                    {project.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="issueDate"
              label="Fecha de Emisión"
              rules={[{ required: true, message: 'Selecciona la fecha de emisión' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dueDate"
              label="Fecha de Vencimiento"
              rules={[{ required: true, message: 'Selecciona la fecha de vencimiento' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Información Económica</Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="hourlyRate"
              label="Tarifa por Hora (€)"
              rules={[{ required: true, message: 'Ingresa la tarifa por hora' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                placeholder="25.00"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="totalHours"
              label="Total de Horas"
              rules={[{ required: true, message: 'Ingresa el total de horas' }]}
            >
              <InputNumber
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                placeholder="40.0"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="taxRate"
              label="Impuestos (%)"
              rules={[{ required: true, message: 'Ingresa el porcentaje de impuestos' }]}
            >
              <InputNumber
                min={0}
                max={100}
                step={0.1}
                style={{ width: '100%' }}
                placeholder="21.0"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="projectBudget"
              label="Presupuesto del Proyecto (€)"
              rules={[{ required: true, message: 'Ingresa el presupuesto del proyecto' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                placeholder="1500.00"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="additionalCosts"
              label="Costos Adicionales (€)"
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                placeholder="0.00"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Información del Cliente</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="clientName"
              label="Nombre del Cliente"
              rules={[{ required: true, message: 'Ingresa el nombre del cliente' }]}
            >
              <Input placeholder="Juan Pérez" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="clientEmail"
              label="Email del Cliente"
              rules={[
                { required: true, message: 'Ingresa el email del cliente' },
                { type: 'email', message: 'Ingresa un email válido' }
              ]}
            >
              <Input placeholder="juan.perez@email.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="clientPhone"
              label="Teléfono del Cliente"
            >
              <Input placeholder="+34 123 456 789" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="clientTaxId"
              label="NIF/CIF del Cliente"
            >
              <Input placeholder="12345678X" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="clientAddress"
          label="Dirección del Cliente"
        >
          <Input placeholder="Calle Falsa 123, Madrid, España" />
        </Form.Item>

        <Divider orientation="left">Información Adicional</Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="paymentTerms"
              label="Condiciones de Pago"
            >
              <Input placeholder="30 días" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="paymentMethod"
              label="Método de Pago"
            >
              <Select placeholder="Selecciona el método de pago">
                <Option value="Transferencia bancaria">Transferencia bancaria</Option>
                <Option value="Tarjeta de crédito">Tarjeta de crédito</Option>
                <Option value="PayPal">PayPal</Option>
                <Option value="Efectivo">Efectivo</Option>
                <Option value="Cheque">Cheque</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Descripción"
        >
          <TextArea 
            rows={3} 
            placeholder="Descripción de los servicios prestados..."
          />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notas Adicionales"
        >
          <TextArea 
            rows={2} 
            placeholder="Notas adicionales para el cliente..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateInvoiceModal
