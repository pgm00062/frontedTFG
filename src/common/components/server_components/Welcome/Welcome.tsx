import { WelcomeGrid, WelcomeHeader } from '../../client_components/WelcomeUI/Delivery';

import type { ProfileClientProps } from '../../client_components/ProfileUI/Delivery/interface'
import { cookies } from 'next/headers'
import Service from '@/service/src'

export default async function WelcomeServer() {
  // Obtener datos del usuario igual que en ProfileServer
  const abort = new AbortController()
  let userPreview = undefined;
  try {
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
    if (data) {
      userPreview = { name: data.name, surname: data.surname }
    }
  } catch (e) {
    userPreview = undefined;
  }
  return (
    <main className="welcome-page-full">
      <WelcomeHeader />
      <WelcomeGrid full userPreview={userPreview} />
    </main>
  )
}