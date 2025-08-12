'use client'
import type { ProfileClientProps } from './interface'
import { Card } from 'antd'
import { useState } from 'react'
import PasswordCard from './components/PasswordCard'
import ProfileHeader from '@/common/components/shared_Components/ProfileHeader'
import ProfileInfoCard from './components/ProfileInfoCard'
import ProfileEditorCard from './components/ProfileEditorCard'

export default function ProfileClient({ initialData, errorMessage }: ProfileClientProps) {
  const [editing, setEditing] = useState(false)

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
        <ProfileHeader
          name={initialData.name}
          surname={initialData.surname}
          email={initialData.email}
        />

        {!editing ? (
          <ProfileInfoCard
            data={{
              id: initialData.id,
              name: initialData.name,
              surname: initialData.surname,
              email: initialData.email,
              dni: initialData.dni,
            }}
            onEdit={() => setEditing(true)}
          />
        ) : (
          <ProfileEditorCard
            initialData={initialData}
            onSaved={() => setEditing(false)}
          />
        )}

        <PasswordCard />
      </div>
    </main>
  )
}