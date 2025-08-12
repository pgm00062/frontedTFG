'use client'
import { Card, Input, Button, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { handleChange } from '../../infrastructure/ChangePasswordOperation'

export default function PasswordCard() {
  const [changing, setChanging] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [show, setShow] = useState(false)

  const onChangePassword = () =>
    handleChange({
      oldPassword,
      newPassword,
      setChanging,
      setOldPassword,
      setNewPassword,
      setShow,
    })

  return (
    <Card className="profile-card">
      <h1 className="profile-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LockOutlined /> Contraseña
      </h1>
      <div className="profile-rows">
        <div className="profile-row">
          <div className="profile-row-left">
            <div className="profile-row-label">Contraseña</div>
          </div>
          <div className="profile-row-value">{show ? '••••••••' : '••••••••'}</div>
        </div>
        <div className="profile-row-sep" />
      </div>
      <div className="profile-actions-bottom">
        <button className="btn-full-lg" onClick={() => setShow((s) => !s)}>
          {show ? 'Ocultar' : 'Cambiar contraseña'}
        </button>
      </div>

      {show && (
        <div style={{ marginTop: 16 }}>
          <div className="profile-rows">
            <div className="profile-row">
              <div className="profile-row-left">
                <div className="profile-row-label">Contraseña actual</div>
              </div>
              <div className="profile-row-input">
                <Input.Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
            </div>
            <div className="profile-row-sep" />

            <div className="profile-row">
              <div className="profile-row-left">
                <div className="profile-row-label">Nueva contraseña</div>
              </div>
              <div className="profile-row-input">
                <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
            </div>
            <div className="profile-row-sep" />
          </div>
          <div className="profile-actions-bottom">
            <Button onClick={() => setShow(false)} disabled={changing}>Cancelar</Button>
            <Button type="primary" className="btn-success" onClick={onChangePassword} loading={changing}>
              Guardar
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}