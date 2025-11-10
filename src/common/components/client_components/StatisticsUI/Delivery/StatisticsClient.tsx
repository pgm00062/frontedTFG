'use client'
import React from 'react';
import { Row, Col } from 'antd';
import type { StatisticsClientProps } from './interface';
import EarningsCard from './components/EarningsCard';
import PendingEarningsCard from './components/PendingEarningsCard';
import EarningsRateCard from './components/EarningsRateCard';

const StatisticsClient: React.FC<StatisticsClientProps> = ({ statisticsData }) => {
  console.log('📊 StatisticsClient recibió:', statisticsData);

  return (
    <div className="statistics-container">
      <Row gutter={[24, 24]}>
        {/* A) y B) Dinero ganado - con selector Último Mes / Año Actual */}
        <Col xs={24} lg={12}>
          <EarningsCard 
            earningsLastMonth={statisticsData.earningsLastMonth}
            earningsThisYear={statisticsData.earningsThisYear}
          />
        </Col>

        {/* C) Dinero pendiente (proyectos en progreso) */}
        <Col xs={24} lg={12}>
          <PendingEarningsCard amount={statisticsData.pendingEarnings} />
        </Col>

        {/* D) Tasa de ganancia por hora */}
        <Col xs={24}>
          <EarningsRateCard data={statisticsData.earningsRate} />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsClient;
