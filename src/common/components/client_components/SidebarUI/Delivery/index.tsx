'use client'
import { SidebarProps } from './interface'

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--open' : ''}`}
      />

      <aside
        className={`sidebar-panel ${isOpen ? 'sidebar-panel--open' : ''}`}
      >
        <h3 className="sidebar-title">Menú</h3>
        <nav className="sidebar-nav">
          <a href="/profile" className="sidebar-link">Datos personales</a>
          <a href="#" className="sidebar-link">Opción 2</a>
          <a href="#" className="sidebar-link">Opción 3</a>
        </nav>
      </aside>
    </>
  )
}