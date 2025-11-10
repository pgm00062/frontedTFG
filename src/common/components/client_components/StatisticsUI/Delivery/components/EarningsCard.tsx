'use client'
import React, { useState } from 'react';
import { Card, Statistic, Select } from 'antd';
import { DollarOutlined, TrophyOutlined } from '@ant-design/icons';

interface EarningsCardProps {
  earningsLastMonth: number;
  earningsThisYear: number;
}

type PeriodType = 'lastMonth' | 'thisYear';

const EarningsCard: React.FC<EarningsCardProps> = ({ earningsLastMonth, earningsThisYear }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('lastMonth');

  const currentAmount = selectedPeriod === 'lastMonth' ? earningsLastMonth : earningsThisYear;
  const title = selectedPeriod === 'lastMonth' ? 'Último Mes' : 'Año Actual';

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrophyOutlined style={{ color: '#52c41a' }} />
            Dinero Ganado
          </div>
          <Select
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            style={{ width: 140 }}
            size="small"
            options={[
              { value: 'lastMonth', label: 'Último Mes' },
              { value: 'thisYear', label: 'Año Actual' },
            ]}
          />
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
        title={`Total Ganado (${title})`}
        value={currentAmount}
        precision={2}
        prefix={<DollarOutlined />}
        suffix="€"
        valueStyle={{ color: '#52c41a', fontSize: '2.5rem', fontWeight: 600 }}
      />
      <div style={{ marginTop: 16, fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
        Proyectos terminados en {selectedPeriod === 'lastMonth' ? 'el último mes' : 'el año 2025'}
      </div>
    </Card>
  );
};

export default EarningsCard;
