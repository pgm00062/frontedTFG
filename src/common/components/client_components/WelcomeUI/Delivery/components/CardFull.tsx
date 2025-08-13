import React from 'react';
import { UserOutlined, ProjectOutlined, BarChartOutlined, FieldTimeOutlined, CompressOutlined, ExpandOutlined } from '@ant-design/icons';
import ProfileMiniPreview from './ProfileMiniPreview';
import type { Props } from '../interface';

const icons: Record<string, React.ReactNode> = {
  user: <UserOutlined className="welcome-card-icon-top" />,
  project: <ProjectOutlined className="welcome-card-icon-top" />,
  bar: <BarChartOutlined className="welcome-card-icon-top" />,
  time: <FieldTimeOutlined className="welcome-card-icon-top" />,
};

export default function CardFull({ className, title, icon, onToggle, expanded, href, userPreview }: Props) {
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
        {icons[icon]}
        <h3 className="welcome-card-title-top">{title}</h3>
      </div>
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
  );
}