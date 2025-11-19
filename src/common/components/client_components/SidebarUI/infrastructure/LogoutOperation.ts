import { message } from 'antd';
import Service from '@/service/src';

export async function handleLogout(): Promise<boolean> {
  try {
    const signal = new AbortController().signal;
    
    // Obtener el token de las cookies para enviarlo al backend
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('AUTH_TOKEN='))
      ?.split('=')[1];

    if (!token) {
      message.warning('No hay sesión activa');
      window.location.href = '/';
      return false;
    }

    // Llamar al backend para invalidar la sesión
    // El backend espera el token en headers de Authorization
    await Service.getCases('logout', {
      signal,
      endPointData: {}, // Body vacío
      token, // Esto se enviará en Authorization header
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Eliminar las cookies del frontend
    document.cookie = 'AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict';
    document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=strict';

    message.success('Sesión cerrada correctamente');
    
    // Redirigir al login
    window.location.href = '/';
    
    return true;
  } catch (error: any) {
    console.error('Error durante el logout:', error);
    message.error('Error al cerrar sesión');
    return false;
  }
}
