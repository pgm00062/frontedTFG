'use client'
import type { ProfileClientProps } from './interface'

export default function ProfileClient({ initialData, errorMessage }: ProfileClientProps) {
  if (errorMessage) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Error</h1>
        <p>{errorMessage}</p>
      </main>
    )
  }

  if (!initialData) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Cargando...</h1>
      </main>
    )
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Datos personales</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', rowGap: 8, columnGap: 12 }}>
        <span style={{ fontWeight: 600 }}>ID</span>
        <span>{initialData.id}</span>
        <span style={{ fontWeight: 600 }}>Nombre</span>
        <span>{initialData.name}</span>
        <span style={{ fontWeight: 600 }}>Apellido</span>
        <span>{initialData.surname}</span>
        <span style={{ fontWeight: 600 }}>Email</span>
        <span>{initialData.email}</span>
        <span style={{ fontWeight: 600 }}>DNI</span>
        <span>{initialData.dni}</span>
      </div>
    </main>
  )
}


