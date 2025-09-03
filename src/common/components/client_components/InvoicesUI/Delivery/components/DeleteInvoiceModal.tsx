'use client'
import React, { useState } from 'react'
import { Modal, Typography, Space, message } from 'antd'
import { 
  ExclamationCircleOutlined, 
  DeleteOutlined, 
  FileTextOutlined 
} from '@ant-design/icons'
import type { DeleteInvoiceModalProps } from '../interface'
import { deleteInvoiceAction } from '../../../../server_components/Invoices/infrastructure/invoiceActions'

const { Text, Title } = Typography

const DeleteInvoiceModal: React.FC<DeleteInvoiceModalProps> = ({
  visible,
  invoice,
  onCancel,
  onConfirm
}) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!invoice) return

    try {
      setLoading(true)
      
      console.log('🗑️ Eliminando factura:', invoice.id)

      // Llamada real al servidor para eliminar la factura
      const result = await deleteInvoiceAction(invoice.id)
      
      if (result.success) {
        onConfirm()
        message.success('Factura eliminada correctamente')
      } else {
        message.error(result.error || 'Error al eliminar la factura')
      }
    } catch (error) {
      console.error('Error al eliminar factura:', error)
      message.error('Error al eliminar la factura')
    } finally {
      setLoading(false)
    }
  }

  if (!invoice) return null

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          Confirmar Eliminación
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="Eliminar"
      cancelText="Cancelar"
      okButtonProps={{ 
        danger: true, 
        loading: loading,
        icon: <DeleteOutlined />
      }}
      width={500}
    >
      <div style={{ padding: '16px 0' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <FileTextOutlined 
              style={{ 
                fontSize: '48px', 
                color: '#ff4d4f', 
                marginBottom: '16px' 
              }} 
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Title level={4} style={{ marginBottom: '8px' }}>
              ¿Estás seguro de que quieres eliminar esta factura?
            </Title>
            
            <Text type="secondary">
              Esta acción no se puede deshacer. La factura será eliminada permanentemente.
            </Text>
          </div>

          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid #d9d9d9'
          }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Número de Factura:</Text>
                <Text>{invoice.invoiceNumber}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Cliente:</Text>
                <Text>{invoice.clientName}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Proyecto:</Text>
                <Text>{invoice.projectName}</Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Total:</Text>
                <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                  {invoice.totalAmount.toFixed(2)} {invoice.currency}
                </Text>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Fecha de Emisión:</Text>
                <Text>{new Date(invoice.issueDate).toLocaleDateString('es-ES')}</Text>
              </div>
            </Space>
          </div>
          
          <div style={{ 
            backgroundColor: '#fff2f0', 
            border: '1px solid #ffccc7',
            borderRadius: '6px',
            padding: '12px'
          }}>
            <Space>
              <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
              <Text style={{ color: '#ff4d4f', fontSize: '14px' }}>
                <strong>Advertencia:</strong> Esta acción eliminará permanentemente la factura y no se podrá recuperar.
              </Text>
            </Space>
          </div>
        </Space>
      </div>
    </Modal>
  )
}

export default DeleteInvoiceModal
