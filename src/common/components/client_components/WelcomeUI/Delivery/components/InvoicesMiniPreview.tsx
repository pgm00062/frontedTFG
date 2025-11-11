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
  console.log('🧾 InvoicesMiniPreview recibió:', invoices);
  console.log('🔢 Número de facturas:', invoices?.length || 0);
  
  const previewInvoices = invoices.slice(0, 3)

  if (!invoices || invoices.length === 0) {
    console.log('⚠️ Mostrando empty state - No hay facturas');
    return (
      <div className="invoices-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="invoices-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <div style={{ 
              marginBottom: '16px',
              textAlign: 'center'
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
                margin: 0
              }}>
                Aún no tienes facturas creadas
              </p>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Empty 
                image={<FileTextOutlined style={{ fontSize: 48, color: '#bfdbfe' }} />}
                description={
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                    ¡Crea tu primera factura!
                  </span>
                }
                style={{ margin: 0 }}
              />
            </div>
          </div>
      </div>
    )
  }

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = invoices
    .filter(inv => inv.status === 'PENDIENTE' || inv.status === 'VENCIDA')
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="invoices-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="invoices-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
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
              {invoices.length === 1 
                ? 'Tienes 1 factura registrada' 
                : `Tienes ${invoices.length} facturas registradas`
              }
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '8px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '16px'
              }}>
                <DollarOutlined style={{ color: '#16a34a', fontSize: '14px' }} />
                <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '13px' }}>
                  Total: {totalAmount.toFixed(2)}€
                </span>
              </div>
              {pendingAmount > 0 && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: '#fefce8',
                  border: '1px solid #fde047',
                  borderRadius: '16px'
                }}>
                  <ClockCircleOutlined style={{ color: '#f59e0b', fontSize: '14px' }} />
                  <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '13px' }}>
                    Pendiente: {pendingAmount.toFixed(2)}€
                  </span>
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <List
              size="small"
              dataSource={previewInvoices}
              renderItem={(invoice) => (
                <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: 6 
                    }}>
                      <span style={{ 
                        fontWeight: 600, 
                        color: '#374151',
                        fontSize: 14,
                        lineHeight: 1.3
                      }}>
                        {invoice.invoiceNumber}
                      </span>
                      <Tag 
                        color={statusColors[invoice.status]} 
                        style={{ fontSize: 11, lineHeight: 1.2, margin: 0 }}
                      >
                        {statusLabels[invoice.status]}
                      </Tag>
                    </div>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: 12,
                        lineHeight: 1.4
                      }}>
                        {invoice.projectName || 'Sin proyecto'}
                      </div>
                      <div style={{
                        color: '#16a34a',
                        fontSize: 13,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}>
                        <DollarOutlined style={{ fontSize: 11 }} />
                        {invoice.amount.toFixed(2)}€
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            
            {invoices.length > 3 && (
              <div style={{ 
                textAlign: 'center', 
                color: '#6b7280', 
                fontSize: 12,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid #f3f4f6'
              }}>
                +{invoices.length - 3} facturas más
              </div>
            )}
          </div>

          <div style={{ 
            marginTop: '16px',
            padding: '12px',
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
            borderRadius: '6px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: 11,
              color: '#6b7280',
              marginBottom: 4
            }}>
              <span>Total facturado:</span>
              <span style={{ fontWeight: 600, color: '#16a34a' }}>{totalAmount.toFixed(2)}€</span>
            </div>
            {pendingAmount > 0 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: 11,
                color: '#6b7280'
              }}>
                <span>Pendiente de cobro:</span>
                <span style={{ fontWeight: 600, color: '#f59e0b' }}>{pendingAmount.toFixed(2)}€</span>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default InvoicesMiniPreview
