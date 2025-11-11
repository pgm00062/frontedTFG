'use client'
import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { DollarOutlined, TrophyOutlined, ClockCircleOutlined, LineChartOutlined } from '@ant-design/icons';

interface StatisticsPreviewData {
  monthlyEarnings: number;
  pendingEarnings: number;
  totalTimeWorked: string;
  avgEarningsPerHour: number;
}

interface StatisticsMiniPreviewProps {
  statisticsData: StatisticsPreviewData;
}

const StatisticsMiniPreview: React.FC<StatisticsMiniPreviewProps> = ({ statisticsData }) => {
  console.log('📊 StatisticsMiniPreview recibió:', statisticsData);

  return (
    <div className="statistics-preview-outer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="statistics-preview-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
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
            Visualiza tus estadísticas
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280',
            margin: 0
          }}>
            Resumen general de tu actividad
          </p>
        </div>
        
        <Row gutter={[8, 12]} style={{ flex: 1 }}>
          <Col xs={12}>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <TrophyOutlined style={{ fontSize: 20, color: '#52c41a', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Ganado</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#52c41a' }}>
                {statisticsData.monthlyEarnings.toFixed(0)}€
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <ClockCircleOutlined style={{ fontSize: 20, color: '#1890ff', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Pendiente</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1890ff' }}>
                {statisticsData.pendingEarnings.toFixed(0)}€
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <ClockCircleOutlined style={{ fontSize: 20, color: '#722ed1', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>Tiempo</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#722ed1' }}>
                {statisticsData.totalTimeWorked}
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <div style={{ textAlign: 'center', padding: '8px' }}>
              <LineChartOutlined style={{ fontSize: 20, color: '#fa8c16', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>€/hora</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fa8c16' }}>
                {statisticsData.avgEarningsPerHour.toFixed(1)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StatisticsMiniPreview;
