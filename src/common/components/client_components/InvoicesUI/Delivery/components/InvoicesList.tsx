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
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Empty
          image={<FileTextOutlined style={{ fontSize: 64, color: '#d1d5db' }} />}
          description="No hay facturas creadas"
        >
          <p style={{ color: '#6b7280', marginTop: 16 }}>
            Crea tu primera factura para comenzar
          </p>
        </Empty>
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
              body: { padding: '16px' }
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '8px' 
              }}>
                <Text strong style={{ fontSize: '16px' }}>
                  {invoice.invoiceNumber}
                </Text>
                <Tag color={statusColors[invoice.status]}>
                  {statusLabels[invoice.status]}
                </Tag>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <UserOutlined style={{ color: '#6b7280', fontSize: '12px' }} />
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  {invoice.clientName}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <ProjectOutlined style={{ color: '#6b7280', fontSize: '12px' }} />
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  {invoice.projectName}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <CalendarOutlined style={{ color: '#6b7280', fontSize: '12px' }} />
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  {new Date(invoice.issueDate).toLocaleDateString('es-ES')}
                </Text>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '8px',
                borderTop: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <DollarOutlined style={{ color: '#52c41a', fontSize: '14px' }} />
                  <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
                    {invoice.totalAmount.toFixed(2)} {invoice.currency}
                  </Text>
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
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
