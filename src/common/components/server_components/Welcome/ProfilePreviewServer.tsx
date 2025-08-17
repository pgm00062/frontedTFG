import ProfileClient from '../../client_components/ProfileUI/Delivery';
import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface';
import { cookies } from 'next/headers';
import Service from '@/service/src';

export default async function ProfilePreviewServer() {
  const abort = new AbortController();
  let result = null;
  try {
    const cookieStore = cookies();
    const jsession = cookieStore.get('JSESSIONID')?.value;
    const authToken = cookieStore.get('AUTH_TOKEN')?.value;
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken;

    const data = (await Service.getCases('getUser', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })) as ProfileClientProps['initialData'];

    // Enviamos los campos mínimos para la vista previa (id, name, surname, email, dni)
    result = <ProfileClient initialData={{
      name: data?.name || '',
      surname: data?.surname || '',
      id: data?.id || 0,
      email: data?.email || '',
      dni: data?.dni || ''
    }} />;
  } catch (error: any) {
    // Si hay error, devolvemos null (preview vacía)
    result = null;
  }
  return result;
}
