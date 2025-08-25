'use client'
import React from 'react';
import { Card, Statistic, Empty } from 'antd';
import { DollarOutlined, TrophyOutlined } from '@ant-design/icons';

interface MonthlyEarningsData {
  total: number;
  projects: Array<{
    id: number;
    name: string;
    earnings: number;
    completedDate: string;
  }>;
}

interface MonthlyEarningsCardProps {
  data: MonthlyEarningsData;
}

const MonthlyEarningsCard: React.FC<MonthlyEarningsCardProps> = ({ data }) => {
  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrophyOutlined style={{ color: '#52c41a' }} />
          Dinero Ganado (Último Mes)
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
          title="Total Ganado"
          value={data.total}
          precision={2}
          prefix={<DollarOutlined />}
          suffix="€"
          valueStyle={{ color: '#52c41a', fontSize: '2rem' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {data.projects.length === 0 ? (
          <Empty
            image={<TrophyOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
            description="No hay proyectos completados este mes"
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
              <TrophyOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>Gráfico de proyectos completados</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {data.projects.length} proyecto(s) completado(s)
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MonthlyEarningsCard;
