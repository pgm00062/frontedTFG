'use client'

import type { FieldRowProps } from '../interface'

export default function FieldRow({ label, value, icon }: FieldRowProps) {
  return (
    <>
      <div className="profile-row">
        <div className="profile-row-left">
          <div className="profile-row-icon">{icon ?? '•'}</div>
          <div className="profile-row-label">{label}</div>
        </div>
        <div className="profile-row-value">{value ?? '-'}</div>
      </div>
      <div className="profile-row-sep" />
    </>
  )
}


