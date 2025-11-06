'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Space, Empty, message, Card, Statistic } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import ProjectTimeControl from './ProjectTimeControl';
import { startTimeSession, endTimeSession, pauseTimeSession, resumeTimeSession } from '@/common/components/server_components/Time/timeActions';
import { getDailyTotalTimeAction, getTimeDataAction } from '@/common/components/server_components/Welcome/welcomeActions';
import type { TimeClientProps, ProjectTimeInfo } from '../interface';

const { Title } = Typography;

const TimeClient: React.FC<TimeClientProps> = ({ projects: initialProjects }) => {
  const [loading, setLoading] = useState(false);
  const [dailyTime, setDailyTime] = useState<string>('00:00:00');
  const [projects, setProjects] = useState<ProjectTimeInfo[]>(initialProjects);

  const loadDailyTotalTime = useCallback(async () => {
    try {
      const result = await getDailyTotalTimeAction();
      if (result && typeof result === 'object' && 'success' in result && result.success && 'data' in result && result.data) {
        setDailyTime(result.data as string);
      }
    } catch (error) {
      console.error('Error al cargar tiempo diario:', error);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      console.log('🔄 Refrescando datos de proyectos...');
      const updatedProjects = await getTimeDataAction();
      console.log('✅ Proyectos actualizados:', updatedProjects);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      loadDailyTotalTime(),
      loadProjects()
    ]);
  }, [loadDailyTotalTime, loadProjects]);

  useEffect(() => {
    loadDailyTotalTime();
  }, [loadDailyTotalTime]);

  const handleStartTime = async (projectId: number, description?: string) => {
    setLoading(true);
    try {
      const result = await startTimeSession(projectId, description);
      
      if (result.success) {
        message.success('Sesión de tiempo iniciada correctamente');
        // Refrescar todos los datos
        await refreshData();
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

  const handleStopTime = async () => {
    setLoading(true);
    try {
      const result = await pauseTimeSession();
      
      if (result.success) {
        message.success('Sesión de tiempo pausada correctamente');
        // Refrescar todos los datos
        await refreshData();
      } else {
        message.error(`Error: ${result.error}`);
      }
    } catch (error) {
      message.error('Error al pausar la sesión');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeTime = async () => {
    setLoading(true);
    try {
      const result = await resumeTimeSession();
      
      if (result.success) {
        message.success('Sesión de tiempo reanudada correctamente');
        // Refrescar todos los datos
        await refreshData();
      } else {
        message.error(`Error: ${result.error}`);
      }
    } catch (error) {
      message.error('Error al reanudar la sesión de tiempo');
      console.error('Error:', error);
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
        // Refrescar todos los datos
        await refreshData();
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
        {/* Estadísticas de tiempo diario */}
        <Card>
          <Statistic
            title="Tiempo trabajado hoy"
            value={dailyTime}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>

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
              onResumeTime={handleResumeTime}
              onCompleteTime={handleCompleteTime}
            />
          ))}
        </div>
      </Space>
    </div>
  );
};

export default TimeClient;
