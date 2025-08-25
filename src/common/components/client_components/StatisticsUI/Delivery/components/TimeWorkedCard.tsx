'use client'
import React from 'react';
import { Card, Empty } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

interface TimeWorkedData {
  projectId: number;
  projectName: string;
  totalHours: number;
  totalMinutes: number;
}

interface TimeWorkedCardProps {
  data: TimeWorkedData[];
}

const TimeWorkedCard: React.FC<TimeWorkedCardProps> = ({ data }) => {
  const formatTime = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return '0h 0m';
    return `${hours}h ${minutes}m`;
  };

  const totalHours = data.reduce((sum, project) => sum + project.totalHours, 0);
  const totalMinutes = data.reduce((sum, project) => sum + project.totalMinutes, 0);

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FieldTimeOutlined style={{ color: '#722ed1' }} />
          Tiempo Trabajado por Proyecto
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
        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#722ed1' }}>
          Tiempo Total: {formatTime(totalHours, totalMinutes)}
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginTop: 4 }}>
          {data.length} proyecto(s) con tiempo registrado
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {data.length === 0 ? (
          <Empty
            image={<FieldTimeOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
            description="No hay tiempo registrado en proyectos"
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
              <FieldTimeOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>Gráfico de barras de tiempo trabajado</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                Por proyecto y total de horas
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimeWorkedCard;
