import React from 'react';
import CardFull from './CardFull';
import type { PropsGridFull } from '../interface';

export default function GridFull({ expanded, onToggle, userPreview, projectsPreview }: PropsGridFull) {
  return (
    <>
      {/* Overlay oscuro cuando hay una card expandida */}
      {expanded !== null && (
        <div 
          className="welcome-card-overlay" 
          onClick={() => onToggle(expanded)}
        />
      )}
      
      <section className="welcome-grid-full">
      <CardFull
        index={0}
        className={`welcome-card--perfil ${expanded !== null && expanded !== 0 ? 'welcome-card-full--hidden' : ''} ${expanded === 0 ? 'welcome-card-full--expanded' : ''}`}
        title="Perfil"
        icon="user"
        onToggle={() => onToggle(0)}
        expanded={expanded === 0}
        href="/profile"
        userPreview={userPreview}
      />
      <CardFull
        index={1}
        className={`welcome-card--proyectos ${expanded !== null && expanded !== 1 ? 'welcome-card-full--hidden' : ''} ${expanded === 1 ? 'welcome-card-full--expanded' : ''}`}
        title="Proyectos"
        icon="project"
        onToggle={() => onToggle(1)}
        expanded={expanded === 1}
        href="/projects"
        projectsPreview={projectsPreview}
      />
      <CardFull
        index={2}
        className={`welcome-card--mensajes ${expanded !== null && expanded !== 2 ? 'welcome-card-full--hidden' : ''} ${expanded === 2 ? 'welcome-card-full--expanded' : ''}`}
        title="Estadisticas"
        icon="bar"
        onToggle={() => onToggle(2)}
        expanded={expanded === 2}
        href="/estadisticas"
      />
      <CardFull
        index={3}
        className={`welcome-card--ajustes ${expanded !== null && expanded !== 3 ? 'welcome-card-full--hidden' : ''} ${expanded === 3 ? 'welcome-card-full--expanded' : ''}`}
        title="Time"
        icon="time"
        onToggle={() => onToggle(3)}
        expanded={expanded === 3}
        href="/time"
      />
    </section>
    </>
  );
}