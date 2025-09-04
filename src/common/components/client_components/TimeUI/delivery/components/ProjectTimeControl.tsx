'use client'
import React from 'react';
import { Card, Button, Typography, Space, Spin } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TimerDisplay from './TimerDisplay';
import type { ProjectTimeControlProps } from '../interface';

const { Text, Title } = Typography;

const ProjectTimeControl: React.FC<ProjectTimeControlProps> = ({ 
  project, 
  loading = false,
  onStartTime, 
  onStopTime, 
  onResumeTime,
  onCompleteTime 
}) => {
  const isActive = project.activeSession?.isActive || false;
  const isPaused = project.activeSession?.isPaused || false;
  const sessionId = project.activeSession?.id;

  const handleStart = () => {
    if (!isActive && !isPaused) {
      onStartTime(project.projectId);
    }
  };

  const handleStop = () => {
    if (isActive && !isPaused) {
      onStopTime();
    }
  };

  const handleResume = () => {
    if (isPaused) {
      onResumeTime();
    }
  };

  const handleComplete = () => {
    if ((isActive || isPaused) && sessionId) {
      onCompleteTime(sessionId);
    }
  };

  return (
    <Card 
      style={{ marginBottom: 16 }}
      styles={{ body: { padding: '16px' } }}
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
            isActive={isActive && !isPaused}
            startTime={project.activeSession?.startTime}
            totalTime={project.totalTime}
          />
        </div>

        {/* Controles */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Space size="small">
            {/* Botón Iniciar - solo visible si no hay sesión activa */}
            {!isActive && !isPaused && (
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={handleStart}
                disabled={loading}
                size="small"
              >
                Iniciar
              </Button>
            )}
            
            {/* Botón Pausar - solo visible si está activa y no pausada */}
            {isActive && !isPaused && (
              <Button
                icon={<PauseCircleOutlined />}
                onClick={handleStop}
                disabled={loading}
                size="small"
              >
                Pausar
              </Button>
            )}
            
            {/* Botón Reanudar - solo visible si está pausada */}
            {isPaused && (
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={handleResume}
                disabled={loading}
                size="small"
              >
                Reanudar
              </Button>
            )}
            
            {/* Botón Finalizar - visible si hay sesión (activa o pausada) */}
            {(isActive || isPaused) && (
              <Button
                danger
                icon={<CheckCircleOutlined />}
                onClick={handleComplete}
                disabled={loading}
                size="small"
              >
                Finalizar
              </Button>
            )}
            
            {loading && <Spin size="small" />}
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default ProjectTimeControl;
