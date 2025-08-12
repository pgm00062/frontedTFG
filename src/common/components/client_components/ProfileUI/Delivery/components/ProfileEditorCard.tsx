import { useState } from 'react'
import EditableFieldRow from './EditableFieldRow'
import { IdcardOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { Card, message, Spin } from 'antd'
import { updateUserProfile } from '../../infrastructure/UpdateUserOperation'
import type { ProfileEditorContainerProps } from '../interface'

type UserProfile = {
  id: number
  name: string
  surname: string
  email: string
  dni: string
}

export default function ProfileEditorCard({ initialData, onSaved }: ProfileEditorContainerProps) {
  const [data, setData] = useState<UserProfile>(initialData)
  const [saving, setSaving] = useState(false)

  const handleChange = (name: keyof UserProfile, value: string) => {
    setData((prev) => ({ ...prev, [name]: value } as UserProfile))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await updateUserProfile({
        name: data.name,
        surname: data.surname,
        email: data.email,
        dni: data.dni,
      })
      message.success('Datos actualizados correctamente')
      onSaved?.(data)
    } catch (e: any) {
      message.error(e?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="profile-card saving-container">
      {saving && (
        <div className="saving-overlay">
          <Spin size="large" />
        </div>
      )}
      <h1 className="profile-title">Editar datos</h1>
      <div className={`profile-rows ${saving ? 'saving-disabled' : ''}`}>
        <EditableFieldRow label="Nombre" name="name" value={data.name} icon={<UserOutlined />} onChange={(n, v) => handleChange(n as keyof UserProfile, v)} disabled={saving} />
        <EditableFieldRow label="Apellido" name="surname" value={data.surname} icon={<UserOutlined />} onChange={(n, v) => handleChange(n as keyof UserProfile, v)} disabled={saving} />
        <EditableFieldRow label="Email" name="email" value={data.email} icon={<MailOutlined />} onChange={(n, v) => handleChange(n as keyof UserProfile, v)} type="email" disabled={saving} />
        <EditableFieldRow label="DNI" name="dni" value={data.dni} icon={<IdcardOutlined />} onChange={(n, v) => handleChange(n as keyof UserProfile, v)} disabled={saving} />
      </div>
      <div className="profile-actions-bottom">
        <button className="btn-full-lg" onClick={() => setData(initialData)} disabled={saving}>Cancelar</button>
        <button className="btn-full-lg btn-success" onClick={handleSave} disabled={saving}>Guardar</button>
      </div>
    </Card>
  )
}