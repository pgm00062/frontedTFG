import AuthClientContainer from '../../client_components/AuthComponetUI/infrastructure/AuthContainer'

interface AuthServerProps {
  initialMode?: 'login' | 'register'
}

// Server component: lugar ideal para validar sesión o prefetch
// Server component: ideal para prefetch o validación de sesión en SSR.
// NOTA: El flujo de login que necesita capturar una cookie first-party se realiza
// en el client container (`client_components/AuthComponetUI/infrastructure/AuthContainer.tsx`).
// Esto permite que el navegador reciba `Set-Cookie` desde el BFF. Ver `docs/COMPONENTS.md`.
export default async function AuthServer({ initialMode = 'login' }: AuthServerProps) {
  return <AuthClientContainer initialMode={initialMode} />
}