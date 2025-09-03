'use client'
import React, { useState } from 'react';
import { Typography, Space, Empty, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import ProjectTimeControl from './ProjectTimeControl';
import { startTimeSession, endTimeSession } from '@/common/components/server_components/Time/timeActions';
import type { TimeClientProps } from '../interface';

const { Title } = Typography;

const TimeClient: React.FC<TimeClientProps> = ({ projects, onTimeUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleStartTime = async (projectId: number, description?: string) => {
    setLoading(true);
    try {
      const result = await startTimeSession(projectId, description);
      
      if (result.success) {
        message.success('Sesión de tiempo iniciada correctamente');
        // Refrescar datos después de iniciar
        if (onTimeUpdate) {
          await onTimeUpdate();
        }
      } else {
        message.error(`Error: ${result.error}`);
      }
    } catch (error) {
      message.error('Error al iniciar la sesión de tiempo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStopTime = async (sessionId: number) => {
    setLoading(true);
    try {
      // TODO: Implementar server action para stop
      message.info('Funcionalidad de pausar en desarrollo');
    } catch (error) {
      message.error('Error al pausar la sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTime = async (sessionId: number) => {
    setLoading(true);
    try {
      const result = await endTimeSession(sessionId);
      
      if (result.success) {
        message.success('Sesión de tiempo finalizada correctamente');
        // Refrescar datos después de finalizar
        if (onTimeUpdate) {
          await onTimeUpdate();
        }
      } else {
        message.error(`Error: ${result.error}`);
      }
    } catch (error) {
      message.error('Error al finalizar la sesión de tiempo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!projects || projects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <Empty
          image={<ClockCircleOutlined style={{ fontSize: 64, color: '#d1d5db' }} />}
          description="No hay proyectos disponibles"
        >
          <p>Crea un proyecto primero para poder registrar tiempo de trabajo.</p>
        </Empty>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Registro de Tiempo</Title>
          <Typography.Paragraph type="secondary">
            Gestiona el tiempo de trabajo en tus proyectos. Puedes iniciar, pausar y finalizar sesiones de tiempo.
          </Typography.Paragraph>
        </div>

        <div>
          {projects.map((project) => (
            <ProjectTimeControl
              key={project.projectId}
              project={project}
              loading={loading}
              onStartTime={handleStartTime}
              onStopTime={handleStopTime}
              onCompleteTime={handleCompleteTime}
            />
          ))}
        </div>
      </Space>
    </div>
  );
};

export default TimeClient;
