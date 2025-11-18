/**
 * Configuración centralizada de la API
 * Lee la URL base desde las variables de entorno
 */

// En Next.js, las variables con NEXT_PUBLIC_ son accesibles en el cliente
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Helper para construir URLs completas
export const buildApiUrl = (path) => {
  // Asegurar que el path comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
