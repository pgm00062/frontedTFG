# Convención de componentes (Server / Client) — Opción A

Esta documentación resume la convención acordada para organizar componentes en el proyecto.

Principio general
- Server components: responsables de prefetch, validación de sesión y preparación de datos.
- Client components (Delivery): responsables de la UI, presentación y accesibilidad.
- Infrastructure (client): containers/hooks/operaciones que manejan interacción del usuario (formularios, POSTs, uploads) y llamadas que deben ejecutarse en el navegador (ej. para capturar cookies first-party desde un BFF).

Reglas concretas
1. GET / initial-data
  - Siempre en el server component.
  - Usar `Service.getCases(...)` o `manageRequest` desde el server component.
  - Pasar datos limpios al client component vía props.

2. POST / acciones del usuario
  - Normalmente en el client `infrastructure` container (handler), sobre todo cuando la acción requiere interacción inmediata y respuesta en el navegador.
  - Ejemplo típico: login que hace `fetch('/api/auth/login', { method: 'POST' })` en el cliente para que el navegador reciba la cookie (Set-Cookie) de primer partido desde el BFF.

3. División Delivery / Infrastructure
  - `Delivery` = sólo UI; exporta componentes visuales y tipos (`interface.d.ts`).
  - `Infrastructure` = hooks, containers y operaciones que conectan la UI con la capa service/backend.

4. Service / Domain
  - Las llamadas al backend deben pasar por la capa `service` (ej. `Service.getCases`) y la capa `domain/manageRequest` para mantener la lógica centralizada.

Buenas prácticas
- Documentar en comentarios cuando un container client haga un POST con la intención de capturar cookies (BFF flow). 
- Evitar duplicar fetches: si los datos son necesarios para el render inicial, fetch en server; si son resultado directo de una interacción, fetch en client.
- Usar variables de entorno para `API_BASE_URL` (no hardcodear `http://localhost:8080` en producción).

Plantilla y ejemplo
- Ver `docs/TEMPLATE_COMPONENT.md` para scaffold y ejemplo de carpetas.

Si tienes dudas o quieres que transforme uno de los componentes de ejemplo para seguir esta convención, dime cuál y lo aplico.
