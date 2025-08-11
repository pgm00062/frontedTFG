'use client'
import { MenuOutlined } from '@ant-design/icons'
import { ToggleButtonProps } from '../interface'

export default function ToggleButton({ onClick }: ToggleButtonProps) {
  return (
    <button onClick={onClick} aria-label="Abrir menú" className="sidebar-toggle">
      <MenuOutlined />
    </button>
  )
}


