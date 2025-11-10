'use client'
import React from 'react';
import { Card, Statistic } from 'antd';
import { DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface PendingEarningsCardProps {
  amount: number;
}

const PendingEarningsCard: React.FC<PendingEarningsCardProps> = ({ amount }) => {
  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ClockCircleOutlined style={{ color: '#1890ff' }} />
          Dinero Pendiente
        </div>
      }
      style={{ height: '100%', minHeight: '250px' }}
      bodyStyle={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 24px'
      }}
    >
      <Statistic
        title="Total Estimado"
        value={amount}
        precision={2}
        prefix={<DollarOutlined />}
        suffix="€"
        valueStyle={{ color: '#1890ff', fontSize: '2.5rem', fontWeight: 600 }}
      />
      <div style={{ marginTop: 16, fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
        Proyectos en progreso (EN_PROGRESO)
      </div>
    </Card>
  );
};

export default PendingEarningsCard;
