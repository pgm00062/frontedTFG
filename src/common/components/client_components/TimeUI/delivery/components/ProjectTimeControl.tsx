'use client'
import React from 'react';
import { Card, List, Button, Typography, Space, Spin } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TimerDisplay from './TimerDisplay';
import { useTimeOperations } from '../../infrastructure/timeOperations';
import type { ProjectTimeControlProps } from '../interface';

const { Text, Title } = Typography;

const ProjectTimeControl: React.FC<ProjectTimeControlProps> = ({ 
  project, 
  loading = false,
  onStartTime, 
  onStopTime, 
  onCompleteTime 
}) => {
  const isActive = project.activeSession?.isActive || false;
  const sessionId = project.activeSession?.id;

  const handleStart = () => {
    if (!isActive) {
      onStartTime(project.projectId);
    }
  };

  const handleStop = () => {
    if (isActive && sessionId) {
      onStopTime(sessionId);
    }
  };

  const handleComplete = () => {
    if (isActive && sessionId) {
      onCompleteTime(sessionId);
    }
  };

  return (
    <Card 
      style={{ marginBottom: 16 }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: 16 
      }}>
        {/* Nombre del proyecto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Title level={4} style={{ margin: 0, fontSize: 16 }}>
            {project.projectName}
          </Title>
        </div>

        {/* Display del tiempo */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <TimerDisplay
            isActive={isActive}
            startTime={project.activeSession?.startTime}
            totalTime={project.totalTime}
          />
        </div>

        {/* Controles */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Space size="small">
            <Button
              type={isActive ? "default" : "primary"}
              icon={<PlayCircleOutlined />}
              onClick={handleStart}
              disabled={isActive || loading}
              size="small"
            >
              Iniciar
            </Button>
            
            <Button
              icon={<PauseCircleOutlined />}
              onClick={handleStop}
              disabled={!isActive || loading}
              size="small"
            >
              Pausar
            </Button>
            
            <Button
              danger
              icon={<CheckCircleOutlined />}
              onClick={handleComplete}
              disabled={!isActive || loading}
              size="small"
            >
              Finalizar
            </Button>
            
            {loading && <Spin size="small" />}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ProjectTimeControl;
