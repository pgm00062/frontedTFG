TEMPLATE: Estructura mínima para un componente siguiendo Opción A

Estructura recomendada:

src/common/components/
  <FeatureName>/
    client_components/
      <FeatureName>UI/
        Delivery/
          index.tsx          # Exporta componentes visuales
          interface.d.ts     # Tipos de props
          components/        # Componentes visuales reutilizables
        infrastructure/
          <FeatureName>Container.tsx  # use client; handlers/POSTs
          hooks.ts
    server_components/
      <FeatureName>Server.tsx     # Server component: fetch inicial y validación de sesión

Plantilla básica:

- `server_components/<Feature>Server.tsx` debe:
  - Ser `async` si hace fetch.
  - Leer cookies si necesita autenticación.
  - Llamar a `Service.getCases('useCaseName', { signal, endPointData, token, headers })` para obtener datos.
  - Pasar datos como props al componente client.

- `client_components/<Feature>UI/infrastructure/<Feature>Container.tsx` debe:
  - Llevar `use client`.
  - Contener handlers para formularios / acciones usuario (POSTs).
  - Usar `Service.getCases` cuando sea apropiado, o `fetch('/api/...')` si necesita capturar cookies desde el navegador.

- `client_components/<Feature>UI/Delivery/index.tsx` debe:
  - Llevar sólo presentación y prop types.
  - Evitar llamadas side-effect.

Ejemplo minimo de `server_components/ProfileServer.tsx`:

```tsx
import ProfileClient from '../../client_components/ProfileUI/Delivery'
import Service from '@/service/src'

export default async function ProfileServer() {
  const data = await Service.getCases('getUser', { signal: new AbortController().signal, endPointData: {}, token: undefined })
  return <ProfileClient initialData={data} />
}
```

Ejemplo minimo de `client_components/ProfileUI/infrastructure/ProfileContainer.tsx`:

```tsx
'use client'
import ProfileClient from '../Delivery'

export default function ProfileContainer({ initialData }){
  const handleUpdate = async(values) => {
    await Service.getCases('updateUser', { signal: new AbortController().signal, endPointData: values, token: undefined })
  }
  return <ProfileClient initialData={initialData} onUpdate={handleUpdate} />
}
```


