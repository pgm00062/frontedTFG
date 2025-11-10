'use client'
import React from 'react';
import { Card, Table, Statistic, Tag, Empty } from 'antd';
import { LineChartOutlined, DollarOutlined } from '@ant-design/icons';
import type { EarningsRateResponse, ProjectEarningsRate } from '../interface';
import type { ColumnsType } from 'antd/es/table';

interface EarningsRateCardProps {
  data?: EarningsRateResponse;
}

const EarningsRateCard: React.FC<EarningsRateCardProps> = ({ data }) => {
  // Valores por defecto si data es undefined
  const safeData: EarningsRateResponse = data || {
    averageEarningsPerHour: 0,
    totalHours: 0,
    totalBudget: 0,
    totalProjects: 0,
    projectRates: []
  };

  const columns: ColumnsType<ProjectEarningsRate> = [
    {
      title: 'Proyecto',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '30%',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: string) => {
        const colorMap = {
          'TERMINADO': 'green',
          'EN_PROGRESO': 'blue',
          'CANCELADO': 'red',
        };
        return <Tag color={colorMap[status as keyof typeof colorMap] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Presupuesto',
      dataIndex: 'budget',
      key: 'budget',
      width: '15%',
      align: 'right',
      render: (budget: number) => `${budget.toFixed(2)}€`,
    },
    {
      title: 'Horas Trabajadas',
      dataIndex: 'totalHours',
      key: 'totalHours',
      width: '15%',
      align: 'right',
      render: (hours: number) => `${hours.toFixed(1)}h`,
    },
    {
      title: '€/hora',
      dataIndex: 'earningsPerHour',
      key: 'earningsPerHour',
      width: '15%',
      align: 'right',
      render: (rate: number) => (
        <span style={{ fontWeight: 600, color: '#fa8c16' }}>
          {rate.toFixed(2)}€/h
        </span>
      ),
    },
  ];

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LineChartOutlined style={{ color: '#fa8c16' }} />
          Tasa de Ganancia por Hora
        </div>
      }
      style={{ height: '100%' }}
    >
      {/* Estadísticas generales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 16, 
        marginBottom: 24 
      }}>
        <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff7e6' }}>
          <Statistic
            title="Promedio €/hora"
            value={safeData.averageEarningsPerHour}
            precision={2}
            prefix={<DollarOutlined />}
            suffix="€/h"
            valueStyle={{ color: '#fa8c16', fontSize: '1.5rem' }}
          />
        </Card>
        
        <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f6ffed' }}>
          <Statistic
            title="Total Presupuesto"
            value={safeData.totalBudget}
            precision={2}
            prefix={<DollarOutlined />}
            suffix="€"
            valueStyle={{ color: '#52c41a', fontSize: '1.5rem' }}
          />
        </Card>
        
        <Card size="small" style={{ textAlign: 'center', backgroundColor: '#e6f7ff' }}>
          <Statistic
            title="Total Horas"
            value={safeData.totalHours}
            precision={1}
            suffix="h"
            valueStyle={{ color: '#1890ff', fontSize: '1.5rem' }}
          />
        </Card>
        
        <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f9f0ff' }}>
          <Statistic
            title="Total Proyectos"
            value={safeData.totalProjects}
            valueStyle={{ color: '#722ed1', fontSize: '1.5rem' }}
          />
        </Card>
      </div>

      {/* Tabla de proyectos */}
      {safeData.projectRates.length === 0 ? (
        <Empty
          image={<LineChartOutlined style={{ fontSize: 48, color: '#d1d5db' }} />}
          description="No hay datos de tasa de ganancia"
          style={{ padding: '48px 0' }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={safeData.projectRates}
          rowKey="projectId"
          pagination={false}
          size="middle"
          scroll={{ x: 800 }}
        />
      )}
    </Card>
  );
};

export default EarningsRateCard;
