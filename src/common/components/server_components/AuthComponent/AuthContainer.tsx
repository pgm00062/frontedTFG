import AuthClientContainer from '../../client_components/AuthComponetUI/infrastructure/AuthContainer'

interface AuthServerProps {
  initialMode?: 'login' | 'register'
}

// Server component: lugar ideal para validar sesión o prefetch
export default async function AuthServer({ initialMode = 'login' }: AuthServerProps) {
  return <AuthClientContainer initialMode={initialMode} />
}