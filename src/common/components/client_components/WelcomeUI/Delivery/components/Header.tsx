'use client'
import React from 'react'

interface WelcomeHeaderProps {
  userName?: string
}

export default function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <header className="welcome-header-fullwidth">
      <h1 className="welcome-header-title-fullwidth" style={{ 
        fontSize: '42px', 
        fontWeight: 700,
        background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '8px'
      }}>
        FreeManage
      </h1>
      <p className="welcome-header-subtitle-fullwidth" style={{
        fontSize: '18px',
        color: '#4b5563',
        fontWeight: 500
      }}>
        {userName ? `¡Bienvenido, ${userName}!` : '¡Bienvenido!'}
      </p>
    </header>
  )
}