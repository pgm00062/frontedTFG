'use client'
import { MenuOutlined } from '@ant-design/icons'
import { ToggleButtonProps } from '../interface'

interface Props extends ToggleButtonProps {
  isOpen: boolean
}

export default function ToggleButton({ onClick, isOpen }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Abrir menú"
      className={`sidebar-toggle${isOpen ? ' sidebar-toggle--hidden' : ''}`}
    >
      <MenuOutlined />
    </button>
  )
}