'use server'

import { cookies } from 'next/headers';
import Service from '@/service/src';

export async function checkProjectHasTimes(projectId: number): Promise<{ hasTimes: boolean; totalTime: number }> {
  const cookieStore = cookies();
  const jsession = cookieStore.get('JSESSIONID')?.value;
  const authToken = cookieStore.get('AUTH_TOKEN')?.value;
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

  try {
    const totalTimeData = await Service.getCases('getProjectTotalTime', {
      signal: new AbortController().signal,
      endPointData: projectId,
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    });

    const totalTime = (totalTimeData as any)?.totalSeconds || (totalTimeData as any)?.totalTime || 0;
    
    return {
      hasTimes: totalTime > 0,
      totalTime: totalTime
    };
  } catch (error) {
    // Si no puede obtener el tiempo, asume que no hay registros
    return {
      hasTimes: false,
      totalTime: 0
    };
  }
}
