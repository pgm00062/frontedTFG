'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Service from '@/service/src';

export async function startTimeSession(projectId: number, description?: string) {
  const cookieStore = cookies();
  const jsession = cookieStore.get('JSESSIONID')?.value;
  const authToken = cookieStore.get('AUTH_TOKEN')?.value;
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

  try {
    const timeStartData = {
      projectId,
      description
    };

    const response = await Service.getCases('startTime', {
      signal: new AbortController().signal,
      endPointData: timeStartData,
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    });

    // Revalidar las páginas para obtener datos frescos
    revalidatePath('/time');
    revalidatePath('/welcome');
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error al iniciar sesión de tiempo:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}

export async function endTimeSession(sessionId: number) {
  const cookieStore = cookies();
  const jsession = cookieStore.get('JSESSIONID')?.value;
  const authToken = cookieStore.get('AUTH_TOKEN')?.value;
  const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

  try {
    // Según el error, el DTO espera el campo 'timeSessionId', no 'sessionId'
    const timeEndData = {
      timeSessionId: sessionId  // Campo corregido según el error de validación
    };

    console.log('🔚 Finalizando sesión con datos:', timeEndData);

    const response = await Service.getCases('endTime', {
      signal: new AbortController().signal,
      endPointData: timeEndData,
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    });

    console.log('✅ Sesión finalizada correctamente:', response);

    // Revalidar las páginas para obtener datos frescos
    revalidatePath('/time');
    revalidatePath('/welcome');
    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error al finalizar sesión de tiempo:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    };
  }
}
