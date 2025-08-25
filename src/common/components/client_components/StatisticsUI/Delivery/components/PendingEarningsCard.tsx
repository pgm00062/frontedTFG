'use client'
import React from 'react';
import { Card, Statistic, Empty } from 'antd';
import { DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PendingEarningsData {
  total: number;
  projects: Array<{
    id: number;
    name: string;
    estimatedEarnings: number;
    progress: number;
  }>;
}

interface PendingEarningsCardProps {
  data: PendingEarningsData;
}

const PendingEarningsCard: React.FC<PendingEarningsCardProps> = ({ data }) => {
  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          Dinero Pendiente (En Progreso)
        </div>
      }
      style={{ height: '400px' }}
      bodyStyle={{ 
        height: 'calc(100% - 57px)', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '24px'
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <Statistic
          title="Total Estimado"
          value={data.total}
          precision={2}
          prefix={<DollarOutlined />}
          suffix="€"
          valueStyle={{ color: '#1890ff', fontSize: '2rem' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {data.projects.length === 0 ? (
          <Empty
            image={<ClockCircleOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
            description="No hay proyectos en progreso"
            style={{ margin: 0 }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '200px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #d1d5db'
          }}>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <ClockCircleOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>Gráfico de proyectos en progreso</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {data.projects.length} proyecto(s) en progreso
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PendingEarningsCard;
