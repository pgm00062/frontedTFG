'use client'
import React, { useState } from 'react'
import { Button, message, Spin } from 'antd'
import { PlusOutlined, FileTextOutlined } from '@ant-design/icons'
import type { InvoicesClientProps, InvoiceItem } from './interface'
import { InvoicesList, CreateInvoiceModal, InvoiceDetailsModal, DeleteInvoiceModal } from './index'
import { listInvoicesAction } from '../../../server_components/Invoices/infrastructure/invoiceActions'

const InvoicesClient: React.FC<InvoicesClientProps> = ({ initialInvoices, projects = [] }) => {
  console.log('💳 InvoicesClient recibió:', initialInvoices)
  console.log('📁 Proyectos disponibles:', projects)

  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices)
  const [loading, setLoading] = useState(false)
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
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

  const handleDeleteSuccess = () => {
    setDeleteModalVisible(false)
    setDetailsModalVisible(false)
    message.success('Factura eliminada exitosamente')
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

  const handleDeleteInvoice = () => {
    setDetailsModalVisible(false)
    setDeleteModalVisible(true)
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileTextOutlined />
          Gestión de Facturas
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateInvoice}
          size="large"
        >
          Crear Factura
        </Button>
      </div>

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
        onDelete={handleDeleteInvoice}
      />

      <DeleteInvoiceModal
        visible={deleteModalVisible}
        invoice={selectedInvoice}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteSuccess}
      />
    </div>
  )
}

export default InvoicesClient
