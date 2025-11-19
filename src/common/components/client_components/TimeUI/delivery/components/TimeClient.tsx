'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Space, Empty, message, Card, Statistic, Button } from 'antd';
import { ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import ProjectTimeControl from './ProjectTimeControl';
import { startTimeSession, endTimeSession, pauseTimeSession, resumeTimeSession } from '@/common/components/server_components/Time/timeActions';
import { getDailyTotalTimeAction, getTimeDataAction } from '@/common/components/server_components/Welcome/welcomeActions';
import type { TimeClientProps, ProjectTimeInfo } from '../interface';

const { Title } = Typography;

const TimeClient: React.FC<TimeClientProps> = ({ projects: initialProjects }) => {
  const [loading, setLoading] = useState(false);
  const [refreshingTime, setRefreshingTime] = useState(false);
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

  const handleRefreshDailyTime = async () => {
    setRefreshingTime(true);
    try {
      await loadDailyTotalTime();
      message.success('Tiempo actualizado correctamente');
    } catch (error) {
      message.error('Error al actualizar el tiempo');
      console.error('Error:', error);
    } finally {
      setRefreshingTime(false);
    }
  };

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
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 24px',
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        margin: '24px auto',
        maxWidth: 600
      }}>
        <Empty
          image={<ClockCircleOutlined style={{ fontSize: 64, color: '#bfdbfe' }} />}
          description={
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>
                No hay proyectos disponibles
              </div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>
                Crea un proyecto primero para poder registrar tiempo de trabajo.
              </div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Estadísticas de tiempo diario */}
        <Card
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 12,
            border: 'none',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Statistic
              title={
                <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500 }}>
                  Tiempo trabajado hoy
                </span>
              }
              value={dailyTime}
              prefix={<ClockCircleOutlined style={{ color: '#ffffff' }} />}
              valueStyle={{ 
                color: '#ffffff', 
                fontSize: 32, 
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Button
              type="default"
              icon={<ReloadOutlined spin={refreshingTime} />}
              onClick={handleRefreshDailyTime}
              loading={refreshingTime}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                fontWeight: 500,
                backdropFilter: 'blur(10px)'
              }}
            >
              Actualizar
            </Button>
          </div>
        </Card>

        <div style={{ 
          background: '#ffffff',
          borderRadius: 12,
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <Title level={2} style={{ marginTop: 0, marginBottom: 8, fontSize: 24, fontWeight: 700 }}>
            ⏱️ Registro de Tiempo
          </Title>
          <Typography.Paragraph type="secondary" style={{ fontSize: 15, marginBottom: 24 }}>
            Gestiona el tiempo de trabajo en tus proyectos. Puedes iniciar, pausar y finalizar sesiones de tiempo.
          </Typography.Paragraph>

          <div>
            {projects.map((project, index) => (
              <div key={project.projectId} style={{ marginBottom: index < projects.length - 1 ? 16 : 0 }}>
                <ProjectTimeControl
                  project={project}
                  loading={loading}
                  onStartTime={handleStartTime}
                  onStopTime={handleStopTime}
                  onResumeTime={handleResumeTime}
                  onCompleteTime={handleCompleteTime}
                />
              </div>
            ))}
          </div>
        </div>
      </Space>
    </div>
  );
};

export default TimeClient;
