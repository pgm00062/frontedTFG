'use client'
import { SidebarProps } from './interface'
import { handleLogout } from '../infrastructure/LogoutOperation'

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  
  const onLogout = async () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres cerrar sesión?')
    
    if (confirmed) {
      await handleLogout()
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`}
      />

      <aside
        className={`sidebar-panel ${isOpen ? 'sidebar-panel--open' : ''}`}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title" style={{ marginBottom: 0 }}>Menú</h3>
          <button onClick={onClose} aria-label="Cerrar" className="sidebar-link" style={{ padding: '4px 8px' }}>✕</button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item"><a href="/welcome" className="sidebar-link">Inicio</a></li>
          <li className="sidebar-item"><a href="/profile" className="sidebar-link">Datos personales</a></li>
          <li className="sidebar-item"><a href="#" className="sidebar-link">Proyectos</a></li>
          <li className="sidebar-item"><a href="#" className="sidebar-link">Estadísticas</a></li>
          <li className="sidebar-item"><a href="#" className="sidebar-link">Ajustes</a></li>
        </ul>
        
        <div className="sidebar-footer">
          <button onClick={onLogout} className="sidebar-logout-btn">
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}