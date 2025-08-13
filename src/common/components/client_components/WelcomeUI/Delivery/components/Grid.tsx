'use client'
import React from 'react'
import { useGridExpansion } from '../../infrastructure/gridExpansionOperation'
import GridFull from './GridFull'
import type { GridProps } from '../interface'

export default function WelcomeGrid({ full = true, userPreview }: GridProps) {
  const { expanded, toggle } = useGridExpansion()

  if (full) {
    return <GridFull expanded={expanded} onToggle={toggle} userPreview={userPreview} />
  }
  return (
    <section className="welcome-grid">
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Perfil</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Proyectos</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Estadisticas</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Ajustes</h3></article>
    </section>
  )
}