import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserOutlined, ProjectOutlined, BarChartOutlined, FieldTimeOutlined, CompressOutlined, ExpandOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ProfileMiniPreview from './ProfileMiniPreview';
import ProjectsMiniPreview from './ProjectsMiniPreview';
import type { Props } from '../interface';

const icons: Record<string, React.ReactNode> = {
  user: <UserOutlined className="welcome-card-icon-top" />,
  project: <ProjectOutlined className="welcome-card-icon-top" />,
  bar: <BarChartOutlined className="welcome-card-icon-top" />,
  time: <FieldTimeOutlined className="welcome-card-icon-top" />,
};

export default function CardFull({ className, title, icon, onToggle, expanded, href, userPreview, projectsPreview }: Readonly<Props>) {
  console.log(`🎯 CardFull "${title}" recibió:`, { userPreview, projectsPreview });
  
  const ref = useRef<HTMLButtonElement | null>(null);
  const [dimsStyle, setDimsStyle] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    // If we are about to expand, capture current size before layout changes
    if (!expanded && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDimsStyle({ width: `${rect.width}px`, height: `${rect.height}px` });
      // small timeout to ensure styles are applied after parent updates
      // (no need to await)
    } else {
      // collapsing -> clear fixed dimensions
      setDimsStyle({});
    }

    // call parent toggle
    onToggle();
  };

  const handleGoToPage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que colapse la card al pulsar la flecha
    if (href) {
      // Navegación SPA de Next.js
      try {
        router.push(href);
      } catch {
        // Fallback a recarga completa si falla
        if (typeof window !== 'undefined') {
          window.location.href = href;
        }
      }
    }
  };

  return (
    <button
      ref={ref}
      className={`welcome-card-full ${className || ''} ${expanded ? 'welcome-card-full--expanded' : ''}`}
      style={{ 
        borderRadius: 16, 
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        ...dimsStyle 
      }}
      onClick={(e) => handleToggle(e as React.MouseEvent)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { handleToggle(e); } }}
      aria-pressed={expanded}
    >
      <div className="welcome-card-top">
        {icons[icon]}
        <h3 className="welcome-card-title-top">{title}</h3>
      </div>
      
      {/* Previsualización del perfil - solo en la tarjeta de perfil */}
      {userPreview && title === 'Perfil' && (
        <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ProfileMiniPreview user={userPreview} />
        </div>
      )}
      
      {/* Previsualización de proyectos - solo en la tarjeta de proyectos */}
      {projectsPreview && title === 'Proyectos' && (
        <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <ProjectsMiniPreview projects={projectsPreview} />
        </div>
      )}
      
      {/* Flechita para ir a la página completa - solo aparece cuando está expandida */}
      {expanded && href && (
        <button
          className="welcome-card-go"
          onClick={handleGoToPage}
          aria-label={`Ir a ${title}`}
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            fontSize: 18,
            padding: 4,
            borderRadius: 4,
            transition: 'color 0.2s'
          }}
        >
          <ArrowRightOutlined />
        </button>
      )}
      
      <div style={{ position: 'absolute', top: 16, right: 16, color: '#111827' }}>
        {expanded ? <CompressOutlined /> : <ExpandOutlined />}
      </div>
    </button>
  );
}