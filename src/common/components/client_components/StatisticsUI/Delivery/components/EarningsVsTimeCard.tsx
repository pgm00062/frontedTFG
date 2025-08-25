'use client'
import React from 'react';
import { Card, Empty } from 'antd';
import { LineChartOutlined, DollarOutlined } from '@ant-design/icons';

interface EarningsVsTimeData {
  projectId: number;
  projectName: string;
  earnings: number;
  hoursWorked: number;
  earningsPerHour: number;
}

interface EarningsVsTimeCardProps {
  data: EarningsVsTimeData[];
}

const EarningsVsTimeCard: React.FC<EarningsVsTimeCardProps> = ({ data }) => {
  const averageEarningsPerHour = data.length > 0 
    ? data.reduce((sum, project) => sum + project.earningsPerHour, 0) / data.length 
    : 0;

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LineChartOutlined style={{ color: '#fa8c16' }} />
          Relación Dinero vs Tiempo
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
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fa8c16' }}>
          <DollarOutlined /> {averageEarningsPerHour.toFixed(2)}€/hora
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginTop: 4 }}>
          Promedio de ganancias por hora trabajada
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {data.length === 0 ? (
          <Empty
            image={<LineChartOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
            description="No hay datos de relación dinero/tiempo"
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
              <LineChartOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>Gráfico de dispersión</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Relación entre ganancias y tiempo trabajado
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EarningsVsTimeCard;
