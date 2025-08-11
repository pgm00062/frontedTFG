'use client'

import { Input } from 'antd'
import type { EditableFieldRowProps } from '../interface'

export default function EditableFieldRow({ label, name, value, icon, onChange, type = 'text', disabled = false }: EditableFieldRowProps) {
  return (
    <>
      <div className="profile-row">
        <div className="profile-row-left">
          <div className="profile-row-icon">{icon ?? '•'}</div>
          <div className="profile-row-label">{label}</div>
        </div>
        <div className="profile-row-input">
          <Input
            value={value as any}
            onChange={(e) => onChange(name, e.target.value)}
            type={type}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="profile-row-sep" />
    </>
  )
}