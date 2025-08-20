import { useState } from 'react';
import { message } from 'antd';
import Service from '@/service/src';
import { getAuthToken } from '@/common/utils/auth';
import type { TimeStartRequest } from '../delivery/interface';

export const useTimeOperations = () => {
  const [loading, setLoading] = useState(false);

  const startTimeSession = async (projectId: number, description?: string) => {
    setLoading(true);
    try {
      const timeStartData: TimeStartRequest = {
        projectId,
        description
      };

      console.log('🚀 Iniciando sesión de tiempo con datos:', timeStartData);

      // Temporal: probar sin token para verificar CORS
      console.log('🔑 Probando sin token por ahora...');

      const response = await Service.getCases('startTime', {
        signal: new AbortController().signal,
        endPointData: timeStartData,
        token: undefined, // Temporal: sin token para probar CORS
        headers: undefined,
      });

      console.log('✅ Respuesta del servidor:', response);
      message.success('Sesión de tiempo iniciada correctamente');
      return response;
    } catch (error) {
      console.error('❌ Error completo al iniciar sesión de tiempo:', error);
      console.error('❌ Error message:', error instanceof Error ? error.message : 'Error desconocido');
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack disponible');
      message.error(`Error al iniciar la sesión de tiempo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stopTimeSession = async (sessionId: number) => {
    setLoading(true);
    try {
      // TODO: Implementar cuando esté disponible el endpoint
      message.success('Sesión pausada');
    } catch (error) {
      console.error('Error al pausar sesión:', error);
      message.error('Error al pausar la sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completeTimeSession = async (sessionId: number) => {
    setLoading(true);
    try {
      // TODO: Implementar cuando esté disponible el endpoint
      message.success('Sesión finalizada');
    } catch (error) {
      console.error('Error al finalizar sesión:', error);
      message.error('Error al finalizar la sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    startTimeSession,
    stopTimeSession,
    completeTimeSession,
    loading
  };
};
