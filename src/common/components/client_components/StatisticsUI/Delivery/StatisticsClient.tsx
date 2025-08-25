'use client'
import React from 'react';
import { Row, Col } from 'antd';
import type { StatisticsClientProps } from './interface';
import MonthlyEarningsCard from './components/MonthlyEarningsCard';
import PendingEarningsCard from './components/PendingEarningsCard';
import TimeWorkedCard from './components/TimeWorkedCard';
import EarningsVsTimeCard from './components/EarningsVsTimeCard';

const StatisticsClient: React.FC<StatisticsClientProps> = ({ statisticsData }) => {
  console.log('📊 StatisticsClient recibió:', statisticsData);

  return (
    <div className="statistics-container">
      <Row gutter={[24, 24]}>
        {/* Dinero ganado (último mes) */}
        <Col xs={24} lg={12}>
          <MonthlyEarningsCard data={statisticsData.monthlyEarnings} />
        </Col>

        {/* Dinero pendiente (proyectos en progreso) */}
        <Col xs={24} lg={12}>
          <PendingEarningsCard data={statisticsData.pendingEarnings} />
        </Col>

        {/* Tiempo trabajado por proyecto */}
        <Col xs={24} lg={12}>
          <TimeWorkedCard data={statisticsData.timeWorked} />
        </Col>

        {/* Relación dinero ganado vs tiempo trabajado */}
        <Col xs={24} lg={12}>
          <EarningsVsTimeCard data={statisticsData.earningsVsTime} />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsClient;
