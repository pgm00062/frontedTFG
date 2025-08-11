'use client'
import type { ProfileClientProps } from './interface'
import { Card } from 'antd'
import FieldRow from './components/FieldRow'
import { IdcardOutlined, UserOutlined, MailOutlined, NumberOutlined } from '@ant-design/icons'
import { useState } from 'react'
import ProfileEditorContainer from '../infrastructure/ProfileEditorContainer'

export default function ProfileClient({ initialData, errorMessage }: ProfileClientProps) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState(() => initialData || null)

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : prev))
  }
  if (errorMessage) return (
    <main className="profile-page">
      <div className="profile-wrapper">
        <Card className="profile-card">
          <h1 className="profile-title">Error</h1>
          <p>{errorMessage}</p>
        </Card>
      </div>
    </main>
  )

  if (!initialData) return (
    <main className="profile-page">
      <div className="profile-wrapper">
        <Card className="profile-card">
          <h1 className="profile-title">Cargando...</h1>
        </Card>
      </div>
    </main>
  )

  return (
    <main className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-hero">
          <div className="profile-hero-left">
            <div className="profile-avatar">
              {initialData.name?.[0] ?? 'U'}
            </div>
            <div>
              <h2 className="profile-name">{initialData.name} {initialData.surname}</h2>
              <p className="profile-email">{initialData.email}</p>
            </div>
          </div>
          <div className="profile-actions">
          </div>
        </div>

        {!editing ? (
          <Card className="profile-card">
            <h1 className="profile-title">Información de cuenta</h1>
            <div className="profile-rows">
              <FieldRow label="ID" value={initialData.id} icon={<NumberOutlined />} />
              <FieldRow label="Nombre" value={initialData.name} icon={<UserOutlined />} />
              <FieldRow label="Apellido" value={initialData.surname} icon={<UserOutlined />} />
              <FieldRow label="Email" value={initialData.email} icon={<MailOutlined />} />
              <FieldRow label="DNI" value={initialData.dni} icon={<IdcardOutlined />} />
            </div>
            <div className="profile-actions-bottom">
              <button className="btn-full-lg" onClick={() => setEditing(true)}>Editar</button>
            </div>
          </Card>
        ) : (
          <ProfileEditorContainer initialData={initialData as any} onSaved={() => setEditing(false)} />
        )}
      </div>
    </main>
  )
}