'use client'
import React from 'react'
import { UserOutlined, ProjectOutlined, BarChartOutlined, FieldTimeOutlined, CompressOutlined, ExpandOutlined } from '@ant-design/icons'
import ProfileMiniPreview from './ProfileMiniPreview'
import type { GridProps } from '../interface'

export default function WelcomeGrid({ full = true, userPreview }: GridProps) {
  if (full) {
    return <GridFull userPreview={userPreview} />;
  }
  return (
    <section className="welcome-grid">
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Perfil</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Proyectos</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Estadisticas</h3></article>
      <article className="welcome-card"><h3 style={{ margin: 0, fontWeight: 700 }}>Ajustes</h3></article>
    </section>
  );
}

function GridFull({ userPreview }: { userPreview?: { name: string; surname: string } }) {
  const [expanded, setExpanded] = React.useState<number | null>(null)

  const toggle = (i: number) => setExpanded((prev) => (prev === i ? null : i))

  return (
    <section className="welcome-grid-full">
      <CardFull
        index={0}
        className={`welcome-card--perfil ${expanded !== null && expanded !== 0 ? 'welcome-card-full--hidden' : ''} ${expanded === 0 ? 'welcome-card-full--expanded' : ''}`}
        title="Perfil"
        icon={<UserOutlined className="welcome-card-icon-top" />}
        onToggle={() => toggle(0)}
        expanded={expanded === 0}
        href="/profile"
        userPreview={userPreview}
      />
      <CardFull
        index={1}
        className={`welcome-card--proyectos ${expanded !== null && expanded !== 1 ? 'welcome-card-full--hidden' : ''} ${expanded === 1 ? 'welcome-card-full--expanded' : ''}`}
        title="Proyectos"
        icon={<ProjectOutlined className="welcome-card-icon-top" />}
        onToggle={() => toggle(1)}
        expanded={expanded === 1}
      />
      <CardFull
        index={2}
        className={`welcome-card--mensajes ${expanded !== null && expanded !== 2 ? 'welcome-card-full--hidden' : ''} ${expanded === 2 ? 'welcome-card-full--expanded' : ''}`}
        title="Estadisticas"
        icon={<BarChartOutlined className="welcome-card-icon-top" />}
        onToggle={() => toggle(2)}
        expanded={expanded === 2}
      />
      <CardFull
        index={3}
        className={`welcome-card--ajustes ${expanded !== null && expanded !== 3 ? 'welcome-card-full--hidden' : ''} ${expanded === 3 ? 'welcome-card-full--expanded' : ''}`}
        title="Time"
        icon={<FieldTimeOutlined className="welcome-card-icon-top" />}
        onToggle={() => toggle(3)}
        expanded={expanded === 3}
      />
    </section>
  )
}

function CardFull({ index, className, title, icon, onToggle, expanded, href, userPreview }: { index: number; className?: string; title: string; icon: React.ReactNode; onToggle: () => void; expanded: boolean; href?: string; userPreview?: { name: string; surname: string } }) {
  return (
    <div
      className={`welcome-card-full ${className || ''}`}
      style={{ borderRadius: 16 }}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onToggle(); } }}
      aria-pressed={expanded}
    >
      <div className="welcome-card-top">
        {icon}
        <h3 className="welcome-card-title-top">{title}</h3>
      </div>
      {/* Previsualización del perfil solo en la tarjeta de perfil */}
      {userPreview && (
        <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ProfileMiniPreview user={userPreview} />
        </div>
      )}
      {href ? (
        <a href={href} className="welcome-card-link" aria-label={title} />
      ) : (
        <span className="welcome-card-link" aria-hidden />
      )}
      <div style={{ position: 'absolute', top: 16, right: 16, color: '#111827' }}>
        {expanded ? <CompressOutlined /> : <ExpandOutlined />}
      </div>
    </div>
  )
}