'use client'
import React from 'react'
import { List, Card, Tag, Typography, Empty } from 'antd'
import { 
  FileTextOutlined, 
  CalendarOutlined, 
  DollarOutlined,
  UserOutlined,
  ProjectOutlined 
} from '@ant-design/icons'
import type { InvoiceItem } from '../interface'

interface InvoicesListProps {
  invoices: InvoiceItem[]
  onInvoiceClick: (invoice: InvoiceItem) => void
}

const { Text } = Typography

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

const InvoicesList: React.FC<InvoicesListProps> = ({ invoices, onInvoiceClick }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        background: '#f9fafb',
        borderRadius: 8,
        border: '2px dashed #e5e7eb'
      }}>
        <Empty
          image={<FileTextOutlined style={{ fontSize: 64, color: '#bfdbfe' }} />}
          description={
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>
                No hay facturas creadas
              </div>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Crea tu primera factura para comenzar
              </div>
            </div>
          }
        />
      </div>
    )
  }

  return (
    <List
      grid={{ 
        gutter: 16, 
        xs: 1, 
        sm: 1, 
        md: 2, 
        lg: 2, 
        xl: 3, 
        xxl: 3 
      }}
      dataSource={invoices}
      renderItem={(invoice) => (
        <List.Item>
          <Card
            hoverable
            onClick={() => onInvoiceClick(invoice)}
            styles={{
              body: { padding: '20px' }
            }}
            style={{
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px' 
              }}>
                <Text strong style={{ fontSize: '17px', color: '#1f2937', fontWeight: 700 }}>
                  {invoice.invoiceNumber}
                </Text>
                <Tag 
                  color={statusColors[invoice.status]}
                  style={{ 
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 6
                  }}
                >
                  {statusLabels[invoice.status]}
                </Tag>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <UserOutlined style={{ color: '#6366f1', fontSize: '14px' }} />
                <Text type="secondary" style={{ fontSize: '14px', color: '#4b5563' }}>
                  {invoice.clientName}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <ProjectOutlined style={{ color: '#8b5cf6', fontSize: '14px' }} />
                <Text type="secondary" style={{ fontSize: '14px', color: '#4b5563' }}>
                  {invoice.projectName}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <CalendarOutlined style={{ color: '#f59e0b', fontSize: '14px' }} />
                <Text type="secondary" style={{ fontSize: '14px', color: '#4b5563' }}>
                  {new Date(invoice.issueDate).toLocaleDateString('es-ES')}
                </Text>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '2px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarOutlined style={{ color: '#10b981', fontSize: '16px' }} />
                  <Text strong style={{ color: '#10b981', fontSize: '18px', fontWeight: 700 }}>
                    {invoice.totalAmount.toFixed(2)} {invoice.currency}
                  </Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {invoice.totalHours}h @ {invoice.hourlyRate}€/h
                </Text>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  )
}

export default InvoicesList
