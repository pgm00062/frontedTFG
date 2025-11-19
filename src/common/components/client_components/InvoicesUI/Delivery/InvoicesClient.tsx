'use client'
import React, { useState } from 'react'
import { Button, message, Spin } from 'antd'
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons'
import type { InvoicesClientProps, InvoiceItem } from './interface'
import { InvoicesList, CreateInvoiceModal, InvoiceDetailsModal } from './index'
import { listInvoicesAction } from '../../../server_components/Invoices/infrastructure/invoiceActions'

const InvoicesClient: React.FC<InvoicesClientProps> = ({ initialInvoices, projects = [] }) => {
  console.log('💳 InvoicesClient recibió:', initialInvoices)
  console.log('📁 Proyectos disponibles:', projects)

  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices)
  const [loading, setLoading] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null)

  const handleCreateInvoice = () => {
    setCreateModalVisible(true)
  }

  const handleInvoiceClick = (invoice: InvoiceItem) => {
    setSelectedInvoice(invoice)
    setDetailsModalVisible(true)
  }

  const handleCreateSuccess = () => {
    setCreateModalVisible(false)
    message.success('Factura creada exitosamente')
    // Recargar la lista de facturas
    refreshInvoices()
  }

  const handleUpdateSuccess = () => {
    setDetailsModalVisible(false)
    message.success('Factura actualizada exitosamente')
    // Recargar la lista de facturas
    refreshInvoices()
  }



  const refreshInvoices = async () => {
    setLoading(true)
    try {
      const result = await listInvoicesAction()
      if (result.success) {
        setInvoices(result.data)
      } else {
        message.error(result.error || 'Error al cargar las facturas')
      }
    } catch (error) {
      console.error('Error refreshing invoices:', error)
      message.error('Error al cargar las facturas')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div style={{ padding: '0 24px 24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateInvoice}
          size="large"
          style={{
            borderRadius: 8,
            height: 44,
            padding: '0 32px',
            fontSize: 16,
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
          }}
        >
          Crear Nueva Factura
        </Button>
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: 12,
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ 
          margin: '0 0 8px 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: 24,
          fontWeight: 700
        }}>
          <FileTextOutlined style={{ color: '#1890ff' }} />
          Gestión de Facturas
        </h2>
        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 24 }}>
          Administra todas tus facturas en un solo lugar
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <InvoicesList 
            invoices={invoices} 
            onInvoiceClick={handleInvoiceClick}
          />
        )}
      </div>

      <CreateInvoiceModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={handleCreateSuccess}
        projects={projects}
      />

      <InvoiceDetailsModal
        visible={detailsModalVisible}
        invoice={selectedInvoice}
        onCancel={() => setDetailsModalVisible(false)}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  )
}

export default InvoicesClient
