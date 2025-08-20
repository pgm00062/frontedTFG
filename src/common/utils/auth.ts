/**
 * Utility para obtener cookies del lado del cliente
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    console.warn('document no está disponible (SSR)');
    return null;
  }
  
  console.log('Todas las cookies:', document.cookie);
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    console.log(`Cookie ${name}:`, cookieValue);
    return cookieValue || null;
  }
  
  console.log(`Cookie ${name} no encontrada`);
  return null;
};

/**
 * Obtiene el token de autenticación desde las cookies
 */
export const getAuthToken = (): string | undefined => {
  const authToken = getCookie('AUTH_TOKEN');
  console.log('Token obtenido:', authToken);
  return authToken || undefined;
};

/**
 * Obtiene headers con autenticación para requests del cliente
 */
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};
  
  const authToken = getAuthToken();
  const jsession = getCookie('JSESSIONID');
  
  if (authToken) {
    const headerToken = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
    headers['Authorization'] = headerToken;
  }
  
  if (jsession) {
    headers['Cookie'] = `JSESSIONID=${jsession}`;
  }
  
  return headers;
};
