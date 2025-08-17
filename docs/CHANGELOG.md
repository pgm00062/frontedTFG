# Changelog

Registra aquí los cambios relevantes en el proyecto siguiendo la convención acordada.

Formato sugerido por entrada:
- Date: YYYY-MM-DD
- Author: <nombre/alias>
- Type: (feat | fix | docs | refactor | perf | test)
- Files: lista de rutas afectadas
- Summary: breve descripción de los cambios y su motivación
- Notes: notas adicionales, riesgos o pasos a seguir

---

## 2025-08-17
- Date: 2025-08-17
- Author: pgm00062
- Type: docs
- Files:
  - docs/COMPONENTS.md
  - docs/TEMPLATE_COMPONENT.md
  - src/common/components/client_components/AuthComponetUI/infrastructure/AuthContainer.tsx
  - src/common/components/server_components/AuthComponent/AuthContainer.tsx
- Summary: Añadida documentación de la convención de componentes (Opción A) y comentarios explicativos en los componentes de Auth para dejar claro el patrón (server para GET/prefetch; client para POST/login BFF).
- Notes: Se dejó la excepción documentada para el flujo de login vía BFF (captura de cookies). Considerar renombrar `AuthComponetUI` para corregir un typo en próximos cambios.

---

## 2025-08-17 (feat)
- Date: 2025-08-17
- Author: pgm00062
- Type: feat
- Files:
  - src/common/components/client_components/WelcomeUI/Delivery/interface.d.ts
  - src/common/components/client_components/WelcomeUI/Delivery/components/ProfileMiniPreview.tsx
  - src/common/components/client_components/WelcomeUI/Delivery/components/CardFull.tsx
  - src/common/components/client_components/WelcomeUI/Delivery/components/GridFull.tsx
  - src/common/components/server_components/Welcome/Welcome.tsx
  - src/common/components/server_components/Welcome/ProfilePreviewServer.tsx
- Summary: Mejora de la previsualización de Perfil en la tarjeta de Welcome: ampliados los campos de `userPreview` (id, name, surname, email, dni). `ProfileMiniPreview` muestra email y DNI si están presentes y añade atributos ARIA. `CardFull` usa navegación SPA (`router.push`) para mejorar UX.
- Notes: Server components ahora envían campos mínimos para preview; asegúrate de que `getUser` devuelve los campos esperados. Añadir pruebas visuales manuales para confirmar estilos.

---

## 2025-08-17 (feat)
- Date: 2025-08-17
- Author: pgm00062
- Type: feat
- Files:
  - src/common/components/client_components/WelcomeUI/Delivery/components/ProfileMiniPreview.tsx
  - src/common/components/client_components/ProfileUI/Delivery/components/ProfileInfoCard.tsx
- Summary: Ajustada la previsualización en `ProfileMiniPreview` para usar el mismo formato que `ProfileInfoCard` (fila por campo) y mostrar Nombre, Apellido y Email.
- Notes: Esto mantiene consistencia visual entre la página de perfil y su preview.

---

## 2025-08-17 (feat)
- Date: 2025-08-17
- Author: pgm00062
- Type: feat
- Files:
  - src/domain/manageRequest/lib/queries/user-queries.js
  - src/domain/manageRequest/lib/methods/user-methods.js
  - src/service/src/application/queries/lib/user.js
  - src/app/projects/page.tsx
  - src/common/components/client_components/ProjectsUI/**
- Summary: Añadidos endpoints y métodos para proyectos (`listProjects`, `createProject`), y creada la página `/projects` con componentes para listar proyectos y crear nuevos (drawer con formulario). La tabla muestra nombre, descripción y estado con colores por estado.
- Notes: El formulario mapea fechas a 'YYYY-MM-DD' y el backend debe aceptar ese formato; comprobar que `createProject` devuelve el proyecto creado con `id` y `status`.

Notes (update): el endpoint para listar proyectos se ajustó a `/projects/list` y ahora `listProjects` envía los parámetros `page` y `size` como query (`?page=0&size=10`).

---

## 2025-08-17 (fix)
- Date: 2025-08-17
- Author: pgm00062
- Type: fix
- Files:
  - src/app/api/projects/create/route.ts
  - src/common/components/client_components/ProjectsUI/infrastructure/ProjectsContainer.tsx
- Summary: Añadida ruta BFF `/api/projects/create` para proxy POST a backend y permitir que el navegador reciba cookies de sesión; `ProjectsContainer` ahora usa esa ruta para crear proyectos desde el cliente.
- Notes: Esto permite capturar `JSESSIONID` y mantener la sesión al crear proyectos desde el navegador.




