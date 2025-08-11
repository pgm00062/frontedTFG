import ProfileClient from '../../client_components/ProfileUI/Delivery'
import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function ProfileServer() {
  // Obtener datos del usuario con cookies httpOnly ya incluidas (credentials: 'include')
  const abort = new AbortController()
  try {
    // Reenviar cookie JSESSIONID manualmente al backend desde el server
    const cookieStore = cookies()
    const jsession = cookieStore.get('JSESSIONID')?.value
    const authToken = cookieStore.get('AUTH_TOKEN')?.value
    const authHeader = authToken && !authToken.startsWith('Bearer ') ? `Bearer ${authToken}` : authToken

    const data = (await Service.getCases('getUser', {
      signal: abort.signal,
      endPointData: {},
      token: authHeader || undefined,
      headers: jsession ? { Cookie: `JSESSIONID=${jsession}` } : undefined,
    })) as ProfileClientProps['initialData']

    return <ProfileClient initialData={data} />
  } catch (error: any) {
    return <ProfileClient initialData={null} errorMessage={error?.message || 'No se pudo cargar el perfil'} />
  }
}