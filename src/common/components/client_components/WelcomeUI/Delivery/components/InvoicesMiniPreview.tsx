'use client'
import React from 'react'
import { List, Tag, Empty } from 'antd'
import { FileTextOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons'

interface InvoiceItem {
  id: number
  invoiceNumber: string
  amount: number
  issueDate: string
  status: 'PENDIENTE' | 'PAGADA' | 'VENCIDA'
  projectName?: string
}

interface InvoicesMiniPreviewProps {
  invoices: InvoiceItem[]
}

const statusColors: Record<string, string> = {
  PENDIENTE: 'warning',
  PAGADA: 'success',
  VENCIDA: 'error',
}

const statusLabels: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  PAGADA: 'Pagada',
  VENCIDA: 'Vencida',
}

const InvoicesMiniPreview: React.FC<InvoicesMiniPreviewProps> = ({ invoices }) => {
  const totalAmount = invoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0
  const pendingAmount = invoices
    ?.filter(inv => inv.status === 'PENDIENTE' || inv.status === 'VENCIDA')
    .reduce((sum, inv) => sum + inv.amount, 0) || 0

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <div style={{ 
        marginBottom: '16px',
        textAlign: 'center',
        paddingBottom: '12px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          Gestiona tus facturas
        </h3>
        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          margin: 0,
          marginBottom: '8px'
        }}>
          Control de facturación
        </p>
      </div>
      
      {/* Resumen con iconos - siempre visible */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '8px'
      }}>
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <FileTextOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 6 }} />
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Facturas</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1890ff' }}>
            {invoices?.length || 0}
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <DollarOutlined style={{ fontSize: 24, color: '#52c41a', marginBottom: 6 }} />
          <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Total</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#52c41a' }}>
            {totalAmount.toFixed(0)}€
          </div>
        </div>
      </div>
      
      {pendingAmount > 0 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '12px',
          padding: '8px',
          background: '#fffbf0',
          borderRadius: '8px',
          border: '1px solid #ffe58f'
        }}>
          <ClockCircleOutlined style={{ color: '#faad14', marginRight: 4 }} />
          <span style={{ fontSize: 12, color: '#faad14', fontWeight: 600 }}>
            {pendingAmount.toFixed(0)}€ pendientes
          </span>
        </div>
      )}
    </div>
  )
}

export default InvoicesMiniPreview
